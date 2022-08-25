/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';

const Background = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    top: 0;
    background: rgb(0, 0, 0, 0.5);
    z-index: 10000;
`;

const Container = styled.div<{ width: number; height: number; borderRadius: number }>`
    width: ${(props) => `${props.width}rem`};
    height: ${(props) => `${props.height}rem`};
    position: relative;
    border-radius: ${(props) => `${props.borderRadius}%`};
    text-align: center;
    padding: 2vh;
    background-color: white;
    box-shadow: 1px 1px 13px #4a4848;
`;

type centeredModalProps = {
    children: ReactNode;
    width: number;
    height: number;
    borderRadius?: number;
};

const CenteredModal: React.FC<centeredModalProps> = ({
    children,
    width,
    height,
    borderRadius = 2,
}: centeredModalProps) => {
    return ReactDOM.createPortal(
        <Background>
            <Container width={width} height={height} borderRadius={borderRadius}>
                {children}
            </Container>
        </Background>,
        document.getElementById('modal-root')!,
    );
};

export default CenteredModal;
