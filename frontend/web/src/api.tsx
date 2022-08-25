import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import SERVER from './url';
import { addMeetingType, modifyMeetingType, roomType, userType } from './types';

export const getAllMeetings = async () => {
    try {
        const { data } = await axios.get(`${SERVER}/meetings/all`, {});
        return data;
    } catch (err) {
        throw new Error('fetch playlist error');
    }
};

export const useGetAllMeetings = () => {
    return useQuery(['meetings'], () => getAllMeetings(), {
        staleTime: 5000,
        cacheTime: Infinity,
    });
};

export const getDayMeetings = async (date: string) => {
    try {
        const { data } = await axios.get(`${SERVER}/meetings/meeting/`, {
            params: { date: date },
        });
        return data;
    } catch (err) {
        throw new Error('fetch meeting error');
    }
};

export const useGetDayMeetings = (date: string) => {
    return useQuery(['meetings', { date }], () => getDayMeetings(date), {
        staleTime: 5000,
        cacheTime: Infinity,
    });
};

export const getDayMeetingParticipants = async (meetingId: number) => {
    try {
        const { data } = await axios.get(`${SERVER}/participant/participant/`, {
            params: { meetingId: meetingId },
        });
        return data;
    } catch (err) {
        throw new Error('fetch meeting error');
    }
};

export const useGetDayMeetingParticipants = (meetingId: number) => {
    return useQuery(['participants', { meetingId }], () => getDayMeetingParticipants(meetingId), {
        staleTime: 5000,
        cacheTime: Infinity,
    });
};

export const getAllRooms = async () => {
    try {
        const { data } = await axios.get(`${SERVER}/rooms/all`, {});
        return data;
    } catch (err) {
        throw new Error('fetch rooms error');
    }
};

export const useGetAllRooms = () => {
    return useQuery(['rooms'], () => getAllRooms(), {
        staleTime: 5000,
        cacheTime: Infinity,
    });
};

export const getAllGroups = async () => {
    try {
        const { data } = await axios.get(`${SERVER}/groups/all`, {});
        return data;
    } catch (err) {
        throw new Error('fetch groups error');
    }
};

export const useGetAllGroups = () => {
    return useQuery(['groups'], () => getAllGroups(), {
        staleTime: 5000,
        cacheTime: Infinity,
    });
};

export const getAllUsers = async () => {
    try {
        const { data } = await axios.get(`${SERVER}/users/all`, {});
        return data;
    } catch (err) {
        throw new Error('fetch users error');
    }
};

export const useGetAllUsers = () => {
    return useQuery(['users'], () => getAllUsers(), {
        staleTime: 5000,
        cacheTime: Infinity,
    });
};

export const addMeeting = async (submitData: addMeetingType) => {
    try {
        const { data } = await axios.post(`${SERVER}/meetings/create`, submitData);
        return data;
    } catch (err) {
        throw new Error('add meeting error');
    }
};

export const modifyMeeting = async (submitData: modifyMeetingType) => {
    try {
        const { data } = await axios.post(`${SERVER}/meetings/update`, submitData);
        return data;
    } catch (err) {
        throw new Error('modify meeting error');
    }
};

export const deleteMeeting = async (meetingId: number) => {
    try {
        const { data } = await axios.post(`${SERVER}/meetings/delete`, { meetingId });
        return data;
    } catch (err) {
        throw new Error('delete meeting error');
    }
};

export const addUser = async (userInfo: userType) => {
    try {
        const response = await axios.post(`${SERVER}/users/create`, userInfo);
        if (response.data.statusCode === 200) {
            console.log('사용자 추가 성공');
        }
    } catch (error) {
        console.log(`사용자 추가 에러: ${error}`);
    }
};

export const modifyUser = async (userInfo: userType) => {
    try {
        const response = await axios.post(`${SERVER}/users/update`, userInfo);
        if (response.data.statusCode === 200) {
            console.log('사용자 수정 성공');
        }
    } catch (error) {
        console.log(`사용자 수정 에러: ${error}`);
    }
};

export const deleteUser = async (userInfo: userType) => {
    try {
        const response = await axios.post(`${SERVER}/users/delete`, userInfo);
        if (response.data.statusCode === 200) {
            console.log('사용자 삭제 성공');
        }
    } catch (error) {
        console.log(`사용자 삭제 에러: ${error}`);
    }
};

export const addRoom = async (roomInfo: roomType) => {
    try {
        const response = await axios.post(`${SERVER}/rooms/create`, roomInfo);
        if (response.data.statusCode === 200) {
            console.log('회의실 추가 성공');
        }
    } catch (error) {
        console.log(`회의실 추가 에러: ${error}`);
    }
};

export const modifyRoom = async (roomInfo: roomType) => {
    try {
        const response = await axios.post(`${SERVER}/rooms/update`, roomInfo);
        if (response.data.statusCode === 200) {
            console.log('회의실 수정 성공');
        }
    } catch (error) {
        console.log(`회의실 수정 에러: ${error}`);
    }
};

export const deleteRoom = async (roomInfo: roomType) => {
    try {
        const response = await axios.post(`${SERVER}/rooms/delete`, roomInfo);
        if (response.data.statusCode === 200) {
            console.log('회의실 삭제 성공');
        }
    } catch (error) {
        console.log(`회의실 삭제 에러: ${error}`);
    }
};
