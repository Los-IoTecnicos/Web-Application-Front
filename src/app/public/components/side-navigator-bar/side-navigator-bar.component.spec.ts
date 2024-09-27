import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavigatorBarComponent } from './side-navigator-bar.component';

describe('SideNavigatorBarComponent', () => {
  let component: SideNavigatorBarComponent;
  let fixture: ComponentFixture<SideNavigatorBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideNavigatorBarComponent]
    });
    fixture = TestBed.createComponent(SideNavigatorBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
