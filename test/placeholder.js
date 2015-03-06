var assert       = require('assert');
var i18n         = require('..');
var Translations = require("./translations");

describe("Placeholder", function(){

  beforeEach(function(){
    i18n.translations = Translations();
  });

  it("matches {{name}}", function(){
    assert.notEqual("{{name}}".match(i18n.placeholder), null);
  });

  it("matches %{name}", function(){
    assert.notEqual("%{name}".match(i18n.placeholder), null);
  });

  it("returns placeholders", function(){
    var translation = "I like %{javascript}. I also like %{nodejs}",
        matches = translation.match(i18n.placeholder);
    assert.equal(matches[0], "%{javascript}");
    assert.equal(matches[1], "%{nodejs}");
  });

});
