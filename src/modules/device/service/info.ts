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
  
} 