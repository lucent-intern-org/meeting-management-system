import React from 'react';
import styled from 'styled-components';

const Container = styled.div<{ backgroundColor: string }>`
    background-color: ${(props) => props.backgroundColor};
    width: 1.3rem;
    height: 1.3rem;
    margin-left: auto;
    margin-right: auto;
    border-radius: 50%;
`;

type roomColorProps = {
    backgroundColor: string;
};

const RoomColor: React.FC<roomColorProps> = ({ backgroundColor }: roomColorProps) => {
    return <Container backgroundColor={backgroundColor} />;
};

export default RoomColor;
