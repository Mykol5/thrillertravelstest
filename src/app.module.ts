import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { User } from './users/user.entity';
import { OAuth2Module } from './oauth2/oauth2.module';
import { FlightBookingModule } from './flight-booking/flight-booking.module';
import { HotelReservationModule } from './hotel-reservation/hotel-reservation.module';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        url: 'postgres://pqpafysh:YlJhIjW0cG-ZaqaLOqRo8Xau1WiwUGZp@jelani.db.elephantsql.com/pqpafysh',
        synchronize: true,
        entities: [User],
      }),
    }),
    TypeOrmModule.forFeature([User]),
    OAuth2Module,
    FlightBookingModule,
    HotelReservationModule,
    RabbitMQModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, RabbitMQService],
})
export class AppModule {}








// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}



// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsersController } from './users/users.controller';
// import { UsersService } from './users/users.service';
// import { User } from './users/user.entity';
// import { OAuth2Module } from './oauth2/oauth2.module';
// import { FlightBookingModule } from './flight-booking/flight-booking.module';
// import { HotelReservationModule } from './hotel-reservation/hotel-reservation.module';
// import { RabbitMQModule } from './rabbitmq/rabbitmq.module'; // Import RabbitMQModule
// import { RabbitMQService } from './rabbitmq/rabbitmq.service'; // Import RabbitMQService

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: 'localhost',
//       port: 543*,
//       username: 'postgres',
//       password: 'Myk*******',
//       database: 'user_m*********',
//       entities: [User],
//       synchronize: true,
//     }),
//     TypeOrmModule.forFeature([User]),
//     OAuth2Module,
//     FlightBookingModule,
//     HotelReservationModule,
//     RabbitMQModule, // Include RabbitMQModule in the list of imports
//   ],
//   controllers: [UsersController],
//   providers: [
//     UsersService,
//     RabbitMQService, // Include RabbitMQService as a provider
//   ],
// })
// export class AppModule {}
