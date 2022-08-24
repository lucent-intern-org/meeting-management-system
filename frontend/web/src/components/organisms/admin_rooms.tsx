/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { addRoomModalVisibleState, roomsState } from '../../atom';
import CustomButton from '../atoms/custom_button';
import Table from '../molecules/table';
import { roomType } from '../../types';
import { getRooms } from '../../api';

const AdminRooms: React.FC = () => {
    const userTableHeader = ['Color', 'Name'];
    const [addRoomModalVisible, setAddRoomModalVisible] = useRecoilState(addRoomModalVisibleState);
    const setRooms = useSetRecoilState(roomsState);
    const { data: rooms } = useQuery<Array<roomType>>(['rooms'], getRooms);
    setRooms(rooms!);

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
