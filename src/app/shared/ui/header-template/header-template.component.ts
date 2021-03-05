import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-template',
  templateUrl: './header-template.component.html',
  styleUrls: ['./header-template.component.scss'],
})
export class HeaderTemplateComponent {

  constructor() { }
  @Input() isLoading: boolean;
}
