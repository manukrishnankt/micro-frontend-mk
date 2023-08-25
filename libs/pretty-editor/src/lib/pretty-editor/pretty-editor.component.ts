/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Editor, Toolbar } from 'ngx-editor';
import { TransformPipe } from '../shared/transform-pipe';

@Component({
  selector: 'mk-workspace-pretty-editor',
  templateUrl: './pretty-editor.component.html',
  styleUrls: ['./pretty-editor.component.scss'],
})
export class PrettyEditorComponent implements OnInit, OnDestroy {
  editor!: Editor;
  @Input() editorBody = '';
  @Input() placeholder = '';
  @Input() disabledYN = false;
  @Input() toolbar: Toolbar = [];
  @Input() historySupportedYN: boolean = true;
  @Input() type: string = '';

  ngOnInit(): void {
    this.editor = new Editor({ history: this.historySupportedYN });
    if (!this.toolbar.length) {
      this.toolbar = [
        ['bold', 'italic'],
        ['underline', 'strike'],
        ['code', 'blockquote'],
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
        ['link', 'image'],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
      ];
    }
    this.editorBody = `<pre>${new TransformPipe().transform(
      this.editorBody,
      this.type
    )}</pre>`;
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
