import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../components/directives.module';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

import { AnnotatorComponent } from './annotator.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { TagCloudComponent } from './tag-cloud/tag-cloud.component';
import { TagButtonComponent } from './tag-button/tag-button.component';
import { TagHighlightService } from './services/tag-highlight.service';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    CollapseModule,
    RouterModule,
    DirectivesModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    AnnotatorComponent,
    RightPanelComponent,
    TagCloudComponent,
    TagButtonComponent
  ],
  providers: [
    TagHighlightService
  ],
  exports: [
    AnnotatorComponent,
    RightPanelComponent,
    TagCloudComponent,
    TagButtonComponent
  ],
  entryComponents: [
    AnnotatorComponent
  ]
})
export class AnnotatorModule { }
