import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LoggerMiddleware } from './middleware/logger.middleware'
import { HealthModule } from './health/health.module'
import { ShowsModule } from './shows/shows.module'
import { BookingsModule } from './bookings/bookings.module'
import { SeedService } from './seed/seed.service'

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'debug',
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    TypeOrmCoreModule.forRoot({
      type: 'better-sqlite3',
      database: 'dev.db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    HealthModule,
    ShowsModule,
    BookingsModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
