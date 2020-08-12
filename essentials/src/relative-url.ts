/**
 * A helper class to properly split a relative url into its parts
 */
export class RelativeUrl implements URL {

    private url: URL;

    get hash() {
        return this.url.hash;
    }

    set hash(value) {
        this.url.hash = value;
    }

    get pathname() {
        return this.url.pathname.substr(1);
    }

    set pathname(value) {
        this.url.pathname = '/' + value;
    }

    /**
     * @deprecated only for backward compatibility, use the pathname property.
     */
    get path() {
        return this.pathname;
    }

    get pathSegments(): string[] {
        return this.pathname.split('/')
    }

    get search() {
        return this.url.search;
    }

    set search(value) {
        this.url.search = value;
    }

    get searchParams() {
        return this.url.searchParams;
    }

    get host() {
        return '';
    }

    get hostname() {
        return '';
    }

    get href() {
        return this.toString();
    }

    get origin() {
        return '';
    }

    get password() {
        return '';
    }

    get port() {
        return '';
    }

    get protocol() {
        return '';
    }

    get username() {
        return '';
    }

    toJSON() {
        return this.toString();
    }

    toString() : string {
        return this.url.toString().slice(this.virtualBase.length);
    }

    private readonly virtualBase = 'file://x/';

    /**
     * Constructs a RelativeUrl object from a string.
     * @param relativeUrl
     */
    constructor(relativeUrl: string) {
        this.url = new URL(relativeUrl, this.virtualBase);
    }
}
