import React, { useState, useRef, useEffect } from 'react';

export interface CustomSelectOption {
  value: string;
  description?: string;
  icon?: React.FC<{ className?: string }>;
}

interface CustomSelectProps {
  id: string;
  options: CustomSelectOption[];
  value: string;
  onChange: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ id, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value) || options[0];

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={selectRef}>
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-white shadow-sm flex items-center justify-between text-left"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-3">
          {selectedOption.icon && <selectedOption.icon className="w-6 h-6 text-slate-600 flex-shrink-0" />}
          <span className="truncate">{selectedOption.value}</span>
        </span>
        <span className="pointer-events-none flex items-center">
           <svg className={`fill-current h-4 w-4 text-slate-700 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </span>
      </button>

      {isOpen && (
        <ul
          className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          tabIndex={-1}
          role="listbox"
          aria-labelledby={id}
        >
          {options.map((option) => (
            <li
              key={option.value}
              className={`text-slate-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-100 ${value === option.value ? 'bg-indigo-50' : ''}`}
              role="option"
              aria-selected={value === option.value}
              onClick={() => handleSelect(option.value)}
              title={option.description}
            >
              <div className="flex items-center gap-3">
                 {option.icon && <option.icon className="w-6 h-6 text-slate-600 flex-shrink-0" />}
                <span className={`font-normal truncate ${value === option.value ? 'font-semibold' : ''}`}>
                  {option.value}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
