import React from "react";
import classes from "./Input.module.scss";
import {ReactComponent as ArrowIcon} from '../../assets/icons/arrow.svg'
import { ECurrency } from "../../types/common";

interface IProps {
    blockTitle: string
    currencyTitle: ECurrency;
    children: React.ReactNode;
    value: string;
    onInput: (value: string) => void;
}

export const Input: React.FC<IProps> = ({
    blockTitle,
    currencyTitle,
    children,
    value,
    onInput,
}) => {
    return (
        <div className={classes['currency-block']}>
            <h4 className={classes.title}>{blockTitle}</h4>
            <div className={classes['input-wrapper']}>
                <input
                    type="number"
                    className={classes.input}
                    onChange={(e) => onInput(e.target.value)}
                    value={value}
                    placeholder={'0.0'}
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
