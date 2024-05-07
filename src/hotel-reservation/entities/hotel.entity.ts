
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hotelId: string;

  @Column()
  guestName: string;

  @Column()
  checkInDate: Date;

  @Column()
  checkOutDate: Date;

  // Add more properties and relationships as needed
}
