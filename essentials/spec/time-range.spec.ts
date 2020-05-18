import {isOverlappingTimeRange, isWithinTimeRange} from '../src';

describe('isWithinTimeRange', () => {
    it('should detect correctly', () => {
        expect(isWithinTimeRange(
            { start: '2020-05-12', end: '2020-05-20'},
            { start: '2020-05-13', end: '2020-05-19'})).toBe(true);
        expect(isWithinTimeRange(
            { start: '2020-05-12', end: '2020-05-20'},
            { start: '2020-05-11', end: '2020-05-19'})).toBe(false);
        expect(isWithinTimeRange(
            { start: '2020-05-12', end: '2020-05-20'},
            { start: '2020-05-13', end: '2020-05-21'})).toBe(false);
        expect(isWithinTimeRange(
            { start: '2020-05-12', end: '2020-05-20'},
            { start: '2020-05-11', end: '2020-05-21'})).toBe(false);
        expect(isWithinTimeRange(
            { start: '2020-05-12', end: '2020-05-20'},
            '2020-05-13')).toBe(true);
        expect(isWithinTimeRange(
            { start: '2020-05-12 12:00', end: '2020-05-20'},
            '2020-05-12')).toBe(false);
    });
    it('should ignore invalid input', () => {
        expect(isWithinTimeRange(
            { start: '2020-05-12', end: '2020-05-11' },
            { start: '2020-05-13', end: '2020-05-19'})).toBe(false);
        expect(isWithinTimeRange(
            { start: '2020-05-12', end: '2020-05-13' },
            { start: '2020-05-13', end: '2020-05-12'})).toBe(false);
        expect(isWithinTimeRange(
            // @ts-ignore
            { start: '2020-05-12', end: undefined },
            { start: '2020-05-13', end: '2020-05-19'})).toBe(false);
        expect(isWithinTimeRange(
            { start: '2020-05-12', end: '2020-05-20'},
            // @ts-ignore
            { start: undefined, end: '2020-05-19'})).toBe(false);
        expect(isWithinTimeRange(
            // @ts-ignore
            undefined,
            { start: '2020-05-13', end: '2020-05-21'})).toBe(false);
        expect(isWithinTimeRange(
            // @ts-ignore
            undefined,
            // @ts-ignore
            undefined)).toBe(false);
        expect(isWithinTimeRange(
            { start: '2020-05-12', end: '2020-05-20'},
            // @ts-ignore
            undefined)).toBe(false);
    });
});

describe('isOverlappingTimeRange', () => {
    it('should detect correctly', () => {
        expect(isOverlappingTimeRange(
            { start: '2020-05-12', end: '2020-05-20'},
            { start: '2020-05-13', end: '2020-05-19'})).toBe(true);
        expect(isOverlappingTimeRange(
            { start: '2020-05-12', end: '2020-05-20'},
            { start: '2020-05-11', end: '2020-05-19'})).toBe(true);
        expect(isOverlappingTimeRange(
            { start: '2020-05-12', end: '2020-05-20'},
            { start: '2020-05-13', end: '2020-05-21'})).toBe(true);
        expect(isOverlappingTimeRange(
            { start: '2020-05-12', end: '2020-05-20'},
            { start: '2020-05-11', end: '2020-05-21'})).toBe(true);
        expect(isOverlappingTimeRange(
            { start: '2020-05-12', end: '2020-05-20'},
            { start: '2020-05-20', end: '2020-05-22'})).toBe(false);
        expect(isOverlappingTimeRange(
            { start: '2020-05-12', end: '2020-05-20'},
            { start: '2020-05-10', end: '2020-05-11'})).toBe(false);
    });
    it('should ignore invalid input', () => {
        expect(isOverlappingTimeRange(
            { start: '2020-05-12', end: '2020-05-11' },
            { start: '2020-05-13', end: '2020-05-19'})).toBe(false);
        expect(isOverlappingTimeRange(
            { start: '2020-05-12', end: '2020-05-13' },
            { start: '2020-05-13', end: '2020-05-12'})).toBe(false);
        expect(isOverlappingTimeRange(
            // @ts-ignore
            { start: '2020-05-12', end: undefined },
            { start: '2020-05-13', end: '2020-05-19'})).toBe(false);
        expect(isOverlappingTimeRange(
            { start: '2020-05-12', end: '2020-05-20'},
            // @ts-ignore
            { start: undefined, end: '2020-05-19'})).toBe(false);
        expect(isOverlappingTimeRange(
            // @ts-ignore
            undefined,
            { start: '2020-05-13', end: '2020-05-21'})).toBe(false);
        expect(isOverlappingTimeRange(
            // @ts-ignore
            undefined,
            // @ts-ignore
            undefined)).toBe(false);
        expect(isOverlappingTimeRange(
            { start: '2020-05-12', end: '2020-05-20'},
            // @ts-ignore
            undefined)).toBe(false);
    });
});
