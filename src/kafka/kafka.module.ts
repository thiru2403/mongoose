import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.servicer';

import { kafkalService } from './kafkal.service';
import { ProducerService } from './producer.service';
//import { TestConsumer } from './test.consumer';

@Module({
  providers: [ProducerService,ConsumerService,kafkalService],
 exports:[ProducerService, ConsumerService]
})
export class KafkaModule {}
