import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ClipboardCheck } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import SelectModal from '../ui/SelectModal';

type Gender = 'male' | 'female';

const VisceralFatCalculator: React.FC = () => {
    const { t } = useTranslation();
    const [gender, setGender] = useState<Gender>('male');
    const [waist, setWaist] = useState('90');
    const [result, setResult] = useState<{ level: string; color: string } | null>(null);

    const genderOptions = [
        { value: 'male', label: t('health.opt.male') },
        { value: 'female', label: t('health.opt.female') }
    ];

    const getInterpretation = (waistCm: number, gender: Gender) => {
        if (gender === 'male') {
            if (waistCm < 90) return { level: t('health.level.healthy'), color: "text-green-600" };
            if (waistCm < 100) return { level: t('health.level.caution'), color: "text-yellow-600" };
            return { level: t('health.level.danger'), color: "text-red-600" };
        } else { // female
            if (waistCm < 85) return { level: t('health.level.healthy'), color: "text-green-600" };
            if (waistCm < 90) return { level: t('health.level.caution'), color: "text-yellow-600" };
            return { level: t('health.level.danger'), color: "text-red-600" };
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
                    <h2 className="text-2xl font-bold">{t('tool.visceral_fat')} {t('suffix.calculator')}</h2>
                </div>
                <p className="mt-1 opacity-90">{t('health.desc.visceral_fat')}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <SelectModal
                    label={t('health.label.gender')}
                    options={genderOptions}
                    value={gender}
                    onChange={val => setGender(val as Gender)}
                    colorClass="text-pink-600"
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('health.label.waist')}</label>
                    <input
                        type="number"
                        value={waist}
                        onChange={e => setWaist(e.target.value)}
                        placeholder="90"
                        className="w-full p-4 border border-gray-300 rounded-lg text-2xl text-center font-black outline-none focus:ring-2 focus:ring-pink-500"
                    />
                </div>
                <button onClick={handleCalculate} className="w-full p-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    {t('common.calculate')}
                </button>
            </div>

            <AdBanner />

            {result && (
                <div className="p-6 bg-gray-50 rounded-xl text-center animate-in fade-in zoom-in-95 duration-500">
                    <p className="text-sm text-gray-500 font-bold">{t('health.result.visceral_fat_risk')}</p>
                    <p className={`text-6xl font-black my-2 ${result.color}`}>{result.level}</p>
                    <p className="text-[10px] text-gray-400 font-bold mt-4">{t('health.msg.medical_disclaimer')}</p>
                </div>
            )}
        </div>
    );
};

export default VisceralFatCalculator;
