import { OnApplicationShutdown } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { ConsumerSubscribeTopics } from "@nestjs/microservices/external/kafka.interface";
import { Kafka, Consumer, ConsumerRunConfig} from 'kafkajs'


@Injectable()
export class ConsumerService implements OnApplicationShutdown {
    consumers(_arg0: { topics: string; }, arg1: { eachMessage: ({ topic, partition, message }: { topic: any; partition: any; message: any; }) => Promise<void>; }) {
        throw new Error("Method not implemented.");
    }
  
    private kafka = new Kafka({
        brokers:['localhost:9092']
    });
    private consumer:Consumer[] = [];

    async consume(topic:ConsumerSubscribeTopics, config:ConsumerRunConfig){
        const consumers = this.kafka.consumer({groupId:'nestjs-kafka'});
        await consumers.connect();
        await consumers.subscribe(topic);
        await consumers.run(config);
        this.consumer.push(consumers) 
    }

    async onApplicationShutdown(){
        for(const consumers of this.consumer)
        await consumers.disconnect()
    }
}