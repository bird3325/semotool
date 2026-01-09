import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRightLeft } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

const getGradeFromScore = (score: number) => {
    if (score >= 95) return { grade: 'A+', gpa: 4.5 };
    if (score >= 90) return { grade: 'A', gpa: 4.0 };
    if (score >= 85) return { grade: 'B+', gpa: 3.5 };
    if (score >= 80) return { grade: 'B', gpa: 3.0 };
    if (score >= 75) return { grade: 'C+', gpa: 2.5 };
    if (score >= 70) return { grade: 'C', gpa: 2.0 };
    if (score >= 65) return { grade: 'D+', gpa: 1.5 };
    if (score >= 60) return { grade: 'D', gpa: 1.0 };
    return { grade: 'F', gpa: 0.0 };
};

const GradeConverter: React.FC = () => {
    const { t } = useTranslation();
    const [score, setScore] = useState('95');
    const [result, setResult] = useState<{ grade: string; gpa: number } | null>(null);

    const handleConvert = () => {
        const numScore = parseFloat(score);
        if (isNaN(numScore) || numScore < 0 || numScore > 100) {
            setResult(null);
            return;
        }
        setResult(getGradeFromScore(numScore));
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-rose-400 to-rose-600">
                <div className="flex items-center space-x-3">
                    <ArrowRightLeft size={28} />
                    <h2 className="text-2xl font-bold">{t('tool.grade_converter')} {t('suffix.calculator')}</h2>
                </div>
                <p className="mt-1 opacity-90">{t('school.grade_converter.desc')}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">{t('school.grade_converter.label_score')}</label>
                    <input
                        type="number"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        placeholder={t('school.grade_converter.placeholder_score')}
                        className="w-full p-3 border border-gray-300 rounded-lg text-lg text-center"
                    />
                </div>
                <button onClick={handleConvert} className="w-full p-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    {t('school.grade_converter.btn_convert')}
                </button>
            </div>

            <AdBanner />

            {result && (
                <div className="p-6 bg-gray-50 rounded-xl text-center">
                    <p className="text-sm text-gray-500">{t('school.grade_converter.result_header')}</p>
                    <p className="text-5xl font-bold text-blue-600 my-2">{result.grade}</p>
                    <p className="text-xl font-semibold text-gray-800">{t('school.grade_converter.result_gpa', { gpa: result.gpa.toFixed(1) })}</p>
                </div>
            )}
        </div>
    );
};

export default GradeConverter;
