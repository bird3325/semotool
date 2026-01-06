
import React, { useState } from 'react';
import { BrainCircuit } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import SelectModal from '../ui/SelectModal';

const questions = [
    "중요한 일을 통제할 수 없다고 느낀 적이 얼마나 있었나요?",
    "자신감을 잃은 적이 얼마나 있었나요?",
    "일이 당신의 뜻대로 진행되지 않는다고 느낀 적이 얼마나 있었나요?",
    "당신의 통제 범위를 벗어난 일 때문에 화가 난 적이 얼마나 있었나요?",
    "어려움이 너무 많이 쌓여 극복할 수 없다고 느낀 적이 얼마나 있었나요?",
];

const stressOptions = [
    { value: 0, label: "전혀 없음 (0점)" },
    { value: 1, label: "거의 없음 (1점)" },
    { value: 2, label: "때때로 (2점)" },
    { value: 3, label: "자주 (3점)" },
    { value: 4, label: "매우 자주 (4점)" },
];

const StressLevelCalculator: React.FC = () => {
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
        if (s <= maxScore * 0.25) return "낮은 스트레스";
        if (s <= maxScore * 0.5) return "보통 스트레스";
        if (s <= maxScore * 0.75) return "높은 스트레스";
        return "매우 높은 스트레스";
    }

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-pink-400 to-pink-600">
                <div className="flex items-center space-x-3">
                    <BrainCircuit size={28} />
                    <h2 className="text-2xl font-bold">스트레스 수치 측정</h2>
                </div>
                <p className="mt-1 opacity-90">지난 한 달간의 경험을 바탕으로 답변해주세요.</p>
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
                    결과 보기
                </button>
            </div>

            <AdBanner />

            {score !== null && (
                <div className="p-6 bg-gray-50 rounded-xl text-center animate-in fade-in zoom-in-95 duration-500">
                    <p className="text-sm text-gray-500 font-bold">당신의 스트레스 점수는</p>
                    <p className="text-6xl font-black text-blue-600 my-2">{score} / {questions.length * 4}</p>
                    <p className="text-xl font-black text-gray-800">{getInterpretation(score)}</p>
                    <p className="text-[10px] text-gray-400 font-bold mt-4">※ 이 평가는 의학적 진단이 아니며, 전문가와 상담이 필요할 수 있습니다.</p>
                </div>
            )}
        </div>
    );
};

export default StressLevelCalculator;
