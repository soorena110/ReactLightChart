export function findPreviousIndexNotUndefinedValueInArray(array: unknown[], ix): number {
    for (let i = ix - 1; i < array.length; i--)
        if (array[i])
            return i;
    return -1;
}

export function findNextIndexNotUndefinedValueInArray(array: unknown[], ix): number {
    for (let i = ix + 1; i < array.length; i++)
        if (array[i])
            return i;
    return array.length;
}
