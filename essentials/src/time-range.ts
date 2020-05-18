export interface TimeRange {
    start: number | string | Date;
    end: number | string | Date;
}

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

export function isOverlappingTimeRange(outer: TimeRange, inner: TimeRange): boolean {
    if (!inner || !inner.start || !inner.end)
        return false;
    if (!outer || !outer.start || !outer.end)
        return false;
    
    const innerStart = new Date(inner.start);
    const innerEnd = new Date(inner.end);
    const outerStart = new Date(outer.start);
    const outerEnd = new Date(outer.end);

    if (innerEnd < innerStart)
        return false;
    if (outerEnd < outerStart)
        return false;
    
    return inner.start < outer.end && inner.end > outer.start;
}

