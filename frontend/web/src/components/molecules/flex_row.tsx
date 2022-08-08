import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div<{ needMargin: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin-top: ${(props) => (props.needMargin ? '2rem' : 0)};
    margin-left: ${(props) => (props.needMargin ? '5%' : 0)};
    margin-right: ${(props) => (props.needMargin ? '5%' : 0)};
`;

type FlexRowProps = {
    children: ReactNode;
    needMargin?: boolean;
};

const FlexRow: React.FC<FlexRowProps> = ({ children, needMargin = false }: FlexRowProps) => {
    return <Container needMargin={needMargin}>{children}</Container>;
};

export default FlexRow;
