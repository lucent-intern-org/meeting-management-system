import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div<{ needMargin: boolean }>`
    display: flex;
    justify-content: end;
    align-items: center;
    flex-direction: column;
    margin-top: ${(props) => (props.needMargin ? '4rem' : 0)};
    /* margin-top: ${(props) => (props.needMargin ? '2rem' : 0)};
    margin-left: ${(props) => (props.needMargin ? '5%' : 0)};
    margin-right: ${(props) => (props.needMargin ? '5%' : 0)}; */
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
