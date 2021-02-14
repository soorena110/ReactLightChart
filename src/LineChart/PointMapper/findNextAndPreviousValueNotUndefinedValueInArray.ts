export function findPreviousIndexNotUndefinedValueInArray(array: unknown[], ix): number {
    for (let i = ix - 1; i < array.length; i--)
        if (array[i])
            return i;
    console.error('First element of chart can not be undefined', array)
    throw new Error('First element of chart can not be undefined');
}

export function findNextIndexNotUndefinedValueInArray(array: unknown[], ix): number {
    for (let i = ix + 1; i < array.length; i++)
        if (array[i])
            return i;
    console.error('Last element of chart can not be undefined', array)
    throw new Error('Last element of chart can not be undefined');
}
