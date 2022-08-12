import React from 'react';

import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import signUpModalVisibleState, { logInModalVisibleState, LogInState } from '../../atom';
import Text from '../atoms/text';
import FlexRow from './flex_row';

const Li = styled.li`
    margin: 0 0 0 4rem;
`;

const Nav: React.FC = () => {
    const [signUpModalOpen, setSignUpModalOpen] = useRecoilState(signUpModalVisibleState);
    const [loginModalOpen, setLoginModalOpen] = useRecoilState(logInModalVisibleState);
    const [isLogIn, setIsLogIn] = useRecoilState(LogInState);

    const removeInfo = () => {
        localStorage.removeItem('token');
        setIsLogIn(false);
    };

    const logoutEvent = () => {
        if (window.confirm('로그아웃 하시겠습니까?')) {
            removeInfo();
        }
    };

    return (
        <ul>
            {isLogIn === true || localStorage.getItem('token') ? (
                <FlexRow>
                    <Li>
                        <Text onClick={() => console.log('관리자 페이지')}>관리자</Text>
                    </Li>
                    <Li>
                        <Text onClick={logoutEvent}>로그아웃</Text>
                    </Li>
                </FlexRow>
            ) : (
                <FlexRow>
                    <Li>
                        <Text onClick={() => setLoginModalOpen(true)}>로그인</Text>
                    </Li>
                    <Li>
                        <Text onClick={() => setSignUpModalOpen(true)}>회원가입</Text>
                    </Li>
                </FlexRow>
            )}
        </ul>
    );
};

export default Nav;
