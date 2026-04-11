// import {readFile, writeFile} from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';//ceci n'est pas asynchrne 
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { stat } from 'node:fs/promises';

const __filname=fileURLToPath(import.meta.url);
const __dirname= path.dirname(__filname);

const videoPath= path.join(__dirname,'..','video_les_streams','Video.mkv')
// const content=await readFile(videoPath);

// await writeFile(path.join(__dirname,'..','video_les_streams','video-copy.mp4'),content);
//les methodes en dessous est très sous commandé car il met tous la taille du fichier en memoire tampon avant de le copié qui risquerais de surchargé le serveur si le fichier est columineuxre. 
//C'est là qu'on utilise les streams

const stream = createReadStream(path.join(videoPath));
const {size}= await stat(path.join(videoPath));

let read=0;
stream.on('data',(chunk)=>{
    read+=chunk.length;//la taille du morceau incrémenté
    console.log(Math.round(100*read/size)+'%');
})
// stream.on('close',()=>console.log('close'))
const writeStream= createWriteStream(path.join(path.join(__dirname,'..','video_les_streams','Video-copy.mp4'))) 
stream.pipe(writeStream);
writeStream.on('finish',()=>console.log('fichier copié'));
