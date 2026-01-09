import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrainCircuit } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import SelectModal from '../ui/SelectModal';

const StressLevelCalculator: React.FC = () => {
    const { t } = useTranslation();
    const questions = [
        t('health.stress.q1'),
        t('health.stress.q2'),
        t('health.stress.q3'),
        t('health.stress.q4'),
        t('health.stress.q5'),
    ];

    const stressOptions = [
        { value: 0, label: t('health.stress.opt_0') },
        { value: 1, label: t('health.stress.opt_1') },
        { value: 2, label: t('health.stress.opt_2') },
        { value: 3, label: t('health.stress.opt_3') },
        { value: 4, label: t('health.stress.opt_4') },
    ];

    const [answers, setAnswers] = useState(Array(questions.length).fill(0));
    const [score, setScore] = useState<number | null>(null);

    const handleAnswerChange = (index: number, value: number) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const calculateScore = () => {
        const totalScore = answers.reduce((sum, val) => sum + val, 0);
        setScore(totalScore);
    };

    const getInterpretation = (s: number) => {
        const maxScore = questions.length * 4;
        if (s <= maxScore * 0.25) return t('health.stress.level_low');
        if (s <= maxScore * 0.5) return t('health.stress.level_moderate');
        if (s <= maxScore * 0.75) return t('health.stress.level_high');
        return t('health.stress.level_very_high');
    }

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-pink-400 to-pink-600">
                <div className="flex items-center space-x-3">
                    <BrainCircuit size={28} />
                    <h2 className="text-2xl font-bold">{t('tool.stress_level')} {t('suffix.calculator')}</h2>
                </div>
                <p className="mt-1 opacity-90">{t('health.desc.health_risk')}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-8">
                {questions.map((q, i) => (
                    <SelectModal
                        key={i}
                        label={`${i + 1}. ${q}`}
                        options={stressOptions}
                        value={answers[i]}
                        onChange={(val) => handleAnswerChange(i, Number(val))}
                        colorClass="text-pink-600"
                    />
                ))}
                <button onClick={calculateScore} className="w-full p-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    {t('common.calculate')}
                </button>
            </div>

            <AdBanner />

            {score !== null && (
                <div className="p-6 bg-gray-50 rounded-xl text-center animate-in fade-in zoom-in-95 duration-500">
                    <p className="text-sm text-gray-500 font-bold">{t('health.stress.result_title')}</p>
                    <p className="text-6xl font-black text-blue-600 my-2">{score} / {questions.length * 4}</p>
                    <p className="text-xl font-black text-gray-800">{getInterpretation(score)}</p>
                    <p className="text-[10px] text-gray-400 font-bold mt-4">{t('health.bio_age.disclaimer')}</p>
                </div>
            )}
        </div>
    );
};

export default StressLevelCalculator;
