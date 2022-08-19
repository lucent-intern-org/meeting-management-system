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
    color = 'black',
    letterSpacing = 'normal',
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
                paddingRight: 0,
                paddingLeft: 0,
                marginTop: marginTop,
            }}
            onClick={onClick}
        >
            {children}
        </button>
    ) : (
        <span
            style={{
                fontSize: `${fontSize}rem`,
                fontWeight: fontWeight,
                letterSpacing: `${letterSpacing}rem`,
                color: color,
                marginTop: marginTop,
                fontFamily: 'inter',
            }}
        >
            {children}
        </span>
    );
};

export default Text;
