
import React, { useState } from 'react';
import { PiggyBank } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

type InterestType = 'simple' | 'compound';
type TaxType = 'general' | 'tax-free';

const SavingsCalculator: React.FC = () => {
    const [monthlyDeposit, setMonthlyDeposit] = useState('100000');
    const [period, setPeriod] = useState('12');
    const [rate, setRate] = useState('3.5');
    const [interestType, setInterestType] = useState<InterestType>('compound');
    const [taxType, setTaxType] = useState<TaxType>('general');
    const [result, setResult] = useState<{ principal: number; preTaxInterest: number; tax: number; netInterest: number; totalAmount: number } | null>(null);

    const formatNumber = (val: string) => {
        const num = Number(val.replace(/,/g, ''));
        if (isNaN(num)) return '';
        return num.toLocaleString('en-US');
    };

    const handleCalculate = () => {
        const pmt = parseFloat(monthlyDeposit.replace(/,/g, ''));
        const n = parseInt(period, 10);
        const r = parseFloat(rate) / 100;

        if (isNaN(pmt) || isNaN(n) || isNaN(r) || pmt <= 0 || n <= 0 || r < 0) {
            setResult(null);
            return;
        }

        const principal = pmt * n;
        let preTaxInterest = 0;
        const r_monthly = r / 12;

        if (interestType === 'compound') {
            const futureValue = pmt * ((Math.pow(1 + r_monthly, n) - 1) / r_monthly);
            preTaxInterest = futureValue - principal;
        } else { // simple
            let totalInterest = 0;
            for (let i = 1; i <= n; i++) {
                totalInterest += pmt * r_monthly * i;
            }
            preTaxInterest = totalInterest;
        }
        
        const tax = taxType === 'general' ? preTaxInterest * 0.154 : 0;
        const netInterest = preTaxInterest - tax;
        const totalAmount = principal + netInterest;

        setResult({ principal, preTaxInterest, tax, netInterest, totalAmount });
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-amber-400 to-amber-600">
                <div className="flex items-center space-x-3">
                    <PiggyBank size={28} />
                    <h2 className="text-2xl font-bold">예적금 계산기</h2>
                </div>
                <p className="mt-1 opacity-90">매월 꾸준히 저축하면 얼마가 될까요?</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">매월 저축액 (원)</label>
                    <input type="text" value={monthlyDeposit} onChange={e => setMonthlyDeposit(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">기간 (개월)</label>
                    <input type="number" value={period} onChange={e => setPeriod(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">연이율 (%)</label>
                    <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <select value={interestType} onChange={e => setInterestType(e.target.value as InterestType)} className="w-full p-3 border border-gray-300 rounded-lg bg-white">
                        <option value="simple">단리</option>
                        <option value="compound">복리</option>
                    </select>
                    <select value={taxType} onChange={e => setTaxType(e.target.value as TaxType)} className="w-full p-3 border border-gray-300 rounded-lg bg-white">
                        <option value="general">일반과세 (15.4%)</option>
                        <option value="tax-free">비과세</option>
                    </select>
                </div>
                <button onClick={handleCalculate} className="w-full p-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    계산하기
                </button>
            </div>

            <AdBanner />

            {result && (
                 <div className="p-6 bg-gray-50 rounded-xl text-left space-y-3">
                    <h3 className="text-lg font-bold text-center mb-4">계산 결과</h3>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">총 원금</span>
                        <span className="font-semibold text-lg">{result.principal.toLocaleString('en-US', {maximumFractionDigits: 0})} 원</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">세전 이자</span>
                        <span className="font-semibold text-lg">{result.preTaxInterest.toLocaleString('en-US', {maximumFractionDigits: 0})} 원</span>
                    </div>
                    <div className="flex justify-between items-center text-red-600">
                        <span >이자과세</span>
                        <span className="font-semibold text-lg">- {result.tax.toLocaleString('en-US', {maximumFractionDigits: 0})} 원</span>
                    </div>
                    <hr className="my-2"/>
                    <div className="flex justify-between items-center text-blue-600">
                        <span className="font-semibold">세후 수령액</span>
                        <span className="font-bold text-2xl">{result.totalAmount.toLocaleString('en-US', {maximumFractionDigits: 0})} 원</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SavingsCalculator;
