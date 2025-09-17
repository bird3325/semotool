
import React, { useState } from 'react';
import { Building2 } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

const ComprehensiveTaxCalculator: React.FC = () => {
    const [propertyValue, setPropertyValue] = useState('1500000000');
    const [isSingleOwner, setIsSingleOwner] = useState(true);
    const [result, setResult] = useState<{ tax: number } | null>(null);

    const formatNumber = (val: string) => {
        const num = Number(val.replace(/,/g, ''));
        if (isNaN(num)) return '';
        return num.toLocaleString('en-US');
    };

    const handleCalculate = () => {
        const value = parseFloat(propertyValue.replace(/,/g, ''));
        if (isNaN(value) || value <= 0) {
            setResult(null);
            return;
        }

        const deduction = isSingleOwner ? 1200000000 : 1800000000; // 12억, 18억
        const taxableBase = Math.max(0, value - deduction);
        
        let tax = 0;
        if (taxableBase > 0) {
            // Simplified 2024 tax rates for multiple homes
            if (taxableBase <= 300000000) tax = taxableBase * 0.005;
            else if (taxableBase <= 700000000) tax = 1500000 + (taxableBase - 300000000) * 0.007;
            else tax = 4300000 + (taxableBase - 700000000) * 0.01;
        }
        
        setResult({ tax });
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-violet-400 to-violet-600">
                <div className="flex items-center space-x-3">
                    <Building2 size={28} />
                    <h2 className="text-2xl font-bold">종합부동산세 계산기</h2>
                </div>
                <p className="mt-1 opacity-90">간이 종부세 계산</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">과세기준금액 (공시가격 합산)</label>
                    <input type="text" value={propertyValue} onChange={e => setPropertyValue(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                </div>
                <div className="flex justify-center space-x-4">
                    <button onClick={() => setIsSingleOwner(true)} className={`px-6 py-2 rounded-full font-semibold ${isSingleOwner ? 'bg-violet-500 text-white' : 'bg-gray-200 text-gray-700'}`}>1주택 (단독명의)</button>
                    <button onClick={() => setIsSingleOwner(false)} className={`px-6 py-2 rounded-full font-semibold ${!isSingleOwner ? 'bg-violet-500 text-white' : 'bg-gray-200 text-gray-700'}`}>다주택/공동명의</button>
                </div>
                <button onClick={handleCalculate} className="w-full p-4 bg-violet-500 hover:bg-violet-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    계산하기
                </button>
            </div>

            <AdBanner />

            {result && (
                <div className="p-6 bg-gray-50 rounded-xl text-center">
                    <p className="text-sm text-gray-500">예상 종합부동산세</p>
                    <p className="text-4xl font-bold text-blue-600 my-2">
                        {Math.round(result.tax).toLocaleString()} 원
                    </p>
                    <p className="text-xs text-gray-500 text-center pt-2">※ 실제 세액과 큰 차이가 있을 수 있습니다.</p>
                </div>
            )}
        </div>
    );
};

export default ComprehensiveTaxCalculator;
