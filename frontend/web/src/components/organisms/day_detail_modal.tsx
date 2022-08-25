/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { dayDetailModalState } from '../../atom';
import DayDetailModalContents from '../molecules/day_detail_modal_contents';
import DayDetailModalHeader from '../molecules/day_detail_modal_header';

const Container = styled.div`
    background-color: white;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    width: 44%;
    backdrop-filter: blur(8px);
    border-top-left-radius: 2%;
    border-bottom-left-radius: 2%;
    padding: 2rem;
    box-shadow: -0.15rem 0rem 1rem 0rem gray;
    overflow-y: auto;
    height: auto;

    &.modal-enter {
        transform: translateX(150%);
    }
    &.modal-enter-active {
        transition: transform 600ms;
        transform: translateX(0%);
    }
    &.modal-exit {
        transform: translateX(0%);
    }
    &.modal-exit-active {
        transform: translateX(150%);
        transition: transform 600ms;
    }
`;

const DayDetailModal: React.FC = () => {
    const dayDetailModal = useRecoilValue(dayDetailModalState);
    React.useEffect(() => {
        if (dayDetailModal.visible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [dayDetailModal.visible]);
    return ReactDOM.createPortal(
        <CSSTransition in={dayDetailModal.visible} timeout={600} classNames='modal' unmountOnExit>
            <Container>
                <DayDetailModalHeader />
                <DayDetailModalContents />
            </Container>
        </CSSTransition>,
        document.getElementById('modal-root')!,
    );
};

export default DayDetailModal;
