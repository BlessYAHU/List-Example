import { useState, useEffect } from "react";
import { BehaviorSubject } from "rxjs";
import { filter } from "rxjs/operators";

//import { FooState } from "../types";

const INITIAL = {
  foo: false
};
const myData$ = new BehaviorSubject<any>(INITIAL);
export function useMessageStream<T>(
  ftr: (x: any) => boolean,
  initial: T = {} as T
): [T, (payload: T) => void] {
  const [data, _setData] = useState<T>(initial);

  useEffect(() => {
    const subscription = myData$.pipe(filter(ftr)).subscribe(_setData);
    return () => subscription.unsubscribe();
  }, [_setData]);

  const setData = (payload: T) => {
    // console.log(`move it along ${JSON.stringify(payload)}`);
    myData$.next(payload);
  };

  return [data, setData];
}
