;(function ( i18nTiny, undefined ) {

  "use strict";

  var slice = Array.prototype.slice;

  var DEFAULTS = {
    defaultLocale: "en",
    locale: "en",
    defaultSeparator: ".",
    placeholder: /(?:\{\{|%\{)(.*?)(?:\}\}?)/gm,
    translations: {},
  };

  i18nTiny.initDefaults = function ( reset ) {
    if ( typeof(this.defaultLocale) === "undefined" || reset === true ) {
      this.defaultLocale = DEFAULTS.defaultLocale;
    }

    if ( typeof(this.locale) === "undefined" || reset === true) {
      this.locale = DEFAULTS.locale;
    }

    if ( typeof(this.defaultSeparator) === "undefined" || reset === true ) {
      this.defaultSeparator = DEFAULTS.defaultSeparator;
    }

    if ( typeof(this.placeholder) === "undefined" || reset === true ) {
      this.placeholder = DEFAULTS.placeholder;
    }

    if ( typeof(this.translations) === "undefined" || reset === true ) {
      this.translations = DEFAULTS.translations;
    }
  };

  i18nTiny.initDefaults();

  i18nTiny.pluralization = {};

  i18nTiny.pluralization.get = function ( locale ) {
    return this[locale] || this[i18nTiny.locale] || this['default'];
  };

  i18nTiny.pluralization['default'] = function ( count ) {
    return count === 0 ? ["zero", "other"] : ( count === 1 ? ["one"] : ["other"] );
  };

  i18nTiny.currentLocale = function () {
    return this.locale || this.defaultLocale;
  };

  i18nTiny.isSet = function (value) {
    return value !== undefined && value !== null;
  };

  i18nTiny.getTranslations = function () {
    var translations = this.translations[ this.locale ] || this.translations[ this.defaultLocale ];
    return translations || '[ you dont have translation yet! ]';
  };

  i18nTiny.lookup = function ( scopes, options ) {
    var translation = this.getTranslations();
    var scope;

    options = options || {};

    while ( scopes.length ) {
      scope = scopes.shift();
      translation = translation[ scope ];
      if( translation === undefined || translation === null ) {
        break;
      }
    }

    if( !translation ) {
      translation = i18nTiny.missingTranslation( scope );
      if ( this.isSet(options.defaultValue) ) {
        translation = options.defaultValue;
      }
    }

    return translation;
  };

  i18nTiny.interpolate = function ( text, options ) {
    var matches,
        part,
        name,
        value,
        regex;

    options = options || {};

    matches = text.match(this.placeholder);

    if( !matches ) {
      return text;
    }

    while ( matches.length ) {
      part = matches.shift();
      name = part.replace(this.placeholder, "$1");
      value = this.isSet(options[name]) ? options[name].toString() : i18nTiny.missingPlaceholder(part);
      regex = new RegExp(part.replace(/\{/gm, "\\{").replace(/\}/gm, "\\}"));
      text = text.replace(regex, value);
    }

    return text;
  };

  i18nTiny.translate = function ( scope, options ) {
    var scopes = scope.split(".");
    var translation = this.lookup( scopes, options );

    if( typeof translation === "string" ) {
        translation = this.interpolate( translation, options );
    } else if( translation instanceof Object && this.isSet( options.count ) ) {
        translation = this.pluralize( options.count, scope, options );
    }

    return translation;
  };

  i18nTiny.pluralize = function ( count, scope, options ) {
    options = options || {};
    var pluralization = this.pluralization.get( options.locale );
    var keys = pluralization( Math.abs(count) );
    var translation = this.lookup( [ scope ], options );
    var key;

    while ( keys.length ) {
      key = keys.shift();
      if ( this.isSet( translation[key] ) ) {
        translation = translation[key];
        break;
      }
    }

    options['count'] = count;

    return this.interpolate( translation, options );
  };

  i18nTiny.missingTranslation = function ( scope ) {
    var locale = this.currentLocale() + '.';
    var args = slice.call(arguments).join('.');
    return  '[missing "' + locale + args + '" translation]';
  };

  i18nTiny.missingPlaceholder = function( placeholder ) {
    return "[missing " + placeholder + " value]";
  };

  i18nTiny.t = i18nTiny.translate;
  i18nTiny.p = i18nTiny.pluralize;

})( typeof exports === "undefined" ? ( this.i18nTiny || (this.i18nTiny = {})) : exports );