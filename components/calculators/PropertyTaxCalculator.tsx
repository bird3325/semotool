
import React, { useState } from 'react';
import { ReceiptText } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import AmountUnit from '../ui/AmountUnit';

const PropertyTaxCalculator: React.FC = () => {
    const [propertyValue, setPropertyValue] = useState('500000000');
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
        
        const fairMarketValueRatio = 0.60; // 공정시장가액비율 (주택 60%)
        const taxableBase = value * fairMarketValueRatio;

        let tax = 0;
        if (taxableBase <= 60000000) tax = taxableBase * 0.0010;
        else if (taxableBase <= 150000000) tax = 60000 + (taxableBase - 60000000) * 0.0015;
        else if (taxableBase <= 300000000) tax = 195000 + (taxableBase - 150000000) * 0.0025;
        else tax = 570000 + (taxableBase - 300000000) * 0.0040;
        
        setResult({ tax });
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-violet-400 to-violet-600">
                <div className="flex items-center space-x-3">
                    <ReceiptText size={28} />
                    <h2 className="text-2xl font-bold">재산세 계산기</h2>
                </div>
                <p className="mt-1 opacity-90">주택 공시가격 기준 간이 계산</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">주택 공시가격 (원)</label>
                    <input 
                        type="text" 
                        value={propertyValue} 
                        onChange={e => setPropertyValue(formatNumber(e.target.value))} 
                        className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" 
                    />
                    <AmountUnit value={propertyValue} />
                </div>
                <button onClick={handleCalculate} className="w-full p-4 bg-violet-500 hover:bg-violet-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    계산하기
                </button>
            </div>

            <AdBanner />

            {result && (
                <div className="p-6 bg-gray-50 rounded-xl text-center">
                    <p className="text-sm text-gray-500">예상 재산세</p>
                    <p className="text-4xl font-bold text-blue-600 my-2">
                        {Math.round(result.tax).toLocaleString()} 원
                    </p>
                    <p className="text-xs text-gray-500 text-center pt-2">※ 실제 세액과 차이가 있을 수 있습니다.</p>
                </div>
            )}
        </div>
    );
};

export default PropertyTaxCalculator;
