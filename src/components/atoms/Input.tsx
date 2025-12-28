import * as React from 'react';
import { cn } from '@/src/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, error, id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

        return (
            <div className="w-full">
                {label && (
                    <label 
                        htmlFor={inputId} 
                        className="block text-sm font-medium text-gray-300 mb-1"
                    >
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    id={inputId}
                    className={cn(
                        "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors bg-gray-700/50 text-white placeholder:text-gray-400",
                        error 
                            ? "border-red-500 focus:ring-red-500" 
                            : "border-gray-600 focus:ring-red-600",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-red-400">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };
