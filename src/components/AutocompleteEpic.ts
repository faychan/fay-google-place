import { Observable, of } from "rxjs";
// import * as Rx from "rx-dom";
import { ajax } from 'rxjs/ajax';
import {
  debounceTime,
  switchMap,
  mapTo,
  filter,
  merge,
  map,
  catchError
} from "rxjs/operators";
import { Reducer } from "redux";
import { Epic } from "redux-observable";
import { isOfType } from 'typesafe-actions';

import { Action, State, OptionsAction } from "../types";

export const autocompleteEpic: Epic<Action, OptionsAction> = action$ => {
  const input$: Observable<string> = action$.pipe(
    filter(isOfType("input")),
    map(action => action.payload)
  );

  return input$.pipe(
    debounceTime(500),
    filter(input => input.length <= 30 && input.length > 0),
    merge(
      input$.pipe(
        mapTo(null),
      )
    ),
    switchMap(input => {
      if (input !== null) {
        return ajax({
          url:`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${process.env.REACT_APP_GOOGLE_API_KEY}&input=${input}`, 
          crossDomain: true,
          responseType:'json',
          headers:{
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Headers": "*",
          }
        })
          .pipe(
            map((resp) => {
              return ( resp.response as {
                predictions: { description: string; place_id: string }[];
              }).predictions.map(item => ({
                key: item.place_id,
                value: item.description
              }))
            }),
            catchError(error => {
              console.log('error: ', error);
              return of(error);
            })
          )
      } else {
        return of([]);
      }
    }),
    map(search => ({ type: "options", payload: search }))
  );
};

export const autocompleteReducer: Reducer<State, Action> = (state, action) => {
  if (state === undefined) {
    return { options: [], input: "", tooLong: false, history: [], selected: { key: "", value: ""} };
  }

  switch (action.type) {
    case "options":
      return { ...state, options: action.payload };
    case "input":
      return {
        ...state,
        options: [],
        input: action.payload,
        tooLong: action.payload.length > 30
      };
    case "selected":
      return {
        ...state,
        selected: action.payload,
        history: state.history.filter( hs => hs.key === action.payload.key).length > 0 ? state.history : [].concat(state.history, action.payload)
      }
  }
};
