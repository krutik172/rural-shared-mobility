import React from 'react';

export const Card = ({ children, className = '' }) => (
  <div className={`card ${className}`}>
    {children}
  </div>
);

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  return (
    <button className={`${baseClass} w-full flex justify-center items-center gap-2 ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Input = ({ label, id, ...props }) => (
  <div className="mb-4">
    {label && (
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">
        {label}
      </label>
    )}
    <input
      id={id}
      className="input-field"
      {...props}
    />
  </div>
);

export const Badge = ({ children, isSuccess }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isSuccess ? 'bg-green-100 text-green-800' : 'bg-primary-100 text-primary-800'}`}>
    {children}
  </span>
);
