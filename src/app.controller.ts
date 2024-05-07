import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api') // Set the base path for this controller to '/api'
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello') // Handle GET requests to '/api/hello'
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('user') // Handle POST requests to '/api/user'
  createUser(@Body() userData: any): string {
    // Logic to create a new user using userData
    return 'User created successfully!';
  }

  @Get() // Handle GET requests to '/api'
  getDefault(): string {
    return 'Welcome to the API!';
  }
}
