import { BaseEntity } from '../../base/entity/base';
import { Column, Entity } from 'typeorm';

/**
 * 订单子表信息
 */
@Entity('dingdan_son_info')
export class DingdanSonEntity extends BaseEntity {
  @Column({ comment: '订单ID', nullable: true })
  dingdanId: number;

  @Column({ comment: '金额', type: 'decimal', precision: 10, scale: 2, nullable: true })
  jine: number;

  @Column({ comment: '还款日期', type: 'datetime', nullable: true })
  datetime: Date;

  @Column({ comment: '订单状态 0:未还款 1:已逾期 2:已还款', default: 0, nullable: true })
  status: number;
} 