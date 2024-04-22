import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { ShowsService } from './shows.service'
import { CreateShowDto } from './show.dto'
import { CreateBookingDto } from '../bookings/booking.dto'
import { BookingsService } from '../bookings/bookings.service'

@Controller('shows')
export class ShowsController {
  constructor(
    private showsService: ShowsService,
    private bookingsService: BookingsService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.showsService.findAllShows()
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.showsService.findOneShowById(id)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createShow(@Body() showDto: CreateShowDto) {
    const created = await this.showsService.createShow(showDto)
    return this.showsService.findOneShowById(created.id)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.showsService.removeShow(id)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id/bookings')
  findAllBookings(@Param('id', new ParseIntPipe()) showId: number) {
    return this.bookingsService.findBookingsBy({ showId })
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post(':id/bookings')
  async createBooking(
    @Param('id', new ParseIntPipe()) showId: number,
    @Body() bookingDto: Omit<CreateBookingDto, 'showId'>,
  ) {
    const created = await this.showsService.createBooking(showId, bookingDto)
    return this.bookingsService.findOneBooking(created.id)
  }
}
