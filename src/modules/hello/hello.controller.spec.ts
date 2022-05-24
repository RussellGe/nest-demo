import { Test, TestingModule } from '@nestjs/testing';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';

describe('helloController', () => {
  let helloController: HelloController;

  beforeEach(async () => {
    const hello: TestingModule = await Test.createTestingModule({
      controllers: [HelloController],
      providers: [HelloService],
    }).compile();

    helloController = hello.get<HelloController>(HelloController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(helloController.getHello()).toBe('Hello World!');
    });
  });
});
