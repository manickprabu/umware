import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SearchService } from "../shared/search.service";
import { RecentlyModifiedComponent } from "./recently-modified.component";

describe("RecentlyModifiedComponent", () => {
	let comp: RecentlyModifiedComponent;
	let fixture: ComponentFixture<RecentlyModifiedComponent>;
	let searchServiceStub: any;

	beforeEach(() => {
		searchServiceStub = {
			getModifiedSearches: () => ({
				subscribe: () => ({})
			})
		};
		TestBed.configureTestingModule({
			declarations: [ RecentlyModifiedComponent ],
			schemas: [ NO_ERRORS_SCHEMA ],
			providers: [
				{ provide: SearchService, useValue: searchServiceStub }
			]
		});
		fixture = TestBed.createComponent(RecentlyModifiedComponent);
		comp = fixture.componentInstance;
	});

	it("can load instance", () => {
		expect(comp).toBeTruthy();
	});

	it("resultRows defaults to: []", () => {
		expect(comp.resultRows).toEqual([]);
	});

});
