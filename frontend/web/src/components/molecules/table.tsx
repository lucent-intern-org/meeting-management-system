/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { VscTrash } from 'react-icons/vsc';
import { BiPencil } from 'react-icons/bi';
import theme from '../../styles/theme';
import {
    adminPageState,
    deleteRoomModalVisibleState,
    deleteUserModalVisibleState,
    modifyRoomModalVisibleState,
    modifyUserModalVisibleState,
} from '../../atom';
import RoomColor from '../atoms/room_color';
import { useGetAllGroups } from '../../api';
import { roomType, userType } from '../../types';
import CenteredModal from '../organisms/centered_modal';
import Loading from './loading';

const Container = styled.div`
    max-height: 36rem;
    overflow-y: auto;
    table,
    td,
    tr {
        border: 1.5px solid ${theme.inputColor};
        vertical-align: middle;
        font-family: 'inter';
        font-size: 17px;
    }
    table {
        width: 100%;
        text-align: center;
    }
    thead {
        height: 3rem;
        color: white;
        background-color: ${theme.primaryColor};
        font-weight: 700;
    }
    tbody {
        font-weight: 500;
        max-height: 4rem;
    }
    tbody > tr {
        height: 4rem;
    }
`;

type TablesProps = {
    header: Array<string>;
    body: Array<roomType | userType>;
};

const Table: React.FC<TablesProps> = ({ header, body = [] }: TablesProps) => {
    const adminPage = useRecoilValue(adminPageState);
    const [deleteUserModalVisible, setDeleteUserModalVisible] = useRecoilState(
        deleteUserModalVisibleState,
    );
    const [modifyUserModalVisible, setModifyUserModalVisible] = useRecoilState(
        modifyUserModalVisibleState,
    );
    const [deleteRoomModalVisible, setDeleteRoomModalVisible] = useRecoilState(
        deleteRoomModalVisibleState,
    );
    const [modifyRoomModalVisible, setModifyRoomModalVisible] = useRecoilState(
        modifyRoomModalVisibleState,
    );

    const { data: groups } = useGetAllGroups();

    return groups !== undefined ? (
        <Container>
            <table>
                <thead>
                    <tr>
                        {header.map((value) => {
                            return <td key={value}>{value}</td>;
                        })}
                        <td className='modify'>-</td>
                        <td className='trash'>-</td>
                    </tr>
                </thead>
                <tbody>
                    {body.length <= 0 ? (
                        <tr>
                            <td colSpan={header.length}>?????? ????????????</td>
                        </tr>
                    ) : (
                        body.map((info: userType | roomType, idx) => {
                            return (
                                <tr key={idx}>
                                    {Object.values(info).map((value: string | number) => {
                                        return adminPage === 'users' ? (
                                            <td key={value}>
                                                {typeof value === 'number'
                                                    ? groups.data[value].groupName
                                                    : value}
                                            </td>
                                        ) : (
                                            typeof value === 'string' &&
                                                (value[0] === '#' ? (
                                                    <td key={value} style={{ width: '10%' }}>
                                                        <RoomColor backgroundColor={value} />
                                                    </td>
                                                ) : (
                                                    <td key={value} style={{ fontWeight: '600' }}>
                                                        {value}
                                                    </td>
                                                ))
                                        );
                                    })}
                                    <td className='modify' key='modify' style={{ width: '6%' }}>
                                        <BiPencil
                                            onClick={() => {
                                                if (adminPage === 'users') {
                                                    setModifyUserModalVisible({
                                                        visible: !modifyUserModalVisible.visible,
                                                        modifyUser: info as userType,
                                                    });
                                                } else {
                                                    setModifyRoomModalVisible({
                                                        visible: !modifyRoomModalVisible.visible,
                                                        modifyRoom: info as roomType,
                                                    });
                                                }
                                            }}
                                            size={21}
                                            color={theme.cancelBtnColor}
                                        />
                                    </td>
                                    <td key='trash' className='trash' style={{ width: '6%' }}>
                                        <VscTrash
                                            onClick={() => {
                                                if (adminPage === 'users') {
                                                    setDeleteUserModalVisible({
                                                        visible: !deleteUserModalVisible.visible,
                                                        deleteUser: info as userType,
                                                    });
                                                } else {
                                                    setDeleteRoomModalVisible({
                                                        visible: !deleteRoomModalVisible.visible,
                                                        deleteRoom: info as roomType,
                                                    });
                                                }
                                                console.log(info);
                                            }}
                                            size={21}
                                            color={theme.cancelBtnColor}
                                        />
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </Container>
    ) : (
        <Loading />
    );
};

export default Table;
