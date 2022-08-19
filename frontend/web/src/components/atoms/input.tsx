import React from 'react';

type inputProps = {
    type: string;
    value?: string;
    placeholder?: string;
    fontSize?: number;
    width?: string;
    letterSpacing?: string | number;
    marginTop?: string;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const Input: React.FC<inputProps> = ({
    type = 'text',
    value,
    placeholder,
    fontSize = 0.8,
    width = '100%',
    letterSpacing = 'normal',
    marginTop = '0vh',
    disabled = false,
    onChange,
}: inputProps) => {
    switch (type) {
        case 'text':
            return (
                <input
                    disabled={disabled}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    style={{
                        fontSize: `${fontSize}rem`,
                        letterSpacing: `${letterSpacing}rem`,
                        width: width,
                        marginTop: marginTop,
                        backgroundColor: 'white',
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
