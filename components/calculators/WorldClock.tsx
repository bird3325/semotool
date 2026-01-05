
import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

const cities = [
    { name: '서울', timeZone: 'Asia/Seoul', country: '대한민국' },
    { name: '뉴욕', timeZone: 'America/New_York', country: '미국' },
    { name: '런던', timeZone: 'Europe/London', country: '영국' },
    { name: '도쿄', timeZone: 'Asia/Tokyo', country: '일본' },
    { name: '파리', timeZone: 'Europe/Paris', country: '프랑스' },
    { name: '시드니', timeZone: 'Australia/Sydney', country: '호주' },
];

const WorldClock: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    const getTimeData = (timeZone: string) => {
        const options: Intl.DateTimeFormatOptions = {
            timeZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        };
        const dateOptions: Intl.DateTimeFormatOptions = {
            timeZone,
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        };
        
        const formatter = new Intl.DateTimeFormat('ko-KR', options);
        const dateformatter = new Intl.DateTimeFormat('ko-KR', dateOptions);

        return {
            timeString: formatter.format(time),
            dateString: dateformatter.format(time),
        };
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-cyan-400 to-cyan-600">
                <div className="flex items-center space-x-3">
                    <Globe size={28} />
                    <h2 className="text-2xl font-bold">세계 시간</h2>
                </div>
                <p className="mt-1 opacity-90">주요 도시의 현재 시간을 확인하세요.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cities.map(city => {
                    const { timeString, dateString } = getTimeData(city.timeZone);
                    return (
                        <div key={city.name} className="p-5 bg-white rounded-2xl shadow-md border border-gray-100 hover:border-cyan-200 transition-all group overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                                <Globe size={80} />
                            </div>
                            <div className="relative z-10 flex flex-col h-full justify-between space-y-4">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-xl font-black text-gray-900">{city.name}</p>
                                        <span className="text-[10px] font-black text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full uppercase tracking-tighter">{city.country}</span>
                                    </div>
                                    <p className="text-xs font-bold text-gray-400 mt-0.5">{dateString}</p>
                                </div>
                                <p className="text-3xl font-black font-mono text-cyan-600 tabular-nums tracking-tighter">
                                    {timeString}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <AdBanner />
        </div>
    );
};

export default WorldClock;
