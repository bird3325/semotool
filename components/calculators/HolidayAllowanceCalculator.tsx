import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarPlus } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

const HolidayAllowanceCalculator: React.FC = () => {
    const { t } = useTranslation();
    const [hourlyWage, setHourlyWage] = useState('9860'); // 2024 minimum wage
    const [weeklyHours, setWeeklyHours] = useState('40');
    const [result, setResult] = useState<{ allowance: number; isEligible: boolean; reason?: string, wage: number, hours: number } | null>(null);

    const formatNumber = (val: string) => {
        const num = Number(val.replace(/,/g, ''));
        if (isNaN(num)) return '';
        return num.toLocaleString('en-US');
    };

    const handleCalculate = () => {
        const wage = parseFloat(hourlyWage.replace(/,/g, ''));
        const hours = parseFloat(weeklyHours);

        if (isNaN(wage) || isNaN(hours) || wage <= 0 || hours < 0) {
            setResult(null);
            return;
        }

        if (hours < 15) {
            setResult({ allowance: 0, isEligible: false, reason: t('finance.holiday_allowance.msg_ineligible'), wage, hours });
            return;
        }

        // For workers with < 40 hours/week, allowance is proportional.
        // Formula: (weeklyHours / 40) * 8 * hourlyWage
        const allowance = (hours / 40) * 8 * wage;

        setResult({ allowance, isEligible: true, wage, hours });
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-amber-400 to-amber-600">
                <div className="flex items-center space-x-3">
                    <CalendarPlus size={28} />
                    <h2 className="text-2xl font-bold">{t('tool.holiday_allowance')} {t('suffix.calculator')}</h2>
                </div>
                <p className="mt-1 opacity-90">{t('finance.holiday_allowance.desc')}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.holiday_allowance.label_hourly_wage')} ({t('currency.KRW')})</label>
                    <input type="text" value={formatNumber(hourlyWage)} onChange={e => setHourlyWage(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.holiday_allowance.label_weekly_hours')}</label>
                    <input type="number" value={weeklyHours} onChange={e => setWeeklyHours(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                </div>
                <p className="text-xs text-gray-500 text-center">{t('finance.holiday_allowance.msg_disclaimer')}</p>
                <button onClick={handleCalculate} className="w-full p-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    {t('common.calculate')}
                </button>
            </div>

            <AdBanner />

            {result && (
                <div className="p-6 bg-gray-50 rounded-xl text-center">
                    {result.isEligible ? (
                        <>
                            <p className="text-sm text-gray-500">{t('finance.holiday_allowance.result_allowance')}</p>
                            <p className="text-4xl font-bold text-blue-600 my-2">
                                {Math.round(result.allowance).toLocaleString()} {t('currency.KRW')}
                            </p>
                            <p className="text-md text-gray-700">
                                {t('finance.holiday_allowance.result_total_weekly', { total: Math.round((result.wage * result.hours) + result.allowance).toLocaleString() })}
                            </p>
                        </>
                    ) : (
                        <p className="text-md font-semibold text-red-600">{result.reason}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default HolidayAllowanceCalculator;