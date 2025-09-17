
import React, { useState } from 'react';
import { BedDouble } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

const SleepScoreCalculator: React.FC = () => {
    const [sleepHours, setSleepHours] = useState(7);
    const [fallAsleepTime, setFallAsleepTime] = useState(1); // 15-30 min
    const [wakeUps, setWakeUps] = useState(1);
    const [feeling, setFeeling] = useState(2); // Refreshed
    const [score, setScore] = useState<number | null>(null);

    const calculateScore = () => {
        // Duration score (max 40)
        let durationScore = 0;
        if (sleepHours >= 7 && sleepHours <= 9) durationScore = 40;
        else if (sleepHours === 6 || sleepHours === 10) durationScore = 30;
        else if (sleepHours === 5 || sleepHours === 11) durationScore = 20;
        else durationScore = 10;

        // Latency score (max 20)
        const latencyScore = [20, 15, 10, 5][fallAsleepTime];

        // Awakenings score (max 20)
        let awakeningsScore = 20;
        if (wakeUps === 1) awakeningsScore = 15;
        else if (wakeUps === 2) awakeningsScore = 10;
        else if (wakeUps >= 3) awakeningsScore = 5;

        // Feeling score (max 20)
        const feelingScore = [5, 10, 15, 20][feeling];
        
        const totalScore = durationScore + latencyScore + awakeningsScore + feelingScore;
        setScore(totalScore);
    };

    const getInterpretation = (s: number) => {
        if (s >= 90) return "최상의 수면";
        if (s >= 80) return "좋은 수면";
        if (s >= 60) return "보통 수면";
        return "개선이 필요한 수면";
    }

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-pink-400 to-pink-600">
                <div className="flex items-center space-x-3">
                    <BedDouble size={28} />
                    <h2 className="text-2xl font-bold">수면 점수 계산기</h2>
                </div>
                <p className="mt-1 opacity-90">간단한 문진으로 수면의 질을 평가해보세요.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">어젯밤 몇 시간 주무셨나요?</label>
                    <input type="range" min="0" max="15" value={sleepHours} onChange={e => setSleepHours(Number(e.target.value))} className="w-full" />
                    <div className="text-center font-bold text-lg">{sleepHours} 시간</div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">잠드는 데 얼마나 걸렸나요?</label>
                    <select value={fallAsleepTime} onChange={e => setFallAsleepTime(Number(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg bg-white">
                        <option value={0}>15분 미만</option>
                        <option value={1}>15~30분</option>
                        <option value={2}>30~60분</option>
                        <option value={3}>60분 이상</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">밤에 몇 번이나 깨셨나요?</label>
                    <input type="number" value={wakeUps} onChange={e => setWakeUps(Math.max(0, Number(e.target.value)))} className="w-full p-2 border border-gray-300 rounded-lg text-center" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">아침에 일어났을 때 기분은?</label>
                    <select value={feeling} onChange={e => setFeeling(Number(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg bg-white">
                        <option value={0}>매우 피곤함</option>
                        <option value={1}>피곤함</option>
                        <option value={2}>보통</option>
                        <option value={3}>개운함</option>
                    </select>
                </div>
                <button onClick={calculateScore} className="w-full p-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    점수 확인하기
                </button>
            </div>

            <AdBanner />

            {score !== null && (
                 <div className="p-6 bg-gray-50 rounded-xl text-center">
                    <p className="text-sm text-gray-500">당신의 수면 점수는</p>
                    <p className="text-5xl font-bold text-blue-600 my-2">{score} / 100</p>
                    <p className="text-xl font-semibold text-gray-800">{getInterpretation(score)}</p>
                    <p className="text-xs text-gray-500 text-center pt-2">※ 이 평가는 의학적 진단이 아닙니다.</p>
                </div>
            )}
        </div>
    );
};

export default SleepScoreCalculator;
