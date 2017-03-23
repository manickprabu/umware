import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from "@angular/router";
import { SearchService } from "../shared/search.service";
import { SearchResolve } from "../search.resolve";
import { SavedSearchesComponent } from "./saved-searches.component";

describe("SavedSearchesComponent", () => {
	let comp: SavedSearchesComponent;
	let fixture: ComponentFixture<SavedSearchesComponent>;
	let routerStub: any;
	let searchServiceStub: any;
	let searchResolveStub: any;

	beforeEach(() => {
		routerStub = {
			navigate: () => ({})
		};
		searchServiceStub = {
			getMySavedSearches: () => ({
				subscribe: () => ({})
			})
		};
		searchResolveStub = {
			criteria: {}
		};
		TestBed.configureTestingModule({
			declarations: [ SavedSearchesComponent ],
			schemas: [ NO_ERRORS_SCHEMA ],
			providers: [
				{ provide: Router, useValue: routerStub },
				{ provide: SearchService, useValue: searchServiceStub },
				{ provide: SearchResolve, useValue: searchResolveStub }
			]
		});
		fixture = TestBed.createComponent(SavedSearchesComponent);
		comp = fixture.componentInstance;
	});

	it("can load instance", () => {
		expect(comp).toBeTruthy();
	});

});
