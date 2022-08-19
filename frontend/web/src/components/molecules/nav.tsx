import React from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import {
    signUpModalVisibleState,
    logInModalVisibleState,
    loginState,
    isAdminState,
} from '../../atom';
import Text from '../atoms/text';
import FlexRow from './flex_row';

const Li = styled.li`
    margin: 0 0 0 4rem;
`;

const Nav: React.FC = () => {
    const [signUpModalVisible, setSignUpModalVisible] = useRecoilState(signUpModalVisibleState);
    const [logInModalVisible, setLogInModalVisible] = useRecoilState(logInModalVisibleState);
    const [isLogIn, setIsLogIn] = useRecoilState(loginState);
    const isAdmin = useRecoilValue(isAdminState);
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
            {isLogIn || localStorage.getItem('token') ? (
                <FlexRow>
                    {isAdmin && (
                        <Li>
                            <Text onClick={() => console.log('관리자 페이지')}>관리자</Text>
                        </Li>
                    )}
                    <Li>
                        <Text onClick={logoutEvent}>로그아웃</Text>
                    </Li>
                </FlexRow>
            ) : (
                <FlexRow>
                    <Li>
                        <Text onClick={() => setLogInModalVisible(!logInModalVisible)}>로그인</Text>
                    </Li>
                    <Li>
                        <Text onClick={() => setSignUpModalVisible(!signUpModalVisible)}>
                            회원가입
                        </Text>
                    </Li>
                </FlexRow>
            )}
        </ul>
    );
};

export default Nav;
