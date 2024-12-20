import React, { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-blue-300 mb-1">
      {label}
    </label>
    <input
      {...props}
      required
      className="w-full px-4 py-2 bg-white/10 border border-slate-700/50
        rounded-md shadow-sm placeholder-slate-400
        focus:border-blue-500 focus:ring-1 focus:ring-blue-500
        text-white transition-all duration-300"
    />
  </div>
);

export default InputField;