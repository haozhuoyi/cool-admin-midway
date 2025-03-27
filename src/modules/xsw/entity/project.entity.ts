import { BaseEntity } from '../../base/entity/base';
import { Column, Entity } from 'typeorm';

/**
 * 项目信息
 */
@Entity('xsw_project_info')
export class XswProjectEntity extends BaseEntity {
  @Column({ comment: '项目名称', nullable: true })
  name: string;

  @Column({ comment: '项目编号', nullable: true })
  number: string;
} 