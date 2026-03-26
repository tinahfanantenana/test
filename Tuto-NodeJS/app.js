
// import {open} from 'node:fs/promises'

// const file= await open('demo.txt','a');
// file.write('Hello');
// file.close();

import { watch } from "node:fs/promises"; //pour importer la methode watch qui permet d'observer un dossier ou un fichier pour s'il y a des modification qui sont faite dessus
const wather= watch ('./');