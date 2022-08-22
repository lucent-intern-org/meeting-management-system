import { Body, Controller, Get, Post } from '@nestjs/common';
import { GroupService } from './group.service';

@Controller('groups')
export class GroupController {
    constructor(private GroupService:GroupService){}

    @Get('/group')
    async getGroup(@Body() body){
        console.log(body);
        let user = await this.GroupService.getGroup(body.groupId);
        console.log(user);
        return user;
    }
    @Get('/all')
    async getAll(){
        let user = await this.GroupService.getAll();
        console.log(user);
        return user;
    }
    @Post('/create')
    async createUser(@Body() body){
        let user = await this.GroupService.createGroup(body.groupName);
        return user;
    }
    @Post('/update')
    async updateUser(@Body() body){
        let user = await this.GroupService.updateGroup(body);
        return user;
    }
    @Post('/delete')
    async deleteUser(@Body() body){
        let user = await this.GroupService.deleteGroup(body.groupId);
        return user;
    }
}
