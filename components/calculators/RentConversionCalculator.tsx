
import React, { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

const RentConversionCalculator: React.FC = () => {
    const [jeonseDeposit, setJeonseDeposit] = useState('500000000');
    const [monthlyDeposit, setMonthlyDeposit] = useState('300000000');
    const [conversionRate, setConversionRate] = useState('5.5');
    const [result, setResult] = useState<{ monthlyRent: number } | null>(null);

    const formatNumber = (val: string) => {
        const num = Number(val.replace(/,/g, ''));
        if (isNaN(num)) return '';
        return num.toLocaleString('en-US');
    };

    const handleCalculate = () => {
        const jeonse = parseFloat(jeonseDeposit.replace(/,/g, ''));
        const monthlyDep = parseFloat(monthlyDeposit.replace(/,/g, ''));
        const rate = parseFloat(conversionRate) / 100;

        if (isNaN(jeonse) || isNaN(monthlyDep) || isNaN(rate) || jeonse < monthlyDep) {
            setResult(null);
            return;
        }

        const amountToConvert = jeonse - monthlyDep;
        const monthlyRent = (amountToConvert * rate) / 12;

        setResult({ monthlyRent });
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-violet-400 to-violet-600">
                <div className="flex items-center space-x-3">
                    <ArrowRightLeft size={28} />
                    <h2 className="text-2xl font-bold">전월세 전환 계산기</h2>
                </div>
                <p className="mt-1 opacity-90">보증금을 월세로 전환 시 금액을 계산합니다.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">기존 전세 보증금</label>
                    <input type="text" value={jeonseDeposit} onChange={e => setJeonseDeposit(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">월세 보증금</label>
                    <input type="text" value={monthlyDeposit} onChange={e => setMonthlyDeposit(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">전환율 (%)</label>
                    <input type="number" value={conversionRate} onChange={e => setConversionRate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                </div>
                <button onClick={handleCalculate} className="w-full p-4 bg-violet-500 hover:bg-violet-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    계산하기
                </button>
            </div>

            <AdBanner />

            {result && (
                <div className="p-6 bg-gray-50 rounded-xl text-center">
                    <p className="text-sm text-gray-500">전환된 월세</p>
                    <p className="text-4xl font-bold text-blue-600 my-2">
                        {Math.round(result.monthlyRent).toLocaleString()} 원
                    </p>
                </div>
            )}
        </div>
    );
};

export default RentConversionCalculator;
