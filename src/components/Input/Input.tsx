import React from "react";
import classes from "./Input.module.scss";
import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow.svg'
import { ECurrency } from "../../types/common";

interface IProps {
    blockTitle: string
    currencyTitle: ECurrency;
    children: React.ReactNode;
    value: string;
    onInput: (value: string) => void;
    inputId: string;
}

export const Input: React.FC<IProps> = ({
    blockTitle,
    currencyTitle,
    children,
    value,
    onInput,
    inputId,
}) => {
    const blockInvalidChar = (e: React.KeyboardEvent) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();

    return (
        <div className={classes['currency-block']}>
            <label htmlFor={inputId} className={classes.title}>{blockTitle}</label>
            <div className={classes['input-wrapper']}>
                <input
                    type="number"
                    id={inputId}
                    className={classes.input}
                    onKeyDown={blockInvalidChar}
                    onChange={(e) => onInput(e.target.value)}
                    value={value}
                    placeholder={'0.0'}
                    data-testid={inputId}
                />
                <div className={classes['currency']}>
                    <span className={classes['currency-name']}>{ECurrency[currencyTitle]}</span>
                    {children}
                    <ArrowIcon className={classes.arrow}/>
                </div>
            </div>
        </div>
    );
};
