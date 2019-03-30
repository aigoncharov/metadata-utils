import 'reflect-metadata'

import { getMetadataAndCache } from './index'

describe('getMetadataAndCache', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('class', () => {
    test('returns own metadata', () => {
      class A {}
      const metadataVal = Symbol()
      const metadataKey = Symbol()
      Reflect.defineMetadata(metadataKey, metadataVal, A)
      const spyGetOwnMetadata = jest.spyOn(Reflect, 'getOwnMetadata')
      const spyGetMetadata = jest.spyOn(Reflect, 'getMetadata')
      const spyDefineMetadata = jest.spyOn(Reflect, 'defineMetadata')
      const res = getMetadataAndCache(metadataKey, A)
      expect(res).toBe(metadataVal)
      expect(spyGetOwnMetadata).toBeCalled()
      expect(spyGetMetadata).not.toBeCalled()
      expect(spyDefineMetadata).not.toBeCalled()
    })
    test('returns prototype metadata and sets it as own', () => {
      class A {}
      class B extends A {}
      const metadataVal = Symbol()
      const metadataKey = Symbol()
      Reflect.defineMetadata(metadataKey, metadataVal, A)
      const spyGetOwnMetadata = jest.spyOn(Reflect, 'getOwnMetadata')
      const spyGetMetadata = jest.spyOn(Reflect, 'getMetadata')
      const spyDefineMetadata = jest.spyOn(Reflect, 'defineMetadata')
      const res1 = getMetadataAndCache(metadataKey, B)
      expect(res1).toBe(metadataVal)
      expect(spyGetOwnMetadata).toBeCalled()
      expect(spyGetMetadata).toBeCalled()
      expect(spyDefineMetadata).toBeCalled()
      jest.clearAllMocks()
      const res2 = getMetadataAndCache(metadataKey, B)
      expect(res2).toBe(metadataVal)
      expect(spyGetOwnMetadata).toBeCalled()
      expect(spyGetMetadata).not.toBeCalled()
      expect(spyDefineMetadata).not.toBeCalled()
    })
  })
  describe('class property', () => {
    test('returns own metadata', () => {
      const propertyKey = 'test'
      class A {
        public [propertyKey]() {} // tslint:disable-line no-empty
      }
      const metadataVal = Symbol()
      const metadataKey = Symbol()
      Reflect.defineMetadata(metadataKey, metadataVal, A.prototype, propertyKey)
      const spyGetOwnMetadata = jest.spyOn(Reflect, 'getOwnMetadata')
      const spyGetMetadata = jest.spyOn(Reflect, 'getMetadata')
      const spyDefineMetadata = jest.spyOn(Reflect, 'defineMetadata')
      const res = getMetadataAndCache(metadataKey, A.prototype, propertyKey)
      expect(res).toBe(metadataVal)
      expect(spyGetOwnMetadata).toBeCalled()
      expect(spyGetMetadata).not.toBeCalled()
      expect(spyDefineMetadata).not.toBeCalled()
    })
    test('returns prototype metadata and sets it as own', () => {
      const propertyKey = 'test'
      class A {
        public [propertyKey]() {} // tslint:disable-line no-empty
      }
      class B extends A {}
      const metadataVal = Symbol()
      const metadataKey = Symbol()
      Reflect.defineMetadata(metadataKey, metadataVal, A.prototype, propertyKey)
      const spyGetOwnMetadata = jest.spyOn(Reflect, 'getOwnMetadata')
      const spyGetMetadata = jest.spyOn(Reflect, 'getMetadata')
      const spyDefineMetadata = jest.spyOn(Reflect, 'defineMetadata')
      const res1 = getMetadataAndCache(metadataKey, B.prototype, propertyKey)
      expect(res1).toBe(metadataVal)
      expect(spyGetOwnMetadata).toBeCalled()
      expect(spyGetMetadata).toBeCalled()
      expect(spyDefineMetadata).toBeCalled()
      jest.clearAllMocks()
      const res2 = getMetadataAndCache(metadataKey, B.prototype, propertyKey)
      expect(res2).toBe(metadataVal)
      expect(spyGetOwnMetadata).toBeCalled()
      expect(spyGetMetadata).not.toBeCalled()
      expect(spyDefineMetadata).not.toBeCalled()
    })
  })
})
