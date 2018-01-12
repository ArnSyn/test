import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TagHighlightService {
  public tagHighlightSubject = new Subject<any>();

  constructor() {}

  setAppliedTag(appldTag: any) {
    alert('From service: ' + appldTag);
    this.tagHighlightSubject.next(appldTag);
  }

  getAppliedTag(): Observable<any> {
    return this.tagHighlightSubject.asObservable();
  }
}
