
import React, { useState } from 'react';
import { PersonStanding } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

type Gender = 'male' | 'female';

const BodyFatCalculator: React.FC = () => {
    const [gender, setGender] = useState<Gender>('male');
    const [height, setHeight] = useState('175');
    const [neck, setNeck] = useState('38');
    const [waist, setWaist] = useState('85');
    const [hip, setHip] = useState('95');
    const [result, setResult] = useState<{ bodyFat: number; interpretation: string } | null>(null);

    const getInterpretation = (bfp: number, gender: Gender) => {
        if (gender === 'male') {
            if (bfp < 6) return "필수 지방";
            if (bfp < 14) return "운동선수";
            if (bfp < 18) return "건강한";
            if (bfp < 25) return "평균";
            return "비만";
        } else {
            if (bfp < 14) return "필수 지방";
            if (bfp < 21) return "운동선수";
            if (bfp < 25) return "건강한";
            if (bfp < 32) return "평균";
            return "비만";
        }
    };

    const handleCalculate = () => {
        const h = parseFloat(height);
        const n = parseFloat(neck);
        const w = parseFloat(waist);
        const p = parseFloat(hip);

        if (isNaN(h) || isNaN(n) || isNaN(w) || (gender === 'female' && isNaN(p))) {
            setResult(null);
            return;
        }

        let bodyFat = 0;
        if (gender === 'male') {
            bodyFat = 86.010 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
        } else {
            bodyFat = 163.205 * Math.log10(w + p - n) - 97.684 * Math.log10(h) - 78.387;
        }

        if (bodyFat < 0 || !isFinite(bodyFat)) {
            setResult(null);
            return;
        }

        setResult({
            bodyFat,
            interpretation: getInterpretation(bodyFat, gender)
        });
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-pink-400 to-pink-600">
                <div className="flex items-center space-x-3">
                    <PersonStanding size={28} />
                    <h2 className="text-2xl font-bold">체지방률 계산기</h2>
                </div>
                <p className="mt-1 opacity-90">신체 측정치 기반 체지방률 예측</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div className="flex justify-center space-x-4">
                    <button onClick={() => setGender('male')} className={`px-6 py-2 rounded-full font-semibold ${gender === 'male' ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700'}`}>남성</button>
                    <button onClick={() => setGender('female')} className={`px-6 py-2 rounded-full font-semibold ${gender === 'female' ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700'}`}>여성</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">신장 (cm)</label>
                        <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">목 둘레 (cm)</label>
                        <input type="number" value={neck} onChange={e => setNeck(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">허리 둘레 (cm)</label>
                        <input type="number" value={waist} onChange={e => setWaist(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    {gender === 'female' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">엉덩이 둘레 (cm)</label>
                            <input type="number" value={hip} onChange={e => setHip(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" />
                        </div>
                    )}
                </div>
                <button onClick={handleCalculate} className="w-full p-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    계산하기
                </button>
            </div>

            <AdBanner />

            {result && (
                <div className="p-6 bg-gray-50 rounded-xl text-center">
                    <p className="text-sm text-gray-500">예상 체지방률</p>
                    <p className="text-5xl font-bold text-blue-600 my-2">{result.bodyFat.toFixed(1)}%</p>
                    <p className="text-xl font-semibold text-gray-800">{result.interpretation}</p>
                    <p className="text-xs text-gray-500 text-center pt-2">※ 미 해군 방식 계산법으로, 실제와 차이가 있을 수 있습니다.</p>
                </div>
            )}
        </div>
    );
};

export default BodyFatCalculator;
