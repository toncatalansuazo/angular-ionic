import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appProductReady]'
})
export class ProductReadyDirective {

  constructor(private el: ElementRef) { }
  @HostListener('click')
  onClick() {
    const initBackColor = this.el.nativeElement.style.backgroundColor;
    console.log({initBackColor});
    if (initBackColor === '') {
      console.log(this.el);
      this.el.nativeElement.style.textDecoration = 'line-through';
      this.el.nativeElement.style.backgroundColor = '#15ce159e';
      this.el.nativeElement.style.textDecoration = 'line-through';
      this.el.nativeElement.style.color = '#0e0e0e';
      this.el.nativeElement.style.borderRadius = '50px 50px 50px 50px';
    } else {
      this.el.nativeElement.style.textDecoration = 'none';
      this.el.nativeElement.style.backgroundColor = '';
      this.el.nativeElement.style.textDecoration = 'none';
      this.el.nativeElement.style.color = 'none';
    }
  }


}
