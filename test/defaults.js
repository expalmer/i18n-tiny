var assert = require('assert');
var i18n   = require('..');

describe("Defaults", function(){

  it("sets the default locale", function(){
    assert.equal(i18n.defaultLocale, "en");
  });

  it("sets current locale", function(){
    assert.equal(i18n.locale, "en");
  });

  it("sets default separator", function(){
    assert.equal(i18n.defaultSeparator, ".");
  });

});
