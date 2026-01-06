
import React, { useState } from 'react';
import { ClipboardCheck } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import SelectModal from '../ui/SelectModal';

type Gender = 'male' | 'female';

const genderOptions = [
    { value: 'male', label: '남성' },
    { value: 'female', label: '여성' }
];

const VisceralFatCalculator: React.FC = () => {
    const [gender, setGender] = useState<Gender>('male');
    const [waist, setWaist] = useState('90');
    const [result, setResult] = useState<{ level: string; color: string } | null>(null);

    const getInterpretation = (waistCm: number, gender: Gender) => {
        if (gender === 'male') {
            if (waistCm < 90) return { level: "건강", color: "text-green-600" };
            if (waistCm < 100) return { level: "주의", color: "text-yellow-600" };
            return { level: "위험", color: "text-red-600" };
        } else { // female
            if (waistCm < 85) return { level: "건강", color: "text-green-600" };
            if (waistCm < 90) return { level: "주의", color: "text-yellow-600" };
            return { level: "위험", color: "text-red-600" };
        }
    };

    const handleCalculate = () => {
        const w = parseFloat(waist);
        if (isNaN(w) || w <= 0) {
            setResult(null);
            return;
        }
        setResult(getInterpretation(w, gender));
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-pink-400 to-pink-600">
                <div className="flex items-center space-x-3">
                    <ClipboardCheck size={28} />
                    <h2 className="text-2xl font-bold">내장 지방 계산기</h2>
                </div>
                <p className="mt-1 opacity-90">허리 둘레로 내장 지방 위험도를 확인하세요.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <SelectModal 
                    label="성별"
                    options={genderOptions}
                    value={gender}
                    onChange={setGender}
                    colorClass="text-pink-600"
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">허리 둘레 (cm)</label>
                    <input
                        type="number"
                        value={waist}
                        onChange={e => setWaist(e.target.value)}
                        placeholder="예: 90"
                        className="w-full p-4 border border-gray-300 rounded-lg text-2xl text-center font-black outline-none focus:ring-2 focus:ring-pink-500"
                    />
                </div>
                <button onClick={handleCalculate} className="w-full p-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    결과 확인하기
                </button>
            </div>

            <AdBanner />

            {result && (
                <div className="p-6 bg-gray-50 rounded-xl text-center animate-in fade-in zoom-in-95 duration-500">
                    <p className="text-sm text-gray-500 font-bold">내장 지방 위험도</p>
                    <p className={`text-6xl font-black my-2 ${result.color}`}>{result.level}</p>
                    <p className="text-[10px] text-gray-400 font-bold mt-4">※ 이 평가는 의학적 진단이 아니며, 참고용으로만 사용하세요.</p>
                </div>
            )}
        </div>
    );
};

export default VisceralFatCalculator;
