
import React, { useState } from 'react';
import { Cake } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

const BiologicalAgeCalculator: React.FC = () => {
    const [chronoAge, setChronoAge] = useState(35);
    const [lifestyle, setLifestyle] = useState({
        smoking: 'non-smoker',
        exercise: 'moderate',
        diet: 'average',
        stress: 'medium',
        sleep: '7-8',
    });
    const [bioAge, setBioAge] = useState<number | null>(null);

    const handleCalculate = () => {
        let age = chronoAge;
        
        // Smoking
        if (lifestyle.smoking === 'smoker') age += 5;
        // Exercise
        if (lifestyle.exercise === 'regular') age -= 3;
        if (lifestyle.exercise === 'low') age += 3;
        // Diet
        if (lifestyle.diet === 'good') age -= 2;
        if (lifestyle.diet === 'poor') age += 3;
        // Stress
        if (lifestyle.stress === 'high') age += 2;
        if (lifestyle.stress === 'low') age -= 1;
        // Sleep
        if (lifestyle.sleep === '<6') age += 2;
        if (lifestyle.sleep === '>8') age -= 1;

        setBioAge(age);
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-pink-400 to-pink-600">
                <div className="flex items-center space-x-3">
                    <Cake size={28} />
                    <h2 className="text-2xl font-bold">생체 나이 예측</h2>
                </div>
                <p className="mt-1 opacity-90">생활 습관으로 알아보는 나의 생체 나이</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">현재 나이: {chronoAge}세</label>
                    <input type="range" min="20" max="80" value={chronoAge} onChange={e => setChronoAge(Number(e.target.value))} className="w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">흡연 여부</label>
                    <select value={lifestyle.smoking} onChange={e => setLifestyle(p => ({...p, smoking: e.target.value}))} className="w-full p-2 border rounded">
                        <option value="non-smoker">비흡연</option>
                        <option value="smoker">흡연</option>
                    </select>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">운동 습관</label>
                    <select value={lifestyle.exercise} onChange={e => setLifestyle(p => ({...p, exercise: e.target.value}))} className="w-full p-2 border rounded">
                        <option value="regular">규칙적 (주3회 이상)</option>
                        <option value="moderate">보통 (주1-2회)</option>
                        <option value="low">거의 안함</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">식습관</label>
                    <select value={lifestyle.diet} onChange={e => setLifestyle(p => ({...p, diet: e.target.value}))} className="w-full p-2 border rounded">
                        <option value="good">건강함 (채소/과일 위주)</option>
                        <option value="average">보통</option>
                        <option value="poor">불량함 (인스턴트/가공식품 위주)</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">스트레스 수준</label>
                    <select value={lifestyle.stress} onChange={e => setLifestyle(p => ({...p, stress: e.target.value}))} className="w-full p-2 border rounded">
                        <option value="low">낮음</option>
                        <option value="medium">보통</option>
                        <option value="high">높음</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">평균 수면 시간</label>
                    <select value={lifestyle.sleep} onChange={e => setLifestyle(p => ({...p, sleep: e.target.value}))} className="w-full p-2 border rounded">
                        <option value=">8">8시간 초과</option>
                        <option value="7-8">7-8시간</option>
                        <option value="<6">6시간 미만</option>
                    </select>
                </div>
                <button onClick={handleCalculate} className="w-full p-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    나이 예측하기
                </button>
            </div>

            <AdBanner />

            {bioAge !== null && (
                 <div className="p-6 bg-gray-50 rounded-xl text-center">
                    <p className="text-sm text-gray-500">예상 생체 나이는</p>
                    <p className="text-5xl font-bold text-blue-600 my-2">{bioAge}세</p>
                    <p className="text-xl font-semibold text-gray-800">
                        {bioAge < chronoAge && `실제 나이보다 ${chronoAge - bioAge}세 젊습니다!`}
                        {bioAge > chronoAge && `실제 나이보다 ${bioAge - chronoAge}세 많습니다.`}
                        {bioAge === chronoAge && `실제 나이와 같습니다.`}
                    </p>
                    <p className="text-xs text-gray-500 text-center pt-2">※ 재미로 보는 예측이며, 의학적 근거가 부족합니다.</p>
                </div>
            )}
        </div>
    );
};

export default BiologicalAgeCalculator;
