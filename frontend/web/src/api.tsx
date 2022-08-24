import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import SERVER from './url';

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
};
