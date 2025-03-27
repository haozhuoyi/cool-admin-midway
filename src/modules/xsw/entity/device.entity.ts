import { BaseEntity } from '../../base/entity/base';
import { Column, Entity } from 'typeorm';

/**
 * 设备管理
 */
@Entity('xsw_device')
export class XswDeviceEntity extends BaseEntity {
  @Column({ comment: '名称' })
  name: string;

  @Column({ comment: '编号' })
  number: string;

  @Column({ comment: '当前所处项目', nullable: true })
  projectId: number;

  @Column({ comment: '当前状态 0-空闲 1-租借中', default: 0 })
  status: number;

  @Column({ comment: '设备类型', nullable: true })
  deviceTypeId: number;

  @Column({ comment: '当前位置', nullable: true })
  location: string;

  @Column({ comment: '当前借取人', nullable: true })
  userId: number;
} 