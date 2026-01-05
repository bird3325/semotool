
import React, { useState } from 'react';
import { Wind } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import SelectModal from '../ui/SelectModal';

type Gender = 'male' | 'female';

const genderOptions = [
  { value: 'male', label: '남성' },
  { value: 'female', label: '여성' }
];

const VO2MaxCalculator: React.FC = () => {
    const [gender, setGender] = useState<Gender>('male');
    const [age, setAge] = useState('35');
    const [restingHR, setRestingHR] = useState('70');
    const [result, setResult] = useState<{ vo2max: number, interpretation: string } | null>(null);

    // Classification based on ACSM guidelines (simplified)
    const getInterpretation = (vo2max: number, age: number, gender: Gender) => {
        // Simplified chart, can be expanded
        const ageRanges = [[20, 29], [30, 39], [40, 49], [50, 59], [60, 69]];
        const maleChart = [
            [36, 42, 47, 52], // 20-29: Fair, Good, Excellent, Superior
            [34, 40, 45, 50], // 30-39
            [32, 38, 43, 48], // 40-49
            [30, 36, 41, 46], // 50-59
            [28, 34, 39, 44]  // 60-69
        ];
        const femaleChart = [
            [29, 35, 40, 45],
            [28, 33, 38, 43],
            [26, 31, 36, 41],
            [24, 29, 34, 39],
            [22, 27, 32, 37]
        ];

        const chart = gender === 'male' ? maleChart : femaleChart;
        const ageIndex = ageRanges.findIndex(range => age >= range[0] && age <= range[1]);

        if (ageIndex === -1) return "해당 연령대 데이터 없음";
        
        const levels = chart[ageIndex];
        if (vo2max < levels[0]) return "매우 낮음";
        if (vo2max < levels[1]) return "낮음";
        if (vo2max < levels[2]) return "보통";
        if (vo2max < levels[3]) return "좋음";
        return "매우 좋음";
    }

    const handleCalculate = () => {
        const ageNum = parseInt(age, 10);
        const rhr = parseInt(restingHR, 10);

        if (isNaN(ageNum) || isNaN(rhr) || ageNum <= 0 || rhr <= 0) {
            setResult(null);
            return;
        }

        // MHR = 220 - Age
        const mhr = 220 - ageNum;
        // VO2 Max = 15.3 x (MHR / RHR)
        const vo2max = 15.3 * (mhr / rhr);

        setResult({
            vo2max: vo2max,
            interpretation: getInterpretation(vo2max, ageNum, gender)
        });
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-pink-400 to-pink-600">
                <div className="flex items-center space-x-3">
                    <Wind size={28} />
                    <h2 className="text-2xl font-bold">최대산소섭취량 (VO2 Max)</h2>
                </div>
                <p className="mt-1 opacity-90">심폐지구력 수준을 예측합니다.</p>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">나이 (세)</label>
                    <input type="number" value={age} onChange={e => setAge(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">안정 시 심박수 (bpm)</label>
                    <input type="number" value={restingHR} onChange={e => setRestingHR(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" />
                </div>
                <button onClick={handleCalculate} className="w-full p-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    예측하기
                </button>
            </div>

            <AdBanner />

            {result && (
                <div className="p-6 bg-gray-50 rounded-xl text-center">
                    <p className="text-sm text-gray-500">예상 VO2 Max</p>
                    <p className="text-5xl font-bold text-blue-600 my-2">{result.vo2max.toFixed(2)}</p>
                    <p className="text-xl font-semibold text-gray-800">{result.interpretation}</p>
                    <p className="text-xs text-gray-500 text-center pt-2">※ 이 값은 추정치이며 실제 측정값과 다를 수 있습니다.</p>
                </div>
            )}
        </div>
    );
};

export default VO2MaxCalculator;
