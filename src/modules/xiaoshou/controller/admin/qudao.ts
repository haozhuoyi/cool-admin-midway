import { Body, Get, Inject, Post, Query } from '@midwayjs/core';
import { BaseController } from '@cool-midway/core';
import { QudaoInfoService } from '../../service/qudao';
import { CoolController } from '@cool-midway/core';
import { QudaoInfoEntity } from '../../entity/qudao';

/**
 * 渠道信息
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: QudaoInfoEntity,
  service: QudaoInfoService,
})
export class QudaoInfoController extends BaseController {
  @Inject()
  qudaoInfoService: QudaoInfoService;
} 