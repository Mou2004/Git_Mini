import path from 'path';
import fs from 'fs/promises';



class App{
    constructor(){
        this.repoPath = path.join(process.cwd(),'.app');
        this.objectsPath = path.join(this.repoPath,'objects');//.app/objects
        this.headPath = path.join(this.repoPath,'HEAD');
        this.indexPath = path.join(this.repoPath,'index')//.app/index-- staging area for the upcoming commit
        this.init();
    }

    //method to initialize git in the particular folder
    async init(){
        await fs.mkdir(this.objectsPath,{recursive: true});
        //writing file in head
        try{
            await fs.writeFile(this.headPath,'',{flag:'wx'});//wx: open for writing, fails if the file exists

            //write file for staging area
            await fs.writeFile(this.indexPath, JSON.stringify([]), {flag:'wx'})
        }
        catch(error){
            console.log('Folder has been already initialised')
        }
    }
    hashObject(content){
        return cryptop.createHash('sha1').update(content, 'utf-8').digest('hex');
    }

    //add files to staging area
    async add(fileToBeAdded){
        const fileData = await fs.readFile(filetoBeAdded, {encoding: 'utf-8'});
        const fileHash = this.hashObject(fileData);//hash the file
        console.log(fileHash);

        const newFileHashedObjectPath = path.join(this.objectsPath, fileHash); //.app/objects/---
        await fs.writeFile(newFileHashedObjectPath, fileData);

        console.log(`Added ${fileToBeAdded}`);
    }

}

const app = new App();
