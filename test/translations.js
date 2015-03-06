;(function() {

  'use strict';

  function app() {

    var Translations = {};

    Translations["en"] = {
      hello: "Hello World!",
      input: {
        name: "Your Name:",
        email: "Your E-mail"
      },
      person: {
        name: "My Name is {{name}}!",
        age: "I'm {{age}} years old"
      },
      profile: {
        details: "Welcome {{name}} you are loggin as {{user}}"
      },
      unread: {
          one: "You have 1 new message ({{unread}} unread)"
        , other: "You have {{count}} new messages ({{unread}} unread)"
        , zero: "You have no new messages ({{unread}} unread)"
      },
      inbox: {
        one: "You have {{count}} message",
        other: "You have {{count}} messages",
        zero: "You have no messages"
      }
    };

    return Translations;

  }

  if (typeof(exports) === "undefined") {
    window.Translations = app;
  } else {
    module.exports = app;
  }

})();
