import React from 'react';
import { IoClose } from 'react-icons/io5';
import { RecoilState, useResetRecoilState } from 'recoil';
import theme from '../../styles/theme';
import FlexRow from './flex_row';

type modalCloseButtonProps = {
    state: RecoilState<boolean | object>;
};

const ModalCloseButton: React.FC<modalCloseButtonProps> = ({ state }: modalCloseButtonProps) => {
    const resetState = useResetRecoilState(state);

    return (
        <FlexRow>
            <div />
            <IoClose
                onClick={() => resetState()}
                strokeWidth={50}
                size={40}
                color={theme.inputColor}
                cursor='pointer'
            />
        </FlexRow>
    );
};

export default ModalCloseButton;
