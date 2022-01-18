import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContrastFinderComponent } from './contrast-finder.component';

describe('ContrastFinderComponent', () => {
  let component: ContrastFinderComponent;
  let fixture: ComponentFixture<ContrastFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContrastFinderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContrastFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
