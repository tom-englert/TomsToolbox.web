/**
 * A helper class to properly split a relative url into its parts
 */
export class RelativeUrl {

    /**
     * The full path of the url
     */
    readonly path: string;
    /**
     * The segments of the path
     */
    readonly pathSegments: string[];
    /**
     * The search part of the url
     */
    readonly search: string;
    /**
     * The search params of the url
     */
    readonly searchParams: URLSearchParams;

    /**
     * Constructs a RelativeUrl object from a string.
     * @param relativeUrl
     */
    constructor(relativeUrl: string) {
        const url = new URL(relativeUrl, 'file://x/');
        this.path = url.pathname.substr(1);
        this.pathSegments = this.path.split('/');
        this.search = url.search;
        this.searchParams = url.searchParams;
    }
}
