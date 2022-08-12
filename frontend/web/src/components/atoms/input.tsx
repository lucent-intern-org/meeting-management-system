import React from 'react';

type inputProps = {
    type: string;
    value?: string;
    placeholder?: string;
    fontSize?: number;
    width?: number;
    letterSpacing?: string | number;

    marginTop?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<inputProps> = ({
    type = 'text',
    value,
    placeholder,
    fontSize = 0.8,
    width,
    letterSpacing = 'normal',

    marginTop = '0vh',
    onChange,
}: inputProps) => {
    let input;
    if (type === 'text') {
        input = (
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                style={{
                    fontSize: `${fontSize}rem`,
                    letterSpacing: `${letterSpacing}rem`,
                    width: `${width}px`,
                    marginTop: marginTop,
                }}
            />
        );
    } else if (type === 'checkbox') {
        input = (
            <input
                type={type}
                onChange={onChange}
                style={{ height: 'auto', marginTop: marginTop, marginRight: '10px' }}
            />
        );
    } else {
        input = (
            <input
                type={type}
                placeholder={placeholder}
                style={{ fontSize: `${fontSize}rem`, marginTop: '3vh' }}
            />
        );
    }
    return input;
};
export default Input;
