
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Repeat, ArrowLeftRight } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import SelectModal from '../ui/SelectModal';
import AmountUnit from '../ui/AmountUnit';

const ExchangeRateCalculator: React.FC = () => {
    const { t } = useTranslation();
    const [amount, setAmount] = useState('1000');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('KRW');
    const [rate, setRate] = useState<number | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState('');

    const currencies = [
        { code: 'KRW', name: t('currency.KRW') },
        { code: 'USD', name: t('currency.USD') },
        { code: 'EUR', name: t('currency.EUR') },
        { code: 'JPY', name: t('currency.JPY') },
        { code: 'CNY', name: t('currency.CNY') },
    ];

    const currencyOptions = currencies.map(c => ({
        value: c.code,
        label: `${c.name} (${c.code})`
    }));

    const fetchRateAndConvert = () => {
        // Mock API call
        const mockRates: { [key: string]: number } = {
            "USD": 1, "KRW": 1378.33, "EUR": 0.92, "JPY": 157.02, "CNY": 7.24,
        };
        const fromRate = mockRates[fromCurrency];
        const toRate = mockRates[toCurrency];

        if (fromRate && toRate) {
            const calculatedRate = toRate / fromRate;
            setRate(calculatedRate);
            const updatedTime = new Date().toLocaleString('ko-KR');
            setLastUpdated(updatedTime);

            const numericAmount = parseFloat(amount.replace(/,/g, ''));
            if (!isNaN(numericAmount)) {
                const conversionResult = numericAmount * calculatedRate;
                setResult(conversionResult.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
            } else {
                setResult(t('common.invalid_number'));
            }
        }
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/,/g, '');
        if (!isNaN(Number(value)) && value.length <= 15) {
            setAmount(Number(value).toLocaleString('en-US'));
        } else if (value === '') {
            setAmount('');
        }
    };

    const swapCurrencies = () => {
        const temp = fromCurrency;
        setFromCurrency(toCurrency);
        setToCurrency(temp);
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-amber-400 to-amber-600">
                <div className="flex items-center space-x-3">
                    <Repeat size={28} />
                    <h2 className="text-2xl font-bold">{t('tool.exchange')} {t('suffix.calculator')}</h2>
                </div>
                <p className="mt-1 opacity-90">{t('desc.exchange')}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">{t('common.send_amount')}</label>
                    <input
                        type="text"
                        inputMode="decimal"
                        value={amount}
                        onChange={handleAmountChange}
                        className="w-full p-4 border border-gray-300 rounded-lg text-3xl text-center font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <AmountUnit value={amount} />
                </div>

                <div className="flex flex-col space-y-4">
                    <SelectModal
                        label={t('common.from_currency')}
                        options={currencyOptions}
                        value={fromCurrency}
                        onChange={setFromCurrency}
                    />

                    <div className="flex justify-center">
                        <button onClick={swapCurrencies} className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0 shadow-inner">
                            <ArrowLeftRight size={20} className="text-gray-600" />
                        </button>
                    </div>

                    <SelectModal
                        label={t('common.to_currency')}
                        options={currencyOptions}
                        value={toCurrency}
                        onChange={setToCurrency}
                    />
                </div>

                <button onClick={fetchRateAndConvert} className="w-full p-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    {t('common.convert')}
                </button>
            </div>

            <AdBanner />

            {result !== null && rate !== null && (
                <div className="p-6 bg-gray-50 rounded-xl text-center">
                    <p className="text-sm text-gray-500">{t('common.result')}</p>
                    <p className="text-3xl font-bold text-blue-600 my-2">
                        {result} <span className="text-xl text-gray-700">{toCurrency}</span>
                    </p>
                    <p className="text-gray-500 text-sm">
                        1 {fromCurrency} ≈ {rate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} {toCurrency}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">{lastUpdated} {t('common.based_on')}</p>
                </div>
            )}
        </div>
    );
};

export default ExchangeRateCalculator;
