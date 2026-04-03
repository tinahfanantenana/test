//1
// import {open} from 'node:fs/promises'

// const file= await open('demo.txt','a');
// file.write('Hello');
// file.close();

//2
// import { watch } from "node:fs/promises"; //pour importer la methode watch qui permet d'observer un dossier ou un fichier pour s'il y a des modification qui sont faite dessus
// const watcher= watch ('./');

// for await (const event of watcher){ //for await permet de bouclet sur un itérateur de promesse car watch return sur un pomiseIterato pas sur un Promise directement
//     console.log(event)
// }

import {readdir, stat} from 'node:fs/promises';
import pLimit from 'p-limit';

const limit = pLimit(5);


const files= await readdir('./', {withFileTypes:true});


const promises= files.map(file=>limit(
    async ()=>{
        const parts=[
            file.isDirectory()?'D':'F',
            file.name
        ];
        if(!file.isDirectory()){
            const {size}=await stat(file.name);
            parts.push(`${size}o`);
        }
        return parts.join('-');
    })
)

const results= await Promise.all(promises);

results.forEach(file=>console.log(file));