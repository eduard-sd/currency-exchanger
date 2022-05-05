import React, { useEffect, useState } from "react";
import { ECurrency, EInput } from "../../types/common";
import { cleanKeys } from "../../utils/common";
import { getCurrencyData } from "../../api";
import classes from "./Form.module.scss";

import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { ReactComponent as EtherIcon } from '../../assets/icons/ether.svg'
import { ReactComponent as ClockIcon } from '../../assets/icons/clock.svg'
import { ReactComponent as QRCodeIcon } from '../../assets/icons/clarity-qr-code-line.svg'


interface IFeesInfo {
    network: number,
    c14: number,
    total: number,
}

export const Form = () => {
    const [inputCurrency, setInputCurrency] = useState(ECurrency.USD);
    const [outputCurrency, setOutputCurrency] = useState(ECurrency.USDC_EVMOS);
    const [payValue, setPayValue] = useState("100");
    const [receiveValue, setReceiveValue] = useState("");
    const [feesInfo, setFeesInfo] = useState<IFeesInfo>({
        network: 0,
        c14: 0,
        total: 0,
    });
    const [inputTimeout, saveTimeout] = useState(() => setTimeout(() => null));

    const handleChange = (value: string, input: EInput,) => {
        const inputValue = {
            [EInput.FIAT_INPUT]: '',
            [EInput.CRYPTO_INPUT]: '',
        }

        inputValue[input] = !isNaN(Number(value)) || !value ? value : '0'
        setPayValue(inputValue[EInput.FIAT_INPUT])
        setReceiveValue(inputValue[EInput.CRYPTO_INPUT])

        if (+value <= 0) return;
        if (inputTimeout) clearTimeout(inputTimeout)

        saveTimeout(() => {
            return setTimeout(() => {
                updateData(inputValue[EInput.FIAT_INPUT], inputValue[EInput.CRYPTO_INPUT])
            }, 500)
        })
    }

    const updateData = async (payValue: string, receiveValue: string) => {
        const response = await getCurrencyData(cleanKeys({
            source_currency: "USD",
            target_currency: "USDC_EVMOS",
            source_amount: payValue,
            target_amount: receiveValue,
        }))

        if (!response) return;

        const {
            fiat_blockchain_fee,
            absolute_internal_fee,
            source_amount,
            target_amount
        } = response;

        const network = Number(fiat_blockchain_fee);
        const c14 = Number(absolute_internal_fee);
        const total = Number((network + c14).toFixed(2));
        setFeesInfo({ network, c14, total });
        setPayValue(source_amount);
        setReceiveValue(target_amount);
    }


    useEffect(() => {
        updateData(payValue, receiveValue)
    },[])

    return (
        <div className={classes.convector}>
            <h2 className={classes.title}>Select Your Amount</h2>
            <Input
                blockTitle={"You pay"}
                currencyTitle={inputCurrency}
                value={payValue}
                onInput={(event) => handleChange(event, EInput.FIAT_INPUT)}
                inputId={'fiat'}
            >
                <img
                    src={require('../../assets/images/usa-flag.png')}
                    alt="flag"
                />
            </Input>
            <div className={classes['fees-container']}>
                <div className={classes.line}/>
                <FeesInfo feesInfo={feesInfo}/>
            </div>
            <Input
                blockTitle={"You Receive"}
                currencyTitle={outputCurrency}
                value={receiveValue}
                onInput={(event) => handleChange(event, EInput.CRYPTO_INPUT)}
                inputId={'crypto'}
            >
                <EtherIcon />
            </Input>
            <div className={classes['transaction-info']}>
                <div className={classes['info-block']}>
                    <QRCodeIcon />
                    <div className={classes['block-content']}>
                        <h4 className={classes['content-title']}>Destination Address</h4>
                        <p className={classes['content-row']}>msWZQGyzYiCL3VPw1ajHkXcF9nRo9V2vsc</p>
                    </div>
                </div>
                <div className={classes['info-block']}>
                    <ClockIcon />
                    <div className={classes['block-content']}>
                        <h4 className={classes['content-title']}>Average Processing Time</h4>
                        <p className={classes['content-row']}>4 Minutes</p>
                    </div>
                </div>
            </div>
            <Button />
        </div>
    );
};



const FeesInfo: React.FC<{ feesInfo: IFeesInfo }> = ({ feesInfo }) => {
    if (feesInfo.total <= 0) return null

    return (
        <div className={classes['fees-info']}>
            <h3 className={classes.title}>Fees</h3>
            <div className={classes.calculations}>
                <div className={classes['fee-box']}>
                    <p className={classes['fee-title']}>Network Fee</p>
                    <p className={classes['fee-numbers']}>{feesInfo.network}$</p>
                </div>
                <span className={classes['math-symbols']}>+</span>
                <div className={classes['fee-box']}>
                    <p className={classes['fee-title']}>C14 Fee</p>
                    <p className={classes['fee-numbers']}>{feesInfo.c14}$</p>
                </div>
                <span className={classes['math-symbols']}>=</span>
                <div className={classes['fee-box']}>
                    <p className={classes['fee-title']}>Total Fee</p>
                    <p className={classes['fee-numbers']}>{feesInfo.total}$</p>
                </div>
            </div>
        </div>
    );
};
