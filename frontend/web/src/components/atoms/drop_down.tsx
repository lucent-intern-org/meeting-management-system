import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';

const DropDownBox = styled.select<{ letterSpace?: string | number; width?: number }>`
    border-top: 0;
    border-left: 0;
    border-right: 0;
    margin-top: 3vh;
    letter-spacing: ${(props) => `${props.letterSpace}rem`};
    width: ${(props) => `${props.width}rem`};
`;

type dropDownProps = {
    options: Array<{
        groupName: string;
        groupId: string;
    }>;
    placeholder: string;
    letterSpacing?: string | number;
    width?: number;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const DropDown: React.FC<dropDownProps> = ({
    options,
    placeholder,
    letterSpacing = 'normal',
    width,
    onChange,
}: dropDownProps) => {
    return (
        <DropDownBox
            letterSpace={letterSpacing}
            width={width}
            onChange={onChange}
            defaultValue='default'
        >
            <option
                key='0'
                value='default'
                disabled
                hidden
                style={{ color: `${theme.inputColor}` }}
            >
                {placeholder}
            </option>
            {options.map((option) => (
                <option key={option.groupName} value={option.groupName}>
                    {option.groupName}
                </option>
            ))}
        </DropDownBox>
    );
};
export default DropDown;
