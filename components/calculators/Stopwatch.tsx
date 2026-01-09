import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Timer as StopwatchIcon, Play, Pause, RotateCcw, Flag } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

const Stopwatch: React.FC = () => {
    const { t } = useTranslation();
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if (isActive) {
            startTimeRef.current = Date.now() - time;
            intervalRef.current = setInterval(() => {
                setTime(Date.now() - startTimeRef.current);
            }, 10);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive]);

    const handleStart = () => setIsActive(true);
    const handlePause = () => setIsActive(false);
    const handleReset = () => {
        setIsActive(false);
        setTime(0);
        setLaps([]);
    };
    const handleLap = () => {
        if (isActive) {
            setLaps(prev => [...prev, time]);
        }
    };

    const formatTime = (ms: number) => {
        const minutes = String(Math.floor((ms / 60000) % 60)).padStart(2, '0');
        const seconds = String(Math.floor((ms / 1000) % 60)).padStart(2, '0');
        const milliseconds = String(Math.floor((ms / 10) % 100)).padStart(2, '0');
        return `${minutes}:${seconds}.${milliseconds}`;
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-cyan-400 to-cyan-600">
                <div className="flex items-center space-x-3">
                    <StopwatchIcon size={28} />
                    <h2 className="text-2xl font-bold">{t('tool.stopwatch')}</h2>
                </div>
                <p className="mt-1 opacity-90">{t('date.stopwatch.desc')}</p>
            </div>

            <div className="bg-white p-6 sm:p-8 md:p-12 rounded-xl shadow-md text-center space-y-10">
                <p className="text-4xl sm:text-6xl md:text-8xl font-mono font-black text-gray-900 tracking-tighter tabular-nums break-words">
                    {formatTime(time)}
                </p>
                <div className="flex justify-center items-center space-x-3 sm:space-x-6">
                    <button onClick={handleReset} className="p-4 sm:p-5 rounded-3xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors disabled:opacity-30" disabled={isActive || time === 0}>
                        <RotateCcw size={24} className="sm:w-7 sm:h-7" />
                    </button>
                    {isActive ? (
                        <button onClick={handlePause} className="p-5 sm:p-6 rounded-[32px] bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-100 transform active:scale-95 transition-all">
                            <Pause size={28} className="sm:w-8 sm:h-8" fill="currentColor" />
                        </button>
                    ) : (
                        <button onClick={handleStart} className="p-5 sm:p-6 rounded-[32px] bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-100 transform active:scale-95 transition-all">
                            <Play size={28} className="sm:w-8 sm:h-8 ml-1" fill="currentColor" />
                        </button>
                    )}
                    <button onClick={handleLap} className="p-4 sm:p-5 rounded-3xl bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-100 disabled:opacity-30 transition-all" disabled={!isActive}>
                        <Flag size={24} className="sm:w-7 sm:h-7" fill="currentColor" />
                    </button>
                </div>
            </div>

            <AdBanner />

            {laps.length > 0 && (
                <div className="p-4 sm:p-6 bg-white border border-gray-100 rounded-3xl shadow-xl space-y-4 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-between items-center px-2">
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">{t('date.stopwatch.lap_records')}</h3>
                        <span className="text-[10px] sm:text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">{t('date.stopwatch.lap_count', { count: laps.length })}</span>
                    </div>
                    <div className="max-h-80 overflow-y-auto pr-1 no-scrollbar space-y-2">
                        {laps.slice().reverse().map((lap, index) => {
                            const currentIdx = laps.length - index;
                            const prevLap = laps[laps.length - index - 2] || 0;
                            const lapDiff = lap - prevLap;
                            return (
                                <div key={index} className="flex justify-between items-center p-3 sm:p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-colors">
                                    <div className="flex items-center space-x-3 sm:space-x-4">
                                        <span className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-white rounded-full text-[10px] sm:text-xs font-black text-gray-400 border border-gray-100 shrink-0">{currentIdx}</span>
                                        <div className="flex flex-col">
                                            <span className="font-mono font-bold text-gray-900 text-sm sm:text-base">{formatTime(lap)}</span>
                                            <span className="text-[8px] sm:text-[10px] font-black text-gray-400 uppercase">{t('date.stopwatch.total')}</span>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <span className="font-mono font-black text-blue-600 text-base sm:text-lg tabular-nums">+{formatTime(lapDiff)}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Stopwatch;
