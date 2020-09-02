import {LowerCaseUrlSerializer} from "./lower-case-url-serializer";
import {PRIMARY_OUTLET, UrlSegment} from '@angular/router';

describe('LowerCaseUrlSerializer', () => {

  const serializer = new LowerCaseUrlSerializer();

  it('should make only path lower case', () => {
    const tree = serializer.parse('/Team/33/(User/TomEnglert//Support:Help)?Debug=True#FragmentPart');
    expect(tree.fragment).toBe('FragmentPart');
    expect(tree.queryParams).toEqual(({Debug: 'True'}));
    expect(tree.queryParams).not.toEqual(({debug: 'true'}));
    expect(tree.queryParams).not.toEqual(({debug: 'True'}));
    const rootGroup = tree.root.children[PRIMARY_OUTLET];
    expect(rootGroup.segments.map(s => s.path)).toEqual(['team', '33']);
    expect(rootGroup.children[PRIMARY_OUTLET].segments.map(s => s.path)).toEqual(['user', 'tomenglert']);
    expect(rootGroup.children['Support'].segments.map(s => s.path)).toEqual(['help']);
    expect(serializer.serialize(tree)).toBe('/team/33/(user/tomenglert//Support:help)?Debug=True#FragmentPart');
  })
})
