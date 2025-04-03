 import { CoolController, BaseController } from '@cool-midway/core';
import { DeviceInfoEntity } from '../../entity/info.entity';
import { DeviceInfoService } from '../../service/info';
import { Get, Inject, Post, Body } from '@midwayjs/core';

/**
 * 设备信息
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: DeviceInfoEntity,
  service: DeviceInfoService,
  pageQueryOp: {
    fieldEq: ['zuhuId', 'dingdanId'],
    keyWordLikeFields: ['name', 'number'],
    addOrderBy: {
      id: 'DESC'
    }
  }
})
export class DeviceInfoController extends BaseController {
  @Inject()
  deviceInfoService: DeviceInfoService;
  
} 