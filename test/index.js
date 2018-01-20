var chai,
	expect,
	_,
	cleaner;
if(typeof(window)==="undefined") {
	chai = require("chai");
	expect = chai.expect;
	_ = require("lodash");
	cleaner = require("../index.js");
}

describe("cleaner",function() {
	it("clean function",function() {
		expect(cleaner("() => { true; }")).to.equal(undefined);
	});
	it("clean html",function() {
		expect(cleaner("<div onclick='((event) => console.log(event))(event)'>Test</div>")).to.equal(undefined);
	});
	it("clean php",function() {
		expect(cleaner("<?php ")).to.equal(undefined);
	});
	it("clean eval",function() {
		expect(cleaner("eval(alert('ok'))")).to.equal(undefined);
	});
	it("clean object",function() {
		const object = {
					nested: {
						f: () => true,
						s: "test"
					}
			},
			sanitized = cleaner(object);
		expect(sanitized.nested.f).to.equal(undefined);
		expect(sanitized.nested.s).to.equal("test");
	});
});