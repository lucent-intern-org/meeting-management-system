import React from 'react';
import { IoClose } from 'react-icons/io5';
import { RecoilState, useSetRecoilState } from 'recoil';
import theme from '../../styles/theme';
import FlexRow from './flex_row';

type modalCloseButtonProps = {
    setState: RecoilState<boolean>;
};

const ModalCloseButton: React.FC<modalCloseButtonProps> = ({ setState }: modalCloseButtonProps) => {
    const setModalOpen = useSetRecoilState(setState);

    return (
        <FlexRow>
            <div />
            <IoClose
                onClick={() => setModalOpen(false)}
                strokeWidth={50}
                size={40}
                color={theme.inputColor}
                cursor='pointer'
            />
        </FlexRow>
    );
};

export default ModalCloseButton;
