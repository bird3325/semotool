
import React, { useState } from 'react';
import { Repeat } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import SelectModal from '../ui/SelectModal';
import AmountUnit from '../ui/AmountUnit';

const compoundingOptions = [
    { value: '1', label: '매년' },
    { value: '2', label: '6개월' },
    { value: '4', label: '분기' },
    { value: '12', label: '매월' }
];

const CompoundInterestCalculator: React.FC = () => {
    const [principal, setPrincipal] = useState('10000000');
    const [rate, setRate] = useState('5');
    const [years, setYears] = useState('10');
    const [compounding, setCompounding] = useState('12'); // Monthly
    const [result, setResult] = useState<{ futureValue: number; totalInterest: number } | null>(null);
    
    const formatNumber = (val: string) => {
        const num = Number(val.replace(/,/g, ''));
        if (isNaN(num)) return '';
        return num.toLocaleString('en-US');
    };

    const handleCalculate = () => {
        const P = parseFloat(principal.replace(/,/g, ''));
        const r = parseFloat(rate) / 100;
        const t = parseInt(years, 10);
        const n = parseInt(compounding, 10);

        if (isNaN(P) || isNaN(r) || isNaN(t) || P <= 0 || r < 0 || t <= 0) {
            setResult(null);
            return;
        }
        
        // A = P(1 + r/n)^(nt)
        const futureValue = P * Math.pow(1 + r / n, n * t);
        const totalInterest = futureValue - P;

        setResult({ futureValue, totalInterest });
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-amber-400 to-amber-600">
                <div className="flex items-center space-x-3">
                    <Repeat size={28} />
                    <h2 className="text-2xl font-bold">복리/단리 계산기</h2>
                </div>
                <p className="mt-1 opacity-90">복리의 마법을 확인해보세요.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">원금 (원)</label>
                    <input type="text" value={principal} onChange={e => setPrincipal(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right outline-none focus:ring-2 focus:ring-amber-500" />
                    <AmountUnit value={principal} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">연이율 (%)</label>
                        <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right outline-none focus:ring-2 focus:ring-amber-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">투자 기간 (년)</label>
                        <input type="number" value={years} onChange={e => setYears(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right outline-none focus:ring-2 focus:ring-amber-500" />
                    </div>
                </div>

                <SelectModal 
                    label="복리 주기"
                    options={compoundingOptions}
                    value={compounding}
                    onChange={setCompounding}
                    colorClass="text-amber-600"
                />

                <button onClick={handleCalculate} className="w-full p-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-lg transition-transform active:scale-95 shadow-md">
                    계산하기
                </button>
            </div>

            <AdBanner />

            {result && (
                <div className="p-6 bg-gray-50 rounded-xl text-left space-y-3 border border-amber-100 animate-in zoom-in-95 duration-300">
                    <h3 className="text-lg font-bold text-center mb-4 text-gray-800">미래 가치 예상 결과</h3>
                    <div className="flex justify-between items-center text-gray-600">
                        <span className="text-sm">투자 원금</span>
                        <span className="font-semibold text-lg">{parseFloat(principal.replace(/,/g, '')).toLocaleString()} 원</span>
                    </div>
                    <div className="flex justify-between items-center text-emerald-600">
                        <span className="text-sm">수익 (이자)</span>
                        <span className="font-semibold text-lg">+ {Math.round(result.totalInterest).toLocaleString()} 원</span>
                    </div>
                    <hr className="my-2 border-gray-200"/>
                    <div className="flex justify-between items-center text-blue-600">
                        <span className="font-bold">최종 예상 금액</span>
                        <span className="font-black text-2xl">{Math.round(result.futureValue).toLocaleString()} 원</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompoundInterestCalculator;
