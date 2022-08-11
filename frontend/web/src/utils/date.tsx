import { useRecoilValue } from 'recoil';
import dayDetailModalState from '../atom';

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

    const year = dayDetailModal.date.getFullYear();
    const month = dayDetailModal.date.getMonth() + 1;
    const date = dayDetailModal.date.getDate();
    const day = days[dayDetailModal.date.getDay()];

    return `${year}년 ${month}월 ${date}일 ${day}`;
};

type toStringDateByFormattingType = (date: Date) => string;
export const toStringDateByFormatting: toStringDateByFormattingType = (value) => {
    const year = value.getFullYear();
    const month = leftPad(value.getMonth() + 1);
    const date = leftPad(value.getDate());

    return `${year}-${month}-${date}`;
};
