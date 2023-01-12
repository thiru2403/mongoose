import { NestMiddleware } from "@nestjs/common";

export class Middleware implements NestMiddleware{
    use(req: Request, res: Response, next: (error?: any) => void) {
      console.log(req , res);
      
      next();
    }
}