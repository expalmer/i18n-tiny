var assert       = require('assert');
var i18n         = require('..');
var Translations = require("./translations");

describe("Translations", function() {

  beforeEach(function(){
    i18n.initDefaults( true );
    i18n.translations = Translations();
  });

  it("should have a non-empty translations object", function(){
    assert.notDeepEqual( i18n.translations, {} );
  });

  it('should get the hello translation[en] value', function() {
    assert.equal( i18n.t("hello"), "Hello World!" );
  });

  it('should get the input.name translation[en] value', function() {
    assert.equal( i18n.t("input.name"), "Your Name:" );
  });

  it("performs single interpolation", function(){
    var actual = i18n.t("profile.details", { name: "John Doe", user: "john_doe" } );
    assert.equal(actual, "Welcome John Doe you are loggin as john_doe");
  });

  it("uses default value with interpolation", function(){
    actual = i18n.t(
      "alert",
      {defaultValue: "Attention! {{message}}", message: "You're out of quota!"}
    );

    assert.equal(actual, "Attention! You're out of quota!");
  });

});
