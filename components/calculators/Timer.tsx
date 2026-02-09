import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TimerIcon, Play, Pause, RotateCcw } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

const Timer: React.FC = () => {
    const { t } = useTranslation();
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);

    const [timeLeft, setTimeLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive, timeLeft]);

    const handleStart = () => {
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        if (totalSeconds > 0) {
            setTimeLeft(totalSeconds);
            setIsActive(true);
        }
    };

    const handlePause = () => setIsActive(false);
    const handleResume = () => setIsActive(true);
    const handleReset = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsActive(false);
        setTimeLeft(0);
    };

    const formatTime = (time: number) => {
        const h = Math.floor(time / 3600);
        const m = Math.floor((time % 3600) / 60);
        const s = time % 60;
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    const isTimerSet = timeLeft > 0;

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-cyan-400 to-cyan-600">
                <div className="flex items-center space-x-3">
                    <TimerIcon size={28} />
                    <h2 className="text-2xl font-bold">{t('tool.timer')}</h2>
                </div>
                <p className="mt-1 opacity-90">{t('lifestyle.timer.desc')}</p>
            </div>

            {!isTimerSet ? (
                <div className="bg-white p-6 md:p-10 rounded-xl shadow-md space-y-8">
                    <div className="flex justify-center items-center space-x-2 sm:space-x-4 md:space-x-6 text-2xl sm:text-3xl md:text-5xl font-mono">
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">{t('lifestyle.timer.hours')}</span>
                            <TimeInput value={hours} onChange={setHours} max={23} />
                        </div>
                        <span className="pt-6 text-gray-300">:</span>
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">{t('lifestyle.timer.mins')}</span>
                            <TimeInput value={minutes} onChange={setMinutes} max={59} />
                        </div>
                        <span className="pt-6 text-gray-300">:</span>
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">{t('lifestyle.timer.secs')}</span>
                            <TimeInput value={seconds} onChange={setSeconds} max={59} />
                        </div>
                    </div>
                    <button onClick={handleStart} className="w-full p-5 bg-cyan-500 hover:bg-cyan-600 text-white font-black rounded-2xl text-xl transition-all shadow-lg shadow-cyan-100 flex items-center justify-center space-x-2 active:scale-95">
                        <Play size={24} fill="currentColor" />
                        <span>{t('lifestyle.timer.start')}</span>
                    </button>
                </div>
            ) : (
                <div className="bg-white p-6 sm:p-10 md:p-16 rounded-xl shadow-md text-center space-y-8 animate-in fade-in duration-500">
                    <p className="text-4xl sm:text-6xl md:text-8xl font-mono font-black text-gray-900 tracking-tighter tabular-nums">{formatTime(timeLeft)}</p>
                    <div className="flex justify-center space-x-4 sm:space-x-6">
                        <button onClick={handleReset} className="p-4 sm:p-5 rounded-3xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors shadow-sm">
                            <RotateCcw size={24} className="sm:w-7 sm:h-7" />
                        </button>
                        {isActive ? (
                            <button onClick={handlePause} className="p-4 sm:p-5 rounded-3xl bg-rose-500 hover:bg-rose-600 text-white transition-all shadow-lg shadow-rose-100 scale-105 sm:scale-110">
                                <Pause size={24} className="sm:w-7 sm:h-7" fill="currentColor" />
                            </button>
                        ) : (
                            <button onClick={handleResume} className="p-4 sm:p-5 rounded-3xl bg-emerald-500 hover:bg-emerald-600 text-white transition-all shadow-lg shadow-emerald-100 scale-105 sm:scale-110">
                                <Play size={24} className="sm:w-7 sm:h-7" fill="currentColor" />
                            </button>
                        )}
                    </div>
                </div>
            )}

            <AdBanner />
        </div>
    );
};

const TimeInput: React.FC<{ value: number, onChange: (n: number) => void, max: number }> = ({ value, onChange, max }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = parseInt(e.target.value, 10);
        if (isNaN(val)) val = 0;
        val = Math.max(0, Math.min(max, val));
        onChange(val);
    };
    return (
        <input
            type="number"
            inputMode="numeric"
            value={String(value).padStart(2, '0')}
            onChange={handleChange}
            className="w-16 sm:w-20 md:w-28 bg-gray-50 border-2 border-gray-100 text-center rounded-2xl py-4 md:py-6 outline-none focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 font-mono font-bold transition-all text-xl md:text-2xl"
        />
    );
};

export default Timer;
