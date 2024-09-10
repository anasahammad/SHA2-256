const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

function hashFile(filePath){
    return new Promise((resolve, reject)=>{
        const hash = crypto.createHash('sha3-256')
        const stream = fs.createReadStream(filePath)
        stream.on('data', (data)=>hash.update(data));
        stream.on('end', ()=> resolve(hash.digest('hex')) );
        stream.on('error', (err)=>reject(err));
    })
}

async function processFiles(directory) {
    try {
        const files = await fs.promises.readdir(directory)

        const hashes = []

        for(const file of files){
            const filePath = path.join(directory, file)
            const hash = await hashFile(filePath)
            hashes.push(hash)
        }

        hashes.sort();

        const concatenatedHashes = hashes.join('')

        const email = 'anasahammad2002@gmail.com';
         const finalString = concatenatedHashes + email.toLocaleLowerCase()

         const finalHash = crypto.createHash('sha3-256').update(finalString).digest('hex')

         console.log('final hash', finalHash)
    } catch (error) {
        console.error('error', error)
    }
}

const filesDirectory = '../Downloads/task2'

processFiles(filesDirectory)
