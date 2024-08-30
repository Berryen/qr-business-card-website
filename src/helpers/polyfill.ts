if (!Object.hasOwn) {
  Object.hasOwn = function (obj: any, prop: PropertyKey): boolean {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  };
}
