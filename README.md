# @yuiseki/gyazo-cli

## Install

If you want to use gyazo as command, install with `-g` option.

```bash
npm i -g @yuiseki/gyazo
```

Or if you want to use gyazo as npm package in your Node.js project, just install.

```bash
npm i @yuiseki/gyazo
```

## Basic Usage as command

You can use `gyazo` command if you have install with `-g` option.

The following command:

```bash
gyazo /path/to/image.png
```

will output tmp file path of screenshot to stdout:

```bash
https://gyazo.com/xxxxxxxxxxxxxxxxxxxx
```

### Advanced usage

`gyazo` command supports multiple CLI arguments and stdin.

Try below commands:

```bash
echo /path/to/image.png /path/to/image.jpg | xargs gyazo
cat /path/to/image.png | gyazo -i
```

## Basic Usage as package

```typescript
import { promises as fs } from "fs";
import { uploadToGyazoDeviceId } from "@yuiseki/gyazo";

const buffer = await fs.readFile(filepath);
const gyazoUrl = await uploadToGyazoDeviceId(buffer);
console.log(gyazoUrl);
```

## Development

```bash
npm ci
npm run build
npm link
NODE_ENV=development gyazo /path/to/image.png
```

## ToDo

- Support OAuth authentication and upload.
