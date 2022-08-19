import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginState, logoutModalVisibleState } from '../../atom';
import Text from '../atoms/text';

import AlertModal from './alert_modal';

const LogoutModal: React.FC = () => {
    const navigate = useNavigate();

    const removeInfo = () => {
        localStorage.removeItem('token');
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
