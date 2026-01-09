
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileCheck } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import AmountUnit from '../ui/AmountUnit';

const YearEndTaxCalculator: React.FC = () => {
    const { t } = useTranslation();
    const [annualSalary, setAnnualSalary] = useState('50000000');
    const [totalDeductions, setTotalDeductions] = useState('15000000');
    const [prepaidTax, setPrepaidTax] = useState('2000000');
    const [result, setResult] = useState<{ taxableIncome: number; calculatedTax: number; finalTax: number } | null>(null);

    const formatNumber = (val: string) => {
        const num = Number(val.replace(/,/g, ''));
        if (isNaN(num)) return '';
        return num.toLocaleString('en-US');
    };

    const getCalculatedTax = (taxableIncome: number) => {
        if (taxableIncome <= 14000000) return taxableIncome * 0.06;
        if (taxableIncome <= 50000000) return 840000 + (taxableIncome - 14000000) * 0.15;
        if (taxableIncome <= 88000000) return 6240000 + (taxableIncome - 50000000) * 0.24;
        return 15360000 + (taxableIncome - 88000000) * 0.35; // Simplified
    }

    const handleCalculate = () => {
        const salary = parseFloat(annualSalary.replace(/,/g, ''));
        const deductions = parseFloat(totalDeductions.replace(/,/g, ''));
        const prepaid = parseFloat(prepaidTax.replace(/,/g, ''));

        if (isNaN(salary) || isNaN(deductions) || isNaN(prepaid)) {
            setResult(null);
            return;
        }

        const taxableIncome = Math.max(0, salary - deductions);
        const calculatedTax = getCalculatedTax(taxableIncome);
        const finalTax = prepaid - calculatedTax;

        setResult({ taxableIncome, calculatedTax, finalTax });
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-amber-400 to-amber-600">
                <div className="flex items-center space-x-3">
                    <FileCheck size={28} />
                    <h2 className="text-2xl font-bold">{t('tool.year_end_tax')} {t('suffix.calculator')}</h2>
                </div>
                <p className="mt-1 opacity-90">{t('finance.desc.year_end_tax')}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.result.total_sum')} ({t('finance.label.annual_salary')})</label>
                    <input type="text" value={annualSalary} onChange={e => setAnnualSalary(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                    <AmountUnit value={annualSalary} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.label.total_deductions')}</label>
                    <input type="text" value={totalDeductions} onChange={e => setTotalDeductions(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                    <AmountUnit value={totalDeductions} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.label.prepaid_tax')}</label>
                    <input type="text" value={prepaidTax} onChange={e => setPrepaidTax(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                    <AmountUnit value={prepaidTax} />
                </div>
                <button onClick={handleCalculate} className="w-full p-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    {t('common.calculate')}
                </button>
            </div>

            <AdBanner />

            {result && (
                <div className="p-6 bg-gray-50 rounded-xl text-center">
                    <p className="text-sm text-gray-500">{t('finance.result.expected_tax')} ({result?.finalTax && result.finalTax >= 0 ? t('finance.result.expected_refund') : t('finance.result.expected_additional_pay')})</p>
                    <p className={`text-4xl font-bold my-2 ${result.finalTax >= 0 ? "text-blue-600" : "text-red-600"}`}>
                        {Math.round(Math.abs(result.finalTax)).toLocaleString()} {t('currency.KRW')}
                    </p>
                    <p className="text-xs text-gray-500 text-center pt-2">{t('finance.msg.simple_calc_warning')}</p>
                </div>
            )}
        </div>
    );
};

export default YearEndTaxCalculator;
