import React from 'react';
import { RecoilState } from 'recoil';
import Text from '../atoms/text';
import FlexColumn from './flex_column';
import ModalCloseButton from './modal_close_button';

type modalHeaderProps = {
    children: string;
    setState: RecoilState<boolean>;
};

const ModalHeader: React.FC<modalHeaderProps> = ({ children, setState }: modalHeaderProps) => {
    return (
        <div style={{ width: '100%' }}>
            <ModalCloseButton setState={setState} />
            <FlexColumn>
                <Text fontSize={1.7} fontWeight={900} letterSpacing='0.15'>
                    LUCENTBLOCK
                </Text>

                <Text fontSize={1.2} fontWeight={900} letterSpacing='0.15'>
                    {children}
                </Text>
            </FlexColumn>
        </div>
    );
};

export default ModalHeader;
