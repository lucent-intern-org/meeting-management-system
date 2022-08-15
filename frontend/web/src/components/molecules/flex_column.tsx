import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div<{ needMargin: boolean }>`
    display: flex;
    justify-content: end;
    align-items: center;
    flex-direction: column;
    margin-top: ${(props) => (props.needMargin ? '4rem' : 0)};
`;

type FlexColumnProps = {
    children: ReactNode;
    needMargin?: boolean;
};

const FlexColumn: React.FC<FlexColumnProps> = ({
    children,
    needMargin = false,
}: FlexColumnProps) => {
    return <Container needMargin={needMargin}>{children}</Container>;
};

export default FlexColumn;
