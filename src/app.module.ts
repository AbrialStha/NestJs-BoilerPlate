import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { AppConfigModule } from './config/app/app-config.module';

@Module({
  imports: [AppConfigModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useValue: new HttpExceptionFilter(),
    },
    AppService,
  ],
})
export class AppModule {}
