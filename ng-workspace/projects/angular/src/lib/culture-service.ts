import {Injectable} from "@angular/core";
import {Culture} from "@toms-toolbox/essentials";
import {IntlAdapterService} from "./intl-adapter.service";

/**
 *  Angular injectable version of Culture class
 */
@Injectable({providedIn: 'root'})
export class CultureService extends Culture {
  /**
   * Constructs a new culture service for the specified [[IntlAdapterService]]
   * @param intlAdapter
   */
  constructor(intlAdapter: IntlAdapterService) {
    if (!intlAdapter) {
      throw 'You must provide the IntlAdapterService';
    }
    super(intlAdapter);
  }
}
