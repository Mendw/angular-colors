import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ColorService } from '../color.service';
import { PersistenceService } from '../persistence.service';

@Component({
  selector: 'app-contrast-details',
  templateUrl: './contrast-details.component.html',
  styleUrls: ['./contrast-details.component.css']
})
export class ContrastDetailsComponent implements OnInit {
  foreground! : string;
  background! : string;

  isSaved : boolean = false;

  luminanceRatio : number = 0;
  constructor(
    private route: ActivatedRoute, 
    private colorService: ColorService, 
    private persistenceService: PersistenceService,
    private router: Router
  ) {
    persistenceService.data.subscribe(data => {
      if(data.savedColorPairs) {
        this.isSaved = false;
        for(let pair of data.savedColorPairs) {
          console.log(this.foreground, pair.foreground)
          console.log(this.background, pair.background)
          if(pair.foreground === this.foreground && pair.background === this.background) {
            this.isSaved = true;
            break;
          }
        }
      } else {
        this.isSaved = false;
      }
    })
  }
  
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.isSaved = false;
      this.foreground = "#"+params.get('foreground')!;
      this.background = "#"+params.get('background')!;
      this.luminanceRatio = this.colorService.luminanceRatio(this.foreground, this.background)

      this.persistenceService.loadData()
    })

    this.persistenceService.loadData()
  }

  invertColors() {
    this.router.navigate(['details', this.background.substring(1), this.foreground.substring(1)], {
      replaceUrl: true
    })
  }

  navigateBack() {
    this.router.navigate(['..']);
  }

  saveColorPair() {
    this.persistenceService.saveColorPair(this.foreground, this.background)
  }

  deleteColorPair() {
    this.persistenceService.deleteColorPair(this.foreground, this.background);
  }
}
