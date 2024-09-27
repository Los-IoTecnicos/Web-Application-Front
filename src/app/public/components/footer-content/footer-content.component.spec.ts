import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterContentComponent } from './footer-content.component';

describe('FooterContentComponent', () => {
  let component: FooterContentComponent;
  let fixture: ComponentFixture<FooterContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterContentComponent]
    });
    fixture = TestBed.createComponent(FooterContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
