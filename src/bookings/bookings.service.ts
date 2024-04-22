import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, Repository } from 'typeorm'
import { Booking } from './booking.entity'
import { CreateBookingDto } from './booking.dto'
import { BookingStatus } from './booking-status'
import { ShowsService } from '../shows/shows.service'

@Injectable()
export class BookingsService {
  @InjectRepository(Booking)
  private bookingsRepository: Repository<Booking>

  @Inject(forwardRef(() => ShowsService))
  private showsService: ShowsService

  async findAllBookings(): Promise<Booking[]> {
    return this.bookingsRepository.find()
  }

  findBookingsBy(
    where: FindOptionsWhere<Booking> | FindOptionsWhere<Booking>[],
  ) {
    return this.bookingsRepository.findBy(where)
  }

  async findOneBooking(id: number) {
    const booking = await this.bookingsRepository.findOneBy({ id })
    if (!booking) {
      throw new NotFoundException('Booking not found')
    }
    return booking
  }

  createBooking(entity: CreateBookingDto) {
    return this.bookingsRepository.save(entity)
  }

  async removeBooking(id: number) {
    const result = await this.bookingsRepository.delete({ id })
    if (result.affected < 1) {
      throw new NotFoundException('Booking not found')
    }
  }

  async seed() {
    const shows = [
      await this.showsService.findOneShowBy({ title: 'Miraculous' }),
      await this.showsService.findOneShowBy({ title: 'Les As de la jungle 2' }),
      await this.showsService.findOneShowBy({ title: 'Tempête' }),
    ]
    const bookingDtos: CreateBookingDto[] = [
      {
        numberOfTickets: 2,
        status: BookingStatus.BOOKED,
        showId: shows[0].id,
        show: shows[0],
      },
      {
        numberOfTickets: 2,
        status: BookingStatus.BOOKED,
        showId: shows[1].id,
        show: shows[1],
      },
      {
        numberOfTickets: 3,
        status: BookingStatus.BOOKED,
        showId: shows[2].id,
        show: shows[2],
      },
      {
        numberOfTickets: 42,
        status: BookingStatus.BOOKED,
        showId: shows[2].id,
        show: shows[2],
      },
    ]
    await this.bookingsRepository.delete({})
    const bookings = bookingDtos.map((bookingDto) =>
      this.bookingsRepository.create(bookingDto),
    )
    await this.bookingsRepository.save(bookings)
  }
}
