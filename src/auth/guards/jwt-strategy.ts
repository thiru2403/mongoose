import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy,  ExtractJwt} from "passport-jwt"
import { ignoreElements } from "rxjs";

@Injectable()
export class Jwtstrategy extends PassportStrategy(Strategy){

    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secret'
        })
    }

        async validate(payload:any){
            return{ ...payload.user}
        }
}