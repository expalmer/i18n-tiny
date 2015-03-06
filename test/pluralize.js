var assert       = require('assert');
var i18n         = require('..');
var Translations = require("./translations");

describe("Pluralization", function() {

  beforeEach(function(){
    i18n.translations = Translations();
  });

  it("pluralizes scope", function(){
    assert.equal(i18n.p(0, "inbox"), "You have no messages");
    assert.equal(i18n.p(1, "inbox"), "You have 1 message");
    assert.equal(i18n.p(3, "inbox"), "You have 3 messages");
  });

  it("pluralizes using the 'other' scope", function(){
    i18n.translations["en"]["inbox"]["zero"] = null;
    assert.equal(i18n.p(0, "inbox"), "You have 0 messages");
  });

  it("pluralizes using the 'zero' scope", function(){
    i18n.translations["en"]["inbox"]["zero"] = "No messages !";
    assert.equal(i18n.p(0, "inbox"),"No messages !");
  });

  it("pluralizes using negative values", function(){
    assert.equal(i18n.p(-1, "inbox"), "You have -1 message");
    assert.equal(i18n.p(-5, "inbox"), "You have -5 messages");
  });

  it("returns missing translation", function(){
    assert.equal(i18n.p(-1, "missing"), '[missing "en.missing" translation]');
  });

  it("pluralizes using multiple placeholders", function(){
    actual = i18n.p(1, "unread", {unread: 5});
    assert.equal(actual,"You have 1 new message (5 unread)");

    actual = i18n.p(10, "unread", {unread: 2});
    assert.equal(actual,"You have 10 new messages (2 unread)");

    actual = i18n.p(0, "unread", {unread: 5});
    assert.equal(actual,"You have no new messages (5 unread)");
  });

  it("allows empty strings", function(){
    i18n.translations["en"]["inbox"]["zero"] = "";
    assert.equal(i18n.p(0, "inbox"), "");
  });

  it("pluralizes using custom rules", function() {

    i18n.locale = "custom";

    i18n.pluralization["custom"] = function(count) {
      if (count === 0) { return ["zero"]; }
      if (count >= 1 && count <= 5) { return ["few", "other"]; }
      return ["other"];
    };

    i18n.translations["custom"] = {
      "things": {
          "zero": "No things"
        , "few": "A few things"
        , "other": "%{count} things"
      }
    };
    assert.equal( i18n.p(0, "things"), "No things");
    assert.equal( i18n.p(4, "things"), "A few things");
    assert.equal( i18n.p(10, "things"), "10 things");

  });

  it("pluralizes default value", function(){
    i18n.locale = "en";
    var options = {
      defaultValue: {
          zero: "No things here!"
        , one: "There is {{count}} thing here!"
        , other: "There are {{count}} things here!"
      }
    };
    assert.equal(i18n.p(0, "things", options), "No things here!");
    assert.equal(i18n.p(1, "things", options), "There is 1 thing here!");
    assert.equal(i18n.p(5, "things", options), "There are 5 things here!");
  });

  it("ignores pluralization when scope exists", function(){

    var options = {defaultValue: {
        zero: "No things here!"
      , one: "There is {{count}} thing here!"
      , other: "There are {{count}} things here!"
    }};

    assert.equal(i18n.p(0, "inbox", options), "You have no messages");
    assert.equal(i18n.p(1, "inbox", options), "You have 1 message");
    assert.equal(i18n.p(5, "inbox", options), "You have 5 messages");
  });

});

