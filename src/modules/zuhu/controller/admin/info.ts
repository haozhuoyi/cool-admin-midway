import { CoolController, BaseController } from '@cool-midway/core';
import { ZuhuInfoEntity } from '../../entity/info.entity';
import { ZuhuInfoService } from '../../service/info';
import { Get, Inject, Post, Body } from '@midwayjs/core';

/**
 * 租户信息
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ZuhuInfoEntity,
  service: ZuhuInfoService,
  pageQueryOp: {
    fieldEq: ['ori'],
    keyWordLikeFields: ['name', 'phone', 'idCard', 'address'],
    addOrderBy: {
      id: 'DESC'
    }
  },
  // 在添加前执行的动作
  before: async (ctx,app) => {
    // 如果是添加操作，检查手机号和身份证号是否已存在
    if (ctx.method === 'POST' && ctx.path.endsWith('/add')) {
      const body = ctx.request.body;
      const service = await ctx.requestContext.getAsync(ZuhuInfoService);
      
      // 检查手机号和身份证号是否已存在
      const checkResult = await service.checkExists({
        phone: body.phone,
        idCard: body.idCard
      });
      
      if (checkResult.exists) {
        ctx.status = 400;
        ctx.body = {
          code: 400,
          message: checkResult.message
        };
        return false; // 阻止继续执行
      }
    }
    return true; // 允许继续执行
  }
})
export class ZuhuInfoController extends BaseController {
  @Inject()
  zuhuInfoService: ZuhuInfoService;
  
  /**
   * 根据手机号查询租户
   */
  @Get('/byPhone')
  async getByPhone(@Body() body) {
    const { phone } = body;
    if (!phone) {
      return this.fail('手机号不能为空');
    }
    const data = await this.zuhuInfoService.getByPhone(phone);
    return this.ok(data);
  }
  
  /**
   * 根据身份证号查询租户
   */
  @Get('/byIdCard')
  async getByIdCard(@Body() body) {
    const { idCard } = body;
    if (!idCard) {
      return this.fail('身份证号不能为空');
    }
    const data = await this.zuhuInfoService.getByIdCard(idCard);
    return this.ok(data);
  }
  
  /**
   * 查询信用分大于等于指定分数的租户
   */
  @Get('/byZhimaScore')
  async getByZhimaScore(@Body() body) {
    const { score } = body;
    if (!score) {
      return this.fail('信用分不能为空');
    }
    const data = await this.zuhuInfoService.getByZhimaScore(Number(score));
    return this.ok(data);
  }
  
  /**
   * 获取租户统计信息
   */
  @Get('/statistics')
  async getStatistics() {
    const totalCount = await this.zuhuInfoService.count();
    const byOri = await this.zuhuInfoService.countByOri();
    
    return this.ok({
      totalCount,
      byOri
    });
  }
  
  /**
   * 搜索租户
   */
  @Get('/search')
  async search(@Body() body) {
    const { keyword } = body;
    if (!keyword) {
      return this.fail('关键词不能为空');
    }
    const data = await this.zuhuInfoService.search(keyword);
    return this.ok(data);
  }
  
  /**
   * 检查租户是否存在
   */
  @Post('/checkExists')
  async checkExists(@Body() body) {
    const { phone, idCard } = body;
    
    if (!phone && !idCard) {
      return this.fail('手机号或身份证号至少提供一个');
    }
    
    const result = await this.zuhuInfoService.checkExists({ phone, idCard });
    return this.ok(result);
  }
} 