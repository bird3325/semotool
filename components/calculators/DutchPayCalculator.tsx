import React, { useState } from 'react';
import { Users, Minus, Plus } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

const DutchPayCalculator: React.FC = () => {
    const [totalAmount, setTotalAmount] = useState('');
    const [numPeople, setNumPeople] = useState(2);
    const [perPersonAmount, setPerPersonAmount] = useState<number | null>(null);
    
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/,/g, '');
         if (!isNaN(Number(value)) && value.length <= 15) {
            setTotalAmount(Number(value).toLocaleString('en-US'));
        } else if (value === '') {
            setTotalAmount('');
        }
    };

    const handleCalculate = () => {
        const total = parseFloat(totalAmount.replace(/,/g, ''));
        if (!isNaN(total) && total > 0 && numPeople > 0) {
            setPerPersonAmount(total / numPeople);
        } else {
            setPerPersonAmount(null);
        }
    }

    const incrementPeople = () => setNumPeople(p => p + 1);
    const decrementPeople = () => setNumPeople(p => Math.max(1, p - 1));
    
    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-cyan-400 to-cyan-600">
                <div className="flex items-center space-x-3">
                    <Users size={28} />
                    <h2 className="text-2xl font-bold">더치페이 계산기</h2>
                </div>
                <p className="mt-1 opacity-90">N분할, 개별 금액 분담</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700 mb-2">총 금액 (원)</label>
                    <input
                        type="text"
                        id="totalAmount"
                        inputMode="numeric"
                        value={totalAmount}
                        onChange={handleAmountChange}
                        placeholder="예: 50000"
                        className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">인원 수</label>
                    <div className="flex items-center justify-between p-2 border border-gray-300 rounded-lg">
                        <button onClick={decrementPeople} className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"><Minus size={20} /></button>
                        <span className="text-2xl font-bold w-16 text-center">{numPeople}명</span>
                        <button onClick={incrementPeople} className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"><Plus size={20} /></button>
                    </div>
                </div>
                
                 <button onClick={handleCalculate} className="w-full p-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    계산하기
                </button>
            </div>

            <AdBanner />

            {perPersonAmount !== null && (
                <div className="p-6 bg-gray-50 rounded-xl text-center">
                    <p className="text-sm text-gray-600">1인당 부담할 금액</p>
                    <p className="text-4xl font-bold text-blue-600 my-2">
                        {Math.ceil(perPersonAmount).toLocaleString()}원
                    </p>
                    <p className="text-xs text-gray-500 mt-2">총 {totalAmount}원 / {numPeople}명</p>
                </div>
            )}
        </div>
    );
};

export default DutchPayCalculator;
