import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContrastDetailsComponent } from './contrast-details.component';

describe('ContrastDetailsComponent', () => {
  let component: ContrastDetailsComponent;
  let fixture: ComponentFixture<ContrastDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContrastDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContrastDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
