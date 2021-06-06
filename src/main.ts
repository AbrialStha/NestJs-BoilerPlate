import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Get app config
  const appConfig: AppConfigService = app.get('AppConfigService');

  await app.listen(appConfig.appPort, () => {
    console.log(`
    ======================================================================================================
        ${appConfig.appName} started at Port:${appConfig.appPort} in ENV:${appConfig.appEnv}
    ======================================================================================================
  `);
  }); // <------- From AppConfig
}
bootstrap();
