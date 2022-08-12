import React, { ReactNode } from 'react';

type ButtonProps = {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children?: ReactNode;
};

const Button: React.FC<ButtonProps> = ({ onClick, children }: ButtonProps) => {
    return (
        <button type='button' onClick={onClick} style={{ padding: 0 }}>
            {children}
        </button>
    );
};

export default Button;
