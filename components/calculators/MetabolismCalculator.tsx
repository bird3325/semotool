import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flame } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import SelectModal from '../ui/SelectModal';

type Gender = 'male' | 'female';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';

const MetabolismCalculator: React.FC = () => {
    const { t } = useTranslation();
    const [gender, setGender] = useState<Gender>('male');
    const [age, setAge] = useState('30');
    const [height, setHeight] = useState('175');
    const [weight, setWeight] = useState('70');
    const [activityLevel, setActivityLevel] = useState<ActivityLevel>('light');
    const [result, setResult] = useState<{ bmr: number; tdee: number } | null>(null);

    const genderOptions = [
        { value: 'male', label: t('health.metabolism.opt_male') },
        { value: 'female', label: t('health.metabolism.opt_female') }
    ];

    const activityLevels: { key: ActivityLevel, name: string, multiplier: number }[] = [
        { key: 'sedentary', name: t('health.metabolism.opt_sedentary'), multiplier: 1.2 },
        { key: 'light', name: t('health.metabolism.opt_light'), multiplier: 1.375 },
        { key: 'moderate', name: t('health.metabolism.opt_moderate'), multiplier: 1.55 },
        { key: 'active', name: t('health.metabolism.opt_active'), multiplier: 1.725 },
        { key: 'veryActive', name: t('health.metabolism.opt_very_active'), multiplier: 1.9 },
    ];

    const activityOptions = activityLevels.map(level => ({
        value: level.key,
        label: level.name
    }));

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
                    <h2 className="text-2xl font-bold">{t('tool.calorie')} {t('suffix.calculator')}</h2>
                </div>
                <p className="mt-1 opacity-90">{t('health.desc.metabolism')}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <SelectModal
                    label={t('health.label.gender')}
                    options={genderOptions}
                    value={gender}
                    onChange={val => setGender(val as Gender)}
                    colorClass="text-pink-600"
                />

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2 text-center">{t('health.label.age')}</label>
                        <input type="number" value={age} onChange={e => setAge(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-center" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2 text-center">{t('health.label.height')}</label>
                        <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-center" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2 text-center">{t('health.label.weight')}</label>
                        <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-center" />
                    </div>
                </div>
                <div>
                    <SelectModal
                        label={t('health.label.activity_level')}
                        options={activityOptions}
                        value={activityLevel}
                        onChange={val => setActivityLevel(val as ActivityLevel)}
                        colorClass="text-pink-600"
                    />
                </div>
                <button onClick={handleCalculate} className="w-full p-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    {t('common.calculate')}
                </button>
            </div>

            <AdBanner />

            {result && (
                <div className="p-6 bg-gray-50 rounded-xl text-left space-y-3">
                    <h3 className="text-lg font-bold text-center mb-4">{t('finance.result.title_calc_result')}</h3>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">{t('health.result.bmr')}</span>
                        <span className="font-semibold">{Math.round(result.bmr).toLocaleString()} kcal</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between items-center text-blue-600">
                        <span className="text-lg font-bold">{t('health.result.tdee')}</span>
                        <span className="font-bold text-2xl">{Math.round(result.tdee).toLocaleString()} kcal</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MetabolismCalculator;
