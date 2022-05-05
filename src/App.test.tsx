import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Home from './layouts/home/Home';
import { getCurrencyData } from "./api";
import { EInput } from "./types/common";

describe('Request data', () => {
  it('Response correctly', async () => {
    expect( await getCurrencyData({
      source_currency: "USD",
      target_currency: "USDC_EVMOS",
      source_amount: "100"
    })).toMatchObject(
        {
          source_currency: "USD",
          target_currency: "USDC_EVMOS",
          source_amount: "100"
        })
  });
});

describe('Input test', () => {
  beforeEach(() => {
    render(<Home/>);
  })

  it('default input', async () => {
    expect(screen.getByTestId('fiat')).toHaveValue(100);
    fireEvent.change(screen.getByTestId('fiat'), {target: {value: 0}});
  })

  it('test crypto input, and fiat value response', async () => {
    fireEvent.change(screen.getByTestId('fiat'), {target: {value: 0}});

    await testInputs(50, EInput.CRYPTO_INPUT)
    await testInputs(345, EInput.CRYPTO_INPUT)
    await testInputs(150, EInput.CRYPTO_INPUT)
    await testInputs(21, EInput.CRYPTO_INPUT)
  })

  it('test fiat input, and crypto value response', async () => {
    fireEvent.change(screen.getByTestId('crypto'), {target: {value: 0}});

    await testInputs(50, EInput.FIAT_INPUT)
    await testInputs(345, EInput.FIAT_INPUT)
    await testInputs(150, EInput.FIAT_INPUT)
    await testInputs(21, EInput.FIAT_INPUT)
  })


  async function testInputs(input: number, type: EInput) {
    const inputField = EInput[type] === EInput.FIAT_INPUT ? 'fiat' : 'crypto';
    const receiveField = EInput[type] === EInput.CRYPTO_INPUT ? 'fiat' : 'crypto';
    const inputElement = screen.getByTestId(inputField);
    const receiveElement = screen.getByTestId(receiveField);

    fireEvent.change(inputElement, {target: {value: input}});

    await waitFor(async () => {
      expect((receiveElement as HTMLInputElement).value).toBeTruthy()
    },
      {
        container: receiveElement,
        timeout: 2000,
      }
    )
  }
})
