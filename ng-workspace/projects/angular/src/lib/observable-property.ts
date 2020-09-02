import {EventEmitter} from '@angular/core';
import {isContentEqual} from "@toms-toolbox/essentials";

/**
 * A typescript decorator that injects the logic to link a property with it's change event.
 * - use a simple field for the input.
 * - add the `ObservableProperty` decorator before the input decorator.
 * - do not initialize the output change event
 *
 * So instead of this bulky code:
 * ```ts
 * //-------------------------------------------------
 * comparer: (a, b) => boolean = isContentEqual;
 * somePropertyValue: string;
 * @Input()
 * set someProperty(value) {
 *     if (!this.comparer(this.somePropertyValue, value)) {
 *         this.somePropertyValue = value;
 *         this.somePropertyChange.emit(value);
 *     }
 * }
 *
 * get someProperty() {
 *     return this.somePropertyValue;
 * };
 *
 * @Output()
 * somePropertyChange = new EventEmitter<string>();
 * //-------------------------------------------------
 * ```
 *
 * you can simply write:
 *
 * ```ts
 * //-------------------------------------------------
 * @ObservableProperty()
 * @Input()
 * someProperty: string;
 * @Output()
 * somePropertyChange: EventEmitter<string>;
 * //-------------------------------------------------
 * ```
 * @param comparer The comparer used to detect changes; if the new object is the same as the old object, no event will be emitted. If no comparer is specified, `@toms-toolbox/essentials/isContentEqual`  is used. Set the comparer to `undefined` to omit comparison.
 */
export function ObservableProperty(comparer: (a: any, b: any) => boolean = isContentEqual) {
  return (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => {
    if (descriptor || !propertyKey) {
      throw 'Observable can only be applied to fields';
    }

    const eventKey = propertyKey + 'Change';
    const event = new EventEmitter();
    let value;

    const propertyDescriptor = {
      get: () => value,
      set: (_value) => {
        if (!comparer || !comparer(_value, value)) {
          value = _value;
          event.emit(value);
        }
      },
      enumerable: true,
      configurable: true
    };
    Object.defineProperty(target, propertyKey, propertyDescriptor);

    const eventDescriptor = {
      value: event,
      enumerable: true,
      configurable: true
    };
    Object.defineProperty(target, eventKey, eventDescriptor);
  };
}

