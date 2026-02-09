import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Scale } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

const IdealWeightCalculator: React.FC = () => {
  const { t } = useTranslation();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [interpretation, setInterpretation] = useState('');
  const [idealWeight, setIdealWeight] = useState<{ min: number; max: number } | null>(null);

  const calculateBmi = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      const hInMeters = h / 100;
      const bmiValue = w / (hInMeters * hInMeters);
      setBmi(bmiValue);
      interpretBmi(bmiValue);

      // Calculate ideal weight range (BMI 18.5 - 23)
      const minWeight = 18.5 * hInMeters * hInMeters;
      const maxWeight = 23 * hInMeters * hInMeters;
      setIdealWeight({ min: minWeight, max: maxWeight });
    } else {
      setBmi(null);
      setInterpretation('');
      setIdealWeight(null);
    }
  };

  const interpretBmi = (bmiValue: number) => {
    if (bmiValue < 18.5) setInterpretation(t('health.ideal_weight.level_underweight'));
    else if (bmiValue < 23) setInterpretation(t('health.ideal_weight.level_normal'));
    else if (bmiValue < 25) setInterpretation(t('health.ideal_weight.level_overweight'));
    else if (bmiValue < 30) setInterpretation(t('health.ideal_weight.level_obese'));
    else setInterpretation(t('health.ideal_weight.level_severely_obese'));
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-pink-400 to-pink-600">
        <div className="flex items-center space-x-3">
          <Scale size={28} />
          <h2 className="text-2xl font-bold">{t('tool.bmi')} {t('suffix.calculator')}</h2>
        </div>
        <p className="mt-1 opacity-90">{t('health.desc.ideal_weight')}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">{t('health.label.height')}</label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="170"
            className="w-full p-3 border border-gray-300 rounded-lg text-lg"
          />
        </div>
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">{t('health.label.weight')}</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="65"
            className="w-full p-3 border border-gray-300 rounded-lg text-lg"
          />
        </div>

        <button onClick={calculateBmi} className="w-full p-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
          {t('common.calculate')}
        </button>
      </div>

      <AdBanner />

      {bmi !== null && idealWeight !== null && (
        <div className="p-6 bg-gray-50 rounded-xl text-center space-y-4">
          <div>
            <p className="text-sm text-gray-500">{t('health.result.bmi_index')}</p>
            <p className="text-5xl font-bold text-blue-600 my-2">{bmi.toFixed(2)}</p>
            <p className="text-xl font-semibold text-gray-800">{interpretation}</p>
          </div>
          <div className="pt-2">
            <p className="text-sm text-gray-500">{t('health.result.ideal_weight_range')}</p>
            <p className="text-2xl font-bold text-green-600 my-1">
              {idealWeight.min.toFixed(1)}kg ~ {idealWeight.max.toFixed(1)}kg
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdealWeightCalculator;