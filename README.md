# @mnrendra/read-stacked-file

![npm version](https://img.shields.io/npm/v/@mnrendra/read-stacked-file)
![types](https://img.shields.io/npm/types/@mnrendra/read-stacked-file)
![license](https://img.shields.io/npm/l/@mnrendra/read-stacked-file)

Read a file based on the stack trace from any subdirectory in your project.<br/>
*Useful for reading files relative to the original caller — even when deeply nested. Ideal for accessing config files like `package.json`, `.env`, and more.*

## Install
```bash
npm i @mnrendra/read-stacked-file
```

## Usage
- **`readStackedFile(targetFile?, options?)`**:<br/>
Reads the stack-trace file asynchronously and returns the file data in a `Promise<string>`.
- **`readStackedFileSync(targetFile?, options?)`**:<br/>
Reads the stack-trace file synchronously and returns the file data in a `string`.

### Using **CommonJS**:
```javascript
const { readStackedFile, readStackedFileSync } = require('@mnrendra/read-stacked-file')

// Asynchronously
const readAsync = async () => {
  const data = await readStackedFile('package.json')
  console.log('asynchronously:', data)
}

readAsync()

// Synchronously
const readSync = () => {
  const data = readStackedFileSync('package.json')
  console.log('synchronously:', data)
}

readSync()
```

### Using **ES Modules**:
```javascript
import { readStackedFile, readStackedFileSync } from '@mnrendra/read-stacked-file'

// Asynchronously
const readAsync = async () => {
  const data = await readStackedFile('package.json')
  console.log('asynchronously:', data)
}

readAsync()

// Synchronously
const readSync = () => {
  const data = readStackedFileSync('package.json')
  console.log('synchronously:', data)
}

readSync()
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

This lets you read the `~/project-name/package.json` file from any directory in your project.<br/>
Examples:<br/>

##### • Read from `~/project-name/src/index.js`:
```javascript
const { readStackedFileSync } = require('@mnrendra/read-stacked-file')

// Synchronously
const main = () => {
  const data = readStackedFileSync('package.json')
  const { name, version } = JSON.parse(data)
  console.log('synchronously:', name, version) // Output: synchronously: project-name 1.0.0
}

main()
```

##### • Read from `~/project-name/src/any-directory/index.mjs`:
```javascript
import { readStackedFile } from '@mnrendra/read-stacked-file'

// Asynchronously
const main = async () => {
  const data = await readStackedFile('package.json')
  const { name, version } = JSON.parse(data)
  console.log('asynchronously:', name, version) // Output: asynchronously: project-name 1.0.0
}

main()
```

#### 2. Read the `package.json` file in your published module:
Assuming your module is installed in the `/consumer/node_modules/module-name/` directory and the `package.json` file for your module located at `/consumer/node_modules/module-name/package.json` is as follows:
```json
{
  "name": "module-name",
  "version": "1.0.0"
}
```

This lets you access and read your module’s `package.json` file from any directory within the module itself.<br/>
Here are some examples:<br/>

##### • Read from `/consumer/node_modules/module-name/dist/index.js`:
```javascript
"use strict";

const { readStackedFileSync } = require('@mnrendra/read-stacked-file');

// Synchronously
const main = () => {
  const data = readStackedFileSync('package.json');
  const { name, version } = JSON.parse(data);
  console.log('synchronously:', name, version); // Output: synchronously: module-name 1.0.0
}

main();
```

##### • Read from `/consumer/node_modules/module-name/dist/any-directory/index.js`:
```javascript
"use strict";

const { readStackedFile } = require('@mnrendra/read-stacked-file');

// Asynchronously
const main = async () => {
  const data = await readStackedFile('package.json');
  const { name, version } = JSON.parse(data);
  console.log('asynchronously:', name, version); // Output: asynchronously: module-name 1.0.0
}

main();
```

## Options

### • `caller`
**Type:** `(...args: any) => any`<br/>
A caller function to serve as the stack-trace target.

### • `stackTraceLimit`
**Type:** `number`<br/>
**Default:** `10`<br/>
The `Error.stackTraceLimit` property specifies the number of stack frames to be collected by a stack trace.

## Types
```typescript
import type {
  Options // The Options interface for `readStackedFile` and `readStackedFileSync`.
} from '@mnrendra/read-stacked-file'
```

## License
[MIT](https://github.com/mnrendra/read-stacked-file/blob/HEAD/LICENSE)

## Author
[@mnrendra](https://github.com/mnrendra)
