
import React, { useState } from 'react';
import { FileDigit } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

const VATCalculator: React.FC = () => {
    const [supplyPrice, setSupplyPrice] = useState('100000');
    const [vat, setVat] = useState('10000');
    const [totalPrice, setTotalPrice] = useState('110000');

    const formatNumber = (val: string) => val.replace(/,/g, '');
    const displayFormatted = (val: string) => Number(val).toLocaleString();
    
    const handleSupplyPriceChange = (value: string) => {
        const price = parseFloat(formatNumber(value));
        setSupplyPrice(formatNumber(value));
        if (!isNaN(price)) {
            const calculatedVat = price * 0.1;
            setVat(String(calculatedVat));
            setTotalPrice(String(price + calculatedVat));
        } else {
            setVat('');
            setTotalPrice('');
        }
    };
    
    const handleTotalPriceChange = (value: string) => {
        const total = parseFloat(formatNumber(value));
        setTotalPrice(formatNumber(value));
        if (!isNaN(total)) {
            const calculatedSupply = total / 1.1;
            setSupplyPrice(String(calculatedSupply));
            setVat(String(total - calculatedSupply));
        } else {
            setSupplyPrice('');
            setVat('');
        }
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-amber-400 to-amber-600">
                <div className="flex items-center space-x-3">
                    <FileDigit size={28} />
                    <h2 className="text-2xl font-bold">부가가치세 계산기</h2>
                </div>
                <p className="mt-1 opacity-90">공급가액, 부가세, 합계금액을 계산합니다.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">공급가액</label>
                    <input type="text" value={displayFormatted(supplyPrice)} onChange={e => handleSupplyPriceChange(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">부가세 (10%)</label>
                    <input type="text" value={displayFormatted(vat)} readOnly className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right bg-gray-100" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">합계금액</label>
                    <input type="text" value={displayFormatted(totalPrice)} onChange={e => handleTotalPriceChange(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                </div>
            </div>

            <AdBanner />
        </div>
    );
};

export default VATCalculator;
