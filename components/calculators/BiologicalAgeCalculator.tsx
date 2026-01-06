
import React, { useState } from 'react';
import { Cake } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import SelectModal from '../ui/SelectModal';

const smokingOptions = [
    { value: 'non-smoker', label: '비흡연' },
    { value: 'smoker', label: '흡연' },
];

const exerciseOptions = [
    { value: 'regular', label: '규칙적 (주3회 이상)' },
    { value: 'moderate', label: '보통 (주1-2회)' },
    { value: 'low', label: '거의 안함' },
];

const dietOptions = [
    { value: 'good', label: '건강함 (채소/과일 위주)' },
    { value: 'average', label: '보통' },
    { value: 'poor', label: '불량함 (인스턴트 위주)' },
];

const stressOptions = [
    { value: 'low', label: '낮음' },
    { value: 'medium', label: '보통' },
    { value: 'high', label: '높음' },
];

const sleepOptions = [
    { value: '>8', label: '8시간 초과' },
    { value: '7-8', label: '7-8시간' },
    { value: '<6', label: '6시간 미만' },
];

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
                    <label className="block text-sm font-medium text-gray-700 mb-2">현재 나이: <span className="text-pink-600 font-bold">{chronoAge}세</span></label>
                    <input type="range" min="20" max="80" value={chronoAge} onChange={e => setChronoAge(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500" />
                </div>

                <SelectModal 
                    label="흡연 여부"
                    options={smokingOptions}
                    value={lifestyle.smoking}
                    onChange={val => setLifestyle(p => ({...p, smoking: val}))}
                    colorClass="text-pink-600"
                />

                <SelectModal 
                    label="운동 습관"
                    options={exerciseOptions}
                    value={lifestyle.exercise}
                    onChange={val => setLifestyle(p => ({...p, exercise: val}))}
                    colorClass="text-pink-600"
                />

                <SelectModal 
                    label="식습관"
                    options={dietOptions}
                    value={lifestyle.diet}
                    onChange={val => setLifestyle(p => ({...p, diet: val}))}
                    colorClass="text-pink-600"
                />

                <SelectModal 
                    label="스트레스 수준"
                    options={stressOptions}
                    value={lifestyle.stress}
                    onChange={val => setLifestyle(p => ({...p, stress: val}))}
                    colorClass="text-pink-600"
                />

                <SelectModal 
                    label="평균 수면 시간"
                    options={sleepOptions}
                    value={lifestyle.sleep}
                    onChange={val => setLifestyle(p => ({...p, sleep: val}))}
                    colorClass="text-pink-600"
                />

                <button onClick={handleCalculate} className="w-full p-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    나이 예측하기
                </button>
            </div>

            <AdBanner />

            {bioAge !== null && (
                 <div className="p-6 bg-gray-50 rounded-xl text-center animate-in fade-in zoom-in-95 duration-500">
                    <p className="text-sm text-gray-500 font-bold">예상 생체 나이는</p>
                    <p className="text-6xl font-black text-blue-600 my-2">{bioAge}세</p>
                    <p className="text-xl font-black text-gray-800">
                        {bioAge < chronoAge && `실제 나이보다 ${chronoAge - bioAge}세 젊습니다!`}
                        {bioAge > chronoAge && `실제 나이보다 ${bioAge - chronoAge}세 많습니다.`}
                        {bioAge === chronoAge && `실제 나이와 같습니다.`}
                    </p>
                    <p className="text-[10px] text-gray-400 font-bold mt-4">※ 재미로 보는 예측이며, 의학적 근거가 부족합니다.</p>
                </div>
            )}
        </div>
    );
};

export default BiologicalAgeCalculator;
