import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { cn } from '@/src/utils';


export const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'cursor-pointer bg-primary text-white hover:bg-primary/90',
                transparent: 'bg-transparent hover:bg-accent hover:text-accent-foreground',
                outline: 'border border-gray-600 bg-transparent text-white hover:bg-gray-700',
                ghost: 'bg-transparent hover:bg-gray-800 text-white',
                link: 'text-red-500 hover:text-red-400 block w-full transition-colors cursor-pointer',
                linkSecondary: 'bg-transparent text-gray-400 hover:text-white underline-offset-4 hover:underline cursor-pointer',

            },
            size: {
                default: ' px-4 py-2',
                sm: ' rounded-md px-1 py-1',
                lg: ' rounded-md px-8',
                icon: ' w-10',
                none : '',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

export interface ButtonProps
    extends
    React.ComponentPropsWithRef<'button'>,
    VariantProps<typeof buttonVariants> {
}

export const Button = ({ variant, size, className, children, ref, ...props }: ButtonProps) => {

    return (
        <button
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        >
            {children}
        </button>
    )
};

interface LinkButtonProps
    extends
    React.ComponentPropsWithRef<typeof Link>,
    VariantProps<typeof buttonVariants> {
}

export const LinkButton = ({ variant, size, className, children, ...props }: LinkButtonProps) => {
    return (
        <Link
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        >
            {children}
        </Link>
    )
};