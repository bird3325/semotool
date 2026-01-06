
import React, { useState } from 'react';
import { PiggyBank } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import SelectModal from '../ui/SelectModal';
import AmountUnit from '../ui/AmountUnit';

type InterestType = 'simple' | 'compound';
type TaxType = 'general' | 'tax-free';

const interestOptions = [
    { value: 'simple', label: '단리' },
    { value: 'compound', label: '복리' }
];

const taxOptions = [
    { value: 'general', label: '일반과세 (15.4%)' },
    { value: 'tax-free', label: '비과세' }
];

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">매월 저축액 (원)</label>
                        <input type="text" value={monthlyDeposit} onChange={e => setMonthlyDeposit(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right outline-none focus:ring-2 focus:ring-amber-500" />
                        <AmountUnit value={monthlyDeposit} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">저축 기간 (개월)</label>
                        <input type="number" value={period} onChange={e => setPeriod(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right outline-none focus:ring-2 focus:ring-amber-500" />
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">연이율 (%)</label>
                    <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right outline-none focus:ring-2 focus:ring-amber-500" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectModal 
                        label="이자 계산 방식"
                        options={interestOptions}
                        value={interestType}
                        onChange={setInterestType}
                        colorClass="text-amber-600"
                    />
                    <SelectModal 
                        label="과세 방법"
                        options={taxOptions}
                        value={taxType}
                        onChange={setTaxType}
                        colorClass="text-amber-600"
                    />
                </div>
                
                <button onClick={handleCalculate} className="w-full p-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-lg transition-transform active:scale-95 shadow-md">
                    계산하기
                </button>
            </div>

            <AdBanner />

            {result && (
                 <div className="p-6 bg-gray-50 rounded-xl text-left space-y-3 border border-amber-100 animate-in zoom-in-95 duration-300">
                    <h3 className="text-lg font-bold text-center mb-4 text-gray-800">예상 만기 수령액</h3>
                    <div className="flex justify-between items-center text-gray-600">
                        <span className="text-sm">총 납입 원금</span>
                        <span className="font-semibold text-lg">{result.principal.toLocaleString('en-US', {maximumFractionDigits: 0})} 원</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600">
                        <span className="text-sm">세전 이자</span>
                        <span className="font-semibold text-lg">{result.preTaxInterest.toLocaleString('en-US', {maximumFractionDigits: 0})} 원</span>
                    </div>
                    <div className="flex justify-between items-center text-red-500">
                        <span className="text-sm">이자과세</span>
                        <span className="font-semibold text-lg">- {result.tax.toLocaleString('en-US', {maximumFractionDigits: 0})} 원</span>
                    </div>
                    <hr className="my-2 border-gray-200"/>
                    <div className="flex justify-between items-center text-blue-600">
                        <span className="font-bold">세후 수령액</span>
                        <span className="font-black text-2xl">{result.totalAmount.toLocaleString('en-US', {maximumFractionDigits: 0})} 원</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SavingsCalculator;
