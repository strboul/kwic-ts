/** For array/objects to receive methods e.g. reduce
 */
export interface IBaseMethod {
  [x: string]: any;
}

export interface IBaseArray<T> extends IBaseMethod {
  [index: number]: T;
}

export interface IBaseObject<T1, T2> extends IBaseMethod {
  index: T1;
  left: T2;
  right: T2;
}
