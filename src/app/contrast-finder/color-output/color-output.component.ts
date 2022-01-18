import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-color-output',
  templateUrl: './color-output.component.html',
  styleUrls: ['./color-output.component.css']
})
export class ColorOutputComponent {
  @Input() colors!: Set<string>;
  @Input() current!: string;

  constructor(private router: Router) {}

  navigateTo(current: string, color: string) {
    this.router.navigate([`/details/${current.substring(1)}/${color.substring(1)}`])
  }
}
