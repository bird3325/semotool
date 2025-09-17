
import React, { useState } from 'react';
import { Flame } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

type Gender = 'male' | 'female';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';

const activityLevels: { key: ActivityLevel, name: string, multiplier: number }[] = [
    { key: 'sedentary', name: '거의 없음', multiplier: 1.2 },
    { key: 'light', name: '가벼운 활동 (주 1-3일)', multiplier: 1.375 },
    { key: 'moderate', name: '보통 활동 (주 3-5일)', multiplier: 1.55 },
    { key: 'active', name: '적극적인 활동 (주 6-7일)', multiplier: 1.725 },
    { key: 'veryActive', name: '매우 적극적인 활동', multiplier: 1.9 },
];

const MetabolismCalculator: React.FC = () => {
    const [gender, setGender] = useState<Gender>('male');
    const [age, setAge] = useState('30');
    const [height, setHeight] = useState('175');
    const [weight, setWeight] = useState('70');
    const [activityLevel, setActivityLevel] = useState<ActivityLevel>('light');
    const [result, setResult] = useState<{ bmr: number; tdee: number } | null>(null);

    const handleCalculate = () => {
        const ageNum = parseInt(age, 10);
        const heightNum = parseFloat(height);
        const weightNum = parseFloat(weight);

        if (isNaN(ageNum) || isNaN(heightNum) || isNaN(weightNum) || ageNum <= 0 || heightNum <= 0 || weightNum <= 0) {
            setResult(null);
            return;
        }

        // Mifflin-St Jeor Equation
        let bmr = (10 * weightNum) + (6.25 * heightNum) - (5 * ageNum);
        if (gender === 'male') {
            bmr += 5;
        } else {
            bmr -= 161;
        }
        
        const activity = activityLevels.find(level => level.key === activityLevel);
        const tdee = bmr * (activity?.multiplier || 1.375);

        setResult({ bmr, tdee });
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-pink-400 to-pink-600">
                <div className="flex items-center space-x-3">
                    <Flame size={28} />
                    <h2 className="text-2xl font-bold">기초/활동대사량</h2>
                </div>
                <p className="mt-1 opacity-90">하루 권장 칼로리 계산 (BMR, TDEE)</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div className="flex justify-center space-x-4">
                    <button onClick={() => setGender('male')} className={`px-6 py-2 rounded-full font-semibold ${gender === 'male' ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700'}`}>남성</button>
                    <button onClick={() => setGender('female')} className={`px-6 py-2 rounded-full font-semibold ${gender === 'female' ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700'}`}>여성</button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2 text-center">나이</label>
                        <input type="number" value={age} onChange={e => setAge(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-center" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2 text-center">신장(cm)</label>
                        <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-center" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2 text-center">체중(kg)</label>
                        <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-center" />
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">활동 수준</label>
                    <select value={activityLevel} onChange={e => setActivityLevel(e.target.value as ActivityLevel)} className="w-full p-3 border border-gray-300 rounded-lg bg-white text-base">
                        {activityLevels.map(level => (
                            <option key={level.key} value={level.key}>{level.name}</option>
                        ))}
                    </select>
                </div>
                <button onClick={handleCalculate} className="w-full p-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    계산하기
                </button>
            </div>

            <AdBanner />

            {result && (
                <div className="p-6 bg-gray-50 rounded-xl text-left space-y-3">
                    <h3 className="text-lg font-bold text-center mb-4">계산 결과</h3>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">기초대사량 (BMR)</span>
                        <span className="font-semibold">{Math.round(result.bmr).toLocaleString()} kcal</span>
                    </div>
                    <hr className="my-2"/>
                    <div className="flex justify-between items-center text-blue-600">
                        <span className="text-lg font-bold">활동대사량 (TDEE)</span>
                        <span className="font-bold text-2xl">{Math.round(result.tdee).toLocaleString()} kcal</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MetabolismCalculator;