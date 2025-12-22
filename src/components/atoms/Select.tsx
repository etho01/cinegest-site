"use client";
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { GroupBase, StylesConfig } from 'react-select';

const SelectReact = dynamic(() => import('react-select'), { ssr: false });

interface SelectProps {
    className?: string;
    onChange?: (value: any, fullValue: any) => void;
    value?: any;
    isMulti?: boolean;
    [key: string]: any;
    initialValue?: string[] | string;
    styles?: StylesConfig<unknown, boolean, GroupBase<unknown>>
}

interface SelectPropsWithOptions extends SelectProps {
    options: Array<{ value: string | number; label: string }>;
}

export const Select = ( {className = '', options, onChange, value, initialValue, isMulti = false, ...props}: SelectPropsWithOptions) => {
    let htmlFor = "";
    let defaultValue : any = isMulti ? [] : null;
    options.forEach(option => {
        if (isMulti && Array.isArray(value)) {
            if (value.includes(option.value)) {
                (defaultValue as Array<any>).push(option);
            }
        } else {
            if (option.value === value) {
                defaultValue = option;
            }
        }
    });

    if (initialValue !== undefined) {
        if (isMulti && Array.isArray(initialValue)) {
            defaultValue = options.filter(option => initialValue.includes(option.value + ''));
        } else if (!isMulti && typeof initialValue === 'string') {
            defaultValue = options.find(option => option.value === initialValue) || null;
        }
    }

    const [selectedValue, setSelectedValue] = useState<any>(defaultValue);
    if (props['id'] != undefined)
    {
        htmlFor = props['id']
    }

    const execOnChange = (selectedOption: any) => {
        if (onChange) {
            if (isMulti) {
                const values = selectedOption ? selectedOption.map((option: any) => option.value) : [];
                onChange(values, selectedOption);
                return;
            }
            onChange(selectedOption ? selectedOption.value : null, selectedOption);
        }
    }

    const setAndChangeValue = (selectedOption: any) => {
        setSelectedValue(selectedOption);
        execOnChange(selectedOption);
    }

    const onChangeFunction = (selectedOption: any) => {
        setAndChangeValue(selectedOption);
    }

    useEffect(() => {
        let selectedOption: any = null;
        if (isMulti && Array.isArray(value)) 
        {
            selectedOption = options.filter(option => value.includes(option.value));
        }
        else if (!isMulti) 
        {
            selectedOption = options.find(option => option.value === value) || null;
        }
        
        setSelectedValue(selectedOption);
    }, [value]);
    
    useEffect(() => {
        if (initialValue === undefined) {
            return;
        }
        let selectedOption: any = null;
        if (isMulti && Array.isArray(initialValue)) 
        {
            selectedOption = options.filter(option => initialValue.includes(option.value + ''));
        }
        else if (!isMulti && typeof initialValue === 'string') 
        {
            selectedOption = options.find(option => option.value === initialValue) || null;
        }

        setSelectedValue(selectedOption);
    }, [initialValue]);

    return (
        <SelectReact styles={props.styles} value={selectedValue} className={className} isMulti={isMulti} options={options} onChange={onChangeFunction} {...props} />
    );
}
