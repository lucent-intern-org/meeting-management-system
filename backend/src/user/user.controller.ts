import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private UserService: UserService) {}

  @Get('/email')
  async getEmail(@Body() body) {
    console.log(body);
    const user = await this.UserService.getEmail(body.email);
    console.log(user);
    return Object.assign({
      data: user,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }
  @Get('/slack')
  async getSlack(@Body() body) {
    console.log(body);
    const user = await this.UserService.getSlack(body.slackId);
    console.log(user);
    return Object.assign({
      data: user,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }
  @Get('/group')
  async getGroup(@Body() body) {
    console.log(body);
    const user = await this.UserService.getGroup(body.groupId);
    console.log(user);
    return Object.assign({
      data: user,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }
  @Get('/all')
  async getAll() {
    const user = await this.UserService.getAll();
    console.log(user);
    return Object.assign({
      data: user,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }
  @Post('/create')
  async createUser(@Body() body) {
    const check = await this.UserService.getSlack(body.slackId);
    console.log(check);
    if (check != null) {
      return Object.assign({
        data: body,
        statusCode: 200,
        statusMsg: `중복된 데이터 입니다.`,
      });
    }
    await this.UserService.createUser(body);
    return Object.assign({
      data: body,
      statusCode: 200,
      statusMsg: `데이터 생성이 성공적으로 완료되었습니다.`,
    });
  }
  @Post('/update')
  async updateUser(@Body() body) {
    const user = await this.UserService.updateUser(body.slackId, body);
    return Object.assign({
      data: body,
      statusCode: 200,
      statusMsg: `데이터 수정이 성공적으로 완료되었습니다.`,
    });
  }
  @Post('/delete')
  async deleteUser(@Body() body) {
    const user = await this.UserService.deleteUser(body.slackId);
    return Object.assign({
      data: body,
      statusCode: 200,
      statusMsg: `데이터 삭제가 성공적으로 완료되었습니다.`,
    });
  }
}
