import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import {
    signUpModalVisibleState,
    logInModalVisibleState,
    loginState,
    isAdminState,
    logoutModalVisibleState,
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
    const [logoutModalVisible, setLogoutModalVisible] = useRecoilState(logoutModalVisibleState);
    const navigate = useNavigate();

    const showLogoutModal = () => {
        setLogoutModalVisible(!logoutModalVisible);
    };

    return (
        <ul>
            {isLogIn || localStorage.getItem('token') ? (
                <FlexRow>
                    {isAdmin && (
                        <Li>
                            <Text onClick={() => navigate('/admin')}>관리자</Text>
                        </Li>
                    )}
                    <Li>
                        <Text onClick={showLogoutModal}>로그아웃</Text>
                    </Li>
                </FlexRow>
            ) : (
                <FlexRow>
                    <Li>
                        <Text onClick={() => setLogInModalVisible(!logInModalVisible)}>로그인</Text>
                    </Li>
                    <Li>
                        <Text
                            onClick={() =>
                                setSignUpModalVisible((prev) => ({
                                    ...prev,
                                    visible: !signUpModalVisible.visible,
                                }))
                            }
                        >
                            회원가입
                        </Text>
                    </Li>
                </FlexRow>
            )}
        </ul>
    );
};

export default Nav;
