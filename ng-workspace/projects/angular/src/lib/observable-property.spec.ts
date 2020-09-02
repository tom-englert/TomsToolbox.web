import {ObservableProperty} from "./observable-property";
import {EventEmitter, Input, Output} from "@angular/core";

class Component {
  @ObservableProperty()
  @Input()
  someProperty: string;
  @Output()
  somePropertyChange: EventEmitter<string>;
}

describe('ObservableProperty', () => {
  it('Emits events only on changes.', () => {
    const target = new Component();
    const results: string[] = [];
    target.somePropertyChange.subscribe(x => results.push(x.toString()));
    target.someProperty = "a";
    target.someProperty = "a";
    target.someProperty = "b";
    target.someProperty = "b";
    target.someProperty = "a";

    expect(results).toEqual(["a", "b", "a"]);
  });
});