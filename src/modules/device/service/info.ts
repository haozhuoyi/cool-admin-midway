import { Provide, Inject } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { DeviceInfoEntity } from '../entity/info.entity';

/**
 * 设备信息
 */
@Provide()
export class DeviceInfoService extends BaseService {
  @InjectEntityModel(DeviceInfoEntity)
  deviceInfoEntity: Repository<DeviceInfoEntity>;
  
  /**
   * 根据租户ID获取设备列表
   * @param zuhuId 租户ID
   */
  async getByZuhuId(zuhuId: number) {
    return await this.deviceInfoEntity.findBy({ zuhuId });
  }
  
  /**
   * 根据订单ID获取设备列表
   * @param dingdanId 订单ID
   */
  async getByDingdanId(dingdanId: number) {
    return await this.deviceInfoEntity.findBy({ dingdanId });
  }
  
  /**
   * 绑定设备到租户
   * @param deviceId 设备ID
   * @param zuhuId 租户ID
   */
  async bindToZuhu(deviceId: number, zuhuId: number) {
    return await this.deviceInfoEntity.update(deviceId, { zuhuId });
  }
  
  /**
   * 绑定设备到订单
   * @param deviceId 设备ID
   * @param dingdanId 订单ID
   */
  async bindToDingdan(deviceId: number, dingdanId: number) {
    return await this.deviceInfoEntity.update(deviceId, { dingdanId });
  }
  
  /**
   * 解绑设备与租户的关系
   * @param deviceId 设备ID
   */
  async unbindZuhu(deviceId: number) {
    return await this.deviceInfoEntity.update(deviceId, { zuhuId: null });
  }
  
  /**
   * 解绑设备与订单的关系
   * @param deviceId 设备ID
   */
  async unbindDingdan(deviceId: number) {
    return await this.deviceInfoEntity.update(deviceId, { dingdanId: null });
  }
  
  /**
   * 统计设备数量
   */
  async count() {
    return await this.deviceInfoEntity.count();
  }
  
  /**
   * 按租户统计设备数量
   */
  async countByZuhu() {
    const result = await this.nativeQuery(`
      SELECT 
        zuhuId,
        COUNT(id) as count
      FROM device_info
      WHERE zuhuId IS NOT NULL
      GROUP BY zuhuId
    `);
    
    return result;
  }
} 