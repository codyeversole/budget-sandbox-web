import { SandboxService } from "./sandbox.service";
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TestBed } from "@angular/core/testing";
import { updateCurrentSandbox, updateCurrentSandboxDetailsOnly } from "../store/actions/current-sandbox.actions";
import { of } from "rxjs";

describe('Sandbox Service', () => {
    let sandboxService: SandboxService;
    let store: MockStore;
    
    beforeEach(() => {    
        TestBed.configureTestingModule({
          providers: [
            SandboxService,
            provideMockStore({}),
          ]
        });
        sandboxService = TestBed.inject(SandboxService);
        store = TestBed.inject(MockStore);
    });

    it('should dispatch updateCurrentSandbox with undefined when no sandboxes', () => {
        //arrange
        spyOn(store, 'dispatch');

        //act
        sandboxService.setCurrentSandbox([]);

        //assert
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(updateCurrentSandbox({sandbox: undefined}));
    });

    it('should dispatch updateCurrentSandbox with sanbox value when at least one sandbox', () => {
        //arrange
        spyOn(store, 'dispatch');
        const expectedSandbox = { sandboxId: 1, description: 'My Sandbox'};

        //act
        sandboxService.setCurrentSandbox([expectedSandbox]);

        //assert
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(updateCurrentSandbox({sandbox: expectedSandbox}));
    });

    it('should dispatch updateCurrentSandboxDetailsOnly with sanbox value when current sandbox is found in all sandboxes', () => {
        //arrange
        spyOn(store, 'dispatch');
        const expectedSandbox = { sandboxId: 1, description: 'My Sandbox'};
        sandboxService['currentSandbox$'] = of(expectedSandbox);

        //act
        sandboxService.setCurrentSandbox([expectedSandbox]);

        //assert
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(updateCurrentSandboxDetailsOnly({sandbox: expectedSandbox}));
    });

    it('should dispatch updateCurrentSandbox when current sandbox is set directly', () => {
        //arrange
        spyOn(store, 'dispatch');

        //act
        sandboxService.setCurrentSandboxDirectly(undefined);

        //assert
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(updateCurrentSandbox({sandbox: undefined}));
    });
})
