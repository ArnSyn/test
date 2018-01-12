import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AnnotatorComponent } from '../annotator/annotator.component';

@Component({
  selector: 'main',
  template: require('./main.html'),
  styles: [require('./main.scss')],
})
export class MainComponent implements OnInit {
  Http;
  awesomeThings = [];
  newThing = '';

  static parameters = [Http];
  constructor(private http: Http) {
    this.Http = http;

  }

  ngOnInit() {

  }

}
