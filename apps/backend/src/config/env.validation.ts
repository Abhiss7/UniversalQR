import { plainToInstance } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  Min,
  Max,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment = Environment.Development;

  @IsNumber()
  @Min(1)
  @Max(65535)
  @IsOptional()
  BACKEND_PORT: number = 3001;

  @IsString()
  DATABASE_URL: string;

  @IsString()
  @IsOptional()
  CORS_ORIGIN: string = 'http://localhost:3000';

  @IsString()
  @IsOptional()
  JWT_SECRET: string = 'change_me_to_a_long_random_secret';

  @IsString()
  @IsOptional()
  JWT_EXPIRES_IN: string = '7d';
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(
      `Environment validation failed:\n${errors.map((e) => Object.values(e.constraints || {}).join(', ')).join('\n')}`,
    );
  }

  return validatedConfig;
}
