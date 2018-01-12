import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'tag-button',
    template: require('./tag-button.html')
})

export class TagButtonComponent implements OnInit {
    // len = 0;
    @Input() buttonText: string = null;
    @Input() buttonColor: string = null;
    @Input() applTag: string = null;
    @Input() appldAnnotate: string = null;
    @Output() tagApplied: EventEmitter<boolean> = new EventEmitter()

    constructor() {

    }

    ngOnInit() {
        // this.len = (this.appldAnnotate.filter(currObj => currObj.type === this.buttonText)).length;
        // alert(this.len);
    }

    applyTag(btnTxt) {
        this.tagApplied.emit(btnTxt);
    }
}
