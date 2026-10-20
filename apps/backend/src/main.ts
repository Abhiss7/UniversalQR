import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug'],
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('BACKEND_PORT', 3001);
  const corsOrigin = configService.get<string>('CORS_ORIGIN', 'http://localhost:3000');
  const nodeEnv = configService.get<string>('NODE_ENV', 'development');

  // ─── Security ─────────────────────────────────────────────────────────────
  app.use(
    helmet({
      contentSecurityPolicy: nodeEnv === 'production',
    }),
  );
  app.use(compression());

  // ─── CORS ─────────────────────────────────────────────────────────────────
  app.enableCors({
    origin: corsOrigin.split(',').map((o) => o.trim()),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // ─── Global Prefix ────────────────────────────────────────────────────────
  app.setGlobalPrefix('api/v1', {
    exclude: ['/health', '/s/:code'], // health check + QR scan redirect at root
  });

  // ─── Validation ───────────────────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // ─── Swagger / OpenAPI ────────────────────────────────────────────────────
  if (nodeEnv !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('UniversalQR API')
      .setDescription(
        'REST API for UniversalQR — the free, multi-purpose dynamic QR code platform.',
      )
      .setVersion('0.1.0')
      .addBearerAuth()
      .addTag('health', 'Service health and readiness')
      .addTag('auth', 'Authentication and identity')
      .addTag('workspaces', 'Multi-tenant workspace management')
      .addTag('qr-codes', 'QR code generation and management')
      .addTag('campaigns', 'Campaign organization')
      .addTag('analytics', 'Scan analytics and reporting')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: { persistAuthorization: true },
    });

    logger.log(`Swagger docs → http://localhost:${port}/api/docs`);
  }

  await app.listen(port);
  logger.log(`UniversalQR API running on http://localhost:${port}`);
  logger.log(`Environment: ${nodeEnv}`);
}

bootstrap();
