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
        return Object.assign({
            data: room,
            statusCode: 200,
            statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
          });
    }
    @Get('/all')
    async getAll(){
        let room = await this.RoomService.getAll();
        console.log(room);
        return Object.assign({
            data: room,
            statusCode: 200,
            statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
          });
    }
    @Post('/create')
    async createUser(@Body() body){
        let count = await this.RoomService.getCount();
        let room = await this.RoomService.createRoom(count,body);
        return Object.assign({
            data: room,
            statusCode: 200,
            statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
          });
    }
    @Post('/update')
    async updateUser(@Body() body){
        let room = await this.RoomService.updateRoom(body);
        return Object.assign({
            data: room,
            statusCode: 200,
            statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
          });
    }
    @Post('/delete')
    async deleteUser(@Body() body){
        let count = await this.RoomService.getCount();
        let room = await this.RoomService.deleteRoom(count,body.roomId);
        return Object.assign({
            data: room,
            statusCode: 200,
            statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
          });
    }
}
