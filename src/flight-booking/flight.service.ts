// src/flight-booking/flight.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from './entities/flight.entity';
import { CreateFlightDto } from './dto/create-flight.dto';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';

@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,
    private readonly rabbitMQService: RabbitMQService, // Inject RabbitMQService
  ) {}

  async bookFlight(createFlightDto: CreateFlightDto): Promise<Flight> {
    // Implement flight booking logic
    const { flightNumber, passengerName, date } = createFlightDto;
    const bookedFlight = await this.flightRepository.create({
      flightNumber,
      passengerName,
      date,
    });

    // Save the booked flight
    const savedFlight = await this.flightRepository.save(bookedFlight);

    // Send flight booking notification to RabbitMQ queue
    const notificationMessage = {
      userId: bookedFlight.passengerName, // Assuming passengerName is the userId for notification
      flightId: savedFlight.id, // Use the ID of the saved flight as the flightId
    };

    await this.rabbitMQService.sendMessage('flight-booking', notificationMessage);
    console.log('Flight booking notification sent to RabbitMQ queue');

    return savedFlight;
  }
}
