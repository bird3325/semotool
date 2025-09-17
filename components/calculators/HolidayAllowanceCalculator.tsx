
import React, { useState } from 'react';
import { CalendarPlus } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

const HolidayAllowanceCalculator: React.FC = () => {
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
            setResult({ allowance: 0, isEligible: false, reason: '주 15시간 미만 근로자는 주휴수당 지급 대상이 아닙니다.', wage, hours });
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
                    <h2 className="text-2xl font-bold">주휴수당 계산기</h2>
                </div>
                <p className="mt-1 opacity-90">내 주휴수당은 얼마일까요?</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">시급 (원)</label>
                    <input type="text" value={formatNumber(hourlyWage)} onChange={e => setHourlyWage(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">1주간 총 근로시간</label>
                    <input type="number" value={weeklyHours} onChange={e => setWeeklyHours(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                </div>
                <p className="text-xs text-gray-500 text-center">※ 주휴수당은 1주 15시간 이상 근무, 약정한 근무일수를 모두 채운 근로자에게 지급됩니다.</p>
                <button onClick={handleCalculate} className="w-full p-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    계산하기
                </button>
            </div>

            <AdBanner />

            {result && (
                <div className="p-6 bg-gray-50 rounded-xl text-center">
                    {result.isEligible ? (
                        <>
                            <p className="text-sm text-gray-500">예상 주휴수당</p>
                            <p className="text-4xl font-bold text-blue-600 my-2">
                                {Math.round(result.allowance).toLocaleString()} 원
                            </p>
                            <p className="text-md text-gray-700">
                                1주일 총 급여: {Math.round((result.wage * result.hours) + result.allowance).toLocaleString()} 원
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