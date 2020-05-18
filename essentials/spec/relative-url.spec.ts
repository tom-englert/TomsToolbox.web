import {RelativeUrl} from "../src/relative-url";

describe('RelativeURL', () => {
    it('should parse multiple segments', () => {
        const target = new RelativeUrl('a/b/c');
        expect(target.searchParams.has('nix')).toBe(false);
        expect(target.pathSegments).toEqual(['a', 'b', 'c']);
        expect(target.path).toBe('a/b/c');
        expect(target.search).toBe('');
    });

    it('should parse multiple segments with mixed slashes', () => {
        const target = new RelativeUrl('a\\b/c\\');
        expect(target.searchParams.has('nix')).toBe(false);
        expect(target.pathSegments).toEqual(['a', 'b', 'c', '']);
        expect(target.path).toBe('a/b/c/');
        expect(target.search).toBe('');
    });

    it('should parse multiple segments with search', () => {
        const target = new RelativeUrl('a/b/c?nix=alles');
        expect(target.searchParams.has('nix')).toBe(true);
        expect(target.searchParams.get('nix')).toBe('alles');
        expect(target.pathSegments).toEqual(['a', 'b', 'c']);
        expect(target.path).toBe('a/b/c');
        expect(target.search).toBe('?nix=alles');
    });

    it('parses single segment', () => {
        const target = new RelativeUrl('a');
        expect(target.searchParams.has('nix')).toBe(false);
        expect(target.pathSegments).toEqual(['a']);
        expect(target.path).toBe('a');
        expect(target.search).toBe('');
    });

    it('parses single segment with preceding slash', () => {
        const target = new RelativeUrl('/a');
        expect(target.searchParams.has('nix')).toBe(false);
        expect(target.pathSegments).toEqual(['a']);
        expect(target.path).toBe('a');
        expect(target.search).toBe('');
    });

    it('parses single segment with preceding backslash', () => {
        const target = new RelativeUrl('\\a');
        expect(target.searchParams.has('nix')).toBe(false);
        expect(target.pathSegments).toEqual(['a']);
        expect(target.path).toBe('a');
        expect(target.search).toBe('');
    });

    it('parses single segment with search', () => {
        const target = new RelativeUrl('a?nix=alles');
        expect(target.searchParams.has('nix')).toBe(true);
        expect(target.searchParams.get('nix')).toBe('alles');
        expect(target.pathSegments).toEqual(['a']);
        expect(target.path).toBe('a');
        expect(target.search).toBe('?nix=alles');
    });
});
