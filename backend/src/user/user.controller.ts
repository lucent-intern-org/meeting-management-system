import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('users')
export class UserController {
    constructor(private UserService:UserService){}
    
    @Get()
    getHello(): string {
        return 'hellouser';
    }
    
    @Post()
    PostOne(@Body() moiveDate){
        return moiveDate;
    }

    @Get('/email')
    async getUsers(@Res() res:Response, @Body() body){
        console.log(body.email);
        let user1 = await this.UserService.getUser(body.email);
        console.log(user1);
        res.json(user1);
    }
    @Get('/all')
    async getAll(){
        let user1 = await this.UserService.getUserAll();
        console.log(user1);
        return 'hello All';
    }
}
