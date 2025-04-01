import { BaseEntity } from '../../base/entity/base';
import { Column, Entity } from 'typeorm';

/**
 * 订单信息
 */
@Entity('dingdan_info')
export class DingdanInfoEntity extends BaseEntity {
  @Column({ comment: '租户ID', nullable: true })
  zuhuId: number;

  @Column({ comment: '设备ID', nullable: true })
  deviceId: number;

  @Column({ comment: '订单时间', type: 'datetime', nullable: true })
  datetime: Date;

  @Column({ comment: '订单来源', nullable: true })
  ori: string;

  @Column({ comment: '套餐类型', nullable: true })
  taocanType: string;

  @Column({ comment: '已还金额', type: 'decimal', precision: 10, scale: 2, nullable: true })
  yihuanJine: number;

  @Column({ comment: '待还金额', type: 'decimal', precision: 10, scale: 2, nullable: true })
  daihuanJine: number;

  @Column({ comment: '总金额', type: 'decimal', precision: 10, scale: 2, nullable: true })
  zongJine: number;

  @Column({ comment: '还款日期', nullable: true })
  hkDatetime: number;

  @Column({ comment: '分期数量', nullable: true })
  fenqiCount: number;

  @Column({ comment: '订单状态 0:还款中 1:已逾期 2:已还清', default: 0, nullable: true })
  status: number;
} 