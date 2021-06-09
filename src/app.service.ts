import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private log = new Logger(AppService.name);
  getHello(): string {
    this.log.log('Example of Normal Log');
    this.log.error('Example of Error Log');
    this.log.warn('Example of Warn Log');
    this.log.debug('Example of Debug Log');
    this.log.verbose('Example of Verbose Log');
    return 'Hello World!';
  }
}
