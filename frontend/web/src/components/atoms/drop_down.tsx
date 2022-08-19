import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';

const DropDownBox = styled.select<{
    letterSpace?: string | number;
    fontSize?: number;
    margin: number;
    width?: number;
}>`
    border-top: 0;
    border-left: 0;
    border-right: 0;
    margin-top: ${(props) => `${props.margin}vh`};
    font-size: ${(props) => `${props.fontSize}rem`};
    letter-spacing: ${(props) => `${props.letterSpace}rem`};
    width: ${(props) => `${props.width}%`};
`;

type dropDownProps = {
    options: Array<object>;
    placeholder: string;
    letterSpacing?: string | number;
    fontSize?: number;
    margin?: number;
    width?: number;
    id?: string;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const DropDown: React.FC<dropDownProps> = ({
    options,
    placeholder,
    letterSpacing = 'normal',
    fontSize,
    margin = 3,
    width,
    id,
    disabled = false,
    onChange,
}: dropDownProps) => {
    return (
        <DropDownBox
            letterSpace={letterSpacing}
            fontSize={fontSize}
            margin={margin}
            width={width}
            onChange={onChange}
            id={id}
            defaultValue='default'
            disabled={disabled}
        >
            <option value='default' hidden style={{ color: `${theme.inputColor}` }}>
                {placeholder}
            </option>
            {options.map((object: object) => {
                return Object.entries(object).map((val) => {
                    return (
                        val[0].toLowerCase().includes('name') && (
                            <option key={val[1]} value={val[1]}>
                                {val[1]}
                            </option>
                        )
                    );
                });
            })}
        </DropDownBox>
    );
};

export default DropDown;
