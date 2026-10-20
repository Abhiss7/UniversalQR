import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getRoot() should return service info', () => {
    const result = controller.getRoot();
    expect(result.name).toBe('UniversalQR');
    expect(result.docs).toBe('/api/docs');
    expect(result.health).toBe('/health');
  });
});
