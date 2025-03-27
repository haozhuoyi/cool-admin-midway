import { Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { XswDeviceTypeEntity } from '../entity/type.entity';

/**
 * 设备类型
 */
@Provide()
export class XswDeviceTypeService extends BaseService {
  @InjectEntityModel(XswDeviceTypeEntity)
  xswDeviceTypeEntity: Repository<XswDeviceTypeEntity>;
} 