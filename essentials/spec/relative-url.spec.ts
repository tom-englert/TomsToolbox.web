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

    it('should parse multiple segments with search and hash', () => {
        const target = new RelativeUrl('a/b/c?nix=alles#theHash');
        expect(target.searchParams.has('nix')).toBe(true);
        expect(target.searchParams.get('nix')).toBe('alles');
        expect(target.pathSegments).toEqual(['a', 'b', 'c']);
        expect(target.path).toBe('a/b/c');
        expect(target.search).toBe('?nix=alles');
        expect(target.hash).toBe('#theHash')
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

    it('composes original source', () => {
        const source = 'host/a/b/c?p1=1&p2=2';
        const url = new RelativeUrl(source);
        expect(url.searchParams.toString()).toBe('p1=1&p2=2');
        expect(url.toString()).toBe(source);
    })

    it('composes original source', () => {
        const source = 'a/b/c?p1=1&p2=2#hash';
        const url = new RelativeUrl(source);
        expect(url.searchParams.toString()).toBe('p1=1&p2=2');
        expect(url.toString()).toBe(source);
    })

    it('escapes special characters', () => {
        const source = '"a"/b/c?p1=1&p2=2#hash';
        const url = new RelativeUrl(source);
        expect(url.searchParams.toString()).toBe('p1=1&p2=2');
        expect(url.toString()).toBe('%22a%22/b/c?p1=1&p2=2#hash');
    })

    it('decomposes hash with special characters', () => {
        const source = '"a"/b/c?p1=1&p2=2#hash?etc&more';
        const url = new RelativeUrl(source);
        expect(url.searchParams.toString()).toBe('p1=1&p2=2');
        expect(url.hash).toBe('#hash?etc&more');
        expect(url.toString()).toBe('%22a%22/b/c?p1=1&p2=2#hash?etc&more');
    })

    it('handles parameter replacement', () => {
        const source = 'a/b/c?p1=1&p2=2#hash';
        const url = new RelativeUrl(source);
        url.searchParams.delete('p1');
        url.searchParams.append('p3', 'test')
        expect(url.toString()).toBe('a/b/c?p2=2&p3=test#hash');
    })

    it('handles pathname replacement', () => {
        const source = 'a/b/c?p1=1&p2=2#hash';
        const url = new RelativeUrl(source);
        url.pathname = 'd/e';
        expect(url.toString()).toBe('d/e?p1=1&p2=2#hash');
    })

    it('handles pathname replacement with preceding slash', () => {
        const source = 'a/b/c?p1=1&p2=2#hash';
        const url = new RelativeUrl(source);
        url.pathname = '/d/e';
        expect(url.toString()).toBe('d/e?p1=1&p2=2#hash');
    })

    it('returns json with same as source', () => {
        const source = 'a/b/c?p1=1&p2=2#hash';
        const url = new RelativeUrl(source);
        expect(url.toJSON()).toBe(source);
    })
});

describe('original URL implementation', () => {
    it('composes original source', () => {
        const source = 'http://host/a/b/c?p1=1&p2=2';
        const url = new URL(source);
        expect(url.searchParams.toString()).toBe('p1=1&p2=2');
        expect(url.toString()).toBe(source);
    })
    it('composes original source', () => {
        const source = 'http://host/a/b/c?p1=1&p2=2#hash';
        const url = new URL(source);
        expect(url.searchParams.toString()).toBe('p1=1&p2=2');
        expect(url.toString()).toBe(source);
    })
    it('escapes special characters', () => {
        const source = 'http://host/"a"/b/c?p1=1&p2=2#hash';
        const url = new URL(source);
        expect(url.searchParams.toString()).toBe('p1=1&p2=2');
        expect(url.toString()).toBe('http://host/%22a%22/b/c?p1=1&p2=2#hash');
    })
    it('decomposes hash with special characters', () => {
        const source = 'http://host/"a"/b/c?p1=1&p2=2#hash?etc&more';
        const url = new URL(source);
        expect(url.searchParams.toString()).toBe('p1=1&p2=2');
        expect(url.hash).toBe('#hash?etc&more');
        expect(url.toString()).toBe('http://host/%22a%22/b/c?p1=1&p2=2#hash?etc&more');
    })
    it('handles parameter replacement', () => {
        const source = 'http://host/a/b/c?p1=1&p2=2#hash';
        const url = new URL(source);
        url.searchParams.delete('p1');
        url.searchParams.append('p3', 'test')
        expect(url.toString()).toBe('http://host/a/b/c?p2=2&p3=test#hash');
    })
    it('returns json with same as source', () => {
        const source = 'http://host/a/b/c?p1=1&p2=2#hash';
        const url = new URL(source);
        expect(url.toJSON()).toBe(source);
    })
});
