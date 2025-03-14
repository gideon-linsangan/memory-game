import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinConditionComponent } from './win-condition.component';

describe('WinConditionComponent', () => {
  let component: WinConditionComponent;
  let fixture: ComponentFixture<WinConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinConditionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
