import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

const WorldClock: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [time, setTime] = useState(new Date());

    const cities = [
        { name: t('date.city.seoul'), timeZone: 'Asia/Seoul', country: t('date.country.south_korea') },
        { name: t('date.city.new_york'), timeZone: 'America/New_York', country: t('date.country.usa') },
        { name: t('date.city.london'), timeZone: 'Europe/London', country: t('date.country.uk') },
        { name: t('date.city.tokyo'), timeZone: 'Asia/Tokyo', country: t('date.country.japan') },
        { name: t('date.city.paris'), timeZone: 'Europe/Paris', country: t('date.country.france') },
        { name: t('date.city.sydney'), timeZone: 'Australia/Sydney', country: t('date.country.australia') },
    ];

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    const getTimeData = (timeZone: string) => {
        const locale = i18n.language || 'ko-KR';
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

        try {
            const formatter = new Intl.DateTimeFormat(locale, options);
            const dateformatter = new Intl.DateTimeFormat(locale, dateOptions);

            return {
                timeString: formatter.format(time),
                dateString: dateformatter.format(time),
            };
        } catch (e) {
            return {
                timeString: "",
                dateString: ""
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-cyan-400 to-cyan-600">
                <div className="flex items-center space-x-3">
                    <Globe size={28} />
                    <h2 className="text-2xl font-bold">{t('tool.world_clock')}</h2>
                </div>
                <p className="mt-1 opacity-90">{t('date.world_clock.desc')}</p>
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
