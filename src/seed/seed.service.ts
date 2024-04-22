import { Inject, Injectable } from '@nestjs/common'
import { ShowsService } from '../shows/shows.service'
import { BookingsService } from '../bookings/bookings.service'

@Injectable()
export class SeedService {
  @Inject()
  private showsService: ShowsService

  @Inject()
  private bookingsService: BookingsService

  async seed() {
    await this.showsService.seed()
    await this.bookingsService.seed()
  }
}
