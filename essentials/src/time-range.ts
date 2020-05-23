/**
 * An interface to express time ranges.
 */
export interface TimeRange {
    start: number | string | Date;
    end: number | string | Date;
}

/**
 * Checks is a value is contained in a time range.
 * @param outer the containing time range
 * @param inner the value to check; if inner is a time range, it must be completely inside outer
 */
export function isWithinTimeRange(outer: TimeRange, inner: Date | number | string | TimeRange): boolean {
    if (!inner)
        return false;

    if (!outer || !outer.start || !outer.end)
        return false;

    const outerStart = new Date(outer.start);
    const outerEnd = new Date(outer.end);
    if (outerEnd < outerStart)
        return false;

    // @ts-ignore
    const date = new Date(inner);
    if (!isNaN(date.getTime())) {
        return date >= outerStart
        && date < outerEnd;
    }

    const range = <TimeRange>inner;
    if (!range.start || !range.end)
        return false;

    const innerStart = new Date(range.start);
    const innerEnd = new Date(range.end);
    if (innerEnd < innerStart)
        return false;

    return innerStart >= outerStart
        && innerEnd <= outerEnd;
}

/**
 * Check if two time ranges overlap
 * @param first
 * @param second
 */
export function isOverlappingTimeRange(first: TimeRange, second: TimeRange): boolean {
    if (!second || !second.start || !second.end)
        return false;
    if (!first || !first.start || !first.end)
        return false;
    
    const innerStart = new Date(second.start);
    const innerEnd = new Date(second.end);
    const outerStart = new Date(first.start);
    const outerEnd = new Date(first.end);

    if (innerEnd < innerStart)
        return false;
    if (outerEnd < outerStart)
        return false;
    
    return second.start < first.end && second.end > first.start;
}

