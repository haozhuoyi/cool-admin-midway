import { CoolController, BaseController } from '@cool-midway/core';
import { XiaoshouInfoEntity } from '../../entity/info';
import { XiaoshouInfoService } from '../../service/info';

/**
 * 销售信息
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: XiaoshouInfoEntity,
  service: XiaoshouInfoService,
  pageQueryOp: {
    keyWordLikeFields: ['a.name', 'a.phone'],
    fieldEq: [],
    select: ['a.*'],
  },
})
export class AdminXiaoshouInfoController extends BaseController {} 