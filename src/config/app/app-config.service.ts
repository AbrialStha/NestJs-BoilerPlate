import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get appEnv(): string {
    return this.configService.get<string>('app.appapp');
  }

  get appName(): string {
    return this.configService.get<string>('app.appName');
  }

  get appPort(): number {
    return this.configService.get<number>('app.appPort');
  }
}
