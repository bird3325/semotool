
import React, { useState, useMemo } from 'react';
import { PartyPopper } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

const getFormattedDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const AnniversaryCalculator: React.FC = () => {
    const today = useMemo(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }, []);

    const [startDate, setStartDate] = useState(getFormattedDate(today));

    const anniversaries = useMemo(() => {
        const start = new Date(startDate);
        if (isNaN(start.getTime())) return [];

        const milestones = [
            100, 200, 300, 500, 1000,
            ...[...Array(10)].map((_, i) => (i + 1) * 365)
        ];
        
        return milestones.map(days => {
            const date = new Date(start);
            if (days % 365 === 0) {
                 date.setFullYear(date.getFullYear() + (days / 365));
            } else {
                 date.setDate(date.getDate() + days -1);
            }
            
            const diffTime = date.getTime() - today.getTime();
            const dDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            let label = `${days}일`;
            if (days % 365 === 0) {
                label = `${days / 365}주년`;
            }

            return {
                label,
                date: getFormattedDate(date),
                dDay,
            };
        }).sort((a, b) => a.dDay - b.dDay);

    }, [startDate, today]);

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-cyan-400 to-cyan-600">
                <div className="flex items-center space-x-3">
                    <PartyPopper size={28} />
                    <h2 className="text-2xl font-bold">기념일 계산기</h2>
                </div>
                <p className="mt-1 opacity-90">100일, 1주년 등 기념일을 계산합니다.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
                <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 text-center">
                    기준 날짜를 선택하세요
                </label>
                <input
                    type="date"
                    id="start-date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-lg text-center"
                />
            </div>

            <AdBanner />

            <div className="p-4 bg-gray-50 rounded-xl space-y-3">
                <h3 className="text-lg font-bold text-center mb-2">기념일 목록</h3>
                {anniversaries.map(ann => (
                    <div key={ann.label} className="flex justify-between items-center p-3 bg-white rounded-lg border">
                        <span className="font-semibold text-cyan-700">{ann.label}</span>
                        <div className="text-right">
                            <span className="text-gray-800">{ann.date}</span>
                            <span className={`ml-3 font-bold ${ann.dDay > 0 ? 'text-red-500' : 'text-blue-600'}`}>
                                {ann.dDay === 0 ? 'D-Day' : ann.dDay > 0 ? `D-${ann.dDay}` : `D+${Math.abs(ann.dDay)}`}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnniversaryCalculator;
