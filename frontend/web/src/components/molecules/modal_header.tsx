import React from 'react';
import Text from '../atoms/text';
import FlexColumn from './flex_column';

type modalHeaderProps = {
    children: string;
};

const ModalHeader: React.FC<modalHeaderProps> = ({ children }: modalHeaderProps) => {
    return (
        <FlexColumn justifyContent='center'>
            <Text fontSize={1.7} fontWeight={900} letterSpacing='0.15'>
                LUCENTBLOCK
            </Text>
            <Text fontSize={1.2} fontWeight={900} letterSpacing='0.15'>
                {children}
            </Text>
        </FlexColumn>
    );
};
export default ModalHeader;
