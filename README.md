# @mnrendra/read-stacked-file
Read the stacked file from any sub-directory in your project.

## Install
```bash
npm i @mnrendra/read-stacked-file
```

## Usage

Using `CommonJS`:
```javascript
const { read, readSync } = require('@mnrendra/read-stacked-file')

// Asynchronously
read('file.name')
  .then((data) => {
    console.log('asynchronously:', data)
  })

// Synchronously
const data = readSync('file.name')
console.log('synchronously:', data)
```

Using `ES Module`:
```javascript
import { read, readSync } from '@mnrendra/read-stacked-file'

// Asynchronously
read('file.name')
  .then((data) => {
    console.log('asynchronously:', data)
  })

// Synchronously
const data = readSync('file.name')
console.log('synchronously:', data)
```

### Examples

#### 1. Read the `package.json` file in your development project:
Assuming your project's `~/project-name/package.json` file is as follows:
```json
{
  "name": "project-name",
  "version": "1.0.0"
}
```

Then, you can access and read the `~/project-name/package.json` file from any directory within your project.<br/>
Here are some examples:<br/>

##### • Read from `~/project-name/src/index.js`:
```javascript
const { readSync } = require('@mnrendra/read-stacked-file')

// Synchronously
const data = readSync('package.json')
const { name, version } = JSON.parse(data)
console.log('synchronously:', name, version) // Output: synchronously: project-name 1.0.0
```

##### • Read from `~/project-name/src/any-directory/index.mjs`:
```javascript
import { read } from '@mnrendra/read-stacked-file'

// Asynchronously
read('package.json')
  .then((data) => {
    const { name, version } = JSON.parse(data)
    console.log('asynchronously:', name, version) // Output: asynchronously: project-name 1.0.0
  })
```

#### 2. Read the `package.json` file in your published module:
Assuming your module is installed in the `/consumer/node_modules/module-name/` directory and the `package.json` file for your module located at `/consumer/node_modules/module-name/package.json` is as follows:
```json
{
  "name": "module-name",
  "version": "1.0.0"
}
```

Then, you can access and read your `package.json` file from any directory within your module.<br/>
Here are some examples:<br/>

##### • Read from `/consumer/node_modules/module-name/dist/index.js`:
```javascript
"use strict";
const { readSync } = require('@mnrendra/read-stacked-file');

// Synchronously
const data = readSync('package.json');
const { name, version } = JSON.parse(data)
console.log('synchronously:', name, version); // Output: synchronously: module-name 1.0.0
```

##### • Read from `/consumer/node_modules/module-name/dist/any-directory/index.js`:
```javascript
"use strict";
const { read } = require('@mnrendra/read-stacked-file');

// Asynchronously
read('package.json')
  .then((data) => {
    const { name, version } = JSON.parse(data)
    console.log('asynchronously:', name, version); // Output: asynchronously: module-name 1.0.0
  });
```

## Options
### • `skippedStacks`
*type: `string|string[]`*<br/>
*default: `[]`*<br/>
A name or a list of names of stack traces that need to be skipped.
### • `stackTraceLimit`
*type: `number`*<br/>
*default: `10`*<br/>
The `Error.stackTraceLimit` property specifies the number of stack frames to be collected by a stack trace.
### • `useCWD`
*type: `boolean`*<br/>
*default: `false`*<br/>
If set to `true`, it will use `process.cwd()` instead of `@mnrendra/stack-trace` to get the target path.

## Utilities
```javascript
import {
  validateSkippedStacks // To validate a name or a list of names of stack traces that need to be skipped. More info: @see https://github.com/mnrendra/validate-skipped-stacks
} from '@mnrendra/read-stacked-file'
```

## Types
```typescript
import type {
  Options, // @mnrendra/read-stacked-file options
  SkippedStacks, // @mnrendra/validate-skipped-stacks input
  ValidSkippedStacks // @mnrendra/validate-skipped-stacks output
} from '@mnrendra/read-stacked-file'
```

## License
[MIT](https://github.com/mnrendra/read-stacked-file/blob/HEAD/LICENSE)

## Author
[@mnrendra](https://github.com/mnrendra)
