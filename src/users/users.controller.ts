import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() userData: User): Promise<User> {
    const { username, password } = userData;
    return await this.usersService.createUser(username, password);
  }

  // To implement more routes (e.g., authentication, profile management) as needed
}
