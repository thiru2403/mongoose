import { Injectable } from "@nestjs/common";
import { ProducerService } from "./producer.service";

@Injectable()
export class kafkalService{
    constructor(private producerservice:ProducerService){}

    async get(){
        await this.producerservice.produce({
            topic: 'test',
            messages:[
                {
                    value: 'Hi CoolDreamers'
                }
            ]
        })
           return 'Hi CoolDreamers'
    }
}