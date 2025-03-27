import { BaseEntity } from '../../base/entity/base';
import { Column, Entity } from 'typeorm';

/**
 * 设备类型
 */
@Entity('xsw_device_type')
export class XswDeviceTypeEntity extends BaseEntity {
  @Column({ comment: '设备类型' })
  name: string;
} 