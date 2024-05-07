
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';
import { Hotel } from './entities/hotel.entity'; // Import Hotel entity
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module'; // Import RabbitMQModule
import { RabbitMQService } from '../rabbitmq/rabbitmq.service'; // Import RabbitMQService

@Module({
  imports: [
    TypeOrmModule.forFeature([Hotel]), // Register Hotel entity with TypeORM
    RabbitMQModule, // Import RabbitMQModule to provide RabbitMQService
  ],
  controllers: [HotelController],
  providers: [HotelService, 
    RabbitMQService, // Add RabbitMQService to the providers of FlightBookingModule],
  ]
})
export class HotelReservationModule {}

