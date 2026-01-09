import React from 'react';
import { useTranslation } from 'react-i18next';

interface AmountUnitProps {
  value: string | number;
  className?: string;
}

const AmountUnit: React.FC<AmountUnitProps> = ({ value, className = "" }) => {
  const { t, i18n } = useTranslation();

  const formatUnit = (val: string | number) => {
    const num = typeof val === 'string' ? Number(val.replace(/,/g, '')) : val;
    if (!num || isNaN(num) || num <= 0) return null;

    if (i18n.language === 'ko') {
      const units = ['', '만', '억', '조', '경'];
      const splitUnit = 10000;
      let result = [];
      let temp = Math.floor(num);

      for (let i = 0; i < units.length && temp > 0; i++) {
        const part = temp % splitUnit;
        if (part > 0) {
          result.push(`${part.toLocaleString()}${units[i]}`);
        }
        temp = Math.floor(temp / splitUnit);
      }
      return result.reverse().join(' ') + ' ' + t('currency.KRW_symbol', { defaultValue: '원' });
    } else {
      // English / Standard format
      // Use Intl.NumberFormat for compact notation e.g. "1.5M", "100k"
      // Or just standard formatted number with currency code if preferred?
      // Plan said: "150 Million KRW" style.

      try {
        const formatter = new Intl.NumberFormat(i18n.language, {
          style: 'decimal',
          notation: 'compact',
          compactDisplay: 'short',
          maximumFractionDigits: 1
        });

        return `${formatter.format(num)} ${t('currency.KRW', { defaultValue: 'KRW' })}`;
      } catch (e) {
        return `${num.toLocaleString()} ${t('currency.KRW', { defaultValue: 'KRW' })}`;
      }
    }
  };

  const formatted = formatUnit(value);
  if (!formatted) return null;

  return (
    <div className={`text-[11px] font-bold text-blue-500 mt-1 text-right animate-in fade-in slide-in-from-top-1 duration-300 ${className}`}>
      {formatted}
    </div>
  );
};

export default AmountUnit;
