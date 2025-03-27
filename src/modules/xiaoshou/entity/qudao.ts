import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 渠道信息
 */
@Entity('qudao_info')
export class QudaoInfoEntity extends BaseEntity {
  @Index()
  @Column({ comment: '渠道名称', length: 255, nullable: true })
  name: string;

  @Column({ comment: '渠道信息', type: 'text', nullable: true })
  info: string;

  @Column({ comment: '备注', type: 'text', nullable: true })
  note: string;
} 