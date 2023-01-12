import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "./consumer.servicer";


@Injectable()
export class TestConsumer implements OnModuleInit {
    constructor(private consumerService: ConsumerService){}

    async onModuleInit() {
        await this.consumerService.consumers(
            {topics: "test"},
             {
            eachMessage: async ({ topic, partition, message}) =>{
                console.log({
                    value: message.value.toString(),
                    topic: topic.toString(),
                    partition: partition.toString()
                });
                
            }
        }
        )
    }
}