import React from 'react';
import styled from 'styled-components';
import Text from '../atoms/text';
import FlexRow from './flex_row';

const Li = styled.li`
    margin: 0 0 0 4rem;
`;

const Nav: React.FC = () => {
    return (
        <ul>
            <FlexRow>
                <Li>
                    <Text onClick={() => console.log('login clicked')}>로그인</Text>
                </Li>
                <Li>
                    <Text onClick={() => console.log('signup clicked')}>회원가입</Text>
                </Li>
            </FlexRow>
        </ul>
    );
};

export default Nav;
