import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div<{ justifyContent: string }>`
    display: flex;
    justify-content: ${(props) => props.justifyContent};
    align-items: center;
    flex-direction: column;
    height: 90%;
`;

type FlexColumnProps = {
    children: ReactNode;
    justifyContent?: string;
};

const FlexColumn: React.FC<FlexColumnProps> = ({
    children,
    justifyContent = 'space-between',
}: FlexColumnProps) => {
    return <Container justifyContent={justifyContent}>{children}</Container>;
};

export default FlexColumn;
