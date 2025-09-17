
import React, { useState } from 'react';
import { ClipboardEdit } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

const GradePredictor: React.FC = () => {
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
        if (score > 100) return "목표 달성이 어려울 수 있습니다.";
        if (score < 0) return "이미 목표를 달성했습니다!";
        return null;
    }

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-rose-400 to-rose-600">
                <div className="flex items-center space-x-3">
                    <ClipboardEdit size={28} />
                    <h2 className="text-2xl font-bold">성적 예측 계산기</h2>
                </div>
                <p className="mt-1 opacity-90">목표 성적을 위해 필요한 기말고사 점수를 계산합니다.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">현재까지 평균 점수 (%)</label>
                    <input type="number" value={currentGrade} onChange={e => setCurrentGrade(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">현재까지 성적의 비중 (%)</label>
                    <input type="number" value={currentWeight} onChange={e => setCurrentWeight(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">목표하는 최종 성적 (%)</label>
                    <input type="number" value={desiredGrade} onChange={e => setDesiredGrade(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg" />
                </div>
                <button onClick={handleCalculate} className="w-full p-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    계산하기
                </button>
            </div>

            <AdBanner />

            {result && (
                <div className="p-6 bg-gray-50 rounded-xl text-center">
                    <p className="text-sm text-gray-500">남은 시험(과제)에서 필요한 점수</p>
                    <p className="text-5xl font-bold text-blue-600 my-2">{result.requiredScore.toFixed(2)}점</p>
                    <p className="text-md text-gray-700">
                        (남은 시험 비중: {result.finalExamWeight}%)
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
