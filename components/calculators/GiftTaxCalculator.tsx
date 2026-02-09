
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Gift } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import SelectModal from '../ui/SelectModal';
import AmountUnit from '../ui/AmountUnit';

const GiftTaxCalculator: React.FC = () => {
    const { t } = useTranslation();
    const [assetValue, setAssetValue] = useState('100000000');
    const [recipient, setRecipient] = useState<keyof typeof deductions>('child');
    const [result, setResult] = useState<{ tax: number } | null>(null);

    const deductions = {
        spouse: 600000000,
        child: 50000000,
        parent: 50000000,
        other: 10000000,
    };

    const recipientOptions = [
        { value: 'spouse', label: t('finance.opt.spouse') },
        { value: 'child', label: t('finance.opt.child') },
        { value: 'parent', label: t('finance.opt.parent') },
        { value: 'other', label: t('finance.opt.other_relative') },
    ];

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
                    <h2 className="text-2xl font-bold">{t('tool.gift-tax')} {t('suffix.calculator')}</h2>
                </div>
                <p className="mt-1 opacity-90">{t('finance.desc.gift_tax')}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.label.gift_asset_value')}</label>
                    <input type="text" value={assetValue} onChange={e => setAssetValue(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                    <AmountUnit value={assetValue} />
                </div>

                <SelectModal
                    label={t('finance.label.recipient')}
                    options={recipientOptions}
                    value={recipient}
                    onChange={(val) => setRecipient(val as keyof typeof deductions)}
                    colorClass="text-violet-600"
                />

                <button onClick={handleCalculate} className="w-full p-4 bg-violet-500 hover:bg-violet-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    {t('common.calculate')}
                </button>
            </div>

            <AdBanner />

            {result && (
                <div className="p-6 bg-gray-50 rounded-xl text-center">
                    <p className="text-sm text-gray-500">{t('finance.result.expected_gift_tax')}</p>
                    <p className="text-4xl font-bold text-blue-600 my-2">
                        {Math.round(result.tax).toLocaleString()} {t('currency.KRW')}
                    </p>
                    <p className="text-xs text-gray-500 text-center pt-2">{t('finance.msg.gift_warning')}</p>
                </div>
            )}
        </div>
    );
};

export default GiftTaxCalculator;
