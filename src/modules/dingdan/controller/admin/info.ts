import { CoolController, BaseController } from '@cool-midway/core';
import { DingdanInfoEntity } from '../../entity/info.entity';
import { DingdanInfoService } from '../../service/info';
import { Get, Inject } from '@midwayjs/core';

/**
 * 订单信息
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: DingdanInfoEntity,
  service: DingdanInfoService,
  pageQueryOp: {
    fieldEq: ['status', 'zuhuId', 'deviceId'],
    keyWordLikeFields: ['ori', 'taocanType'],
    addOrderBy: {
      id: 'DESC'
    }
  }
})
export class DingdanInfoController extends BaseController {
  @Inject()
  dingdanInfoService: DingdanInfoService;
  
  /**
   * 获取订单金额统计
   */
  @Get('/totalAmount')
  async getTotalAmount() {
    const data = await this.dingdanInfoService.getTotalAmount();
    return this.ok(data);
  }
  
  /**
   * 获取订单状态统计
   */
  @Get('/statusCount')
  async getStatusCount() {
    const data = await this.dingdanInfoService.countByStatus();
    return this.ok(data);
  }
} 