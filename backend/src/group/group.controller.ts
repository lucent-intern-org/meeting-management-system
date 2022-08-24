import { Body, Controller, Get, Post } from '@nestjs/common';
import { GroupService } from './group.service';

@Controller('groups')
export class GroupController {
  constructor(private GroupService: GroupService) {}

  @Get('/group')
  async getGroup(@Body() body) {
    console.log(body);
    const user = await this.GroupService.getGroup(body.groupId);
    console.log(user);
    return Object.assign({
      data: user,
      statusCode: 200,
      success: true,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }
  @Get('/all')
  async getAll() {
    const user = await this.GroupService.getAll();
    console.log(user);
    return Object.assign({
      data: user,
      statusCode: 200,
      success: true,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }
  @Post('/create')
  async createUser(@Body() body) {
    const user = await this.GroupService.createGroup(body.groupName);
    return Object.assign({
      data: user,
      statusCode: 200,
      success: true,
      statusMsg: `데이터 생성이 성공적으로 완료되었습니다.`,
    });
  }
  @Post('/update')
  async updateUser(@Body() body) {
    const user = await this.GroupService.updateGroup(body);
    return Object.assign({
      data: user,
      statusCode: 200,
      success: true,
      statusMsg: `데이터 수정이 성공적으로 완료되었습니다.`,
    });
  }
  @Post('/delete')
  async deleteUser(@Body() body) {
    const user = await this.GroupService.deleteGroup(body.groupId);
    return Object.assign({
      data: user,
      statusCode: 200,
      success: true,
      statusMsg: `데이터 삭제가 성공적으로 완료되었습니다.`,
    });
  }
}
