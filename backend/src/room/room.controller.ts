import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('rooms')
export class RoomController {
    constructor(private RoomService:RoomService){}

    @Get('/room')
    async getRoom(@Body() body){
        console.log(body);
        let room = await this.RoomService.getRoom(body.roomId);
        console.log(room);
        return room;
    }
    @Get('/all')
    async getAll(){
        let room = await this.RoomService.getAll();
        console.log(room);
        return room;
    }
    @Post('/create')
    async createUser(@Body() body){
        let count = await this.RoomService.getCount();
        let room = await this.RoomService.createRoom(count,body);
        return room;
    }
    @Post('/update')
    async updateUser(@Body() body){
        let room = await this.RoomService.updateRoom(body);
        return room;
    }
    @Post('/delete')
    async deleteUser(@Body() body){
        let count = await this.RoomService.getCount();
        let room = await this.RoomService.deleteRoom(count,body.roomId);
        return room;
    }
}
