import {Injectable} from "@angular/core";
import {IntlAdapter} from "@toms-toolbox/essentials";

/**
 *  Angular injectable version of the IntlAdapter class
 */
@Injectable({providedIn: 'root'})
export class IntlAdapterService extends IntlAdapter {
}
