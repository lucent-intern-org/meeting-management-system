import React from 'react';
import { useRecoilState } from 'recoil';
import { addRoomModalVisibleState } from '../../atom';
import { rooms } from '../../temp_db';
import CustomButton from '../atoms/custom_button';
import Table from '../molecules/table';

const AdminRooms: React.FC = () => {
    const userTableHeader = ['Color', 'Name'];
    const [addRoomModalVisible, setAddRoomModalVisible] = useRecoilState(addRoomModalVisibleState);

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
            <Table header={userTableHeader} body={rooms} />
        </div>
    );
};

export default AdminRooms;
