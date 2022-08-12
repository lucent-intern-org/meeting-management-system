import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { RecoilState, useSetRecoilState } from 'recoil';

import Text from '../atoms/text';
import FlexRow from './flex_row';

type modalHeaderProps = {
    children: string;
    setState: RecoilState<boolean>;
};

const ModalHeader: React.FC<modalHeaderProps> = ({ children, setState }: modalHeaderProps) => {
    const setModalOpen = useSetRecoilState(setState);

    return (
        <div>
            <FlexRow>
                <div />
                <button type='button' onClick={() => setModalOpen(false)} style={{ padding: 0 }}>
                    <IoMdClose size={50} color='#808080' />
                </button>
            </FlexRow>

            <div style={{ marginTop: '1vh' }}>
                <Text fontSize={1.7} fontWeight={900} letterSpacing='0.15'>
                    LUCENTBLOCK
                </Text>
                <br />
                <Text fontSize={1.2} fontWeight={900} letterSpacing='0.15' marginTop='1vh'>
                    {children}
                </Text>
            </div>
        </div>
    );
};

export default ModalHeader;
