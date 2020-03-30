import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.scss']
})
export class PaletteComponent implements OnInit {
  title = 'Prueba Angular';
  selectedTheme = "";
  loadComponentUsers : boolean;
  constructor() {
    this.loadComponentUsers = true;
  }
  ngOnInit(): void {
  }



   refresh(a) {
    console.log("refres() eejecutandose");
    this.loadComponentUsers=false;
    setTimeout(x=>this.loadComponentUsers=true);
 }


}
