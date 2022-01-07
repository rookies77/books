import { Directive, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[DragDrop]',
})
export class DragAndDropDirective {
  @Output() onFileDropped = new EventEmitter<any>();

  constructor() {}

  @HostBinding('style.background-color') private background = '#f5fcff';
  @HostBinding('style.opacity') private opacity = '1';

  //Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt: any) {
    // voir le typage
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#9ecbec';
    this.opacity = '0.8';

  }
  //Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff';
    this.opacity = '1';
  }

  //Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#9ecbec'
    this.opacity = '1'
    this.onFileDropped.emit(evt.dataTransfer.files[0])
   
    // }

  }
}
