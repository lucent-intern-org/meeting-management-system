import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ParticipantService } from './participant.service';

@Controller('participant')
export class ParticipantController {
  constructor(private ParticipantService: ParticipantService) {}

  @Get('/participant')
  async getParticipant(@Query('meetingId') meetingId: number) {
    const participant = await this.ParticipantService.getParticipant(meetingId);
    return Object.assign({
      data: participant,
      statusCode: 200,
      success: true,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }
  @Get('/all')
  async getAll() {
    const participant = await this.ParticipantService.getAll();
    console.log(participant);
    return Object.assign({
      data: participant,
      statusCode: 200,
      success: true,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }
  @Post('/create')
  async createParticipant(@Body() body) {
    const participant = await this.ParticipantService.createParticipant(
      body.meetingId,
      body.participantName,
    );
    return Object.assign({
      data: participant,
      statusCode: 200,
      success: true,
      statusMsg: `데이터 생성이 성공적으로 완료되었습니다.`,
    });
  }
  @Post('/delete')
  async deleteParticipant(@Body() body) {
    const participant = await this.ParticipantService.deleteParticipant(body);
    return Object.assign({
      data: participant,
      statusCode: 200,
      success: true,
      statusMsg: `데이터 삭제가 성공적으로 완료되었습니다.`,
    });
  }
}
