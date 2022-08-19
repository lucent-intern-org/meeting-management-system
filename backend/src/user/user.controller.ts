import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('users')
export class UserController {
    constructor(private UserService:UserService){}

    @Get('/email')
    async getEmail(@Body() body){
        console.log(body);
        let user = await this.UserService.getEmail(body.email);
        console.log(user);
        // return Object.assign({
        //     data: user,
        //     statusCode: 200,
        //     statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
        //   });
        return user;
    }
    @Get('/slack')
    async getSlack(@Body() body){
        console.log(body);
        let user = await this.UserService.getSlack(body.slackId);
        console.log(user);
        return user;
    }
    @Get('/group')
    async getGroup(@Body() body){
        console.log(body);
        let user = await this.UserService.getGroup(body.groupId);
        console.log(user);
        return user;
    }
    @Get('/all')
    async getAll(){
        let user = await this.UserService.getAll();
        console.log(user);
        return user;
    }
    @Post('/create')
    async createUser(@Body() body){
        let user = await this.UserService.createUser(body);
        return user;
    }
    @Post('/update')
    async updateUser(@Body() body){
        let user = await this.UserService.updateUser(body.slackId,body);
        return user;
    }
    @Post('/delete')
    async deleteUser(@Body() body){
        let user = await this.UserService.deleteUser(body.slackId);
        return user;
    }
    
}
