
import React, { useState, useMemo } from 'react';
import { PartyPopper } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import DatePicker from '../ui/DatePicker';

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
                 date.setDate(date.getDate() + days - 1);
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

            <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100">
                <DatePicker 
                  label="기준 날짜 선택" 
                  value={startDate} 
                  onChange={setStartDate} 
                  colorClass="text-cyan-600"
                />
            </div>

            <AdBanner />

            <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-xl space-y-4">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest px-2">Anniversary Timeline</h3>
                <div className="space-y-3">
                    {anniversaries.map(ann => (
                        <div key={ann.label} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-cyan-200 transition-colors group">
                            <div className="flex flex-col">
                              <span className="font-black text-gray-900 group-hover:text-cyan-600 transition-colors">{ann.label}</span>
                              <span className="text-[11px] font-bold text-gray-400">{ann.date}</span>
                            </div>
                            <div className="text-right">
                                <span className={`text-lg font-black tracking-tighter ${ann.dDay === 0 ? 'text-emerald-500' : ann.dDay > 0 ? 'text-rose-500' : 'text-gray-400'}`}>
                                    {ann.dDay === 0 ? 'Today' : ann.dDay > 0 ? `D-${ann.dDay}` : `D+${Math.abs(ann.dDay)}`}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AnniversaryCalculator;
