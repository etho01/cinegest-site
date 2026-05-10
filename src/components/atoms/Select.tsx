"use client";
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { GroupBase, StylesConfig } from 'react-select';

const SelectReact = dynamic(() => import('react-select'), { ssr: false });

interface Option<T> {
    value: T;
    label: string;
}

interface SelectProps<T> {
    className?: string;
    onChange?: (value: T | null, fullValue: Option<T> | null) => void;
    value?: T;
    [key: string]: string | number | boolean | undefined | unknown;
    initialValue?: string[] | string;
    styles?: StylesConfig<unknown, boolean, GroupBase<unknown>>
}

interface SelectPropsWithOptions<T> extends SelectProps<T> {
    options: Array<Option<T>>;
}

export const Select = <T,>({className = '', options, onChange, value, initialValue, ...props}: SelectPropsWithOptions<T>) => {
    let defaultValue : Option<T> | null = null;
    options.forEach(option => {
        if (option.value === value) {
            defaultValue = option;
        }
    });

    if (initialValue !== undefined) {
        if (typeof initialValue === 'string') {
            defaultValue = options.find(option => option.value === initialValue) || null;
        }
    }

    const [selectedValue, setSelectedValue] = useState<Option<T> | null>(defaultValue);

    const execOnChange = (selectedOption: Option<T> | null) => {
        if (onChange) {
            onChange(selectedOption ? selectedOption.value : null, selectedOption);
        }
    }

    const setAndChangeValue = (selectedOption: Option<T> | null) => {
        setSelectedValue(selectedOption);
        execOnChange(selectedOption);
    }

    const onChangeFunction = (selectedOption: unknown) => {
        setAndChangeValue(selectedOption as Option<T> | null);
    }

    useEffect(() => {
        const selectedOption = options.find(option => option.value === value) || null;
        setSelectedValue(selectedOption);
    }, [value, options]);
    
    useEffect(() => {
        if (initialValue === undefined) {
            return;
        }
        let selectedOption: Option<T> | null = null;
        if (typeof initialValue === 'string') 
        {
            selectedOption = options.find(option => option.value === initialValue) || null;
        }

        setSelectedValue(selectedOption);
    }, [initialValue, options]);

    return (
        <SelectReact styles={props.styles} value={selectedValue} className={className} isMulti={false} options={options} onChange={onChangeFunction} {...props} />
    );
}
