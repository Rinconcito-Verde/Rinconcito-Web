let context: any = undefined;

export function setC(c: any) {
  context = c;
}

export function getC() {
  return context;
}
 