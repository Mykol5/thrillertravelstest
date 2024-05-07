
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from './entities/hotel.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service'; // Import RabbitMQService

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
    private readonly rabbitMQService: RabbitMQService, // Inject RabbitMQService
  ) {}

  async reserveHotel(createReservationDto: CreateReservationDto): Promise<Hotel> {
    // Implement hotel reservation logic
    const { hotelId, guestName, checkInDate, checkOutDate } = createReservationDto;
    const reservedHotel = await this.hotelRepository.create({
      hotelId,
      guestName,
      checkInDate,
      checkOutDate,
    });

    // Save the reserved hotel
    const savedHotel = await this.hotelRepository.save(reservedHotel);

    // Send hotel reservation notification to RabbitMQ queue
    const notificationMessage = {
      hotelId: savedHotel.id,
      guestName,
      checkInDate,
      checkOutDate,
    };

    await this.rabbitMQService.sendMessage('hotel-reservation', notificationMessage);
    console.log('Hotel reservation notification sent to RabbitMQ queue');

    return savedHotel;
  }
}
