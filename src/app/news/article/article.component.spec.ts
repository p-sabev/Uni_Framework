import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ArticleComponent } from './article.component';
import { Store } from '@ngrx/store';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;

  beforeEach(() => {
    const locationStub = () => ({ getState: () => ({}) });
    const routerStub = () => ({ navigate: array => ({}) });
    const storeStub = () => ({
      select: function0 => ({}),
      dispatch: object => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ArticleComponent],
      providers: [
        { provide: Location, useFactory: locationStub },
        { provide: Router, useFactory: routerStub },
        { provide: Store, useFactory: storeStub }
      ]
    });
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const locationStub: Location = fixture.debugElement.injector.get(
        Location
      );
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(locationStub, 'getState').and.callThrough();
      spyOn(routerStub, 'navigate').and.callThrough();
      component.ngOnInit();
      expect(locationStub.getState).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
