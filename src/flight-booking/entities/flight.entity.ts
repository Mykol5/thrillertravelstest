
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  flightNumber: string;

  @Column()
  passengerName: string;

  @Column()
  date: Date;

  // Add more properties and relationships as needed
}
