
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service'; // Import RabbitMQService


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly rabbitMQService: RabbitMQService, // Inject RabbitMQService
  ) {}

  async createUser(username: string, password: string): Promise<User> {
    const user = new User();
    user.username = username;
    user.password = password;
    const createdUser = await this.userRepository.save(user);

    // Send user creation notification to RabbitMQ queue
    const notificationMessage = {
      userId: createdUser.id,
      username: createdUser.username,
      message: 'User created successfully',
    };

    await this.rabbitMQService.sendMessage('user-events', notificationMessage);
    console.log('User creation notification sent to RabbitMQ queue');

    return createdUser;
  }

  async findUserByUsername(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { username } });
  }

  // Implement more CRUD operations and integrate RabbitMQ as needed
}
