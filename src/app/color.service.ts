import { Injectable } from '@angular/core';

const MIN_RATIO = 4.5

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  processColor (color: number) {
    if (color <= 0.03928) {
        return color / 12.92
    } else {
        return ((color + 0.055)/1.055)**2.4
    }
  }

  randRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  } 


  reverseColor (toReverse: number) {
    let reversed : number
    if (toReverse <= .0030402477) {
        reversed = toReverse * 12.92
    } else {
        reversed = (((toReverse ** (1/2.4)) * 1.055) - 0.055)
    }

    return Math.max(0, Math.min(1, reversed))
  }


  RGBToLuminance(rgb: string) {
    let r = this.processColor(parseInt(rgb.slice(1, 3), 16) / 255)
    let g = this.processColor(parseInt(rgb.slice(3, 5), 16) / 255)
    let b = this.processColor(parseInt(rgb.slice(5), 16) / 255)

    return (
        0.2126 * r + 
        0.7152 * g + 
        0.0722 * b
    )
  }

  luminanceToRGB(luminance: number, fixedColor: string) {
    let [r, g, b] = [0, 0, 0];
    let minRed, minGreen, minBlue;
    let maxRed, maxGreen, maxBlue;
    switch(fixedColor) {
        case 'r':
            minRed = Math.max(0, (luminance - .7152 - .0722) / .2126)
            maxRed = Math.min(1, luminance / .2126)
            
            r = this.randRange(minRed, maxRed)
            luminance -= r * .2126

            minGreen = Math.max(0, (luminance - .0722) / .7152)
            maxGreen = Math.min(1, luminance / .7152)
            
            g = this.randRange(minGreen, maxGreen)
            luminance -= g * .7152
          
            b = luminance / .0722
            break;
        case 'g':
            minGreen = Math.max(0, (luminance - .0722 - .2126) / .7152)
            maxGreen = Math.min(1, luminance / .7152)

            g = this.randRange(minGreen, maxGreen)
            luminance -= g * .7152

            minBlue = Math.max(0, (luminance - .2126) / .0722)
            maxBlue = Math.min(1, luminance / .0722)

            b = this.randRange(minBlue, maxBlue)
            luminance -= b * .0722

            r = luminance / .2126
            break;
        case 'b':
            minBlue = Math.max(0, (luminance - 0.2126 - 0.7152) / 0.0722)
            maxBlue = Math.min(1, luminance / 0.0722)

            b = this.randRange(minBlue, maxBlue)
            luminance -= b * .0722

            minRed = Math.max(0, (luminance - 0.7152) / .2126)
            maxRed = Math.min(1, luminance / .2126)

            r = this.randRange(minRed, maxRed)
            luminance -= r * .2126

            g = luminance / 0.7152
            break;
    }

    r = Math.round(this.reverseColor(r) * 255)
    g = Math.round(this.reverseColor(g) * 255)
    b = Math.round(this.reverseColor(b) * 255)

    return `#${
        r.toString(16).padStart(2, "0")
    }${
        g.toString(16).padStart(2, "0")
    }${
        b.toString(16).padStart(2, "0")
    }`
  }

  luminanceToGrayscale(luminance: number) {
    let r = Math.round(this.reverseColor(luminance) * 255);
    let g = Math.round(this.reverseColor(luminance) * 255);
    let b = Math.round(this.reverseColor(luminance) * 255);

    return `#${
      r.toString(16).padStart(2, "0")
    }${
        g.toString(16).padStart(2, "0")
    }${
        b.toString(16).padStart(2, "0")
    }`
  }

  luminanceRatio(first: string, second: string) {
    let firstL = this.RGBToLuminance(first)
    let secondL = this.RGBToLuminance(second)

    if(firstL > secondL) {
      return (firstL + .05) / (secondL + .05)
    }

    return (secondL + .05) / (firstL + .05) 
  }

  computeColors(color: string, ratio: number, optionCount: number) {
    let _computedColors = []
    let luminance = this.RGBToLuminance(color)
    let grayscale = this.luminanceToGrayscale(luminance)
    
    let lighterMax = 1.05 / (luminance + .05)
    let darkerMax = (luminance + .05) / .05
    
    let maxRatio = Math.max(lighterMax, darkerMax);

    ratio = Math.min(ratio, Math.max(MIN_RATIO, maxRatio))
    let targetLuminance = lighterMax > darkerMax ?  (ratio * (luminance + .05) - .05) : (((luminance + .05) / ratio) - .05)

    for(let i = 0; i < optionCount; i++) {
      let fixedColorIndex = Math.floor(Math.random() * 3);
      let rgb = this.luminanceToRGB(targetLuminance, ['r', 'g', 'b'][fixedColorIndex])
      
      _computedColors.push(rgb)
    }

    let computedColors = new Set(_computedColors);
    return {
      luminance,
      maxRatio,
      grayscale,
      computedColors
    }
  }
}
