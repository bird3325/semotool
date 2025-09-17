
import React, { useState } from 'react';
import { CalendarClock } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

const AnnuityCalculator: React.FC = () => {
    const [totalAnnuity, setTotalAnnuity] = useState('300000000');
    const [rate, setRate] = useState('4');
    const [years, setYears] = useState('20');
    const [result, setResult] = useState<{ monthlyPayout: number; totalPayout: number } | null>(null);

    const formatNumber = (val: string) => {
        const num = Number(val.replace(/,/g, ''));
        if (isNaN(num)) return '';
        return num.toLocaleString('en-US');
    };

    const handleCalculate = () => {
        const PV = parseFloat(totalAnnuity.replace(/,/g, ''));
        const r_annual = parseFloat(rate) / 100;
        const t = parseInt(years, 10);

        if (isNaN(PV) || isNaN(r_annual) || isNaN(t) || PV <= 0 || r_annual < 0 || t <= 0) {
            setResult(null);
            return;
        }

        const n = t * 12;
        const r_monthly = r_annual / 12;

        let monthlyPayout;
        if (r_monthly === 0) {
            monthlyPayout = PV / n;
        } else {
            monthlyPayout = PV * (r_monthly * Math.pow(1 + r_monthly, n)) / (Math.pow(1 + r_monthly, n) - 1);
        }
        
        const totalPayout = monthlyPayout * n;

        setResult({ monthlyPayout, totalPayout });
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-amber-400 to-amber-600">
                <div className="flex items-center space-x-3">
                    <CalendarClock size={28} />
                    <h2 className="text-2xl font-bold">연금 계산기</h2>
                </div>
                <p className="mt-1 opacity-90">매월 얼마씩 받을 수 있을까요?</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">연금 총액 (원)</label>
                    <input type="text" value={totalAnnuity} onChange={e => setTotalAnnuity(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">예상 수익률 (연 %)</label>
                    <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">수령 기간 (년)</label>
                    <input type="number" value={years} onChange={e => setYears(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                </div>
                <button onClick={handleCalculate} className="w-full p-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    계산하기
                </button>
            </div>

            <AdBanner />

            {result && (
                <div className="p-6 bg-gray-50 rounded-xl text-center">
                    <p className="text-sm text-gray-500">예상 월 수령액</p>
                    <p className="text-4xl font-bold text-blue-600 my-2">
                        {Math.round(result.monthlyPayout).toLocaleString()} 원
                    </p>
                    <p className="text-md text-gray-700">
                        총 수령액: {Math.round(result.totalPayout).toLocaleString()} 원
                    </p>
                </div>
            )}
        </div>
    );
};

export default AnnuityCalculator;
