/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { useRecoilState } from 'recoil';
import { addRoomModalVisibleState } from '../../atom';
import CustomButton from '../atoms/custom_button';
import Table from '../molecules/table';
import { getUseAllRooms } from '../../api';

const AdminRooms: React.FC = () => {
    const userTableHeader = ['Color', 'Name'];
    const [addRoomModalVisible, setAddRoomModalVisible] = useRecoilState(addRoomModalVisibleState);
    const { data: rooms } = getUseAllRooms;

    return (
        <div>
            <div style={{ marginBottom: '1.5rem' }}>
                <CustomButton
                    onClick={() => {
                        setAddRoomModalVisible(!addRoomModalVisible);
                    }}
                >
                    회의실 추가
                </CustomButton>
            </div>
            <Table header={userTableHeader} body={rooms!} />
        </div>
    );
};

export default AdminRooms;
