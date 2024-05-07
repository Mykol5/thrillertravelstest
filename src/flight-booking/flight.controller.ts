
import { Controller, Post, Body } from '@nestjs/common';
import { FlightService } from './flight.service';
import { CreateFlightDto } from './dto/create-flight.dto';

@Controller('flights')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Post('/book')
  async bookFlight(@Body() createFlightDto: CreateFlightDto) {
    return this.flightService.bookFlight(createFlightDto);
  }
}
