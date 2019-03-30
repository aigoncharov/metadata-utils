# metadata-utils [![Build Status](https://travis-ci.org/keenondrums/metadata-utils.svg?branch=master)](https://travis-ci.org/keenondrums/metadata-utils) [![Coverage Status](https://coveralls.io/repos/github/keenondrums/metadata-utils/badge.svg?branch=master)](https://coveralls.io/github/keenondrums/metadata-utils?branch=master) [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Convenience%20utils%20for%20reflected%20metadata&url=https://github.com/keenondrums/metadata-utils&hashtags=javascript,typescript,metadata,reflection)

Convenience utils for reflected metadata.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [API](#api)
  - [getMetadataAndCache](#getmetadataandcache)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

1. Run

   ```sh
   npm i @keenondrums/metadata-utils reflect-metadata
   ```

1. Add `import 'reflect-metadata'` to the root of your application

## API

### getMetadataAndCache

Gets metadata from the prototype (using [Relect.getMetadata](https://github.com/rbuckton/reflect-metadata#api)) and sets it as own metadata. Useful to enhance performance for retrieving metadata from ancestors. Has the same signature as [Relect.getMetadata](https://github.com/rbuckton/reflect-metadata#api).

```ts
import 'reflect-metadata'
import { getMetadataAndCache } from '@keenondrums/metadata-utils'

class Parent {}
Reflect.defineMetadata('key', 'value', Parent)

Reflect.getOwnMetadata('key', Parent) // returns 'value'
getMetadataAndCache('key', Parent) // returns 'value', basically calls Reflect.getOwnMetadata under the hood and does nothing else in this case

class Child extends Parent {}

Reflect.getOwnMetadata('key', Child) // returns `undefined` as Child doesn't have any own metadata for 'key'
getMetadataAndCache('key', Child) // returns 'value' from Parent and set it as own metadata
Reflect.getOwnMetadata('key', Child) // now it returns 'value'
```
