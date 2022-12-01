import React from 'react';
import './button.css';

const Button = ({ text, clickFn }) => {
    return (
        <div className="btn-comp" onClick={() => clickFn()}>
            {text}
        </div>
    );
};

export default Button;
