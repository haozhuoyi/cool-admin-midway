import { Provide, Inject } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { DingdanInfoEntity } from '../entity/info.entity';
import { DingdanSonService } from './son';

/**
 * 订单信息
 */
@Provide()
export class DingdanInfoService extends BaseService {
  @InjectEntityModel(DingdanInfoEntity)
  dingdanInfoEntity: Repository<DingdanInfoEntity>;

  @Inject()
  dingdanSonService: DingdanSonService;

  async init() {
    // 设置操作实体
    this.entity = this.dingdanInfoEntity;
    await super.init();
  }
  
  /**
   * 新增订单并生成子订单
   */
  async add(param) {
    // 调用父类的add方法添加数据
    const result = await super.add(param) as DingdanInfoEntity;
    
    // 如果有待还金额、还款日期和分期数量，则生成子订单
    if (param.daihuanJine && param.hkDatetime && param.fenqiCount) {
      // 计算每期金额，保留两位小数
      const perAmount = Number((param.daihuanJine / param.fenqiCount).toFixed(2));
      
      // 计算最后一期金额（处理除不尽的情况）
      const lastAmount = Number((param.daihuanJine - perAmount * (param.fenqiCount - 1)).toFixed(2));
      
      // 获取当前日期
      const now = new Date();
      // 设置还款日期为下个月的指定日期
      const baseDate = new Date(now.getFullYear(), now.getMonth() + 1, param.hkDatetime);
      
      // 批量添加子订单
      for (let i = 0; i < param.fenqiCount; i++) {
        // 计算当前期的还款日期
        const currentDate = new Date(baseDate);
        currentDate.setMonth(baseDate.getMonth() + i);
        
        // 创建子订单
        await this.dingdanSonService.add({
          dingdanId: result.id,
          jine: i === param.fenqiCount - 1 ? lastAmount : perAmount, // 最后一期可能会有差额
          datetime: currentDate,
          status: 0 // 未还款
        });
      }
    }
    
    return result;
  }

  /**
   * 统计订单金额
   */
  async getTotalAmount() {
    const result = await this.nativeQuery(`
      SELECT 
        SUM(zongJine) as totalAmount,
        SUM(yihuanJine) as paidAmount,
        SUM(daihuanJine) as unpaidAmount
      FROM dingdan_info
    `);
    return result[0] || { totalAmount: 0, paidAmount: 0, unpaidAmount: 0 };
  }
  
  /**
   * 按状态统计订单数量
   */
  async countByStatus() {
    const result = await this.nativeQuery(`
      SELECT 
        status,
        COUNT(id) as count
      FROM dingdan_info
      GROUP BY status
    `);
    
    const statusMap = {
      0: '还款中',
      1: '已逾期',
      2: '已还清'
    };
    
    return result.map(item => ({
      status: item.status,
      statusName: statusMap[item.status] || '未知状态',
      count: item.count
    }));
  }
} 