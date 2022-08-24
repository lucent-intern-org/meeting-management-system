import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { useResetRecoilState } from 'recoil';
import { dayDetailModalState } from '../../atom';
import { getFullDate } from '../../utils/date';
import Text from '../atoms/text';
import FlexRow from '../molecules/flex_row';

const DayDetailModalHeader: React.FC = () => {
    const resetState = useResetRecoilState(dayDetailModalState);
    const date = getFullDate();
    return (
        <FlexRow>
            <IoMdClose
                onClick={() => {
                    resetState();
                }}
                size={50}
                style={{ cursor: 'pointer' }}
            />
            <Text fontSize={2} fontWeight={700}>
                {date}
            </Text>
        </FlexRow>
    );
};

export default DayDetailModalHeader;
