import { BaseEntity } from '../../base/entity/base';
import { Column, Entity } from 'typeorm';

/**
 * 租户信息
 */
@Entity('zuhu_info')
export class ZuhuInfoEntity extends BaseEntity {
  @Column({ comment: '姓名', nullable: true })
  name: string;

  @Column({ comment: '手机号', nullable: true })
  phone: string;

  @Column({ comment: '来源', nullable: true })
  ori: string;

  @Column({ comment: '地址', nullable: true })
  address: string;

  @Column({ comment: '身份信息', nullable: true })
  idCard: string;

  @Column({ comment: '信用分/芝麻信用', nullable: true })
  zhima: string;
} 