
import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import AmountUnit from '../ui/AmountUnit';

const InstallmentCalculator: React.FC = () => {
    const [principal, setPrincipal] = useState('1000000');
    const [months, setMonths] = useState('12');
    const [rate, setRate] = useState('18');
    const [result, setResult] = useState<{ monthlyPayment: number; totalPayment: number; totalInterest: number } | null>(null);

    const formatNumber = (val: string) => {
        const num = Number(val.replace(/,/g, ''));
        if (isNaN(num)) return '';
        return num.toLocaleString('en-US');
    };

    const handleCalculate = () => {
        const P = parseFloat(principal.replace(/,/g, ''));
        const n = parseInt(months, 10);
        const r_annual = parseFloat(rate) / 100;

        if (isNaN(P) || isNaN(n) || isNaN(r_annual) || P <= 0 || n <= 0 || r_annual < 0) {
            setResult(null);
            return;
        }

        const r_monthly = r_annual / 12;
        
        // This is a simplified installment calculation common in Korea (similar to add-on interest)
        const totalInterest = P * r_annual * (n / 12);
        const totalPayment = P + totalInterest;
        const monthlyPayment = totalPayment / n;

        setResult({ monthlyPayment, totalPayment, totalInterest });
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-amber-400 to-amber-600">
                <div className="flex items-center space-x-3">
                    <CreditCard size={28} />
                    <h2 className="text-2xl font-bold">할부/수수료 계산기</h2>
                </div>
                <p className="mt-1 opacity-90">카드 할부 시 총 비용을 계산합니다.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">할부 원금 (원)</label>
                    <input type="text" value={principal} onChange={e => setPrincipal(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                    <AmountUnit value={principal} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">할부 개월 수</label>
                    <input type="number" value={months} onChange={e => setMonths(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">연 수수료율 (%)</label>
                    <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                </div>
                <button onClick={handleCalculate} className="w-full p-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    계산하기
                </button>
            </div>

            <AdBanner />

            {result && (
                <div className="p-6 bg-gray-50 rounded-xl text-left space-y-3">
                    <h3 className="text-lg font-bold text-center mb-4">계산 결과</h3>
                    <div className="flex justify-between items-center text-blue-600">
                        <span className="font-semibold">월 납부액</span>
                        <span className="font-bold text-xl">{Math.round(result.monthlyPayment).toLocaleString()} 원</span>
                    </div>
                    <hr className="my-2"/>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">총 수수료(이자)</span>
                        <span className="font-semibold text-lg">{Math.round(result.totalInterest).toLocaleString()} 원</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <span className="font-semibold">총 납부액</span>
                        <span className="font-bold text-2xl">{Math.round(result.totalPayment).toLocaleString()} 원</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InstallmentCalculator;
