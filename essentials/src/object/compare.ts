/**
 * Compares two object of the same type and returns an integer that indicates whether the
 * left object precedes, follows, or occurs in the same position in the sort order as the right object.
 * Comparison is done on the native object, without any locale support,
 */
export function compare<T>(left: T, right: T): number {
    return (left < right ? -1 : (left > right ? 1 : 0));
}

/**
 * A function that determines if two sequences contain the same values.
 * @param left The left array to compare
 * @param right The right array to compare
 * @param comparer The comparer used to compare the individual items of the array. Default comparer is {@linkcode isContentEqual}
 * @return `true` if both sequences are equal.
 */
export function isSequenceEqual<T>(left: any[], right: any[], comparer: (a: any, b: any) => boolean = isContentEqual) {
    return Array.isArray(left)
        && Array.isArray(right)
        && left.length == right.length
        && left.every((value, index) => comparer(value, right[index]));
}

/**
 * A function that determines if two objects have the same content.
 * @param left The left object to compare
 * @param right The right object to compare
 * @return `true` if both objects are equal.
 */
export function isContentEqual(left: any, right: any): boolean {
    if (left == right) {
        return true;
    }
    if (!left || !right) {
        return false;
    }

    const itemType = typeof left;
    if (itemType != typeof right) {
        return false;
    }

    if (itemType === 'object') {
        if (Array.isArray(left)) {
            return isSequenceEqual(left, right);
        }

        const leftEntries = Object.entries(left);

        return leftEntries.length == Object.keys(right).length
            && leftEntries.every(entry => {
                const [key, value] = entry;
                return isContentEqual(value, right[key]);
            });
    }

    return false;
}

/**
 * A function that determines if two objects are equal. Used as a shortcut to the `==` operator when a comparer method is needed.
 * @param left The left object to compare
 * @param right The right object to compare
 * @return `true` if both objects are equal.
 */
export function isEqual(left: any, right: any): boolean {
    return (left == right);
}

/**
 * A function that determines if two objects are equal. Used as a shortcut to the `===` operator when a comparer method is needed.
 * @param left The left object to compare
 * @param right The right object to compare
 * @return `true` if both objects are equal.
 */
export function isStrictEqual(left: any, right: any): boolean {
    return (left === right);
}

