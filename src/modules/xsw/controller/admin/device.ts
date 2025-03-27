import { CoolController, BaseController } from '@cool-midway/core';
import { XswDeviceEntity } from '../../entity/device.entity';
import { XswDeviceService } from '../../service/device';

/**
 * 设备管理
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: XswDeviceEntity,
  service: XswDeviceService,
  pageQueryOp: {
    fieldEq: ['status', 'deviceTypeId', 'projectId', 'userId'],
    keyWordLikeFields: ['name', 'number', 'location']
  }
})
export class XswDeviceController extends BaseController {} 