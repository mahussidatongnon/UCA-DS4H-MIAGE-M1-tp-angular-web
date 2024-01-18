import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appRendu]'
})
export class RenduDirective {

  constructor(private el: ElementRef) { 
  }

  @Input() set appRendu(condition: boolean) {    
    if (condition) {
      this.el.nativeElement.style.color = 'green'

    } else {
      this.el.nativeElement.style.color = 'red'
    }
  }

}
