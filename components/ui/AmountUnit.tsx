
import React from 'react';

interface AmountUnitProps {
  value: string | number;
  className?: string;
}

const AmountUnit: React.FC<AmountUnitProps> = ({ value, className = "" }) => {
  const formatKoreanUnit = (val: string | number) => {
    const num = typeof val === 'string' ? Number(val.replace(/,/g, '')) : val;
    if (!num || isNaN(num) || num <= 0) return null;

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

    return result.reverse().join(' ') + ' 원';
  };

  const formatted = formatKoreanUnit(value);
  if (!formatted) return null;

  return (
    <div className={`text-[11px] font-bold text-blue-500 mt-1 text-right animate-in fade-in slide-in-from-top-1 duration-300 ${className}`}>
      {formatted}
    </div>
  );
};

export default AmountUnit;
