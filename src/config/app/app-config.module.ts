import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config';
import { AppConfigService } from './app-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      validationSchema: Joi.object({
        APP_ENV: Joi.string()
          .valid('dev', 'stage', 'test', 'prod')
          .default('dev'),
        APP_NAME: Joi.string().default('MY APP'),
        APP_PORT: Joi.number().default('3000'),
        SENTRY_DSN: Joi.string().uri().default(''),
      }),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
