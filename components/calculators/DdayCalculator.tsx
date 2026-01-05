
import React, { useState, useEffect } from 'react';
import { CalendarDays } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import DatePicker from '../ui/DatePicker';

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

            <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100">
                <DatePicker 
                  label="기준 날짜 선택" 
                  value={targetDate} 
                  onChange={setTargetDate} 
                  colorClass="text-cyan-600"
                />
            </div>

            <AdBanner />

            {result && (
                <div className="p-8 bg-white border border-cyan-100 rounded-3xl shadow-xl text-center animate-in zoom-in-95 duration-500">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{targetDate}</p>
                    <p className="text-6xl font-black text-cyan-600 my-4 tracking-tighter">
                        {result.type === 'D-day' ? 'D-Day' : `${result.type}${result.days}`}
                    </p>
                    <div className="inline-block px-4 py-2 bg-cyan-50 rounded-full border border-cyan-100">
                      <p className="text-sm font-bold text-cyan-700">
                          {result.type === 'D-' && `오늘로부터 ${result.days}일 남았습니다.`}
                          {result.type === 'D+' && `오늘로부터 ${result.days}일 지났습니다.`}
                          {result.type === 'D-day' && `바로 오늘입니다!`}
                      </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DdayCalculator;
