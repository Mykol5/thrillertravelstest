
import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  async connect(): Promise<void> {
    try {
      this.connection = await amqp.connect('amqp://localhost'); // Replace with your RabbitMQ server URL
      this.channel = await this.connection.createChannel();
      console.log('Connected to RabbitMQ');
    } catch (error) {
      console.error('Error connecting to RabbitMQ', error);
      throw error; // Propagate error for handling
    }
  }

  async sendMessage(queue: string, message: any): Promise<void> {
    try {
      await this.channel.assertQueue(queue);
      await this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
      console.log(`Message sent to RabbitMQ queue '${queue}':`, message);
    } catch (error) {
      console.error(`Error sending message to RabbitMQ queue '${queue}':`, error);
      throw error; // Propagate error for handling
    }
  }

  async consumeMessages(queue: string, callback: (message: any) => void): Promise<void> {
    try {
      await this.channel.assertQueue(queue);
      console.log(`Waiting for messages in RabbitMQ queue '${queue}'...`);
      this.channel.consume(queue, (message) => {
        if (message !== null) {
          const messageContent = JSON.parse(message.content.toString());
          console.log(`Received message from RabbitMQ queue '${queue}':`, messageContent);
          callback(messageContent); // Process message using callback function
          this.channel.ack(message); // Acknowledge message processing completion
        }
      });
    } catch (error) {
      console.error(`Error consuming messages from RabbitMQ queue '${queue}':`, error);
      throw error; // Propagate error for handling
    }
  }

  async closeConnection(): Promise<void> {
    try {
      await this.channel.close();
      await this.connection.close();
      console.log('Disconnected from RabbitMQ');
    } catch (error) {
      console.error('Error closing RabbitMQ connection', error);
      throw error; // Propagate error for handling
    }
  }
}
