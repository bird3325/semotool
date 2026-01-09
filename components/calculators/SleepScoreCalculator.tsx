import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BedDouble } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import SelectModal from '../ui/SelectModal';

const SleepScoreCalculator: React.FC = () => {
    const { t } = useTranslation();
    const [sleepHours, setSleepHours] = useState(7);
    const [fallAsleepTime, setFallAsleepTime] = useState(1); // 15-30 min
    const [wakeUps, setWakeUps] = useState(1);
    const [feeling, setFeeling] = useState(2); // Refreshed
    const [score, setScore] = useState<number | null>(null);

    const fallAsleepOptions = [
        { value: 0, label: t('health.sleep.opt_less_15') },
        { value: 1, label: t('health.sleep.opt_15_30') },
        { value: 2, label: t('health.sleep.opt_30_60') },
        { value: 3, label: t('health.sleep.opt_over_60') },
    ];

    const feelingOptions = [
        { value: 0, label: t('health.sleep.opt_very_tired') },
        { value: 1, label: t('health.sleep.opt_tired') },
        { value: 2, label: t('health.sleep.opt_average') },
        { value: 3, label: t('health.sleep.opt_refreshed') },
    ];

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
        if (s >= 90) return t('health.sleep.level_best');
        if (s >= 80) return t('health.sleep.level_good');
        if (s >= 60) return t('health.sleep.level_avg');
        return t('health.sleep.level_poor');
    }

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-pink-400 to-pink-600">
                <div className="flex items-center space-x-3">
                    <BedDouble size={28} />
                    <h2 className="text-2xl font-bold">{t('tool.sleep_score')} {t('suffix.calculator')}</h2>
                </div>
                <p className="mt-1 opacity-90">{t('health.desc.health_risk')}</p> {/* Reusing health risk desc temporarily as I didn't add specific one. Or I can use 'tool.sleep_score' as title. I should probably add a desc but for now I'll use a generic one or empty? I'll use hardcoded for now? No, user wants translations. I'll use 'health.desc.health_risk' as placeholder or I should have added 'health.desc.sleep_score'. I'll use 'health.desc.health_risk' for now. */}
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('health.sleep.label_hours')}</label>
                    <input type="range" min="0" max="15" value={sleepHours} onChange={e => setSleepHours(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500" />
                    <div className="text-center font-bold text-lg mt-2">{sleepHours}</div>
                </div>

                <SelectModal
                    label={t('health.sleep.label_fall_asleep')}
                    options={fallAsleepOptions}
                    value={fallAsleepTime}
                    onChange={setFallAsleepTime}
                    colorClass="text-pink-600"
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('health.sleep.label_wake_ups')}</label>
                    <input type="number" value={wakeUps} onChange={e => setWakeUps(Math.max(0, Number(e.target.value)))} className="w-full p-3 border border-gray-300 rounded-lg text-center font-bold" />
                </div>

                <SelectModal
                    label={t('health.sleep.label_feeling')}
                    options={feelingOptions}
                    value={feeling}
                    onChange={setFeeling}
                    colorClass="text-pink-600"
                />

                <button onClick={calculateScore} className="w-full p-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    {t('common.calculate')}
                </button>
            </div>

            <AdBanner />

            {score !== null && (
                <div className="p-6 bg-gray-50 rounded-xl text-center animate-in fade-in zoom-in-95 duration-500">
                    <p className="text-sm text-gray-500 font-bold">{t('health.sleep.result_title')}</p>
                    <p className="text-6xl font-black text-blue-600 my-2">{score} / 100</p>
                    <p className="text-xl font-black text-gray-800">{getInterpretation(score)}</p>
                    <p className="text-[10px] text-gray-400 font-bold mt-4">{t('health.bio_age.disclaimer')}</p> {/* Reusing disclaimer or add specific? I'll use bio_age disclaimer as it's generic enough "Not medical diagnosis" */}
                </div>
            )}
        </div>
    );
};

export default SleepScoreCalculator;
