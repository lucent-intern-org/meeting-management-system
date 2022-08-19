import React, { ReactNode } from 'react';
import theme from '../../styles/theme';

type CustomButtonProps = {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
    width?: number;
    horizontalPadding?: number;
    verticalPadding?: number;
    color?: string;
    bgColor?: string;
    borderRadius?: number;
    fontWeight?: number | string;
    lineHeight?: number;
    fontSize?: number;
    marginRight?: number;
    marginLeft?: number;
    border?: string;
    disabled?: boolean;
};

const CustomButton: React.FC<CustomButtonProps> = ({
    onClick,
    children,
    width = 12,
    horizontalPadding = 0.4,
    verticalPadding = 0.65,
    color = 'white',
    bgColor = `${theme.primaryColor}`,
    borderRadius = 0.25,
    fontSize = 1,
    lineHeight = 1.5,
    fontWeight = 700,
    marginRight = 2,
    marginLeft,
    border = 'none',
    disabled = false,
}: CustomButtonProps) => {
    return (
        <button
            style={{
                fontFamily: 'inter',
                textAlign: 'center',
                verticalAlign: 'middle',
                width: `${width}%`,
                padding: `${verticalPadding}rem ${horizontalPadding}rem`,
                color: color,
                backgroundColor: bgColor,
                borderRadius: `${borderRadius}rem`,
                fontSize: `${fontSize}rem`,
                lineHeight: lineHeight,
                fontWeight: fontWeight,
                marginRight: `${marginRight}%`,
                marginLeft: `${marginLeft}%`,
                border: border,
            }}
            type='button'
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
export default CustomButton;
