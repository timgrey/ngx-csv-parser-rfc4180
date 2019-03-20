import { Component, OnInit, HostBinding, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {


  @ViewChild('fileInput')

  documentUploaded = false
  columns = []
  cars = []
  fileRead
  elRef: ElementRef;
  root = document.documentElement

  

  csv = 
    `Make,Model,Engine,Year
    Volkswagen,"Golf "R"",2.0T I4,2012
    Nissan,Xterra,4.0 V6,2009
    Lotus,Evora S,3.5 V6,"2012 
    2013
    "
    Ferrari, 812 Superfast, 6.5 V12, "2018, 2019"`
  
  ngOnInit() {
  }

  csvToArray(fileInput: any) {
    this.fileRead = fileInput.target.files[0];

    let reader: FileReader = new FileReader();
    reader.readAsText(this.fileRead);

    reader.onload = (e) => {
      let csv = <string>reader.result;
      let p = '', row = [''], allRows = [row], i = 0, r = 0, s = !0, l;
      for (l of csv) {
          if ('"' === l) {
              if (s && l === p) row[i] += l;
              s = !s;
          } else if (',' === l && s) l = row[++i] = '';
          else if ('\n' === l && s) {
              if ('\r' === p) row[i] = row[i].slice(0, -1);
              row = allRows[++r] = [l = '']; i = 0;
          } else row[i] += l;
          p = l;
      }
      this.columns = allRows.shift();
      this.cars = allRows
      this.documentUploaded = true
  };
}

}
