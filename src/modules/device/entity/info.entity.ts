import { BaseEntity, transformerJson } from '../../base/entity/base';
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

  @Column({
    comment: '租户ID',
    nullable: true,
    type: 'json',
    transformer: transformerJson,
  })
  zuhuId: string[];

  @Column({
    comment: '订单编号',
    nullable: true,
    type: 'json',
    transformer: transformerJson,
  })
  dingdanId: string[];
} 