import { BaseEntity, transformerJson } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 销售信息
 */
@Entity('xiaoshou_info')
export class XiaoshouInfoEntity extends BaseEntity {
  @Index()
  @Column({ comment: '名称', length: 255, nullable: true })
  name: string;

  @Column({
    comment: '关联渠道',
    nullable: true,
    type: 'json',
    transformer: transformerJson,
  })
  qudaoIds: string[];

  @Column({
    comment: '名下租户',
    nullable: true,
    type: 'json',
    transformer: transformerJson,
  })
  zuhuIds: string[];

  @Column({ comment: '联系方式', length: 255, nullable: true })
  phone: string;

  @Column({ comment: '备注', type: 'text', nullable: true })
  note: string;
} 