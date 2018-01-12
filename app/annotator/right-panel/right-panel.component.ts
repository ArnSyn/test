import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { UUID } from 'angular2-uuid';
import constants from '../../app.constants';

@Component({
    selector: 'right-panel',
    template: require('./right-panel.html')
})

export class RightPanelComponent implements OnInit {

    @Input() selectedTexts: Array<string> = [];
    @Input() currentAnnotations: Array<any> = [];

    @Output() addAnnotation: EventEmitter<boolean> = new EventEmitter();
    @Output() download: EventEmitter<boolean> = new EventEmitter();
    @Output() removeAnnotation: EventEmitter<number> = new EventEmitter();

    selectTags: Array<any> = [];
    currntComment = '';
    selectedTag: any = null;


    constructor( @Inject(FormBuilder) private fb: FormBuilder) {

    }

    ngOnInit() {
        this.selectTags = constants.selectTags;
    }

    triggerAddAnnotation() {
        this.selectedTexts.map(e => {
            e['comment'] = this.selectedTag.comment ? this.currntComment : '', e['annotation'] = this.selectedTag.annotation, e['type'] = this.selectedTag.type, e['id'] = UUID.UUID(), e['color'] = this.selectedTag.color;
        });
        this.selectedTag = null;
        this.addAnnotation.emit(true);
    }
    triggerDownload() {
        this.download.emit(true);
    }

    removeTextSelection(i: number) {
        this.selectedTexts.splice(i, 1);
    }
    removeAllTextSelection() {
        this.selectedTexts = [];
    }
    removeTAnnotation(i) {
        this.currentAnnotations.splice(i, 1);
        this.removeAnnotation.emit(i + 1);
    }
    updateSlectedTag(tag) {
        this.selectedTag = tag;
    }
}
