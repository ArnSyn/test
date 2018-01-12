/**
 *
 */
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'annotator-tooltip',
  template: require('./annotator-tooltip.html'),
  styles: [require('./annotator-tooltip.scss')],
})
export class AnnotatorToolTipComponent implements OnInit {
  @Output()
  textSelected: EventEmitter<boolean> = new EventEmitter();

  selectedText = '';
  constructor() {
  }

  /**
   *
   */
  ngOnInit() {

  }



  /**
   *
   * @param target
   * @param event
   */
  addAnnotation() {
    this.textSelected.emit(true);

  }

}



