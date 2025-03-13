import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveCounterComponent } from './move-counter.component';

describe('MoveCounterComponent', () => {
  let component: MoveCounterComponent;
  let fixture: ComponentFixture<MoveCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoveCounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoveCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
