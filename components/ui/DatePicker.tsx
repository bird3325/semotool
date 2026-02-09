
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar as CalendarIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
  label: string;
  value: string; // YYYY-MM-DD
  onChange: (date: string) => void;
  colorClass?: string;
}

type PickerMode = 'day' | 'month' | 'year';

const DatePicker: React.FC<DatePickerProps> = ({ label, value, onChange, colorClass = "text-blue-600" }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(new Date(value));
  const [selectedDate, setSelectedDate] = useState(new Date(value));
  const [mode, setMode] = useState<PickerMode>('day');

  const yearGridRef = useRef<HTMLDivElement>(null);

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    setSelectedDate(newDate);
  };

  const handleConfirm = () => {
    const formatted = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    onChange(formatted);
    setIsOpen(false);
    setMode('day');
  };

  const years = Array.from({ length: 201 }, (_, i) => 1920 + i);
  // const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const months = Array.from({ length: 12 }, (_, i) => `${i + 1}${t('date.month_suffix')}`);
  const days = t('date.days', { returnObjects: true }) as string[];

  // Scroll to current year when year mode opens
  useEffect(() => {
    if (mode === 'year' && yearGridRef.current) {
      const currentYearBtn = yearGridRef.current.querySelector(`[data-year="${viewDate.getFullYear()}"]`);
      if (currentYearBtn) {
        currentYearBtn.scrollIntoView({ block: 'center' });
      }
    }
  }, [mode, viewDate]);

  const renderDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const totalDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);
    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }

    for (let d = 1; d <= totalDays; d++) {
      const isSelected =
        selectedDate.getFullYear() === year &&
        selectedDate.getMonth() === month &&
        selectedDate.getDate() === d;

      const isToday =
        new Date().getFullYear() === year &&
        new Date().getMonth() === month &&
        new Date().getDate() === d;

      days.push(
        <button
          key={d}
          onClick={() => handleDateSelect(d)}
          className={`h-10 w-10 flex items-center justify-center rounded-full text-sm font-bold transition-all ${isSelected
            ? 'bg-gray-900 text-white shadow-lg scale-110'
            : isToday
              ? 'bg-gray-100 text-gray-900 border border-gray-300'
              : 'text-gray-600 hover:bg-gray-50'
            }`}
        >
          {d}
        </button>
      );
    }
    return days;
  };

  const renderMonthPicker = () => (
    <div className="grid grid-cols-3 gap-2 p-2">
      {months.map((m, idx) => (
        <button
          key={m}
          onClick={() => {
            setViewDate(new Date(viewDate.getFullYear(), idx, 1));
            setMode('day');
          }}
          className={`py-4 rounded-2xl text-base font-black transition-all ${viewDate.getMonth() === idx ? 'bg-gray-900 text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
        >
          {m}
        </button>
      ))}
    </div>
  );

  const renderYearPicker = () => (
    <div ref={yearGridRef} className="grid grid-cols-3 gap-2 p-2 max-h-[300px] overflow-y-auto no-scrollbar">
      {years.map(y => (
        <button
          key={y}
          data-year={y}
          onClick={() => {
            setViewDate(new Date(y, viewDate.getMonth(), 1));
            setMode('month');
          }}
          className={`py-4 rounded-2xl text-base font-black transition-all ${viewDate.getFullYear() === y ? 'bg-gray-900 text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
        >
          {y}{t('date.year_suffix')}
        </button>
      ))}
    </div>
  );

  return (
    <div className="w-full">
      <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
      <button
        type="button"
        onClick={() => { setIsOpen(true); setMode('day'); }}
        className="w-full flex items-center justify-between p-4 bg-white border-2 border-gray-100 rounded-2xl hover:border-gray-200 transition-all text-left group"
      >
        <div className="flex items-center space-x-3">
          <CalendarIcon size={20} className="text-gray-400 group-hover:text-gray-600" />
          <span className="text-xl font-black text-gray-900">{value}</span>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gray-50 ${colorClass}`}>Change</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)} />

          <div className="relative w-full max-w-sm bg-white rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-black text-gray-900">
                {mode === 'day' ? t('date.select_date') : mode === 'month' ? t('date.select_month') : t('date.select_year')}
              </h3>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Calendar Control */}
            <div className="px-6 pt-6 flex justify-between items-center">
              <button
                onClick={handlePrevMonth}
                disabled={mode !== 'day'}
                className={`p-2 rounded-xl transition-colors ${mode === 'day' ? 'hover:bg-gray-50 text-gray-400' : 'opacity-0 cursor-default'}`}
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMode(mode === 'year' ? 'day' : 'year')}
                  className={`px-3 py-1.5 rounded-full transition-all text-lg font-black ${mode === 'year' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900 hover:bg-gray-100'}`}
                >
                  {viewDate.getFullYear()}{t('date.year_suffix')}
                </button>
                <button
                  onClick={() => setMode(mode === 'month' ? 'day' : 'month')}
                  className={`px-3 py-1.5 rounded-full transition-all text-lg font-black ${mode === 'month' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900 hover:bg-gray-100'}`}
                >
                  {viewDate.getMonth() + 1}{t('date.month_suffix')}
                </button>
              </div>

              <button
                onClick={handleNextMonth}
                disabled={mode !== 'day'}
                className={`p-2 rounded-xl transition-colors ${mode === 'day' ? 'hover:bg-gray-50 text-gray-400' : 'opacity-0 cursor-default'}`}
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6">
              {mode === 'day' && (
                <>
                  <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                    {days.map((day, idx) => (
                      <div key={day} className={`text-[10px] font-black uppercase tracking-widest ${idx === 0 ? 'text-red-400' : idx === 6 ? 'text-blue-400' : 'text-gray-400'}`}>
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {renderDays()}
                  </div>
                </>
              )}
              {mode === 'month' && renderMonthPicker()}
              {mode === 'year' && renderYearPicker()}
            </div>

            {/* Footer Action */}
            <div className="p-6 pt-0">
              <button
                type="button"
                onClick={handleConfirm}
                className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl text-lg hover:bg-gray-800 transition-all active:scale-[0.98] shadow-xl"
              >
                {t('date.confirm_selection', { year: selectedDate.getFullYear(), month: selectedDate.getMonth() + 1, day: selectedDate.getDate() })}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
