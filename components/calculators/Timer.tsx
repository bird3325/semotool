
import React, { useState, useEffect, useRef } from 'react';
import { TimerIcon, Play, Pause, RotateCcw } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

const Timer: React.FC = () => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);

    const [timeLeft, setTimeLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);
    // FIX: Namespace 'global.NodeJS' has no exported member 'Timeout'. Using ReturnType<typeof setInterval> for browser compatibility.
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            // Optionally play a sound here
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
                    <h2 className="text-2xl font-bold">타이머</h2>
                </div>
                <p className="mt-1 opacity-90">시간을 설정하고 카운트다운을 시작하세요.</p>
            </div>

            {!isTimerSet ? (
                <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
                    <div className="flex justify-center items-center space-x-2 text-4xl font-mono">
                        <TimeInput value={hours} onChange={setHours} max={23} />
                        <span>:</span>
                        <TimeInput value={minutes} onChange={setMinutes} max={59} />
                        <span>:</span>
                        <TimeInput value={seconds} onChange={setSeconds} max={59} />
                    </div>
                    <button onClick={handleStart} className="w-full p-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105 flex items-center justify-center space-x-2">
                        <Play />
                        <span>시작</span>
                    </button>
                </div>
            ) : (
                <div className="bg-white p-6 rounded-xl shadow-md text-center space-y-6">
                     <p className="text-7xl font-mono font-bold text-gray-800">{formatTime(timeLeft)}</p>
                     <div className="flex justify-center space-x-4">
                        <button onClick={handleReset} className="p-4 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700">
                            <RotateCcw size={24} />
                        </button>
                         {isActive ? (
                            <button onClick={handlePause} className="p-4 rounded-full bg-red-500 hover:bg-red-600 text-white">
                                <Pause size={24} />
                            </button>
                         ) : (
                            <button onClick={handleResume} className="p-4 rounded-full bg-green-500 hover:bg-green-600 text-white">
                                <Play size={24} />
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
            value={String(value).padStart(2, '0')}
            onChange={handleChange}
            className="w-24 bg-gray-100 text-center rounded-lg p-2 outline-none focus:ring-2 focus:ring-cyan-500"
        />
    );
};

export default Timer;
