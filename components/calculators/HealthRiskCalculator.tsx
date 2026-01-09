import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldAlert } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import SelectModal from '../ui/SelectModal';

const HealthRiskCalculator: React.FC = () => {
    const { t } = useTranslation();
    const [answers, setAnswers] = useState({
        smoking: 0,
        exercise: 3,
        diet: 3,
        bmi: 22,
        familyHistory: 0,
    });
    const [riskScore, setRiskScore] = useState<number | null>(null);

    const binaryOptions = [
        { value: 0, label: t('health.opt.no') },
        { value: 1, label: t('health.opt.yes') }
    ];

    const handleCalculate = () => {
        let score = 0;
        if (answers.smoking === 1) score += 3;
        if (answers.exercise < 3) score += 2;
        if (answers.diet < 3) score += 2;
        if (answers.bmi >= 25) score += 2;
        if (answers.bmi < 18.5) score += 1;
        if (answers.familyHistory === 1) score += 2;
        setRiskScore(score);
    };

    const getInterpretation = (s: number) => {
        if (s <= 2) return { level: t('health.level.low'), color: "text-green-600" };
        if (s <= 5) return { level: t('health.level.caution'), color: "text-yellow-600" };
        if (s <= 8) return { level: t('health.level.warning'), color: "text-orange-600" };
        return { level: t('health.level.danger'), color: "text-red-600" };
    }

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-pink-400 to-pink-600">
                <div className="flex items-center space-x-3">
                    <ShieldAlert size={28} />
                    <h2 className="text-2xl font-bold">{t('tool.health_risk')} {t('suffix.calculator')}</h2>
                </div>
                <p className="mt-1 opacity-90">{t('health.desc.health_risk')}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <SelectModal
                    label={t('health.label.smoking')}
                    options={binaryOptions}
                    value={answers.smoking}
                    onChange={val => setAnswers(p => ({ ...p, smoking: Number(val) }))}
                    colorClass="text-pink-600"
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('health.label.exercise_freq')}</label>
                    <input type="number" value={answers.exercise} onChange={e => setAnswers(p => ({ ...p, exercise: Number(e.target.value) }))} className="w-full p-3 border border-gray-300 rounded-lg text-center font-bold" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('health.label.diet_freq')}</label>
                    <input type="number" value={answers.diet} onChange={e => setAnswers(p => ({ ...p, diet: Number(e.target.value) }))} className="w-full p-3 border border-gray-300 rounded-lg text-center font-bold" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('health.label.bmi')}</label>
                    <input type="number" value={answers.bmi} onChange={e => setAnswers(p => ({ ...p, bmi: Number(e.target.value) }))} className="w-full p-3 border border-gray-300 rounded-lg text-center font-bold" />
                </div>

                <SelectModal
                    label={t('health.label.family_history')}
                    options={binaryOptions}
                    value={answers.familyHistory}
                    onChange={val => setAnswers(p => ({ ...p, familyHistory: Number(val) }))}
                    colorClass="text-pink-600"
                />

                <button onClick={handleCalculate} className="w-full p-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    {t('common.calculate')}
                </button>
            </div>

            <AdBanner />

            {riskScore !== null && (
                <div className="p-6 bg-gray-50 rounded-xl text-center animate-in fade-in zoom-in-95 duration-500">
                    <p className="text-sm text-gray-500 font-bold">{t('health.result.risk_level')}</p>
                    <p className={`text-6xl font-black my-2 ${getInterpretation(riskScore).color}`}>{getInterpretation(riskScore).level}</p>
                    <p className="text-[10px] text-gray-400 font-bold mt-4">{t('health.msg.medical_disclaimer')}</p>
                </div>
            )}
        </div>
    );
};

export default HealthRiskCalculator;
