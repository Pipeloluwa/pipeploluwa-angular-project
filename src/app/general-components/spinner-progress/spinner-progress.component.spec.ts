import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerProgressComponent } from './spinner-progress.component';

describe('SpinnerProgressComponent', () => {
  let component: SpinnerProgressComponent;
  let fixture: ComponentFixture<SpinnerProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpinnerProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
