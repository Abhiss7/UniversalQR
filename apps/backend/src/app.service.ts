import { Injectable } from '@nestjs/common';
import { APP_NAME, APP_VERSION } from '@universalqr/shared-config';

@Injectable()
export class AppService {
  getRoot() {
    return {
      name: APP_NAME,
      version: APP_VERSION,
      description: 'Free, multi-purpose dynamic QR code platform.',
      docs: '/api/docs',
      health: '/health',
    };
  }
}
