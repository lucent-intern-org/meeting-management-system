import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { useRecoilState } from 'recoil';
import { dayDetailModalState } from '../../atom';
import { getFullDate } from '../../utils/date';
import Text from '../atoms/text';
import FlexRow from '../molecules/flex_row';

const DayDetailModalHeader: React.FC = () => {
    const [dayDetailModal, setDayDetailModal] = useRecoilState(dayDetailModalState);
    const date = getFullDate();
    return (
        <FlexRow>
            <IoMdClose
                onClick={() => {
                    setDayDetailModal({
                        visible: !dayDetailModal.visible,
                        date: dayDetailModal.date,
                    });
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
