/* eslint-disable react/react-in-jsx-scope */
type inputProps = {
    type: string;
    value?: string;
    placeholder?: string;
    fontSize?: number;
    width?: string;
    letterSpacing?: string | number;
    marginTop?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    min?: string;
    disabled?: boolean;
};

const Input: React.FC<inputProps> = ({
    type = 'text',
    value,
    placeholder,
    fontSize = 0.8,
    width = '100%',
    letterSpacing = 'normal',
    marginTop = '0vh',
    onChange,
    min,
    disabled = false,
}: inputProps) => {
    switch (type) {
        case 'text':
            return (
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    disabled={disabled}
                    onChange={onChange}
                    style={{
                        fontSize: `${fontSize}rem`,
                        letterSpacing: `${letterSpacing}rem`,
                        width: width,
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
        case 'date':
            return (
                <input
                    type={type}
                    onChange={onChange}
                    value={value}
                    style={{
                        fontSize: `${fontSize}rem`,
                        letterSpacing: `${letterSpacing}rem`,
                        width: width,
                        marginTop: marginTop,
                    }}
                    min={min}
                    max='9999-12-31'
                />
            );
        case 'time':
            return (
                <input
                    type={type}
                    onChange={onChange}
                    value={value}
                    style={{
                        fontSize: `${fontSize}rem`,
                        letterSpacing: `${letterSpacing}rem`,
                        width: width,
                        marginTop: marginTop,
                    }}
                    min={min}
                />
            );
        default:
            return <input type={type} />;
    }
};
export default Input;
