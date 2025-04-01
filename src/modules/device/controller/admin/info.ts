import { CoolController, BaseController } from '@cool-midway/core';
import { DeviceInfoEntity } from '../../entity/info.entity';
import { DeviceInfoService } from '../../service/info';
import { Get, Inject, Post, Body } from '@midwayjs/core';

/**
 * 设备信息
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: DeviceInfoEntity,
  service: DeviceInfoService,
  pageQueryOp: {
    fieldEq: ['zuhuId', 'dingdanId'],
    keyWordLikeFields: ['name', 'number'],
    addOrderBy: {
      id: 'DESC'
    }
  }
})
export class DeviceInfoController extends BaseController {
  @Inject()
  deviceInfoService: DeviceInfoService;
  
  /**
   * 根据租户ID获取设备列表
   */
  @Get('/byZuhuId')
  async getByZuhuId(@Body() body) {
    const { zuhuId } = body;
    if (!zuhuId) {
      return this.fail('租户ID不能为空');
    }
    const data = await this.deviceInfoService.getByZuhuId(zuhuId);
    return this.ok(data);
  }
  
  /**
   * 根据订单ID获取设备列表
   */
  @Get('/byDingdanId')
  async getByDingdanId(@Body() body) {
    const { dingdanId } = body;
    if (!dingdanId) {
      return this.fail('订单ID不能为空');
    }
    const data = await this.deviceInfoService.getByDingdanId(dingdanId);
    return this.ok(data);
  }
  
  /**
   * 绑定设备到租户
   */
  @Post('/bindToZuhu')
  async bindToZuhu(@Body() body) {
    const { deviceId, zuhuId } = body;
    if (!deviceId) {
      return this.fail('设备ID不能为空');
    }
    if (!zuhuId) {
      return this.fail('租户ID不能为空');
    }
    
    await this.deviceInfoService.bindToZuhu(deviceId, zuhuId);
    return this.ok();
  }
  
  /**
   * 绑定设备到订单
   */
  @Post('/bindToDingdan')
  async bindToDingdan(@Body() body) {
    const { deviceId, dingdanId } = body;
    if (!deviceId) {
      return this.fail('设备ID不能为空');
    }
    if (!dingdanId) {
      return this.fail('订单ID不能为空');
    }
    
    await this.deviceInfoService.bindToDingdan(deviceId, dingdanId);
    return this.ok();
  }
  
  /**
   * 解绑设备与租户的关系
   */
  @Post('/unbindZuhu')
  async unbindZuhu(@Body() body) {
    const { deviceId } = body;
    if (!deviceId) {
      return this.fail('设备ID不能为空');
    }
    
    await this.deviceInfoService.unbindZuhu(deviceId);
    return this.ok();
  }
  
  /**
   * 解绑设备与订单的关系
   */
  @Post('/unbindDingdan')
  async unbindDingdan(@Body() body) {
    const { deviceId } = body;
    if (!deviceId) {
      return this.fail('设备ID不能为空');
    }
    
    await this.deviceInfoService.unbindDingdan(deviceId);
    return this.ok();
  }
  
  /**
   * 获取设备统计信息
   */
  @Get('/statistics')
  async getStatistics() {
    const totalCount = await this.deviceInfoService.count();
    const byZuhu = await this.deviceInfoService.countByZuhu();
    
    return this.ok({
      totalCount,
      byZuhu
    });
  }
} 