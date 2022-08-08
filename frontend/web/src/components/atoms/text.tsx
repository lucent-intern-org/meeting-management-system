import React from 'react';

type textProps = {
    children: string;
    fontSize?: number;
    fontWeight?: string | number;
    letterSpacing?: string | number;
    onClick?: (e: any) => void;
};

const Text: React.FC<textProps> = ({
    children,
    fontSize = 1.2,
    fontWeight = 'normal',
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
            }}
        >
            {children}
        </span>
    );
};

export default Text;
