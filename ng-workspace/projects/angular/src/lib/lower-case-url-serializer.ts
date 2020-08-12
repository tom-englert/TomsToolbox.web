import {DefaultUrlSerializer, UrlSegmentGroup, UrlTree} from "@angular/router";

/**
 * Recursive walks all segments of the segment group and converts the path of each segment to lower case.
 * Useful to build e.g. an url serializer that converts the path to lower case while not touching the
 * query or fragment part.
 * @param segmentGroup The segment group to convert.
 */
export function makePathLowerCase(segmentGroup: UrlSegmentGroup) {
  if (!segmentGroup) {
    return;
  }
  const urlSegments = segmentGroup.segments;
  if (urlSegments) {
    urlSegments.forEach(segment => segment.path = segment.path.toLowerCase());
  }
  const children = segmentGroup.children;
  if (children) {
    Object.values(children).forEach(segmentGroup => {
      makePathLowerCase(segmentGroup);
    });
  }
}

/**
 * An url serializer that converts the path of an url to lower case while not touching the
 * query or fragment part.
 *
 * This will make your angular router accept paths in any case, like `/home` or `/Home` or `/HOME`
 *
 * See e.g. this question on [stack overflow](https://stackoverflow.com/questions/36154672/angular2-make-route-paths-case-insensitive)
 *
 * Usage: Add this code snippet to the providers of you module declaration:
 * ```ts
 * providers: [
 *   { provide: UrlSerializer, useClass: LowerCaseUrlSerializer },
 * ],
 * ```
 */
export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
  parse(url: string): UrlTree {
    const urlTree = super.parse(url);
    makePathLowerCase(urlTree.root);
    return urlTree;
  }
}
