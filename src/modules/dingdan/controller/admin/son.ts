import { CoolController, BaseController } from '@cool-midway/core';
import { DingdanSonEntity } from '../../entity/son.entity';
import { DingdanSonService } from '../../service/son';
import { Get, Inject, Post, Body } from '@midwayjs/core';

/**
 * 订单子表信息
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: DingdanSonEntity,
  service: DingdanSonService,
  pageQueryOp: {
    fieldEq: ['status', 'dingdanId'],
    addOrderBy: {
      id: 'DESC'
    }
  }
})
export class DingdanSonController extends BaseController {
  @Inject()
  dingdanSonService: DingdanSonService;
  
  /**
   * 根据主订单ID获取子订单列表
   */
  @Get('/byMainOrderId')
  async getByMainOrderId(@Body() body) {
    const { dingdanId } = body;
    if (!dingdanId) {
      return this.fail('订单ID不能为空');
    }
    const data = await this.dingdanSonService.getByMainOrderId(dingdanId);
    return this.ok(data);
  }
  
  /**
   * 更新子订单状态
   */
  @Post('/updateStatus')
  async updateStatus(@Body() body) {
    const { id, status } = body;
    if (!id) {
      return this.fail('ID不能为空');
    }
    if (status === undefined) {
      return this.fail('状态不能为空');
    }
    
    await this.dingdanSonService.update({ id, status });
    return this.ok();
  }
  
  /**
   * 批量添加子订单
   */
  @Post('/batchAdd')
  async batchAdd(@Body() body) {
    const { dingdanId, totalAmount, count, datetime } = body;
    
    if (!dingdanId) {
      return this.fail('订单ID不能为空');
    }
    if (!totalAmount) {
      return this.fail('总金额不能为空');
    }
    if (!count || count <= 0) {
      return this.fail('分期数量必须大于0');
    }
    
    // 计算每期金额，保留两位小数
    const perAmount = Number((totalAmount / count).toFixed(2));
    
    // 计算最后一期金额（处理除不尽的情况）
    const lastAmount = Number((totalAmount - perAmount * (count - 1)).toFixed(2));
    
    // 获取还款日期的基础日期
    let baseDate = datetime ? new Date(datetime) : new Date();
    
    // 批量添加子订单
    for (let i = 0; i < count; i++) {
      // 计算当前期的还款日期
      const currentDate = new Date(baseDate);
      currentDate.setMonth(baseDate.getMonth() + i);
      
      // 创建子订单
      await this.dingdanSonService.add({
        dingdanId,
        jine: i === count - 1 ? lastAmount : perAmount, // 最后一期可能会有差额
        datetime: currentDate,
        status: 0, // 未还款
      });
    }
    
    return this.ok();
  }
} 