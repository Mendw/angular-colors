import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface savedState {
  color: string,
  displayedColors: string[]
  maxRatio: number,
  ratio: number,
  grayscale: string,
}

interface storedData {
  savedColorPairs?: {
    foreground: string,
    background: string,
  }[],
  lastState?: savedState;
}

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {
  storage : Storage = localStorage

  private _data$ = new BehaviorSubject<storedData>(this._getData());
  public data = this._data$.asObservable()

  private _getData() {
    let data : storedData = JSON.parse(this.storage.getItem('color-data') || '{}');
    return data;
  }

  setData(newData: storedData) {
    let data = this._getData();
    data = {
      ...data,
      ...newData
    }

    this.storage.setItem('color-data', JSON.stringify(data));
    this._data$.next(data);
  }

  saveColorPair(foreground : string, background : string) {
    let data = this._getData();
    let newPair = {
      foreground,
      background
    }

    if(data.savedColorPairs) 
      data.savedColorPairs.push(newPair);
    else
      data.savedColorPairs = [newPair]

    this.storage.setItem('color-data', JSON.stringify(data));
    this._data$.next(data);
  }

  deleteColorPair(foreground : string, background: string) {
    let data = this._getData();
    let pair = {
      foreground,
      background
    };

    if(data.savedColorPairs) {
      let index = -1;
      for(let i = 0; i < data.savedColorPairs.length; i++) { 
        if(data.savedColorPairs[i].background === background &&
          data.savedColorPairs[i].foreground === foreground) {
            index = i;
            break;
          }
      }

      if(index === -1) return;
      data.savedColorPairs.splice(index, 1);
    }
    
    this.storage.setItem('color-data', JSON.stringify(data));
    this._data$.next(data);
  }

  loadData() {
    let data = this._getData();
    this._data$.next(data);
  }

  clearData() {
    this.storage.removeItem('color-data');
    this._data$.next({})
  }

  clearAll() {
    this.storage.clear()
    this._data$.next({})
  }
}
