import {Injectable} from "@angular/core";
import {Culture} from "@toms-toolbox/essentials";
import {IntlAdapterService} from "./intl-adapter.service";

/* injectable version of Culture */
@Injectable({providedIn: 'root'})
export class CultureService extends Culture {
  constructor(intlAdapter: IntlAdapterService) {
    super(intlAdapter);
  }
}
