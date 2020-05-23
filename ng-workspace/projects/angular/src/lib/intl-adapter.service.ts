import {Injectable} from "@angular/core";
import {IntlAdapter} from "@toms-toolbox/essentials";

/* injectable version of IntlAdapter */
@Injectable({providedIn: 'root'})
export class IntlAdapterService extends IntlAdapter {
}
