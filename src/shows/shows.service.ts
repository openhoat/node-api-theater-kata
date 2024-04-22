import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, Repository } from 'typeorm'
import { Show } from './show.entity'
import { CreateShowDto } from './show.dto'
import { BookingsService } from '../bookings/bookings.service'
import { CreateBookingDto } from '../bookings/booking.dto'

@Injectable()
export class ShowsService {
  @InjectRepository(Show)
  private showsRepository: Repository<Show>
  @Inject(BookingsService)
  private bookingsService: BookingsService

  async findAllShows(): Promise<Show[]> {
    return this.showsRepository.find()
  }

  async findOneShowBy(
    where: FindOptionsWhere<Show> | FindOptionsWhere<Show>[],
  ) {
    const show = await this.showsRepository.findOneBy(where)
    if (!show) {
      throw new NotFoundException('Show not found')
    }
    return show
  }

  async findOneShowById(id: number) {
    return this.findOneShowBy({ id })
  }

  createShow(entity: CreateShowDto) {
    return this.showsRepository.save(entity)
  }

  async removeShow(id: number) {
    const result = await this.showsRepository.delete({ id })
    if (result.affected < 1) {
      throw new NotFoundException('Show not found')
    }
  }

  createBooking(showId: number, bookingDto: Omit<CreateBookingDto, 'showId'>) {
    const entity = { ...bookingDto, showId }
    return this.bookingsService.createBooking(entity)
  }

  async seed() {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const showDtos: CreateShowDto[] = [
      {
        title: 'Miraculous',
        date: tomorrow,
      },
      {
        title: 'Les As de la jungle 2',
        date: tomorrow,
      },
      {
        title: "Anatomie d'une chute",
        date: tomorrow,
      },
      {
        title: 'Tempête',
        date: tomorrow,
      },
      {
        title: 'Passages',
        date: tomorrow,
      },
      {
        title: 'Mon chat et moi',
        date: tomorrow,
      },
      {
        title: 'Les Choses simples',
        date: tomorrow,
      },
      {
        title: 'Le Bleu du caftan',
        date: tomorrow,
      },
      {
        title: 'Mon crime',
        date: tomorrow,
      },
    ]
    await this.showsRepository.delete({})
    const shows = showDtos.map((showDto) =>
      this.showsRepository.create(showDto),
    )
    await this.showsRepository.save(shows)
  }
}
