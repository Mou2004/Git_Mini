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
}

const app = new App();