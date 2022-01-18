import { Component } from '@angular/core';
import { ColorService } from '../color.service';
import { PersistenceService } from '../persistence.service';

const OPTION_COUNT = 9

@Component({
  selector: 'app-contrast-finder',
  templateUrl: './contrast-finder.component.html',
  styleUrls: ['./contrast-finder.component.css']
})
export class ContrastFinderComponent {

  title = "Find contrasting colors"

  color : string = "#000000";
  grayscale : string = "#000000";
  ratio : number = 4.5;
  maxRatio : number = 21;
  computedColors : Set<string> = new Set();
  savedColors : {
    foreground: string,
    background: string
  }[] = []

  constructor(private colorService: ColorService, private persistenceService: PersistenceService) {
    this.persistenceService.data.subscribe(data => {
      if(data.savedColorPairs) {
        this.savedColors = data.savedColorPairs
      }
      if(data.lastState) {
        this.color = data.lastState.color,
        this.grayscale = data.lastState.grayscale,
        this.ratio = data.lastState.ratio,
        this.maxRatio = data.lastState.maxRatio,
        this.computedColors = new Set(data.lastState.displayedColors);
      } else {
        this.computeColors()
      }
    })   
  }
  updateTimeout : ReturnType<typeof setTimeout> | null = null
  luminance = 0;
  
  computeColors() {
    let computed = this.colorService.computeColors(this.color, this.ratio, OPTION_COUNT);    
    
    this.luminance = computed.luminance
    this.maxRatio = Math.ceil(computed.maxRatio * 100) / 100;
    this.grayscale = computed.grayscale
    this.computedColors = computed.computedColors

    if(this.maxRatio < this.ratio) {
      this.ratio = this.maxRatio;
    }

    this.saveToLocalstorage()
  }

  onColorParameters(value: {
    color: string,
    ratio: number
  }) {
    let colorChanged = this.color !== value.color;
    let ratioChanged = this.ratio !== value.ratio;

    this.color = value.color;
    this.ratio = value.ratio;

    if (colorChanged || ratioChanged ) {
      this.computeColors()
    }
  }

  recalculate() {
    this.computeColors()
  }

  saveToLocalstorage() {
    if(this.updateTimeout) { clearTimeout(this.updateTimeout) };
    this.updateTimeout = setTimeout(() => {
      this.persistenceService.setData({
        lastState: {
          color: this.color,
          displayedColors: Array.from(this.computedColors),
          maxRatio: this.maxRatio,
          ratio: this.ratio,
          grayscale: this.grayscale
        }
      })
    }, 250)
  }

}
