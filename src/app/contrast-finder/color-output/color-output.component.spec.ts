import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorOutputComponent } from './color-output.component';

describe('ColorOutputComponent', () => {
  let component: ColorOutputComponent;
  let fixture: ComponentFixture<ColorOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorOutputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
