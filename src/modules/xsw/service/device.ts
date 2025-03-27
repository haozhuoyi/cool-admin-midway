import { Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { XswDeviceEntity } from '../entity/device.entity';

/**
 * 设备管理
 */
@Provide()
export class XswDeviceService extends BaseService {
  @InjectEntityModel(XswDeviceEntity)
  xswDeviceEntity: Repository<XswDeviceEntity>;
} 