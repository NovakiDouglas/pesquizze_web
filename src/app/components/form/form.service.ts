import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {

 
  

  downloadFile(data, filename='data', questions) {
    let csvData = this.ConvertToCSV(data, questions);
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
        dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
}

ConvertToCSV(objArray, headerList) {
     let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
     let str = '';
     let row = 'nº,';

     for (let index in headerList) {
         row += headerList[index] + ',';
     } 
     row = row.slice(0, -1);
     str += row + '\r\n';
     for (let i = 0; i < objArray.length; i++) {
         const element = objArray[i];
         let line = (i+1)+'';
         for (const key in element['answer']) {
            let head = element['answer'][key].answer;
                line += ',' + head;
         }
         str += line + '\r\n'; 

            /* let line = (i+1)+'';
            for (let index in objArray) {
               let head = objArray[index].answer;
               
                line += ',' + head;
            }
            str += line + '\r\n'; */
        
     };
     
     return str;
 }
}



