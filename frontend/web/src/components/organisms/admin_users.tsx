/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { useRecoilState } from 'recoil';
import CustomButton from '../atoms/custom_button';
import Table from '../molecules/table';
import { addUserModalVisibleState } from '../../atom';
import { useGetAllUsers } from '../../api';
import Loading from '../molecules/loading';

const AdminUsers: React.FC = () => {
    const userTableHeader = ['Slack Id', 'Name', 'Email', 'Position', 'Role'];
    const [addUserModalVisible, setAddUserModalVisible] = useRecoilState(addUserModalVisibleState);
    const { data: users } = useGetAllUsers();

    return users !== undefined ? (
        <div>
            <div style={{ marginBottom: '1.5rem' }}>
                <CustomButton onClick={() => setAddUserModalVisible(!addUserModalVisible)}>
                    사용자 추가
                </CustomButton>
            </div>

            <Table header={userTableHeader} body={users.data!} />
        </div>
    ) : (
        <Loading />
    );
};

export default AdminUsers;
