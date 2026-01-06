
import React, { useState } from 'react';
import { Gift } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import SelectModal from '../ui/SelectModal';
import AmountUnit from '../ui/AmountUnit';

const deductions = {
    spouse: 600000000,
    child: 50000000,
    parent: 50000000,
    other: 10000000,
};

const recipientOptions = [
    { value: 'spouse', label: '배우자' },
    { value: 'child', label: '자녀 (직계비속)' },
    { value: 'parent', label: '부모 (직계존속)' },
    { value: 'other', label: '기타 친족' },
];

const GiftTaxCalculator: React.FC = () => {
    const [assetValue, setAssetValue] = useState('100000000');
    const [recipient, setRecipient] = useState<keyof typeof deductions>('child');
    const [result, setResult] = useState<{ tax: number } | null>(null);

    const formatNumber = (val: string) => {
        const num = Number(val.replace(/,/g, ''));
        if (isNaN(num)) return '';
        return num.toLocaleString('en-US');
    };
    
    const getTax = (base: number) => {
        if (base <= 100000000) return base * 0.1;
        if (base <= 500000000) return 10000000 + (base - 100000000) * 0.2;
        if (base <= 1000000000) return 90000000 + (base - 500000000) * 0.3;
        if (base <= 3000000000) return 240000000 + (base - 1000000000) * 0.4;
        return 940000000 + (base - 3000000000) * 0.5;
    }

    const handleCalculate = () => {
        const value = parseFloat(assetValue.replace(/,/g, ''));
        if (isNaN(value)) {
            setResult(null);
            return;
        }

        const deduction = deductions[recipient];
        const taxableBase = Math.max(0, value - deduction);
        const tax = getTax(taxableBase);
        
        setResult({ tax });
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-violet-400 to-violet-600">
                <div className="flex items-center space-x-3">
                    <Gift size={28} />
                    <h2 className="text-2xl font-bold">증여세 계산기</h2>
                </div>
                <p className="mt-1 opacity-90">매우 간소화된 예상 세액 계산</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">증여재산 가액</label>
                    <input type="text" value={assetValue} onChange={e => setAssetValue(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                    <AmountUnit value={assetValue} />
                </div>
                
                <SelectModal 
                    label="받는 사람 (수증자)"
                    options={recipientOptions}
                    value={recipient}
                    onChange={setRecipient}
                    colorClass="text-violet-600"
                />

                <button onClick={handleCalculate} className="w-full p-4 bg-violet-500 hover:bg-violet-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    계산하기
                </button>
            </div>

            <AdBanner />

            {result && (
                <div className="p-6 bg-gray-50 rounded-xl text-center">
                    <p className="text-sm text-gray-500">예상 증여세</p>
                    <p className="text-4xl font-bold text-blue-600 my-2">
                        {Math.round(result.tax).toLocaleString()} 원
                    </p>
                    <p className="text-xs text-gray-500 text-center pt-2">※ 10년간 합산액 기준. 실제 세액과 큰 차이가 있을 수 있습니다.</p>
                </div>
            )}
        </div>
    );
};

export default GiftTaxCalculator;
