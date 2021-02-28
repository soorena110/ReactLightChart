export function findPreviousIndexNotUndefinedDataInArray(array: unknown[], ix): number {
    for (let i = ix - 1; i >= 0; i--) {
        if (array[i]) {
            return i;
        }
    }
    return -1;
}

export function findNextIndexNotUndefinedDataInArray(array: unknown[], ix): number {
    for (let i = ix + 1; i < array.length; i++) {
        if (array[i]) {
            return i;
        }
    }
    return array.length;
}

export function findPreviousIndexNotUndefinedValueInArray(array: (number | undefined)[][], searchFromIndex: number, propName: number): number {
    for (let i = searchFromIndex - 1; i >= 0; i--) {
        if (array[i] && array[i][propName] !== undefined) {
            return i;
        }
    }
    return -1;
}

export function findNextIndexNotUndefinedValueInArray(array: (number | undefined)[][], searchFromIndex: number, propName: number): number {
    for (let i = searchFromIndex + 1; i < array.length; i++) {
        if (array[i] && array[i][propName] !== undefined) {
            return i;
        }
    }
    return array.length;
}
