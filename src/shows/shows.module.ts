import { forwardRef, Module } from '@nestjs/common'
import { ShowsController } from './shows.controller'
import { ShowsService } from './shows.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Show } from './show.entity'
import { BookingsModule } from '../bookings/bookings.module'

@Module({
  imports: [TypeOrmModule.forFeature([Show]), forwardRef(() => BookingsModule)],
  controllers: [ShowsController],
  providers: [ShowsService],
  exports: [ShowsService],
})
export class ShowsModule {}
