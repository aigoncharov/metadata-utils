export const getMetadataAndCache = (metadataKey: string | symbol, target: object, propertyKey?: string | symbol) => {
  const targetArgs = (propertyKey ? [target, propertyKey] : [target]) as [object, string | symbol]
  const metadataOwn = Reflect.getOwnMetadata(metadataKey, ...targetArgs)
  if (metadataOwn) {
    return metadataOwn
  }
  const metadataPrototype = Reflect.getMetadata(metadataKey, ...targetArgs)
  if (metadataPrototype) {
    Reflect.defineMetadata(metadataKey, metadataPrototype, ...targetArgs)
  }
  return metadataPrototype
}
