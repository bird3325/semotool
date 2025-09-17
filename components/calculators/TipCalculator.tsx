
import React, { useState } from 'react';
import { HandCoins, Minus, Plus } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

const TipCalculator: React.FC = () => {
    const [billAmount, setBillAmount] = useState('');
    const [tipPercent, setTipPercent] = useState('15');
    const [numPeople, setNumPeople] = useState(1);
    const [result, setResult] = useState<{ tipAmount: number; totalAmount: number; perPersonAmount: number } | null>(null);

    const formatNumber = (val: string) => {
        const num = Number(val.replace(/,/g, ''));
        if (isNaN(num)) return '';
        return num.toLocaleString('en-US');
    };

    const handleCalculate = () => {
        const bill = parseFloat(billAmount.replace(/,/g, ''));
        const tip = parseFloat(tipPercent);
        if (isNaN(bill) || isNaN(tip) || bill <= 0 || tip < 0 || numPeople < 1) {
            setResult(null);
            return;
        }

        const tipAmount = bill * (tip / 100);
        const totalAmount = bill + tipAmount;
        const perPersonAmount = totalAmount / numPeople;

        setResult({ tipAmount, totalAmount, perPersonAmount });
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-cyan-400 to-cyan-600">
                <div className="flex items-center space-x-3">
                    <HandCoins size={28} />
                    <h2 className="text-2xl font-bold">팁 계산기</h2>
                </div>
                <p className="mt-1 opacity-90">서비스 팁과 N분할 금액 계산</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">총 금액</label>
                    <input
                        type="text"
                        inputMode="numeric"
                        value={billAmount}
                        onChange={(e) => setBillAmount(formatNumber(e.target.value))}
                        placeholder="예: 50000"
                        className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">팁 (%)</label>
                    <div className="grid grid-cols-4 gap-2">
                        {['10', '15', '18', '20'].map(p => (
                             <button key={p} onClick={() => setTipPercent(p)} className={`p-2 rounded-lg font-semibold ${tipPercent === p ? 'bg-cyan-500 text-white' : 'bg-gray-100'}`}>{p}%</button>
                        ))}
                    </div>
                    <input
                        type="number"
                        value={tipPercent}
                        onChange={(e) => setTipPercent(e.target.value)}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-lg text-right"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">인원 수</label>
                    <div className="flex items-center justify-between p-2 border border-gray-300 rounded-lg">
                        <button onClick={() => setNumPeople(p => Math.max(1, p - 1))} className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"><Minus size={20} /></button>
                        <span className="text-2xl font-bold w-16 text-center">{numPeople}명</span>
                        <button onClick={() => setNumPeople(p => p + 1)} className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"><Plus size={20} /></button>
                    </div>
                </div>
                <button onClick={handleCalculate} className="w-full p-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    계산하기
                </button>
            </div>

            <AdBanner />

            {result !== null && (
                <div className="p-6 bg-gray-50 rounded-xl text-left space-y-3">
                    <h3 className="text-lg font-bold text-center mb-4">계산 결과</h3>
                    <div className="flex justify-between items-center text-gray-600">
                        <span>팁</span>
                        <span className="font-semibold">{result.tipAmount.toLocaleString('en-US', {maximumFractionDigits: 0})} 원</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>총 금액 (팁 포함)</span>
                        <span className="font-semibold">{result.totalAmount.toLocaleString('en-US', {maximumFractionDigits: 0})} 원</span>
                    </div>
                    <hr className="my-2"/>
                    <div className="flex justify-between items-center text-blue-600">
                        <span className="text-lg font-bold">1인당 부담할 금액</span>
                        <span className="font-bold text-2xl">{Math.ceil(result.perPersonAmount).toLocaleString()} 원</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TipCalculator;