/**
 * Returns a copy of the original (immutable) object updated with the new values, leveraging typescripts static typing capabilities to avoid assigning invalid properties.
 * @param original: The original item to copy.
 * @param newValue: The item with the updated properties.
 */
export function withUpdatedValues<T>(original: T, newValue: Partial<T>) {
    return Object.assign({}, original, newValue);
}
