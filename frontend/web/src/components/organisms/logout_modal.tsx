import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { isAdminState, loginState, logoutModalVisibleState } from '../../atom';
import Text from '../atoms/text';

import AlertModal from './alert_modal';

const LogoutModal: React.FC = () => {
    const navigate = useNavigate();
    const setLogIn = useSetRecoilState(loginState);
    const [isAdmin, setIsAdmin] = useRecoilState(isAdminState);

    const removeInfo = () => {
        setLogIn(false);
        setIsAdmin(!isAdmin);
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        navigate('/');
    };

    return (
        <AlertModal
            header='로그아웃'
            setState={logoutModalVisibleState}
            confirmClick={() => {
                removeInfo();
            }}
        >
            <div>
                <Text fontSize={1} fontWeight={700} letterSpacing={0.05}>
                    로그아웃 하시겠습니까?
                </Text>
            </div>
        </AlertModal>
    );
};

export default LogoutModal;
