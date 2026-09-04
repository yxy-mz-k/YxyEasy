// import getMappingUrl from '/ioe/public/json/mapFileMapping';
export function getMapping() {
  const iconOptions: any = [];

  const modules = import.meta.globEager('/public/images/map/*.*');
  Object.keys(modules).map((i: any) => {
    iconOptions.push({
      label: i.slice(i.lastIndexOf('_') + 1, i.lastIndexOf('.')),
      value: i.slice(i.lastIndexOf('/') + 1, i.lastIndexOf('_')),
      path: new URL(i, import.meta.url).pathname?.replace('/public/', ''),
    });
  });
  return iconOptions;
}
export function getURL(icon: string) {}
