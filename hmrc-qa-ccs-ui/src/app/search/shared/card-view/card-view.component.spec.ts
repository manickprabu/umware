import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CardViewComponent } from "./card-view.component";

describe("CardViewComponent", () => {
	let comp: CardViewComponent;
	let fixture: ComponentFixture<CardViewComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ CardViewComponent ],
			schemas: [ NO_ERRORS_SCHEMA ]
		});
		fixture = TestBed.createComponent(CardViewComponent);
		comp = fixture.componentInstance;
	});

	it("can load instance", () => {
		expect(comp).toBeTruthy();
	});

});
