import { Provide, Inject } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { DingdanSonEntity } from '../entity/son.entity';
import { DingdanInfoEntity } from '../entity/info.entity';

/**
 * 订单子表信息
 */
@Provide()
export class DingdanSonService extends BaseService {
  @InjectEntityModel(DingdanSonEntity)
  dingdanSonEntity: Repository<DingdanSonEntity>;

  @InjectEntityModel(DingdanInfoEntity)
  dingdanInfoEntity: Repository<DingdanInfoEntity>;
  
  /**
   * 创建子订单
   * @param param 
   */
  async add(param) {
    // 调用父类的add方法添加数据
    const result = await super.add(param);
    
    // 如果有订单ID，更新主订单信息
    if (param.dingdanId) {
      await this.updateMainOrder(param.dingdanId);
    }
    
    return result;
  }
  
  /**
   * 更新子订单
   * @param param 
   */
  async update(param) {
    // 获取更新前的记录
    const oldRecord = await this.dingdanSonEntity.findOneBy({ id: param.id });
    
    // 调用父类的update方法更新数据
    const result = await super.update(param);
    
    // 如果状态发生变化，更新主订单信息
    if (oldRecord && oldRecord.status !== param.status) {
      await this.updateMainOrder(oldRecord.dingdanId);
    }
    
    return result;
  }
  
  /**
   * 更新主订单信息
   * @param dingdanId 订单ID
   */
  async updateMainOrder(dingdanId) {
    // 查询所有子订单
    const sonOrders = await this.dingdanSonEntity.findBy({ dingdanId });
    
    if (sonOrders.length > 0) {
      // 计算已还金额（状态为2的子订单金额总和）
      const yihuanJine = sonOrders
        .filter(item => item.status === 2)
        .reduce((sum, item) => sum + Number(item.jine || 0), 0);
      
      // 计算总金额（所有子订单金额总和）
      const zongJine = sonOrders
        .reduce((sum, item) => sum + Number(item.jine || 0), 0);
      
      // 计算待还金额
      const daihuanJine = zongJine - yihuanJine;
      
      // 判断主订单状态
      let status = 0; // 默认还款中
      
      // 如果全部已还款，状态为已还清
      if (yihuanJine >= zongJine) {
        status = 2;
      } 
      // 如果有逾期的，状态为已逾期
      else if (sonOrders.some(item => item.status === 1)) {
        status = 1;
      }
      
      // 更新主订单
      await this.dingdanInfoEntity.update(dingdanId, {
        yihuanJine,
        zongJine,
        daihuanJine,
        status
      });
    }
  }
  
  /**
   * 根据主订单ID获取子订单列表
   * @param dingdanId 订单ID
   */
  async getByMainOrderId(dingdanId) {
    return await this.dingdanSonEntity.findBy({ dingdanId });
  }
} 