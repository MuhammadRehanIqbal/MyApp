import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppmenueComponent } from './appmenue.component';

describe('AppmenueComponent', () => {
  let component: AppmenueComponent;
  let fixture: ComponentFixture<AppmenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppmenueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppmenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
