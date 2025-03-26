import { Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { XiaoshouInfoEntity } from '../entity/info';

/**
 * 销售信息
 */
@Provide()
export class XiaoshouInfoService extends BaseService {
  @InjectEntityModel(XiaoshouInfoEntity)
  xiaoshouInfoEntity: Repository<XiaoshouInfoEntity>;
} 