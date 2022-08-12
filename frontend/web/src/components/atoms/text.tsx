import React from 'react';

type textProps = {
    children: string;
    fontSize?: number;
    fontWeight?: string | number;
    letterSpacing?: string | number;
    color?: string;
    marginTop?: string;

    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Text: React.FC<textProps> = ({
    children,
    fontSize = 1.2,
    fontWeight = 'normal',
    letterSpacing = 'normal',
    color = 'black',
    marginTop = '0vh',

    onClick,
}: textProps) => {
    return onClick ? (
        <button
            type='button'
            style={{
                fontSize: `${fontSize}rem`,
                fontWeight: fontWeight,
                letterSpacing: `${letterSpacing}rem`,
                fontFamily: 'inter',
                color: color,
                marginTop: marginTop,
            }}
            onClick={onClick}
        >
            {children}
        </button>
    ) : (
        <span
            style={{
                display: 'inline-block',
                fontSize: `${fontSize}rem`,
                fontWeight: fontWeight,
                letterSpacing: `${letterSpacing}rem`,
                marginTop: marginTop,
                fontFamily: 'inter',
            }}
        >
            {children}
        </span>
    );
};

export default Text;
