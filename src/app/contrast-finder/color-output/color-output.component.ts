import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-color-output',
  templateUrl: './color-output.component.html',
  styleUrls: ['./color-output.component.css']
})
export class ColorOutputComponent {
  @Input() computedColors!: Set<string>;
  @Input() currentColor!: string;
  @Input() savedColors!: {
    foreground: string,
    background: string
  }[];

  @Output() clearButton = new EventEmitter()

  constructor(private router: Router) {}

  navigateTo(foreground: string, background: string) {
    this.router.navigate(['details', foreground.substring(1), background.substring(1)])
  }

  clearSavedColors() {
    this.clearButton.emit()
  }
}
