import fs from 'fs';
import path from 'path';
import { PROJECT_ID, PRIVATE_KEY_ID, PRIVATE_KEY, CLIENT_EMAIL, CLIENT_ID } from '../config.js';

// const filePath = new URL('./firabase.json', import.meta.url).pathname.substring(1);
// const filePath = path.resolve(__dirname, './firabase.json');

console.log(filePath);

let jsonData = fs.readFileSync(filePath, 'utf-8');

jsonData = jsonData.replace(/PROJECT_ID/g, PROJECT_ID)
                   .replace(/PRIVATE_KEY_ID/g, PRIVATE_KEY_ID)
                   .replace(/PRIVATE_KEY/g, PRIVATE_KEY)
                   .replace(/CLIENT_EMAIL/g, CLIENT_EMAIL)
                   .replace(/CLIENT_ID/g, CLIENT_ID)

export const configAdminFirebase = JSON.parse(jsonData);



