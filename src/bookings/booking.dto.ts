import { BookingStatus } from './booking-status'
import { Show } from '../shows/show.entity'

export class CreateBookingDto {
  numberOfTickets: number
  status: BookingStatus
  showId: number
  show: Show
}
