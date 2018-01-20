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
			clean = cleaner(object);
		expect(clean.nested.f).to.equal(undefined);
		expect(clean.nested.s).to.equal("test");
	});
	it("protect value",function() {
		const el = document.createElement("input");
		el.value = "function() { return true; }";
		expect(el.value==="" || el.value===undefined).to.equal(true);
		el.value ="Safe Value";
		expect(el.value).to.equal("Safe Value");
	});
	it("setAttribute",function() {
		const el = document.createElement("div");
		el.setAttribute("title","function() { return true; }");
		expect(el.title).to.equal("");
		el.setAttribute("title","Safe Title");
		expect(el.title).to.equal("Safe Title");
	});
	it("document protected",function(done) {
		if(typeof(document)!=="undefined") {
			setTimeout(() => {
				const el = document.body;
				el.setAttribute("title","function() { return true; }");
				expect(el.title).to.equal("");
				el.setAttribute("title","Safe Title");
				expect(el.title).to.equal("Safe Title");
				done();
			});
		}
	});
});