
import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

const cities = [
    { name: '서울', timeZone: 'Asia/Seoul' },
    { name: '뉴욕', timeZone: 'America/New_York' },
    { name: '런던', timeZone: 'Europe/London' },
    { name: '도쿄', timeZone: 'Asia/Tokyo' },
    { name: '파리', timeZone: 'Europe/Paris' },
    { name: '시드니', timeZone: 'Australia/Sydney' },
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

            <div className="space-y-3">
                {cities.map(city => {
                    const { timeString, dateString } = getTimeData(city.timeZone);
                    return (
                        <div key={city.name} className="p-4 bg-white rounded-xl shadow-md border">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-xl font-bold text-gray-800">{city.name}</p>
                                    <p className="text-sm text-gray-500">{dateString}</p>
                                </div>
                                <p className="text-2xl font-semibold font-mono text-cyan-600">{timeString}</p>
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
