import { Component, OnInit, Inject, Input, Output, EventEmitter, Injectable, forwardRef } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TagButtonComponent } from '../tag-button/tag-button.component';
import { TagHighlightService } from '../services/tag-highlight.service';

import constants from '../../app.constants';

@Component({
    selector: 'tag-cloud',
    template: require('./tag-cloud.html')
})

@Injectable()
export class TagCloudComponent implements OnInit {

    @Input() selectedTexts: Array<string> = [];
    @Input() appliedTag: string = null;
    @Input() appliedAnnotations: Array<any> = [];
    @Output() cloudTagApplied: EventEmitter<boolean> = new EventEmitter();

    selectTags: Array<any> = [];

    tagHighlightService: TagHighlightService;

    constructor(@Inject(forwardRef(() => TagHighlightService)) tagHighlightService: TagHighlightService) { 
        this.tagHighlightService = tagHighlightService;
    }

    ngOnInit() {
        this.selectTags = constants.selectTags;
    }

    tagApplied(btnTxt) {
        // this.tagHighlightService.setAppliedTag(btnTxt);
        this.cloudTagApplied.emit(btnTxt);
    }
}
