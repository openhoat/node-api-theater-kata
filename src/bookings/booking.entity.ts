import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Show } from '../shows/show.entity'
import { BookingStatus } from './booking-status'

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  numberOfTickets: number

  @Column()
  status: BookingStatus

  @Column('int', { nullable: true })
  showId: number

  @ManyToOne(() => Show, (show: Show) => show.bookings, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'showId' })
  show: Show
}
