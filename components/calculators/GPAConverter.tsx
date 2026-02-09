
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BookCopy } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import SelectModal from '../ui/SelectModal';

const scales = [
  { key: 'scale_4_5', value: 4.5 },
  { key: 'scale_4_3', value: 4.3 },
  { key: 'scale_4_0', value: 4.0 },
  { key: 'scale_100', value: 100 },
];

const GPAConverter: React.FC = () => {
  const { t } = useTranslation();

  const scaleOptions = scales.map(s => ({
    value: String(s.value),
    label: t(`school.gpa_converter.${s.key}`)
  }));

  const [gpa, setGpa] = useState('');
  const [fromScale, setFromScale] = useState('4.5');
  const [toScale, setToScale] = useState('4.0');
  const [result, setResult] = useState<string | null>(null);

  const handleConvert = () => {
    const numGpa = parseFloat(gpa);
    const numFrom = parseFloat(fromScale);
    const numTo = parseFloat(toScale);

    if (isNaN(numGpa) || numGpa < 0 || numGpa > numFrom) {
      setResult('유효한 학점을 입력하세요.');
      return;
    }

    if (fromScale === toScale) {
      setResult(numGpa.toFixed(2));
      return;
    }

    const convertedGpa = (numGpa / numFrom) * numTo;
    setResult(convertedGpa.toFixed(2));
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-rose-400 to-rose-600">
        <div className="flex items-center space-x-3">
          < BookCopy size={28} />
          <h2 className="text-2xl font-bold">{t('school.gpa_converter.title')}</h2>
        </div>
        <p className="mt-1 opacity-90">{t('school.gpa_converter.desc')}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">{t('school.gpa_converter.label_gpa')}</label>
          <input
            type="number"
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
            placeholder={t('school.gpa_converter.placeholder_gpa', { scale: fromScale })}
            className="w-full p-4 border border-gray-300 rounded-lg text-3xl text-center font-bold focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectModal
            label={t('school.gpa_converter.label_current_scale')}
            options={scaleOptions}
            value={fromScale}
            onChange={setFromScale}
          />
          <SelectModal
            label={t('school.gpa_converter.label_target_scale')}
            options={scaleOptions}
            value={toScale}
            onChange={setToScale}
          />
        </div>

        <button onClick={handleConvert} className="w-full p-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
          {t('common.convert')}
        </button>
      </div>

      <AdBanner />

      {result !== null && (
        <div className="p-6 bg-gray-50 rounded-xl text-center">
          <p className="text-sm text-gray-500">{t('school.gpa_converter.result')}</p>
          <p className="text-3xl font-bold text-blue-600 my-2">
            {result} <span className="text-xl text-gray-700">/ {toScale}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default GPAConverter;
