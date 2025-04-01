import { Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ZuhuInfoEntity } from '../entity/info.entity';

/**
 * 租户信息
 */
@Provide()
export class ZuhuInfoService extends BaseService {
  @InjectEntityModel(ZuhuInfoEntity)
  zuhuInfoEntity: Repository<ZuhuInfoEntity>;
  
  /**
   * 根据手机号查询租户
   * @param phone 手机号
   */
  async getByPhone(phone: string) {
    return await this.zuhuInfoEntity.findOneBy({ phone });
  }
  
  /**
   * 根据身份证号查询租户
   * @param idCard 身份证号
   */
  async getByIdCard(idCard: string) {
    return await this.zuhuInfoEntity.findOneBy({ idCard });
  }
  
  /**
   * 查询信用分大于等于指定分数的租户
   * @param score 信用分
   */
  async getByZhimaScore(score: number) {
    return await this.zuhuInfoEntity.createQueryBuilder()
      .where('CAST(zhima AS DECIMAL) >= :score', { score })
      .getMany();
  }
  
  /**
   * 统计租户数量
   */
  async count() {
    return await this.zuhuInfoEntity.count();
  }
  
  /**
   * 按来源统计租户数量
   */
  async countByOri() {
    const result = await this.nativeQuery(`
      SELECT 
        ori,
        COUNT(id) as count
      FROM zuhu_info
      WHERE ori IS NOT NULL
      GROUP BY ori
    `);
    
    return result;
  }
  
  /**
   * 搜索租户
   * @param keyword 关键词(姓名、电话、身份证)
   */
  async search(keyword: string) {
    if (!keyword) {
      return [];
    }
    
    return await this.zuhuInfoEntity.find({
      where: [
        { name: Like(`%${keyword}%`) },
        { phone: Like(`%${keyword}%`) },
        { idCard: Like(`%${keyword}%`) }
      ]
    });
  }
  
  /**
   * 检查租户是否存在
   * @param param 参数
   */
  async checkExists(param: { phone?: string; idCard?: string }) {
    const { phone, idCard } = param;
    
    if (phone) {
      const existingByPhone = await this.zuhuInfoEntity.findOneBy({ phone });
      if (existingByPhone) {
        return { exists: true, message: '手机号已存在', data: existingByPhone };
      }
    }
    
    if (idCard) {
      const existingByIdCard = await this.zuhuInfoEntity.findOneBy({ idCard });
      if (existingByIdCard) {
        return { exists: true, message: '身份证号已存在', data: existingByIdCard };
      }
    }
    
    return { exists: false };
  }
} 