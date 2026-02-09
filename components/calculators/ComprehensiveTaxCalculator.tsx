
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Building2 } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import SelectModal from '../ui/SelectModal';

const ComprehensiveTaxCalculator: React.FC = () => {
    const { t } = useTranslation();
    const [propertyValue, setPropertyValue] = useState('1500000000');
    const [isSingleOwner, setIsSingleOwner] = useState(true);
    const [result, setResult] = useState<{ tax: number } | null>(null);

    // Dynamic options using translations
    const ownerOptions = [
        { value: 'single', label: t('finance.comprehensive.opt_single_owner') },
        { value: 'multi', label: t('finance.comprehensive.opt_multi_owner') }
    ];

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
                    <h2 className="text-2xl font-bold">{t('tool.comprehensive-tax')} {t('suffix.calculator')}</h2>
                </div>
                <p className="mt-1 opacity-90">{t('finance.comprehensive.desc')}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.comprehensive.label_property_value_total')}</label>
                    <input type="text" value={propertyValue} onChange={e => setPropertyValue(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                </div>

                <SelectModal
                    label={t('finance.comprehensive.label_ownership_type')}
                    options={ownerOptions}
                    value={isSingleOwner ? 'single' : 'multi'}
                    onChange={(val) => setIsSingleOwner(val === 'single')}
                    colorClass="text-violet-600"
                />

                <button onClick={handleCalculate} className="w-full p-4 bg-violet-500 hover:bg-violet-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    {t('common.calculate')}
                </button>
            </div>

            <AdBanner />

            {result && (
                <div className="p-6 bg-gray-50 rounded-xl text-center">
                    <p className="text-sm text-gray-500">{t('finance.comprehensive.result_tax')}</p>
                    <p className="text-4xl font-bold text-blue-600 my-2">
                        {Math.round(result.tax).toLocaleString()} {t('currency.KRW')}
                    </p>
                    <p className="text-xs text-gray-500 text-center pt-2">{t('finance.comprehensive.msg_warning')}</p>
                </div>
            )}
        </div>
    );
};

export default ComprehensiveTaxCalculator;
