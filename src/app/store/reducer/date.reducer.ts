import { Action } from "@ngrx/store";
import { Utils } from "src/app/shared/Utils";

export function dateReducer(state: Date = new Date(), action: Action){
    if(Utils.getDateObj(action.type).toString() !== 'Invalid Date') return state = Utils.getDateObj(action.type);
    
    return state;
}