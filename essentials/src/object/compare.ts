/**
 * Compares two object of the same type and returns an integer that indicates whether the
 * left object precedes, follows, or occurs in the same position in the sort order as the right object.
 * Comparison is done on the native object, without any locale support,
 */
export function compare<T>(left: T, right: T) : number {
    return (left < right ? -1 : (left > right ? 1 : 0));
}
