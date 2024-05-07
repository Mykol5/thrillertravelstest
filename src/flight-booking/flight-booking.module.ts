
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { Flight } from './entities/flight.entity'; // Import Flight entity
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module'; // Import RabbitMQModule
import { RabbitMQService } from '../rabbitmq/rabbitmq.service'; // Import RabbitMQService

@Module({
  imports: [
    TypeOrmModule.forFeature([Flight]), // Register Flight entity with TypeORM
    RabbitMQModule, // Import RabbitMQModule to provide RabbitMQService
  ],
  controllers: [FlightController],
  providers: [
    FlightService,
    RabbitMQService, // Add RabbitMQService to the providers of FlightBookingModule
  ],
})
export class FlightBookingModule {}
