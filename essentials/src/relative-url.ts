export class RelativeUrl {

    readonly path: string;
    readonly pathSegments: string[];
    readonly search: string;
    readonly searchParams: URLSearchParams;

    constructor(relativeUrl: string) {
        const url = new URL(relativeUrl, 'file://x/');
        this.path = url.pathname.substr(1);
        this.pathSegments = this.path.split('/');
        this.search = url.search;
        this.searchParams = url.searchParams;
    }
}
