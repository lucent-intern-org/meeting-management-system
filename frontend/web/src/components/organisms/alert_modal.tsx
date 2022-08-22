import React, { ReactNode } from 'react';
import { RecoilState, useResetRecoilState } from 'recoil';
import styled from 'styled-components';
import theme from '../../styles/theme';
import CustomButton from '../atoms/custom_button';
import Text from '../atoms/text';
import FlexColumn from '../molecules/flex_column';
import FlexRow from '../molecules/flex_row';
import ModalCloseButton from '../molecules/modal_close_button';
import CenteredModal from './centered_modal';

const MaxWidth = styled.div`
    width: 100%;
`;

type AlertModalProps = {
    header: string;
    children: ReactNode;
    setState: RecoilState<boolean | object>;
    confirmClick: () => void;
};

const AlertModal: React.FC<AlertModalProps> = ({
    header,
    children,
    setState,
    confirmClick,
}: AlertModalProps) => {
    const resetState = useResetRecoilState(setState);

    return (
        <CenteredModal width={28} height={18} borderRadius={4}>
            <ModalCloseButton state={setState} />

            <FlexColumn horizontalPadding={5} verticalPadding={1}>
                <Text fontSize={1.3} fontWeight={700} letterSpacing={0.05}>
                    {header}
                </Text>
                {children}
                <MaxWidth>
                    <FlexRow>
                        <CustomButton
                            bgColor={theme.submitBtnColor}
                            width={30}
                            marginRight={0}
                            verticalPadding={0.4}
                            onClick={() => {
                                confirmClick();
                                resetState();
                            }}
                        >
                            확인
                        </CustomButton>
                        <CustomButton
                            bgColor={theme.cancelBtnColor}
                            width={30}
                            marginRight={0}
                            verticalPadding={0.4}
                            onClick={() => {
                                resetState();
                            }}
                        >
                            취소
                        </CustomButton>
                    </FlexRow>
                </MaxWidth>
            </FlexColumn>
        </CenteredModal>
    );
};

export default AlertModal;
