import { Component, OnInit, ViewChild, Pipe, PipeTransform, ViewEncapsulation, SimpleChanges } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import constants from '../app.constants';


import { xml2jsParser, Builder } from 'xml2js';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { promisesParser } from '../../components/util';
import { plainTextToHTML } from '../../components/util';
import { markRanges } from '../../components/util';
import { UUID } from 'angular2-uuid';
import { setTimeout } from 'core-js/library/web/timers';


// import { Mark } from 'mark.ts';

let Mark = require('mark.js');


@Component({
  selector: 'annotator',
  template: require('./annotator.html'),
  styles: [require('./annotator.scss')]
})
export class AnnotatorComponent implements OnInit {

  @ViewChild(RightPanelComponent) rightPanel;

  Sanitizer;
  fool: any;
  showStyle = false;
  selectedText = '';
  fullText: any;
  displayText: any = '';
  selectedTexts = [];
  currentAnnotations = [];
  namedentities = [];
  annotations = [];
  annotationTypes: any;
  relations = [];
  marker: any;
  startPoint = 0;
  endPoint = 0;
  classes = [];
  report: any;
  counter: any;
  container: any;
  ranges: any;
  options1 = {
    'element': 'span',
    'className': 'highlighted-text',
    'exclude': [],
    'iframes': false,
    'iframesTimeout': 5000,
    'each': function (node, range) {
      node.setAttribute('id', 'highlighted-text');
      // alert('Hi');
      // node.style.fontWeight = 'bold';
      // node.style.background = '#73AD21';
      // // node.style.border = '1px solid black';
      // node.style['border-radius'] = '25px';
      // node.style.padding = '5px';
      // node.style.fontSize = '150%';
    },
    'filter': function (textNode, range, term, counter) {
      return true; // must return either true or false
    },
    'noMatch': function (range) {
      console.log('No Match Range', range);
      // the not found range
      alert('Hi');

    },
    'done': function (counter) {
      let container = document.querySelector('#context');
      this.marker = new Mark(this.container);
      console.log(this.marker);
      // counter is a counter indicating the total number of all marks
    },
    'debug': false,
    'log': window.console
  };
  static parameters = [DomSanitizer];

  constructor(private sanitizer: DomSanitizer) {
    this.Sanitizer = sanitizer;
  }

  /**
   *
   */
  ngOnInit() {
    // this.fullText = '';
    this.container = document.querySelector('#context');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }


  /**
   *
   * @param event
   */
  public openFile(event: any) {
    let input = event.target;
    let pXML: any;
    let reader = new FileReader();
    reader.readAsText(input.files[0]);
    reader.onload = (e) => {
      plainTextToHTML(constants.mockXML.root.report)
        .then((result) => {
          console.log(result);
          this.fullText = result;
          // this.container.appendChild(result);
          //constants.mockXML.root.report = result.toString();
          localStorage.setItem('dataJSON', JSON.stringify(constants.mockXML.root));
          console.log('File Loaded.');
        });
    };
    reader.onloadend = (e) => {
      this.reloadFropmLocalStorage();
    };
  }

  /**
   *
   * @param target
   * @param event
   */
  showSelectedText(target: any, event: any) {
    let element = event; // this was mostly for testing

    var text = '';
    this.ranges = [];
    if (window.getSelection) {
      text = window.getSelection().toString();
      //    console.log("text:"+text);
      if (text !== '') {
        var start = 0, end = 0;
        var priorRange;
        // See where the selection is and attach popper to it
        var selection = window.getSelection().getRangeAt(0);
        priorRange = selection.cloneRange();
        // var mainDiv = document.getElementById('content');
        priorRange.selectNodeContents(this.container);
        priorRange.setEnd(selection.startContainer, selection.startOffset);
        this.startPoint = priorRange.toString().length;
        this.endPoint = this.startPoint + selection.toString().length;
        this.ranges.push({
          start: this.startPoint,
          length: selection.toString().length
        });
        this.showStyle = true;
      } else {
        // Hide popper
        this.showStyle = false;
      }
    } else {
      this.showStyle = false;
    }
    // Value of the selected Text/
    this.selectedText = text;
    console.log(this.ranges);

  }

  addSelectedText() {
    let text = this.selectedText;
    let temp = { text: text, start: this.ranges[0].start, end: (this.ranges[0].start + this.ranges[0].length) };
    this.showStyle = false;
    this.selectedTexts.push(temp);
    console.log(this.selectedTexts);
    this.selectedTexts.map((e) => e.color = this.selectedTexts[0].color);

  }

  reloadFropmLocalStorage() {
    let annotation: any = null;
    let pXML: any;
    let start = 0;
    let end = 0;
    let adder = 0;
    let length, _temp;
    pXML = JSON.parse(localStorage.getItem('dataJSON'));
    // this.displayText = result;
    // console.log(this.displayText);
    this.annotations = pXML.annotations;
    this.namedentities = this.annotations['named-entities'].NE;
    this.ranges = [];
    for (var i = 0; i < this.namedentities.length; i++) {
      console.log(this.namedentities[i]);
      annotation = this.namedentities[i];
      start = parseInt(annotation.start, 10);
      end = parseInt(annotation.end, 10);
      length = end - start;
      console.log('Start and Length ' + start + ' & ' + length);
      this.ranges.push({
        start: start,
        length: length,
        marked: false,
      });
      let height = this.namedentities[i].type === 'exchange' ?  '10px' : '12px';
      this.currentAnnotations.push({
        id: UUID.UUID(),
        annotation: 'named-entities',
        color: this.getTagColor(this.namedentities[i].type),
        comment: (this.namedentities[i].type === 'to-do' ? this.namedentities[i] : ''),
        start: this.namedentities[i].start,
        end: this.namedentities[i].end,
        text: this.namedentities[i].text,
        type: this.namedentities[i].type,
        height: height,
        conceptID: (this.namedentities[i].type !== 'to-do' && this.namedentities[i].conceptID ? this.namedentities[i].conceptID : ''),
      });
      console.log(this.currentAnnotations);
    }
    // console.log(this.fullText);
    markRanges(this.currentAnnotations, this.fullText, this.container);
      /*.then((result) => {
        console.log('Added highlights');
        let temp = Array.from(document.querySelectorAll('#highlighted-text'));
        this.currentAnnotations.forEach(item => {
          console.log(item);
          temp.forEach(element => {
            element['style']['display'] = '-webkit-inline-box';
            if (element['innerText'] === item.text) {
              console.log('Matching ', element['innerText']);
              console.log('With ', item.text);
              element['style']['background-color'] = item.color;
              element['style']['border-radius'] = '25px';
              element['style']['padding'] = '5px';
            } else {
              console.log('Not Matching ', element['innerText']);
              console.log('With ', item.text);
            }
          });
        });
      });*/
  }

  getTagColor(type) {
    let color: 'GRAY';
    constants.selectTags.forEach(item => {
      if (item.type === type) {
        color = item.color;
      }
    });
    return color;
  }

  getSpanCount(k: any) {
    this.annotationTypes += this.namedentities[k].$.type + ' ';
    if (k >= 0) {
      if (parseInt(this.namedentities[k - 1].$.start, 10) <= parseInt(this.namedentities[k].$.start, 10) && parseInt(this.namedentities[k - 1].$.end, 10) >= parseInt(this.namedentities[k].$.end, 10)) {
        this.counter++;
        this.getSpanCount(k - 1);
      } else {
        return this.counter;
      }
    } else {
      return this.counter;
    }
  }

  getStyle() {
    if (this.showStyle) {
      return 'block';
    } else {
      return 'none';
    }
  }

  removeAnnotation(i) {
    this.currentAnnotations.splice(i - 1, 1);
    this.updateDisplayText();
  }

  addAnnotation() {
    this.currentAnnotations = [...this.currentAnnotations, ...this.selectedTexts];
    this.selectedTexts = [];
    this.updateDisplayText();
  }

  private updateDisplayText() {
    console.log(this.currentAnnotations);
    this.ranges = [];
    for (let i = 0; i < this.currentAnnotations.length; i++) {
      length = this.currentAnnotations[i].end - this.currentAnnotations[i].start;
      this.ranges.push({
        start: this.currentAnnotations[i].start,
        length: length
      });
    }
    // console.log(this.ranges);
    // alert('wait');
    // setTimeout(() => {
    //   markRanges(this.ranges, this.options1);
    // }, 1000);
    /*setTimeout(() => {
      markRanges(this.marker, this.ranges, this.options1);
    }, 5000);*/
    //markRanges(this.marker, this.ranges, this.options1);
      /*.then((result) => {
        console.log('Added highlights');
        let temp = Array.from(document.querySelectorAll('#highlighted-text'));
        this.currentAnnotations.forEach(item => {
          console.log(item);
          temp.forEach(element => {
            element['style']['display'] = '-webkit-inline-box';
            if (element['innerText'] === item.text) {
              element['style']['background-color'] = item.color;
              element['style']['border-radius'] = '25px';
              element['style']['padding'] = '5px';
            }
          });
        });
        // console.log(temp);

      });*/
  }



  downloadXml() {
    let element = document.createElement('a');
    let annotations = { 'named-entities': [], 'tags': [], relations: [] };

    this.currentAnnotations.forEach(item => {
      if (item.annotation === 'named-entities') {
        annotations['named-entities'].push(`<NE id="${item.id}" start="${item.start}" end="${item.end}" text="${item.text}" type="${item.type}"/>`);
      } else if (item.annotation === 'tags') {
        annotations['tags'].push(`<tag id="${item.id}" start="${item.start}" end="${item.end}" text="${item.text}" type="${item.type}"` + (item.comment ? `comment="${item.tycommente}"` : ``) + `/>`);
      }
    });

    let output = `<?xml version="1.0" encoding="UTF-8"?>
      <!DOCTYPE fin-corpus SYSTEM "D:\AI-ML\Morgan\Annotation\created-sample\sample1.dtd">
    <fin-corpus xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
      <report>${this.fullText}</report>
      <annotations>
        <named-entities>${annotations['named-entities'].join('\n')}</named-entities>
        <tags>${annotations['tags'].join('\n')}</tags>
        <relations>${annotations['relations'].join('\n')}</relations>
      </annotations>
    </fin-corpus>`;

    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(output));
    element.setAttribute('download', 'annotations.xml');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}







// markRanges(this.marker, this.ranges, this.options1)
//       .then((result) => {
//         console.log('Added highlights');
//         let temp = Array.from(document.querySelectorAll('#highlighted-text'));
//         this.currentAnnotations.forEach(item => {
//           console.log(item);
//           temp.forEach(element => {
//             element['style']['display'] = '-webkit-inline-box';
//             if (element['innerText'] === item.text) {
//               console.log('Matching ', element['innerText']);
//               console.log('With ', item.text);
//               element['style']['background-color'] = item.color;
//               element['style']['border-radius'] = '25px';
//               element['style']['padding'] = '5px';
//             } else {
//               console.log('Not Matching ', element['innerText']);
//               console.log('With ', item.text);
//             }
//           });
//         });
//       });
