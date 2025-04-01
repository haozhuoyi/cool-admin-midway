import { Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { DingdanInfoEntity } from '../entity/info.entity';

/**
 * 订单信息
 */
@Provide()
export class DingdanInfoService extends BaseService {
  @InjectEntityModel(DingdanInfoEntity)
  dingdanInfoEntity: Repository<DingdanInfoEntity>;
  
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