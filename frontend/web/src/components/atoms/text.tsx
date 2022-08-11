import React from 'react';

type textProps = {
    children: string;
    fontSize?: number;
    fontWeight?: string | number;
    letterSpacing?: string | number;
    color?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Text: React.FC<textProps> = ({
    children,
    fontSize = 1.2,
    fontWeight = 'normal',
    color = 'black',
    letterSpacing = 'normal',
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
            }}
        >
            {children}
        </span>
    );
};

export default Text;
