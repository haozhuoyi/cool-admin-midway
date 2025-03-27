import { Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { QudaoInfoEntity } from '../entity/qudao';

/**
 * 渠道信息
 */
@Provide()
export class QudaoInfoService extends BaseService {
  entityKey = QudaoInfoEntity;
} 