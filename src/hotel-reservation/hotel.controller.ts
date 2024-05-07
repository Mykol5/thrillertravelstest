

import { Controller, Post, Body } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('hotels')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post('/reserve')
  async reserveHotel(@Body() createReservationDto: CreateReservationDto) {
    return this.hotelService.reserveHotel(createReservationDto);
  }
}
