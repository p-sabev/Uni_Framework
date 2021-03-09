import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EmitterService } from 'src/app/_services/emitter.service';
import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(() => {
    const emitterServiceStub = () => ({
      showLoader: { subscribe: f => f({}) },
      hideLoader: { subscribe: f => f({}) }
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoaderComponent],
      providers: [{ provide: EmitterService, useFactory: emitterServiceStub }]
    });
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'subscribeForLoaderEvents').and.callThrough();
      component.ngOnInit();
      expect(component.subscribeForLoaderEvents).toHaveBeenCalled();
    });
  });
});
