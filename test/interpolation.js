var assert       = require('assert');
var i18n         = require('..');
var Translations = require("./translations");

describe("Interpolation", function(){

  var actual;

  beforeEach(function(){
    i18n.translations = Translations();
  });

  it("performs single interpolation", function(){
    actual = i18n.t("person.name", {name: "John Doe"});
    assert.equal(actual, "My Name is John Doe!");
  });

  it("performs multiple interpolations", function(){
    actual = i18n.t("profile.details", {name: "John Doe", user: "john"});
    assert.equal(actual, "Welcome John Doe you are loggin as john");
  });

  it("performs interpolation with the count option", function(){
    assert.equal(i18n.t("inbox", {count: 0}), "You have no messages");
    assert.equal(i18n.t("inbox", {count: 1}), "You have 1 message");
    assert.equal(i18n.t("inbox", {count: 5}), "You have 5 messages");
  });

  it("outputs missing placeholder message if interpolation value is missing", function(){
    actual = i18n.t("person.name");
    assert.equal(actual, "My Name is [missing {{name}} value]!");
  })

});
