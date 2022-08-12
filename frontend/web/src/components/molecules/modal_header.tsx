import React from 'react';
import { RecoilState } from 'recoil';
import Text from '../atoms/text';
import ModalCloseButton from './modal_close_button';

type modalHeaderProps = {
    children: string;
    setState: RecoilState<boolean>;
};

const ModalHeader: React.FC<modalHeaderProps> = ({ children, setState }: modalHeaderProps) => {
    return (
        <div>
            <ModalCloseButton setState={setState} />
            <div style={{ marginTop: '1vh' }}>
                <Text fontSize={1.7} fontWeight={900} letterSpacing='0.15'>
                    LUCENTBLOCK
                </Text>
                <br />
                <Text fontSize={1.2} fontWeight={900} letterSpacing='0.15' marginTop='1vh'>
                    {children}
                </Text>
            </div>
        </div>
    );
};

export default ModalHeader;
