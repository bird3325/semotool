import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PersonStanding } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import SelectModal from '../ui/SelectModal';

type Gender = 'male' | 'female';

const BodyFatCalculator: React.FC = () => {
    const { t } = useTranslation();
    const [gender, setGender] = useState<Gender>('male');
    const [height, setHeight] = useState('175');
    const [neck, setNeck] = useState('38');
    const [waist, setWaist] = useState('85');
    const [hip, setHip] = useState('95');
    const [result, setResult] = useState<{ bodyFat: number; interpretation: string } | null>(null);

    const genderOptions = [
        { value: 'male', label: t('health.opt.male') },
        { value: 'female', label: t('health.opt.female') }
    ];

    const getInterpretation = (bfp: number, gender: Gender) => {
        if (gender === 'male') {
            if (bfp < 6) return t('health.level.essential_fat');
            if (bfp < 14) return t('health.level.athlete');
            if (bfp < 18) return t('health.level.healthy');
            if (bfp < 25) return t('health.level.average');
            return t('health.level.obese');
        } else {
            if (bfp < 14) return t('health.level.essential_fat');
            if (bfp < 21) return t('health.level.athlete');
            if (bfp < 25) return t('health.level.healthy');
            if (bfp < 32) return t('health.level.average');
            return t('health.level.obese');
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
                    <h2 className="text-2xl font-bold">{t('tool.body_fat')} {t('suffix.calculator')}</h2>
                </div>
                <p className="mt-1 opacity-90">{t('health.desc.body_fat')}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <SelectModal
                    label={t('health.label.gender')}
                    options={genderOptions}
                    value={gender}
                    onChange={val => setGender(val as Gender)}
                    colorClass="text-pink-600"
                />

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">{t('health.label.height')}</label>
                        <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">{t('health.label.neck')}</label>
                        <input type="number" value={neck} onChange={e => setNeck(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">{t('health.label.waist')}</label>
                        <input type="number" value={waist} onChange={e => setWaist(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    {gender === 'female' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">{t('health.label.hip')}</label>
                            <input type="number" value={hip} onChange={e => setHip(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" />
                        </div>
                    )}
                </div>
                <button onClick={handleCalculate} className="w-full p-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    {t('common.calculate')}
                </button>
            </div>

            <AdBanner />

            {result && (
                <div className="p-6 bg-gray-50 rounded-xl text-center">
                    <p className="text-sm text-gray-500">{t('health.result.body_fat')}</p>
                    <p className="text-5xl font-bold text-blue-600 my-2">{result.bodyFat.toFixed(1)}%</p>
                    <p className="text-xl font-semibold text-gray-800">{result.interpretation}</p>
                    <p className="text-xs text-gray-500 text-center pt-2">{t('health.msg.navy_method')}</p>
                </div>
            )}
        </div>
    );
};

export default BodyFatCalculator;
