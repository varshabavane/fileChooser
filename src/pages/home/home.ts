import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { File } from "@ionic-native/file";
import { FilePath } from "@ionic-native/file-path";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  folderCount;
  _fileList = [];
  constructor(
    public navCtrl: NavController,
    public filePath: FilePath,
    public file: File
  ) {}

  getFileList(path: string) {
    // alert("foldername: " + path);
    let file = new File();
    this.file
      .listDir(file.externalRootDirectory, path)
      .then(
        result => {
          for (let item of result) {
            
            if (
              item.isDirectory == true &&
              item.name != "." &&
              item.name != ".."
            ) {
              this.getFileList(path + "/" + item.name);
            } else {
              alert( "fileName insde filelist "+ JSON.stringify(item));
              this._fileList.push({
                name: item.name,
                path: item.fullPath
              });
            }
          }
        },
        error => {
          alert("inside err " + error);
        }
      )
      // .then(() => alert("filelist" + JSON.stringifythis._fileList[0]))
      .catch(e => {
        alert(JSON.stringify(e));
      });
  }

  fileSearch() {
    alert("hello");

    /* test */

    this.file
      .listDir(this.file.externalRootDirectory, "")
      .then(result => {
        for (let item of result) {
          if (
            item.isDirectory == true &&
            item.name != "." &&
            item.name != ".."
          ) {
            this.folderCount++;
            this.getFileList(item.name); //Get all the files inside the folder. recursion will probably be useful here.
          } else if (item.isFile == true) {
            //File found
            alert("fileName inside fileSearch" + JSON.stringify(item))
            this._fileList.push({
              name: item.name,
              path: item.fullPath
              
            });
          }
        }
      })
      .catch(e => {
        alert(JSON.stringify(e));
      });
  }

  FileDir() {
    alert("filelist:" +  JSON.parse(this._fileList[0]));
  }

  /*
  import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
constructor(....
            , public filePath: FilePath
            , public platform: Platform
            , public file: File ) {
    this.platform.ready().then(() => {
      //the first parameter file.externalRootDirectory is for listing all files on application's root directory
      //The second parameter is the name of the folder. You can specify the nested folder here. e.g. 'Music/Coldplay'
      file.listDir(file.externalRootDirectory, '').then((result) => {
        for(let item of result)
        {
          if(item.isDirectory == true && item.name != '.' && item.name!= '..')
          {
            this.folderCount++;
            this.getFileList(item.name);//Get all the files inside the folder. recursion will probably be useful here.
          }
          else if (item.isFile == true)
          { 
            //File found
            this._fileList.push({
              name: item.name,
              path: item.fullPath
            });
          }
        }
      },
      (error) => {
        console.log(error);
      });      
    })
  }

  public getFileList(path: string): any
  {
    let file = new File();
    this.file.listDir(file.externalRootDirectory, path)
    .then((result)=>{
      for(let item of result)
      {
        if(item.isDirectory == true && item.name != '.' && item.name != '..')
        {
          this.getFileList(path + '/' + item.name);
        }
        else
        {
          this._fileList.push({
            name: item.name,
            path: item.fullPath
          })
        }
      }
    },(error)=>{
      console.log(error);
    })
  }
*/
}
