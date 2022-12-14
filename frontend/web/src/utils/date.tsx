import { useRecoilValue } from 'recoil';
import { dayDetailModalState } from '../atom';

type leftPadType = (monthOrDate: number) => string | number;
const leftPad: leftPadType = (value) => {
    if (value >= 10) {
        return value;
    }

    return `0${value}`;
};

const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
export const getFullDate = (): string => {
    const dayDetailModal = useRecoilValue(dayDetailModalState);
    const fullDate = new Date(dayDetailModal.date);
    const year = fullDate.getFullYear();
    const month = fullDate.getMonth() + 1;
    const date = fullDate.getDate();
    const day = days[fullDate.getDay()];

    return `${year}년 ${month}월 ${date}일 ${day}`;
};

type toStringDateByFormattingType = (date: Date) => string;
export const toStringDateByFormatting: toStringDateByFormattingType = (value) => {
    const year = value.getFullYear();
    const month = leftPad(value.getMonth() + 1);
    const date = leftPad(value.getDate());

    return `${year}-${month}-${date}`;
};

type strToMinsType = (time: string) => number;
export const strToMins: strToMinsType = (value) => {
    const str = value.split(':');
    return Number(str[0]) * 60 + Number(str[1]);
};

type minsToStrType = (str: number) => string;
export const minsToStr: minsToStrType = (value) => {
    const min = Number(`00${Math.abs(value % 60)}`.slice(-2));
    const val = `${leftPad(Math.trunc(value / 60))}:${leftPad(min)}`;
    return value < 0 ? `-${val}` : val;
};
