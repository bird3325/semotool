
import React, { useState } from 'react';
import { X, Check, ChevronDown } from 'lucide-react';

interface Option {
  value: string | number;
  label: string;
}

interface SelectModalProps {
  label: string;
  options: Option[];
  value: string | number;
  onChange: (value: any) => void;
  colorClass?: string;
  placeholder?: string;
}

const SelectModal: React.FC<SelectModalProps> = ({ label, options, value, onChange, colorClass = "text-blue-600", placeholder = "선택해주세요" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(opt => opt.value === value);

  const handleSelect = (val: string | number) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-between p-4 bg-white border-2 border-gray-100 rounded-2xl hover:border-gray-200 transition-all text-left group"
      >
        <span className={`text-lg font-black ${selectedOption ? 'text-gray-900' : 'text-gray-400'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown size={20} className="text-gray-400 group-hover:text-gray-600 transition-transform" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)} />
          
          <div className="relative w-full max-w-sm bg-white rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-lg font-black text-gray-900">{label}</h3>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2 no-scrollbar">
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                      isSelected 
                        ? 'bg-gray-900 text-white shadow-lg' 
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
                    }`}
                  >
                    <span className="font-bold text-base">{option.label}</span>
                    {isSelected && <Check size={20} className="text-white" />}
                  </button>
                );
              })}
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100">
                <p className="text-[10px] text-center font-bold text-gray-400 uppercase tracking-widest">Select an option to proceed</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectModal;
