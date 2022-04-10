export const inputClasses = (error: boolean): string => {
    const classes: string[] = [
        'appearance-none',
        'block w-full px-3 py-2 border ',
        'rounded-md shadow-sm ',
        'focus:outline-none sm:text-sm'
    ]

    if (error) {
        classes.push('border-red-300');
        classes.push('placeholder-red-400');
        classes.push('focus:ring-red-500');
        classes.push('focus:border-red-500');
    } else {
        classes.push('border-gray-300');
        classes.push('placeholder-gray-400');
        classes.push('focus:ring-indigo-500');
        classes.push('focus:border-indigo-500');
    }

    return classes.join(' ');
}
