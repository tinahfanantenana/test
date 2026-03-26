import {readFile} from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dir= path.dirname(fileURLToPath(import.meta.url));
console.log(await  readFile(path.join(dir,'demo-deep.txt'), 'utf-8'));

//N.B: __dirname ne fonction pas avec type: module