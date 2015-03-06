var assert = require('assert');
var i18n   = require('..');

describe('Initialization', function(){

  it('should return i18n.locale', function(){
    i18n.locale = 'pt-BR';
    assert.equal( i18n.currentLocale(), 'pt-BR');
  });

  it('should return default i18n.locale', function() {
    i18n.locale = null;
    i18n.defaultLocale = "pt-BR";
    assert.equal(i18n.currentLocale(),"pt-BR");
  });

  it("sets alias t for translate ", function() {
    assert.equal(i18n.t,i18n.translate);
  });

  it("sets alias p for pluralize ", function() {
    assert.equal(i18n.p,i18n.pluralize);
  });

  it("should return default and current locale", function(){
    i18n.initDefaults( true );
    assert.equal(i18n.defaultLocale,"en");
    assert.equal(i18n.locale, "en");
  });

  it("should return default separator", function(){
    assert.equal(i18n.defaultSeparator,".");
  });

  it("should return a empty translation", function(){
    assert.deepEqual(i18n.translations, {} );
  });

});
