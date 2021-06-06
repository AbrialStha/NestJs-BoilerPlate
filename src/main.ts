import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get app config for cors settings and starting the app.
  const appConfig: AppConfigService = app.get('AppConfigService');

  await app.listen(appConfig.port, () => {
    console.log(`
    ======================================================================================================
        Name: [${appConfig.name}] - Port: [${appConfig.port}] - ENV: [${appConfig.env}]
    ======================================================================================================
  `);
  }); // <------- From AppConfig
}
bootstrap();
