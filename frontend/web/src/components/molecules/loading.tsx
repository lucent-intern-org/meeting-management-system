import React from 'react';
import Text from '../atoms/text';

const Loading: React.FC = () => {
    return (
        <Text fontSize={2} fontWeight={900}>
            로딩중...
        </Text>
    );
};

export default Loading;
