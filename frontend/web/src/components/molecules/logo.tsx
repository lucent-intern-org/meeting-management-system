import React from 'react';
import Text from '../atoms/text';

type LogoProps = {
    onClick?: (e: any) => void;
};

const Logo: React.FC<LogoProps> = ({ onClick = () => {} }: LogoProps) => {
    return (
        <Text fontSize={2.4} fontWeight={900} letterSpacing='0.4' onClick={onClick}>
            LUCENTBLOCK
        </Text>
    );
};

export default Logo;
