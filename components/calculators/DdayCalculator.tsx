import React, { useState, useEffect } from 'react';
import { CalendarDays } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

const DdayCalculator: React.FC = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const getFormattedDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [targetDate, setTargetDate] = useState(getFormattedDate(today));
    const [result, setResult] = useState<{ type: 'D-' | 'D+' | 'D-day', days: number } | null>(null);

    useEffect(() => {
        const selectedDate = new Date(targetDate);
        selectedDate.setHours(0, 0, 0, 0);

        if (isNaN(selectedDate.getTime())) {
            setResult(null);
            return;
        }

        const diffTime = selectedDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            setResult({ type: 'D-day', days: 0 });
        } else if (diffDays > 0) {
            setResult({ type: 'D-', days: diffDays });
        } else {
            setResult({ type: 'D+', days: Math.abs(diffDays) });
        }
    }, [targetDate]);

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-cyan-400 to-cyan-600">
                <div className="flex items-center space-x-3">
                    <CalendarDays size={28} />
                    <h2 className="text-2xl font-bold">D-day 계산기</h2>
                </div>
                <p className="mt-1 opacity-90">특정 날짜까지 남은 일수 계산</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
                <label htmlFor="dday-date" className="block text-sm font-medium text-gray-700 text-center">
                    기준 날짜를 선택하세요
                </label>
                <input
                    type="date"
                    id="dday-date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-lg text-center"
                />
            </div>

            <AdBanner />

            {result && (
                <div className="p-6 bg-gray-50 rounded-xl text-center">
                    <p className="text-sm text-gray-500">{getFormattedDate(new Date(targetDate))}</p>
                    <p className="text-5xl font-bold text-blue-600 my-2">
                        {result.type === 'D-day' ? 'D-Day' : `${result.type}${result.days}`}
                    </p>
                    <p className="text-md text-gray-700">
                        {result.type === 'D-' && `오늘로부터 ${result.days}일 남았습니다.`}
                        {result.type === 'D+' && `오늘로부터 ${result.days}일 지났습니다.`}
                        {result.type === 'D-day' && `바로 오늘입니다!`}
                    </p>
                </div>
            )}
        </div>
    );
};

export default DdayCalculator;
