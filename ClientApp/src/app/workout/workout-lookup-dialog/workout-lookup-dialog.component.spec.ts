import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutLookupDialogComponent } from './workout-lookup-dialog.component';

describe('WorkoutLookupDialogComponent', () => {
  let component: WorkoutLookupDialogComponent;
  let fixture: ComponentFixture<WorkoutLookupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutLookupDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutLookupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
