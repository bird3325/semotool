import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ClipboardEdit } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

const GradePredictor: React.FC = () => {
    const { t } = useTranslation();
    const [currentGrade, setCurrentGrade] = useState('85');
    const [currentWeight, setCurrentWeight] = useState('70');
    const [desiredGrade, setDesiredGrade] = useState('90');
    const [result, setResult] = useState<{ requiredScore: number; finalExamWeight: number } | null>(null);

    const handleCalculate = () => {
        const curGrade = parseFloat(currentGrade);
        const curWeight = parseFloat(currentWeight);
        const desGrade = parseFloat(desiredGrade);

        if (isNaN(curGrade) || isNaN(curWeight) || isNaN(desGrade) || curWeight < 0 || curWeight >= 100) {
            setResult(null);
            return;
        }

        const finalExamWeight = 100 - curWeight;
        if (finalExamWeight <= 0) {
            setResult(null); // Cannot calculate if final exam has no weight
            return;
        }

        const requiredScore = (desGrade - (curGrade * (curWeight / 100))) / (finalExamWeight / 100);
        setResult({ requiredScore, finalExamWeight });
    };

    const getInterpretation = (score: number) => {
        if (score > 100) return t('school.grade_predictor.msg_hard');
        if (score < 0) return t('school.grade_predictor.msg_achieved');
        return null;
    }

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-rose-400 to-rose-600">
                <div className="flex items-center space-x-3">
                    <ClipboardEdit size={28} />
                    <h2 className="text-2xl font-bold">{t('tool.grade-predictor')} {t('suffix.calculator')}</h2>
                </div>
                <p className="mt-1 opacity-90">{t('school.grade_predictor.desc')}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">{t('school.grade_predictor.label_current_score')}</label>
                    <input type="number" value={currentGrade} onChange={e => setCurrentGrade(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">{t('school.grade_predictor.label_current_weight')}</label>
                    <input type="number" value={currentWeight} onChange={e => setCurrentWeight(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">{t('school.grade_predictor.label_target_score')}</label>
                    <input type="number" value={desiredGrade} onChange={e => setDesiredGrade(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg" />
                </div>
                <button onClick={handleCalculate} className="w-full p-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    {t('common.calculate')}
                </button>
            </div>

            <AdBanner />

            {result && (
                <div className="p-6 bg-gray-50 rounded-xl text-center">
                    <p className="text-sm text-gray-500">{t('school.grade_predictor.result_required_score')}</p>
                    <p className="text-5xl font-bold text-blue-600 my-2">{result.requiredScore.toFixed(2)}</p>
                    <p className="text-md text-gray-700">
                        {t('school.grade_predictor.result_remaining_weight', { weight: result.finalExamWeight })}
                    </p>
                    {getInterpretation(result.requiredScore) && (
                        <p className="text-sm font-semibold text-red-500 mt-2">{getInterpretation(result.requiredScore)}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default GradePredictor;
