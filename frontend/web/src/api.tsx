import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import SERVER from './url';
import { roomType } from './types';

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

export const getAllRooms = async () => {
    try {
        const { data } = await axios.get(`${SERVER}/rooms/all`, {});
        return data;
    } catch (err) {
        throw new Error('fetch playlist error');
    }
};

export const useGetAllRooms = () => {
    return useQuery(['rooms'], () => getAllRooms(), {
        staleTime: 5000,
        cacheTime: Infinity,
    });
}

/* 관리자 >  회의실 */
export const getRooms = async () => {
    const response = await axios.get(`${SERVER}/rooms/all`);
    if (response.data.statusCode === 200) {
        return response.data.data;
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
