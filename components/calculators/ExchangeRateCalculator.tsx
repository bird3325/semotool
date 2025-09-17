import React, { useState, useEffect } from 'react';
import { Repeat, ArrowLeftRight } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

const currencies = [
    { code: 'KRW', name: '대한민국 원' },
    { code: 'USD', name: '미국 달러' },
    { code: 'EUR', name: '유로' },
    { code: 'JPY', name: '일본 옌' },
    { code: 'CNY', name: '중국 위안' },
];

const ExchangeRateCalculator: React.FC = () => {
    const [amount, setAmount] = useState('1000');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('KRW');
    const [rate, setRate] = useState<number | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState('');

    const fetchRateAndConvert = () => {
        // Mock API call
        const mockRates: {[key: string]: number} = {
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
                setResult('유효한 금액을 입력하세요.');
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
                    <h2 className="text-2xl font-bold">환율 계산기</h2>
                </div>
                <p className="mt-1 opacity-90">실시간 환율로 정확하게!</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">보낼 금액</label>
                    <input
                        type="text"
                        inputMode="decimal"
                        value={amount}
                        onChange={handleAmountChange}
                        className="w-full p-4 border border-gray-300 rounded-lg text-3xl text-center font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div className="flex items-center justify-center space-x-2">
                    <CurrencySelector value={fromCurrency} onChange={setFromCurrency} />
                    <button onClick={swapCurrencies} className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0">
                        <ArrowLeftRight size={20} className="text-gray-600" />
                    </button>
                    <CurrencySelector value={toCurrency} onChange={setToCurrency} />
                </div>

                <button onClick={fetchRateAndConvert} className="w-full p-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                  변환하기
                </button>
            </div>
            
            <AdBanner />

            {result !== null && rate !== null && (
                <div className="p-6 bg-gray-50 rounded-xl text-center">
                    <p className="text-sm text-gray-500">변환 결과</p>
                    <p className="text-3xl font-bold text-blue-600 my-2">
                        {result} <span className="text-xl text-gray-700">{toCurrency}</span>
                    </p>
                    <p className="text-gray-500 text-sm">
                        1 {fromCurrency} ≈ {rate.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 4})} {toCurrency}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">{lastUpdated} 기준</p>
                </div>
            )}
        </div>
    );
};

const CurrencySelector: React.FC<{ value: string, onChange: (value: string) => void }> = ({ value, onChange }) => (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg bg-white text-base appearance-none bg-chevron-down bg-no-repeat bg-right pr-8 text-center">
        {currencies.map(c => <option key={c.code} value={c.code}>{c.name} ({c.code})</option>)}
    </select>
);


export default ExchangeRateCalculator;
