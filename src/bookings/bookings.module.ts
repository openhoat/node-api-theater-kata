import { forwardRef, Module } from '@nestjs/common'
import { BookingsController } from './bookings.controller'
import { BookingsService } from './bookings.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Booking } from './booking.entity'
import { ShowsModule } from '../shows/shows.module'

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), forwardRef(() => ShowsModule)],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsModule {}
