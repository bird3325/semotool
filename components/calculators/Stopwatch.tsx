
import React, { useState, useEffect, useRef } from 'react';
// FIX: Module '"lucide-react"' has no exported member 'Stopwatch'. Using 'Timer' icon as a replacement.
import { Timer as StopwatchIcon, Play, Pause, RotateCcw, Flag } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

const Stopwatch: React.FC = () => {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    // FIX: Namespace 'global.NodeJS' has no exported member 'Timeout'. Using ReturnType<typeof setInterval> for browser compatibility.
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
                    <h2 className="text-2xl font-bold">스톱워치</h2>
                </div>
                <p className="mt-1 opacity-90">시간을 측정하고 랩 타임을 기록하세요.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md text-center space-y-6">
                <p className="text-7xl font-mono font-bold text-gray-800">{formatTime(time)}</p>
                <div className="flex justify-center space-x-4">
                    <button onClick={handleReset} className="p-4 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700" disabled={isActive}>
                        <RotateCcw size={24} />
                    </button>
                    {isActive ? (
                        <button onClick={handlePause} className="p-4 rounded-full bg-red-500 hover:bg-red-600 text-white">
                            <Pause size={24} />
                        </button>
                    ) : (
                        <button onClick={handleStart} className="p-4 rounded-full bg-green-500 hover:bg-green-600 text-white">
                            <Play size={24} />
                        </button>
                    )}
                    <button onClick={handleLap} className="p-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white" disabled={!isActive}>
                        <Flag size={24} />
                    </button>
                </div>
            </div>
            
            <AdBanner />

            {laps.length > 0 && (
                <div className="p-4 bg-gray-50 rounded-xl space-y-2">
                     <h3 className="text-lg font-bold text-center mb-2">랩 타임</h3>
                     <div className="max-h-60 overflow-y-auto">
                        {laps.slice().reverse().map((lap, index) => {
                            const prevLap = laps[laps.length - index - 2] || 0;
                            const lapTime = lap - prevLap;
                            return (
                                <div key={index} className="flex justify-between items-center p-2 border-b">
                                    <span className="font-semibold text-gray-600">랩 {laps.length - index}</span>
                                    <span className="font-mono text-gray-800">{formatTime(lapTime)}</span>
                                    <span className="font-mono text-sm text-gray-500">{formatTime(lap)}</span>
                                </div>
                            )
                        })}
                     </div>
                </div>
            )}
        </div>
    );
};

export default Stopwatch;
