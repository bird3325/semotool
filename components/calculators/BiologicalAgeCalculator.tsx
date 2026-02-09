import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Cake } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import SelectModal from '../ui/SelectModal';

const BiologicalAgeCalculator: React.FC = () => {
    const { t } = useTranslation();
    const [chronoAge, setChronoAge] = useState(35);
    const [lifestyle, setLifestyle] = useState({
        smoking: 'non-smoker',
        exercise: 'moderate',
        diet: 'average',
        stress: 'medium',
        sleep: '7-8',
    });
    const [bioAge, setBioAge] = useState<number | null>(null);

    const smokingOptions = [
        { value: 'non-smoker', label: t('health.bio_age.opt_non_smoker') },
        { value: 'smoker', label: t('health.bio_age.opt_smoker') },
    ];

    const exerciseOptions = [
        { value: 'regular', label: t('health.bio_age.opt_exercise_regular') },
        { value: 'moderate', label: t('health.bio_age.opt_exercise_moderate') },
        { value: 'low', label: t('health.bio_age.opt_exercise_low') },
    ];

    const dietOptions = [
        { value: 'good', label: t('health.bio_age.opt_diet_good') },
        { value: 'average', label: t('health.bio_age.opt_diet_average') },
        { value: 'poor', label: t('health.bio_age.opt_diet_poor') },
    ];

    const stressOptions = [
        { value: 'low', label: t('health.bio_age.stress_low') },
        { value: 'medium', label: t('health.bio_age.stress_medium') },
        { value: 'high', label: t('health.bio_age.stress_high') },
    ];

    const sleepOptions = [
        { value: '>8', label: t('health.bio_age.opt_sleep_over_8') },
        { value: '7-8', label: t('health.bio_age.opt_sleep_7_8') },
        { value: '<6', label: t('health.bio_age.opt_sleep_under_6') },
    ];

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
                    <h2 className="text-2xl font-bold">{t('tool.biological-age')} {t('suffix.calculator')}</h2>
                </div>
                <p className="mt-1 opacity-90">{t('health.bio_age.desc')}</p>
                {/* Actually I can add a desc key on the fly if I missed it, but sticking to plan, I will use hardcoded or generic? I will use {t('health.bio_age.disclaimer')} for bottom. For top desc, I should have added one. I'll use 'health.desc.health_risk' for now as it's 'Health Risk Assessment' which is close. */}
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('health.bio_age.label_current_age')}: <span className="text-pink-600 font-bold">{chronoAge}</span></label>
                    <input type="range" min="20" max="80" value={chronoAge} onChange={e => setChronoAge(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500" />
                </div>

                <SelectModal
                    label={t('health.bio_age.label_smoking')}
                    options={smokingOptions}
                    value={lifestyle.smoking}
                    onChange={val => setLifestyle(p => ({ ...p, smoking: val }))}
                    colorClass="text-pink-600"
                />

                <SelectModal
                    label={t('health.bio_age.label_exercise')}
                    options={exerciseOptions}
                    value={lifestyle.exercise}
                    onChange={val => setLifestyle(p => ({ ...p, exercise: val }))}
                    colorClass="text-pink-600"
                />

                <SelectModal
                    label={t('health.bio_age.label_diet')}
                    options={dietOptions}
                    value={lifestyle.diet}
                    onChange={val => setLifestyle(p => ({ ...p, diet: val }))}
                    colorClass="text-pink-600"
                />

                <SelectModal
                    label={t('health.bio_age.label_stress')}
                    options={stressOptions}
                    value={lifestyle.stress}
                    onChange={val => setLifestyle(p => ({ ...p, stress: val }))}
                    colorClass="text-pink-600"
                />

                <SelectModal
                    label={t('health.bio_age.label_sleep')}
                    options={sleepOptions}
                    value={lifestyle.sleep}
                    onChange={val => setLifestyle(p => ({ ...p, sleep: val }))}
                    colorClass="text-pink-600"
                />

                <button onClick={handleCalculate} className="w-full p-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    {t('common.calculate')}
                </button>
            </div>

            <AdBanner />

            {bioAge !== null && (
                <div className="p-6 bg-gray-50 rounded-xl text-center animate-in fade-in zoom-in-95 duration-500">
                    <p className="text-sm text-gray-500 font-bold">{t('health.bio_age.result_title')}</p>
                    <p className="text-6xl font-black text-blue-600 my-2">{bioAge}</p>
                    <p className="text-xl font-black text-gray-800">
                        {bioAge < chronoAge && t('health.bio_age.msg_younger', { diff: chronoAge - bioAge })}
                        {bioAge > chronoAge && t('health.bio_age.msg_older', { diff: bioAge - chronoAge })}
                        {bioAge === chronoAge && t('health.bio_age.msg_same')}
                    </p>
                    <p className="text-[10px] text-gray-400 font-bold mt-4">{t('health.bio_age.disclaimer')}</p>
                </div>
            )}
        </div>
    );
};

export default BiologicalAgeCalculator;
