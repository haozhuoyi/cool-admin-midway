import { CoolController, BaseController } from '@cool-midway/core';
import { XswProjectEntity } from '../../entity/project.entity';
import { XswProjectService } from '../../service/project';

/**
 * 项目信息
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: XswProjectEntity,
  service: XswProjectService,
  pageQueryOp: {
    keyWordLikeFields: ['name', 'number']
  }
})
export class XswProjectController extends BaseController {} 