import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Booking } from '../bookings/booking.entity'

@Entity()
export class Show {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  date: Date

  @OneToMany(() => Booking, (booking: Booking) => booking.show, {
    cascade: true,
  })
  bookings: Booking[]
}
