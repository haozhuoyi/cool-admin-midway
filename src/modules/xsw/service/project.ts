import { Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { XswProjectEntity } from '../entity/project.entity';

/**
 * 项目信息
 */
@Provide()
export class XswProjectService extends BaseService {
  @InjectEntityModel(XswProjectEntity)
  xswProjectEntity: Repository<XswProjectEntity>;
} 