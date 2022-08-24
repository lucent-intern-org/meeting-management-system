import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('rooms')
export class RoomController {
  constructor(private RoomService: RoomService) {}

  @Get('/room')
  async getRoom(@Query('roomId') roomId) {
    console.log(roomId);
    const room = await this.RoomService.getRoom(roomId);
    console.log(room);
    return Object.assign({
      data: room,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }
  @Get('/all')
  async getAll() {
    const room = await this.RoomService.getAll();
    console.log(room);
    return Object.assign({
      data: room,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }
  @Post('/create')
  async createUser(@Body() body) {
    const count = await this.RoomService.getCount();
    const room = await this.RoomService.createRoom(count, body);
    return Object.assign({
      data: room,
      statusCode: 200,
      statusMsg: `데이터 생성이 성공적으로 완료되었습니다.`,
    });
  }
  @Post('/update')
  async updateUser(@Body() body) {
    const room = await this.RoomService.updateRoom(body);
    return Object.assign({
      data: room,
      statusCode: 200,
      statusMsg: `데이터 수정이 성공적으로 완료되었습니다.`,
    });
  }
  @Post('/delete')
  async deleteUser(@Body() body) {
    const count = await this.RoomService.getCount();
    const room = await this.RoomService.deleteRoom(count, body.roomId);
    return Object.assign({
      data: room,
      statusCode: 200,
      statusMsg: `데이터 삭제가 성공적으로 완료되었습니다.`,
    });
  }
}
