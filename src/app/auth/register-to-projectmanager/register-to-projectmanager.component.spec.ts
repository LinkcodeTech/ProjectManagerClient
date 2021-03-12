import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterToProjectmanagerComponent } from './register-to-projectmanager.component';

describe('RegisterToProjectmanagerComponent', () => {
  let component: RegisterToProjectmanagerComponent;
  let fixture: ComponentFixture<RegisterToProjectmanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterToProjectmanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterToProjectmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
