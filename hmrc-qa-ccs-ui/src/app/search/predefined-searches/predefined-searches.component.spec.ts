import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from "@angular/router";
import { SearchService } from "../shared/search.service";
import { SearchResolve } from "../search.resolve";
import { PredefinedSearchesComponent } from "./predefined-searches.component";

describe("PredefinedSearchesComponent", () => {
	let comp: PredefinedSearchesComponent;
	let fixture: ComponentFixture<PredefinedSearchesComponent>;
	let routerStub: any;
	let searchServiceStub: any;
	let searchResolveStub: any;

	beforeEach(() => {
		routerStub = {
			navigate: () => ({})
		};
		searchServiceStub = {
			getPredefinedSearches: () => ({
				subscribe: () => ({})
			})
		};
		searchResolveStub = {
			criteria: {}
		};
		TestBed.configureTestingModule({
			declarations: [ PredefinedSearchesComponent ],
			schemas: [ NO_ERRORS_SCHEMA ],
			providers: [
				{ provide: Router, useValue: routerStub },
				{ provide: SearchService, useValue: searchServiceStub },
				{ provide: SearchResolve, useValue: searchResolveStub }
			]
		});
		fixture = TestBed.createComponent(PredefinedSearchesComponent);
		comp = fixture.componentInstance;
	});

	it("can load instance", () => {
		expect(comp).toBeTruthy();
	});

});
