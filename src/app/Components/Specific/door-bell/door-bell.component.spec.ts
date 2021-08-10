import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoorBellComponent } from './door-bell.component';

describe('DoorBellComponent', () => {
  let component: DoorBellComponent;
  let fixture: ComponentFixture<DoorBellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoorBellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoorBellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
