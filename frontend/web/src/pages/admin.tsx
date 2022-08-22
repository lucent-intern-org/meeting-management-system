/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { FcCancel } from 'react-icons/fc';
import AdminHeader from '../components/molecules/admin_header';
import { adminPageState, isAdminState, loginState } from '../atom';
import AdminUsers from '../components/organisms/admin_users';
import AdminRooms from '../components/organisms/admin_rooms';
import Text from '../components/atoms/text';
import FlexRow from '../components/molecules/flex_row';

const Container = styled.div`
    padding: 3rem 5% 3rem 5%;
`;

const Header = styled.div`
    margin-bottom: 3rem;
    width: 20%;
    margin-left: auto;
    margin-right: auto;
`;

const Admin: React.FC = () => {
    const adminPage = useRecoilValue(adminPageState);
    const [login, setLogin] = useRecoilState(loginState);
    const [isAdmin, setIsAdmin] = useRecoilState(isAdminState);

    React.useEffect(() => {
        if (localStorage.getItem('token')) {
            setLogin(!login);
            if (localStorage.getItem('admin')) {
                setIsAdmin(true);
            }
        }
    }, []);

    /* TODO: 로그인되어있고 & 관리자인 경우에만 접근 가능하게 */
    return isAdmin && (login || localStorage.getItem('token')) ? (
        <Container>
            <Header>
                <AdminHeader />
            </Header>
            {adminPage === 'users' ? <AdminUsers /> : <AdminRooms />}
        </Container>
    ) : (
        <div style={{ marginTop: '40vh' }}>
            <FlexRow justifyContent='center'>
                <FcCancel size={100} />
                <Text fontWeight={700} fontSize={3}>
                    관리자 페이지에 접근할 수 없습니다.
                </Text>
            </FlexRow>
        </div>
    );
};

export default Admin;
