import React from 'react';
import { IoClose } from 'react-icons/io5';
import { RecoilState, useSetRecoilState } from 'recoil';
import theme from '../../theme';
import Button from '../atoms/button';
import FlexRow from './flex_row';

type modalCloseButtonProps = {
    setState: RecoilState<boolean>;
};

const ModalCloseButton: React.FC<modalCloseButtonProps> = ({ setState }: modalCloseButtonProps) => {
    const setModalOpen = useSetRecoilState(setState);

    return (
        <FlexRow>
            <div />
            <Button onClick={() => setModalOpen(false)}>
                <IoClose strokeWidth={50} size={40} color={theme.inputColor} />
            </Button>
        </FlexRow>
    );
};

export default ModalCloseButton;
