
import React, { useState } from 'react';
import { GlassWater } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import SelectModal from '../ui/SelectModal';

const activityLevels = [
    { name: '보통', multiplier: 1 },
    { name: '운동선수/활동량 많음', multiplier: 1.2 },
];

const activityOptions = activityLevels.map(level => ({
    value: level.multiplier,
    label: level.name
}));

const WaterIntakeCalculator: React.FC = () => {
    const [weight, setWeight] = useState('70');
    const [activity, setActivity] = useState(1);
    const [result, setResult] = useState<{ intake: number } | null>(null);

    const handleCalculate = () => {
        const w = parseFloat(weight);
        if (isNaN(w) || w <= 0) {
            setResult(null);
            return;
        }

        const baseIntake = w * 33; // Weight * 33ml
        const totalIntake = baseIntake * activity;
        
        setResult({ intake: totalIntake / 1000 }); // convert to Liters
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-pink-400 to-pink-600">
                <div className="flex items-center space-x-3">
                    <GlassWater size={28} />
                    <h2 className="text-2xl font-bold">하루 물 섭취량 계산기</h2>
                </div>
                <p className="mt-1 opacity-90">나에게 맞는 하루 권장 물 섭취량을 알아보세요.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">몸무게 (kg)</label>
                    <input
                        type="number"
                        value={weight}
                        onChange={e => setWeight(e.target.value)}
                        placeholder="예: 70"
                        className="w-full p-4 border border-gray-300 rounded-lg text-2xl font-bold text-center outline-none focus:ring-2 focus:ring-pink-500"
                    />
                </div>
                
                <SelectModal 
                    label="활동 수준"
                    options={activityOptions}
                    value={activity}
                    onChange={setActivity}
                    colorClass="text-pink-600"
                />

                <button onClick={handleCalculate} className="w-full p-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    계산하기
                </button>
            </div>

            <AdBanner />

            {result && (
                <div className="p-6 bg-gray-50 rounded-xl text-center">
                    <p className="text-sm text-gray-500">하루 권장 물 섭취량</p>
                    <p className="text-5xl font-bold text-blue-600 my-2">{result.intake.toFixed(2)} L</p>
                    <p className="text-xs text-gray-500 text-center pt-2">※ 개인의 건강 상태에 따라 달라질 수 있습니다.</p>
                </div>
            )}
        </div>
    );
};

export default WaterIntakeCalculator;
