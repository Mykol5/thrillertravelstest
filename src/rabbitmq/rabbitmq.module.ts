// src/rabbitmq/rabbitmq.module.ts

import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';

@Module({
  providers: [RabbitMQService],
  exports: [RabbitMQService], // Export RabbitMQService to be used by other modules
})
export class RabbitMQModule {}
