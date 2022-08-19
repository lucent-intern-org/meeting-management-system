import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { adminPageState } from '../../atom';
import theme from '../../styles/theme';
import Text from '../atoms/text';

const ButtonStyle = styled.div`
    padding: 0 0.5rem 0.5rem 0.5rem;
`;

const Container = styled.div<{ page: string }>`
    font-family: 'inter';
    display: flex;
    justify-content: space-around;
    padding-top: 0.5rem;
    .users {
        border-bottom: ${(props) =>
            props.page === 'users' ? `4px solid ${theme.primaryColor}` : 0};
    }
    .rooms {
        border-bottom: ${(props) =>
            props.page === 'rooms' ? `4px solid ${theme.primaryColor}` : 0};
    }
`;

const AdminHeader: React.FC = () => {
    const [adminPage, setAdminPage] = useRecoilState(adminPageState);

    return (
        <Container page={adminPage}>
            <ButtonStyle className='users'>
                <Text
                    fontSize={1.1}
                    fontWeight={900}
                    onClick={() => {
                        setAdminPage('users');
                    }}
                >
                    사용자
                </Text>
            </ButtonStyle>
            <ButtonStyle className='rooms'>
                <Text
                    fontSize={1.1}
                    fontWeight={900}
                    onClick={() => {
                        setAdminPage('rooms');
                    }}
                >
                    회의실
                </Text>
            </ButtonStyle>
        </Container>
    );
};

export default AdminHeader;
