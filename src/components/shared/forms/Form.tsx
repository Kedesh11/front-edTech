'use client';

import React from 'react';
import { FormProps, FormField } from './types';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { cn } from '@/lib/utils';

const FormInput = ({ field }: { field: FormField }) => {
  const baseClasses = "w-full transition-all duration-200 ease-in-out text-gray-900";
  const paddingClasses = "px-4 py-3";
  const borderClasses = "border-2 border-gray-200 rounded-lg";
  const focusClasses = "focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
  const stateClasses = field.error
    ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-100"
    : field.disabled
    ? "bg-gray-100 cursor-not-allowed opacity-75"
    : "hover:border-gray-300";
  
  const commonClasses = `${baseClasses} ${paddingClasses} ${borderClasses} ${focusClasses} ${stateClasses}`;

  const renderFieldIcon = () => {
    if (!field.icon) return null;
    return (
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <i className={`${field.icon} text-gray-400`} />
      </div>
    );
  };

  const renderFieldError = () => {
    if (!field.error) return null;
    return (
      <p className="mt-1 text-sm text-red-600 animate-shake" role="alert">
        {field.error}
      </p>
    );
  };

  const renderFieldHelper = () => {
    if (!field.helper) return null;
    return (
      <p className="mt-1 text-sm text-gray-500">
        {field.helper}
      </p>
    );
  };

  const inputWrapper = (children: React.ReactNode) => (
    <div className="relative">
      {renderFieldIcon()}
      {children}
      {renderFieldError()}
      {renderFieldHelper()}
    </div>
  );

  switch (field.type) {
    case 'select':
      return (
        <Select
          {...field}
          onChange={(e) => field.onChange(e.target.value)}
          className={cn(
            'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            (field as any).className
          )}
        >
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      );

    case 'textarea':
      return (
        <Textarea
          {...field}
          onChange={(e) => field.onChange(e.target.value)}
          className={cn(
            'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            (field as any).className
          )}
        />
      );

    default:
      return inputWrapper(
        <input
          id={field.name}
          type={field.type}
          name={field.name}
          value={field.value}
          onChange={(e) => field.onChange(e.target.value)}
          placeholder={field.placeholder}
          required={field.required}
          disabled={field.disabled}
          maxLength={field.maxLength}
          autoComplete={field.autoComplete}
          className={commonClasses}
          aria-describedby={field.helper ? `${field.name}-description` : undefined}
        />
      );
  }
};

export const Form = ({ 
  onSubmit, 
  fields, 
  submitLabel, 
  title, 
  description,
  loading = false,
  errorMessage,
  successMessage,
  cancelLabel,
  onCancel,
  size = 'medium'
}: FormProps) => {
  const containerSizes = {
    small: 'max-w-md',
    medium: 'max-w-2xl',
    large: 'max-w-4xl'
  };

  return (
    <form 
      onSubmit={onSubmit} 
      className={`w-full ${containerSizes[size]} mx-auto bg-white rounded-xl shadow-lg p-8 transition-all duration-300 ease-in-out`}
      noValidate
    >
      {(title || description) && (
        <div className="border-b border-gray-200 pb-6 mb-6">
          {title && (
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {title}
            </h2>
          )}
          
          {description && (
            <p className="text-gray-600">
              {description}
            </p>
          )}
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md animate-shake" role="alert">
          <p className="text-red-700">{errorMessage}</p>
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-md animate-fadeIn" role="alert">
          <p className="text-green-700">{successMessage}</p>
        </div>
      )}

      <div className="space-y-6">
        {fields.map((field) => (
          <div key={field.name} className="space-y-1">
            <label 
              htmlFor={field.name} 
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              {field.label}
              {field.required && (
                <span className="text-red-500 ml-1" aria-hidden="true">*</span>
              )}
            </label>
            <FormInput field={field} />
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row-reverse sm:gap-3">
        <button
          type="submit"
          disabled={loading}
          className={`
            w-full sm:w-auto flex justify-center items-center px-6 py-3 
            bg-blue-600 text-white font-semibold rounded-lg
            transition-all duration-200 ease-in-out
            ${loading 
              ? 'opacity-75 cursor-wait' 
              : 'hover:bg-blue-700 active:bg-blue-800 hover:shadow-md'
            }
          `}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Traitement en cours...
            </>
          ) : submitLabel}
        </button>
        
        {onCancel && cancelLabel && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto mt-3 sm:mt-0 px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-200 transition-all duration-200 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {cancelLabel}
          </button>
        )}
      </div>
    </form>
  );
};
