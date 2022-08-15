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
    switch (type) {
        case 'text':
            return (
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    style={{
                        fontSize: `${fontSize}rem`,
                        letterSpacing: `${letterSpacing}rem`,
                        width: `${width}rem`,
                        marginTop: marginTop,
                    }}
                />
            );
        case 'checkbox':
            return (
                <input
                    type={type}
                    onChange={onChange}
                    style={{ height: 'auto', marginTop: marginTop, marginRight: '0.5rem' }}
                />
            );
        default:
            return <input type={type} />;
    }
};
export default Input;
