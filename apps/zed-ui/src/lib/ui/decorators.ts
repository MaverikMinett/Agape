export function On(elementSelector: string, event: string) {
  return function On(target: any, name: string) {
    target['ɑbindings'] ??= [];
    target['ɑbindings'].push({
      elementSelector,
      event,
      method: name,
    });
  };
}
