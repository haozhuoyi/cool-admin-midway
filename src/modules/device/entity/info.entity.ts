import { BaseEntity } from '../../base/entity/base';
import { Column, Entity } from 'typeorm';

/**
 * 设备信息
 */
@Entity('device_info')
export class DeviceInfoEntity extends BaseEntity {
  @Column({ comment: '设备编号', nullable: true })
  number: string;

  @Column({ comment: '设备名称', nullable: true })
  name: string;

  @Column({ comment: '租户信息', nullable: true })
  zuhuId: number;

  @Column({ comment: '订单编号', nullable: true })
  dingdanId: number;
} 