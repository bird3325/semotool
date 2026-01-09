import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tag } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import AmountUnit from '../ui/AmountUnit';

const DiscountCalculator: React.FC = () => {
  const { t } = useTranslation();
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountRate, setDiscountRate] = useState('');
  const [result, setResult] = useState<{ finalPrice: number; savedAmount: number } | null>(null);

  const formatNumber = (val: string) => {
    const num = Number(val.replace(/,/g, ''));
    if (isNaN(num)) return '';
    return num.toLocaleString('en-US');
  };

  const handleCalculate = () => {
    const price = parseFloat(originalPrice.replace(/,/g, ''));
    const rate = parseFloat(discountRate);

    if (isNaN(price) || isNaN(rate) || price < 0 || rate < 0) {
      setResult(null);
      return;
    }

    const savedAmount = (price * rate) / 100;
    const finalPrice = price - savedAmount;

    setResult({ finalPrice, savedAmount });
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-cyan-400 to-cyan-600">
        <div className="flex items-center space-x-3">
          <Tag size={28} />
          <h2 className="text-2xl font-bold">{t('tool.discount')} {t('suffix.calculator')}</h2>
        </div>
        <p className="mt-1 opacity-90">{t('math.discount.desc')}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">{t('math.discount.label_original_price')} ({t('currency.KRW')})</label>
          <input
            type="text"
            inputMode="numeric"
            value={originalPrice}
            onChange={e => setOriginalPrice(formatNumber(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right"
            placeholder="10,000"
          />
          <AmountUnit value={originalPrice} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">{t('math.discount.label_discount_rate')}</label>
          <input
            type="number"
            inputMode="decimal"
            value={discountRate}
            onChange={e => setDiscountRate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right"
            placeholder="20"
          />
        </div>

        <button onClick={handleCalculate} className="w-full p-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
          {t('common.calculate')}
        </button>
      </div>

      <AdBanner />

      {result && (
        <div className="p-6 bg-gray-50 rounded-xl text-center space-y-2">
          <p className="text-sm text-gray-500">{t('math.discount.result_final_price')}</p>
          <p className="text-4xl font-bold text-blue-600">
            {Math.round(result.finalPrice).toLocaleString()}{t('currency.KRW')}
          </p>
          <p className="text-green-600 font-semibold">
            {t('math.discount.result_saved', { amount: Math.round(result.savedAmount).toLocaleString() })}
          </p>
        </div>
      )}
    </div>
  );
};

export default DiscountCalculator;
