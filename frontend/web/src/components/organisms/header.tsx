import React from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../molecules/nav';
import Logo from '../molecules/logo';
import FlexRow from '../molecules/flex_row';

const Header: React.FC = () => {
    const navigate = useNavigate();
    return (
        <FlexRow needMargin>
            <Logo onClick={() => navigate('/')} />
            <Nav />
        </FlexRow>
    );
};

export default Header;
