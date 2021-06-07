import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/app-config.service';
import * as Sentry from '@sentry/node';
import { SentryInterceptor } from './common/interceptors/sentry.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get app config for cors settings and starting the app.
  const appConfig: AppConfigService = app.get('AppConfigService');

  //Sentry Config
  Sentry.init({
    dsn: appConfig.sentryDsn,
    tracesSampleRate: 1.0,
  });
  app.useGlobalInterceptors(new SentryInterceptor(appConfig.env));

  //HttpException Filter
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(appConfig.port, () => {
    console.log(`
    ======================================================================================================
        Name: [${appConfig.name}] - Port: [${appConfig.port}] - ENV: [${appConfig.env}]
    ======================================================================================================
  `);
  });
}
bootstrap();
