import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import SERVER from './url';
import { roomType, userType } from './types';

/* 관리자 > 사용자 */
export const getAllUsers = async () => {
    const response = await axios.get(`${SERVER}/users/all`);
    if (response.data.statusCode === 200) {
        return response.data.data;
    }
};

export const useGetAllUsers = useQuery<Array<userType>>(['users'], getAllUsers);

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

/* 관리자 >  회의실 */
export const getAllRooms = async () => {
    const response = await axios.get(`${SERVER}/rooms/all`);
    if (response.data.statusCode === 200) {
        return response.data.data;
    }
};

export const useGetAllRooms = useQuery<Array<roomType>>(['rooms'], getAllRooms);

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
