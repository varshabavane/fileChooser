import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { File, FileEntry, IFile } from "@ionic-native/file";
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
              alert("fileName insde filelist " + JSON.stringify(item.fullPath));
              // this.file
              this.fileType(item);
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
            //alert("fileName inside fileSearch" + JSON.stringify(item));
            // this._fileList.push({
            //   name: item.name,
            //   path: item.fullPath
            // });
            this.fileType(item);
          }
        }
      })
      .catch(e => {
        alert(JSON.stringify(e));
      });
  }

  FileDir() {
    //alert("filelist:" + JSON.parse(this._fileList[0]));
  }

  fileType(songDetail) {
    alert("songPath " + JSON.stringify(songDetail));
    try {
      let filetype = new File();
      filetype
        .resolveLocalFilesystemUrl(
          this.file.externalRootDirectory + songDetail.fullPath
        )
        .then((songDetail: FileEntry) => {
         // alert("songDetail: " + JSON.stringify(songDetail));
          console.log("songdetail: ", JSON.stringify(songDetail));
          return new Promise((resolve, reject) => {
            songDetail.file(
              sDetail => resolve(sDetail),
              error => reject(error)
            );
          }).then((sDetail: IFile) => {
            //alert("Detail: " + JSON.stringify(sDetail));
             if(sDetail.type=='audio/mpeg'){
               alert( "mp3songs " +JSON.stringify(sDetail))
            this._fileList.push({
              name: songDetail.name,
              path: songDetail.fullPath
            });
             }
          });
        });
    } catch {
      e => alert(JSON.stringify(e));
    }
  }
}
