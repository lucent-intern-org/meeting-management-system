import { Body, Controller, Get, Post } from '@nestjs/common';
import { ParticipantService } from '../participant/participant.service';
import { MeetingService } from './meeting.service';

@Controller('meetings')
export class MeetingController {
    constructor(private MeetingService:MeetingService,private ParticipantService:ParticipantService){}

    @Get('/meeting')
    async getMeeting(@Body() body){
        console.log(body);
        // let meetingList=[];
        let meeting = await this.MeetingService.getDate(body.date);
        // for (const idx in meeting) {
        //     console.log(meeting[idx]);
            
        //     let participant = await this.ParticipantService.getParticipant(meeting[idx].meetingId);
        //     meetingList.push({meeting : meeting[idx], participants: participant})
        //     console.log(participant);
        // }
        return Object.assign({
            data: meeting,
            statusCode: 200,
            success: true,
            statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
          });
    }
    
    @Get('/all')
    async getAll(){
        let meeting = await this.MeetingService.getAll();
        console.log(meeting);
        return Object.assign({
            data: meeting,
            statusCode: 200,
            success: true,
            statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
          });
    }
    @Get('/test')
    async getTest(@Body() body){
        let meeting = await this.MeetingService.getMeeting(body);
        console.log(meeting);
        return Object.assign({
            data: meeting,
            statusCode: 200,
            success: true,
            statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
          });
    }
    @Post('/create')
    async createMeeting(@Body() body){
        let date : String = body.date;
        let year = Number(date.substring(0,4));
        let month = Number(date.substring(5,7));
        let day = Number(date.substring(8,10));
        await this.MeetingService.createMeeting(date,body);
        let meeting = await this.MeetingService.getMeeting(body);
        // if(body.repeat=="반복 없음"){
        //     //참여자 추가
        //     for (const idx in body.slackId) {
        //         await this.ParticipantService.createParticipant(meeting.meetingId,body.slackId[idx]);
        //     }
        //     return Object.assign({
        //         data: body,
        //         statusCode: 200,
        //         success: true,
        //         statusMsg: `데이터 생성이 성공적으로 완료되었습니다.`,
        //       });
        // }
        // else if(body.repeat=="매일 반복"){
        //     for (let index = 0; index < 364; index++) {
        //         let date=new Date(Date.UTC(year,month-1,day+index));
        //         await this.MeetingService.createMeeting(date,body);
        //         let meeting = await this.MeetingService.getMeeting(body);
        //         for (const idx in body.slackId) {
        //             await this.ParticipantService.createParticipant(meeting.meetingId,body.slackId[idx]);
        //         }
        //     }
        // }
        // else if(body.repeat=="매주 반복"){
            
        // }
        // else if(body.repeat=="매월 반복"){
            
        // }

        for (const idx in body.slackId) {
            await this.ParticipantService.createParticipant(meeting.meetingId,body.slackId[idx]);
        }
        return Object.assign({
            data: body,
            statusCode: 200,
            success: true,
            statusMsg: `데이터 생성이 성공적으로 완료되었습니다.`,
          });
    }
    @Post('/update')
    async updateMeeting(@Body() body){
        let meeting = await this.MeetingService.updateMeeting(body);
        let participant = await this.ParticipantService.getParticipant(body.meetingId);
        //삭제 후 
        for (const idx in participant){
            await this.ParticipantService.deleteParticipant(participant[idx]);
        }
        //재 생성으로 참여자 수정
        for (const idx in body.slackId) {
            await this.ParticipantService.createParticipant(body.meetingId,body.slackId[idx]);
        }
        return Object.assign({
            data: meeting,
            statusCode: 200,
            success: true,
            statusMsg: `데이터 수정이 성공적으로 완료되었습니다.`,
          });
    }
    @Post('/delete')
    async deleteMeeting(@Body() body){
        let meeting = await this.MeetingService.deleteMeeting(body);
        return Object.assign({
            data: meeting,
            statusCode: 200,
            success: true,
            statusMsg: `데이터 삭제가 성공적으로 완료되었습니다.`,
          });
    }
}
