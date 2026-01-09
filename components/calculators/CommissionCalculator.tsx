import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Handshake, Info } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import SelectModal from '../ui/SelectModal';
import AmountUnit from '../ui/AmountUnit';

type PropertyType = 'house' | 'officetel' | 'other';
type TransactionType = 'sell' | 'jeonse' | 'monthly';

const CommissionCalculator: React.FC = () => {
  const { t } = useTranslation();
  const [propertyType, setPropertyType] = useState<PropertyType>('house');
  const [transactionType, setTransactionType] = useState<TransactionType>('sell');
  const [price, setPrice] = useState('0');
  const [monthlyRent, setMonthlyRent] = useState('0');
  const [negotiatedRate, setNegotiatedRate] = useState('');
  const [result, setResult] = useState<{
    commission: number;
    maxRate: number;
    appliedRate: number;
    limit: number | null;
    transactionAmount: number;
    vat: number;
  } | null>(null);

  const propertyOptions = [
    { value: 'house', label: t('finance.commission.opt_house') },
    { value: 'officetel', label: t('finance.commission.opt_officetel') },
    { value: 'other', label: t('finance.commission.opt_other') }
  ];

  const transactionOptions = [
    { value: 'sell', label: t('finance.commission.opt_sell') },
    { value: 'jeonse', label: t('finance.commission.opt_jeonse') },
    { value: 'monthly', label: t('finance.commission.opt_monthly') }
  ];

  const formatNumber = (val: string) => {
    const raw = val.replace(/,/g, '');
    if (!raw) return '0';
    const num = Number(raw);
    if (isNaN(num)) return '0';
    return num.toLocaleString('en-US');
  };

  const handleCalculate = useCallback(() => {
    const p = parseFloat(price.replace(/,/g, '')) || 0;
    const rent = parseFloat(monthlyRent.replace(/,/g, '')) || 0;
    const negRateInput = parseFloat(negotiatedRate);
    const negRate = negRateInput / 100;

    let transactionAmount = p;
    if (transactionType === 'monthly') {
      transactionAmount = p + (rent * 100);
      if (transactionAmount < 50000000) {
        transactionAmount = p + (rent * 70);
      }
    }

    if (transactionAmount <= 0) {
      setResult(null);
      return;
    }

    let maxRate = 0;
    let limit = null;

    if (propertyType === 'house') {
      if (transactionType === 'sell') {
        if (transactionAmount < 50000000) { maxRate = 0.006; limit = 250000; }
        else if (transactionAmount < 200000000) { maxRate = 0.005; limit = 800000; }
        else if (transactionAmount < 900000000) { maxRate = 0.004; }
        else if (transactionAmount < 1200000000) { maxRate = 0.005; }
        else if (transactionAmount < 1500000000) { maxRate = 0.006; }
        else { maxRate = 0.007; }
      } else {
        if (transactionAmount < 50000000) { maxRate = 0.005; limit = 200000; }
        else if (transactionAmount < 100000000) { maxRate = 0.004; limit = 300000; }
        else if (transactionAmount < 600000000) { maxRate = 0.003; }
        else if (transactionAmount < 1200000000) { maxRate = 0.004; }
        else if (transactionAmount < 1500000000) { maxRate = 0.005; }
        else { maxRate = 0.006; }
      }
    } else if (propertyType === 'officetel') {
      maxRate = transactionType === 'sell' ? 0.005 : 0.004;
    } else {
      maxRate = 0.009;
    }

    const appliedRate = (negotiatedRate === '' || isNaN(negRate) || negRate > maxRate) ? maxRate : negRate;

    let commission = transactionAmount * appliedRate;
    if (limit !== null && commission > limit) {
      commission = limit;
    }

    setResult({
      commission,
      maxRate: maxRate * 100,
      appliedRate: appliedRate * 100,
      limit,
      transactionAmount,
      vat: commission * 0.1
    });
  }, [price, monthlyRent, negotiatedRate, propertyType, transactionType]);

  useEffect(() => {
    handleCalculate();
  }, [handleCalculate]);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-violet-400 to-violet-600">
        <div className="flex items-center space-x-3">
          <Handshake size={28} />
          <h2 className="text-2xl font-bold">{t('tool.commission')} {t('suffix.calculator')}</h2>
        </div>
        <p className="mt-1 opacity-90">{t('finance.commission.desc')}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectModal
            label={t('finance.commission.label_property_type')}
            options={propertyOptions}
            value={propertyType}
            onChange={setPropertyType}
            colorClass="text-violet-600"
          />
          <SelectModal
            label={t('finance.commission.label_transaction_type')}
            options={transactionOptions}
            value={transactionType}
            onChange={setTransactionType}
            colorClass="text-violet-600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              {transactionType === 'monthly' ? `${t('finance.commission.label_deposit')} (${t('currency.KRW')})` : `${t('finance.commission.label_price')} (${t('currency.KRW')})`}
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={price === '0' ? '' : price}
              onChange={e => setPrice(formatNumber(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="0"
            />
            <AmountUnit value={price} />
          </div>

          {transactionType === 'monthly' && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.commission.label_monthly_rent')} ({t('currency.KRW')})</label>
              <input
                type="text"
                inputMode="numeric"
                value={monthlyRent === '0' ? '' : monthlyRent}
                onChange={e => setMonthlyRent(formatNumber(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="0"
              />
              <AmountUnit value={monthlyRent} />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.commission.label_negotiated_rate')}</label>
          <input
            type="number"
            step="0.01"
            value={negotiatedRate}
            onChange={e => setNegotiatedRate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right outline-none focus:ring-2 focus:ring-violet-500"
            placeholder={t('finance.commission.placeholder_negotiated_rate')}
          />
          <p className="text-[11px] text-gray-400 mt-2 flex items-center">
            <Info size={12} className="mr-1" />
            {t('finance.commission.msg_rate_warning')}
          </p>
        </div>

        <button onClick={handleCalculate} className="w-full p-4 bg-violet-500 hover:bg-violet-600 text-white font-bold rounded-lg text-lg transition-transform active:scale-95 shadow-md">
          {t('common.calculate')}
        </button>
      </div>

      <AdBanner />

      {result && (
        <div className="p-6 bg-gray-50 rounded-xl text-center space-y-4 border border-violet-100 animate-in zoom-in-95 duration-500">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">{t('finance.commission.result_commission')}</p>
            <p className="text-4xl font-bold text-blue-600">
              {Math.round(result.commission).toLocaleString()} {t('currency.KRW')}
            </p>
            <p className="text-xs text-gray-400">{t('finance.commission.result_vat_included', { amount: Math.round(result.commission * 1.1).toLocaleString() })}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-white p-3 rounded-lg border border-gray-100">
              <span className="text-[10px] font-bold text-gray-400 block uppercase">{t('finance.commission.result_applied_rate')}</span>
              <p className="font-bold text-gray-800">{result.appliedRate.toFixed(2)}%</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-100">
              <span className="text-[10px] font-bold text-gray-400 block uppercase">{t('finance.commission.result_transaction_amount')}</span>
              <p className="font-bold text-gray-800">{result.transactionAmount.toLocaleString()} {t('currency.KRW')}</p>
            </div>
          </div>

          <div className="p-3 bg-violet-50 rounded-lg border border-violet-100">
            <p className="text-[11px] text-violet-700 leading-relaxed">
              {t('finance.commission.msg_disclaimer')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommissionCalculator;
