import { CoolController, BaseController } from '@cool-midway/core';
import { XswDeviceTypeEntity } from '../../entity/type.entity';
import { XswDeviceTypeService } from '../../service/type';

/**
 * 设备类型
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: XswDeviceTypeEntity,
  service: XswDeviceTypeService,
  pageQueryOp: {
    keyWordLikeFields: ['name']
  }
})
export class XswDeviceTypeController extends BaseController {} 