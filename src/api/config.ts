import axios from "axios";
import { ICurrencyExchangeRequest, ICurrencyExchangeResponse } from "../types/common";

const REST_URL = 'https://api-qjoa5a5qtq-uc.a.run.app/';

export const getCurrencyData = async (request: ICurrencyExchangeRequest): Promise<ICurrencyExchangeResponse | null> => {
    try {
        const { data } = await axios.post(`${REST_URL}quotes`, request);

        return data
    } catch (e) {
        console.error(e)
        return null
    }
};

