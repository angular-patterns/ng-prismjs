import { Component } from '@angular/core';
import { files } from './content/files';

@Component({
  selector: 'sa-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  main: any;
  index: any;
  constructor() {
    this.title = 'Hello World!';
    this.main = files.main;
    this.index = files.index;

  }
}
