import { Component, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-color-input',
  templateUrl: './color-input.component.html',
  styleUrls: ['./color-input.component.css']
})
export class ColorInputComponent {
  @Input() color!: string;
  @Input() grayscale!:string;
  @Input() ratio!: number;
  @Input() luminance!: number;
  @Input() maxRatio!: number;

  colorForm = new FormGroup({})

  @Output() colorParameters = new EventEmitter<{
    color: string,
    ratio: number
  }>();

  ngOnInit() {
    this.colorForm.addControl('color', new FormControl(this.color))
    this.colorForm.addControl('ratio', new FormControl(this.ratio))

    this.colorForm.valueChanges.subscribe((value: {
      color: string,
      ratio: number
    }) => {
      this.colorParameters.emit(value)
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['ratio']?.firstChange === false) {
      let newValue = changes['ratio'].currentValue;
      this.colorForm.get('ratio')?.setValue(newValue);
    }
  }
}
