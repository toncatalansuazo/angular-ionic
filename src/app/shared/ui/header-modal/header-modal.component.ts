import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-modal',
  templateUrl: './header-modal.component.html',
  styleUrls: ['./header-modal.component.scss'],
})
export class HeaderModalComponent implements OnInit {
  @Input() title: string;
  @Output() dismiss: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {}

  onDismiss() {
    this.dismiss.emit();
  }
}
