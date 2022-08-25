import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div<{
    justifyContent: string;
    horizontalPadding: number;
    verticalPadding: number;
}>`
    display: flex;
    justify-content: ${(props) => props.justifyContent};
    align-items: center;
    flex-direction: column;
    height: 90%;
    padding-left: ${(props) => `${props.horizontalPadding}rem`};
    padding-right: ${(props) => `${props.horizontalPadding}rem`};
    padding-top: ${(props) => `${props.verticalPadding}rem`};
    padding-bottom: ${(props) => `${props.verticalPadding}rem`};
`;

type FlexColumnProps = {
    children: ReactNode;
    justifyContent?: string;
    horizontalPadding?: number;
    verticalPadding?: number;
};

const FlexColumn: React.FC<FlexColumnProps> = ({
    children,
    justifyContent = 'space-between',
    horizontalPadding = 0,
    verticalPadding = 0,
}: FlexColumnProps) => {
    return (
        <Container
            justifyContent={justifyContent}
            horizontalPadding={horizontalPadding}
            verticalPadding={verticalPadding}
        >
            {children}
        </Container>
    );
};

export default FlexColumn;
