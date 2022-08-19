/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { VscTrash } from 'react-icons/vsc';
import { BiPencil } from 'react-icons/bi';
import theme from '../../styles/theme';
import { groups } from '../../temp_db';
import {
    adminPageState,
    deleteUserModalVisibleState,
    modifyUserModalVisibleState,
} from '../../atom';

const Container = styled.div`
    max-height: 60vh;
    overflow-y: auto;
    table,
    td,
    tr {
        border: 1.5px solid ${theme.inputColor};
        vertical-align: middle;
        font-family: 'inter';
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
    body?: Array<object>;
};

type userType = {
    slackId: string;
    name: string;
    email: string;
    groupId: number;
    role: string;
};

type roomType = {
    roomId: number;
    roomName: string;
    roomColor: string;
};

const Table: React.FC<TablesProps> = ({ header, body = [] }: TablesProps) => {
    const adminPage = useRecoilValue(adminPageState);
    const [deleteUserModalOpen, setDeleteUserModalOpen] = useRecoilState(
        deleteUserModalVisibleState,
    );
    const [modifyUserModalOpen, setmodifyUserModalOpen] = useRecoilState(
        modifyUserModalVisibleState,
    );

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        {header.map((value) => {
                            return <td key={value}>{value}</td>;
                        })}
                        <td>-</td>
                        <td>-</td>
                    </tr>
                </thead>
                <tbody>
                    {body.length <= 0 ? (
                        <tr>
                            <td colSpan={header.length}>값이 없습니다</td>
                        </tr>
                    ) : (
                        body.map((info: userType | roomType, idx) => {
                            return (
                                <tr key={idx}>
                                    {Object.values(info).map((value: string | number) => {
                                        return (
                                            <td key={value}>
                                                {typeof value === 'number'
                                                    ? groups[value].groupName
                                                    : value}
                                            </td>
                                        );
                                    })}
                                    <td key='modify'>
                                        <BiPencil
                                            onClick={(e) => {
                                                if (adminPage === 'users') {
                                                    setmodifyUserModalOpen((prev) => ({
                                                        ...prev,
                                                        modifyUser: info as userType,
                                                    }));
                                                }
                                                setmodifyUserModalOpen((prev) => ({
                                                    ...prev,
                                                    visible: !modifyUserModalOpen.visible,
                                                }));

                                                console.log(info);
                                            }}
                                            size={20}
                                            color='grey'
                                        />
                                    </td>
                                    <td key='trash'>
                                        <VscTrash
                                            onClick={(e) => {
                                                /* TODO: 백으로 data 넘겨서 삭제 */
                                                // adminPageState로 !!! users일때만 setDeleteUser로하고 table일때는,, 네네
                                                if (adminPage === 'users') {
                                                    setDeleteUserModalOpen((prev) => ({
                                                        ...prev,
                                                        deleteUser: info as userType,
                                                    }));
                                                    console.log(info);
                                                }
                                                setDeleteUserModalOpen((prev) => ({
                                                    ...prev,
                                                    visible: !deleteUserModalOpen.visible,
                                                }));
                                            }}
                                            size={20}
                                            color='grey'
                                        />
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </Container>
    );
};

export default Table;
