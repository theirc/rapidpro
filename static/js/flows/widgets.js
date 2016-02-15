(function() {
  var app, makeSelect2Required;

  app = angular.module('temba.widgets', []);

  app.directive("sms", [
    "$log", "Flow", function($log, Flow) {
      var link;
      link = function(scope, element, attrs) {
        scope.showCounter = true;
        if (attrs.showCounter != null) {
          scope.showCounter = eval(attrs.showCounter);
        }
        scope.countCharacters = function() {
          var length;
          if (scope.message) {
            length = scope.message.length;
            scope.messages = Math.ceil(length / 160);
            return scope.characters = scope.messages * 160 - length;
          } else {
            scope.messages = 0;
            return scope.characters = 160;
          }
        };
        scope.$watch((function() {
          return scope.message;
        }), scope.countCharacters);
        if (scope.sms) {
          scope.message = scope.sms[Flow.flow.base_language];
          if (!scope.message) {
            return scope.message = "";
          }
        }
      };
      return {
        templateUrl: "/partials/sms_directive",
        restrict: "A",
        link: link,
        scope: {
          sms: '=',
          message: '='
        }
      };
    }
  ]);

  app.directive("autoComplete", [
    "$rootScope", "$timeout", "$http", "$log", "Flow", function($rootScope, $timeout, $http, $log, Flow) {
      var link;
      link = function(scope, element, attrs) {
        return new AutoComplete(Flow.completions, Flow.function_completions).bind(element);
      };
      return {
        restrict: 'A',
        link: link
      };
    }
  ]);

  makeSelect2Required = function(scope, field, element) {
    var data, select2;
    select2 = element.data('select2');
    data = select2.data();
    if (data && !Array.isArray(data)) {
      data = [data];
    }
    field['selected'] = data;
    return element.on('change', function(e) {
      data = select2.data();
      if (data && !Array.isArray(data)) {
        data = [data];
      }
      field['selected'] = data;
      return scope.$evalAsync(function() {
        if (field['selected'] && field['selected'].length > 0) {
          return field.$setValidity("required", true);
        } else {
          field.$setValidity("required", false);
        }
      });
    });
  };

  app.directive("selectServer", [
    "$timeout", "$http", function($timeout, $http) {
      var link;
      link = function(scope, element, attrs, form) {
        var minimumResultsForSearch;
        minimumResultsForSearch = -1;
        if (attrs.search) {
          minimumResultsForSearch = 0;
        }
        element.select2({
          placeholder: attrs.placeholder,
          minimumResultsForSearch: minimumResultsForSearch,
          ajax: {
            url: attrs.selectServer,
            dataType: "json",
            data: function(term, page) {
              return {
                search: term,
                page: page
              };
            },
            results: function(response, page, context) {
              return response;
            }
          },
          escapeMarkup: function(m) {
            return m;
          }
        });
        if (attrs.initId && attrs.initText) {
          element.data('select2').data({
            id: attrs.initId,
            text: attrs.initText
          });
        }
        if (attrs.required) {
          makeSelect2Required(scope, form[attrs['name']], element);
        }
        return $timeout(function() {
          return element.trigger('change');
        }, 0);
      };
      return {
        restrict: 'A',
        require: '^form',
        link: link
      };
    }
  ]);

  app.directive("select2", [
    "$timeout", function($timeout) {
      var link;
      link = function(scope, element, attrs) {
        element.select2({
          minimumResultsForSearch: -1,
          placeholder: attrs.placeholder
        });
        return $timeout(function() {
          return element.trigger('change');
        }, 0);
      };
      return {
        restrict: 'AC',
        link: link
      };
    }
  ]);

  app.directive("selectLabel", [
    "$timeout", "Flow", function($timeout, Flow) {
      var link;
      link = function(scope, element, attrs, form) {
        var field, i, initLabels, label, len, ref, select2;
        element.select2({
          tags: Flow.labels,
          multiple: true
        });
        field = form[attrs['name']];
        select2 = element.data('select2');
        if (scope.ngModel) {
          initLabels = [];
          ref = scope.ngModel;
          for (i = 0, len = ref.length; i < len; i++) {
            label = ref[i];
            initLabels.push(label);
          }
          select2.data(initLabels);
        }
        field['selected'] = select2.data();
        element.on('select2-selecting', function(e) {
          if (e.val.length < 1) {
            e.preventDefault();
            return;
          }
          if (e.val[0] === '@') {
            element.select2("search", e.val.slice(1));
            return e.preventDefault();
          }
        });
        element.on('change', function(e) {
          field['selected'] = select2.data();
          if (attrs.required) {
            if (!field['selected'] || field['selected'].length === 0) {
              select2.container.find('.select2-choices').addClass('select2-required');
              return scope.$apply(function() {
                return field.$setValidity("required", false);
              });
            } else {
              select2.container.find('.select2-choices').removeClass('select2-required');
              return scope.$apply(function() {
                return field.$setValidity("required", true);
              });
            }
          }
        });
        return $timeout(function() {
          return element.trigger('change');
        }, 0);
      };
      return {
        require: '^form',
        restrict: 'A',
        link: link,
        scope: {
          ngModel: '='
        }
      };
    }
  ]);

  app.directive("selectEmail", [
    "$timeout", function($timeout) {
      var link;
      link = function(scope, element, attrs, form) {
        if (scope.ngModel) {
          element.val(scope.ngModel.join());
        }
        element.select2({
          tags: [],
          multiple: true,
          selectOnBlur: true,
          minimumInputLength: 1,
          minimumResultsForSearch: -1,
          formatInputTooShort: function(term, minLength) {
            return "";
          },
          matcher: function(term, text, opt) {
            return text.toUpperCase().indexOf(term.toUpperCase()) === 0;
          },
          formatNoMatches: function(term) {
            return gettext("Enter a valid e-mail address or field");
          },
          createSearchChoice: function(term, data) {
            if ($(data).filter(function() {
              return this.text.localeCompare(term) === 0;
            }).length === 0) {
              if (/^@[a-zA-Z._]+|^[^@]+@([^@\.]+\.)+[^@\.]+$/.test(term)) {
                return {
                  id: term,
                  text: term
                };
              } else {
                return null;
              }
            }
          }
        });
        if (attrs.required) {
          makeSelect2Required(scope, form[attrs['name']], element);
        }
        return $timeout(function() {
          return element.trigger('change');
        }, 0);
      };
      return {
        require: '^form',
        restrict: 'A',
        link: link,
        scope: {
          ngModel: '='
        }
      };
    }
  ]);

  app.directive("selectStatic", [
    '$timeout', function($timeout) {
      var link;
      link = function(scope, element, attrs, form) {
        var field, initial, select2, staticData;
        staticData = JSON.parse(attrs.selectStatic);
        element.select2({
          data: staticData,
          minimumInputLength: 0,
          query: function(query) {
            var d, data, i, len, ref;
            data = {
              results: []
            };
            ref = this['data'];
            for (i = 0, len = ref.length; i < len; i++) {
              d = ref[i];
              if (d.text) {
                if (!query.term || d.text.toLowerCase().indexOf(query.term.toLowerCase().strip()) !== -1) {
                  data.results.push({
                    id: d.id,
                    text: d.text
                  });
                }
              }
            }
            if (query.term && data.results.length === 0 && query.term.strip().length > 0 && /^[a-zA-Z0-9-][a-zA-Z0-9- ]*$/.test(query.term.strip())) {
              data.results.push({
                id: '[_NEW_]' + query.term,
                text: gettext('Add new variable') + ': ' + query.term
              });
            }
            return query.callback(data);
          },
          formatNoMatches: function(term) {
            return gettext("Enter a valid name, only letters, numbers, dashes and spaces are allowed");
          },
          createSearchChoice: function(term, data) {
            return data;
          }
        });
        field = form[attrs['name']];
        select2 = element.data('select2');
        initial = {};
        if (attrs.key && attrs.text) {
          initial = {
            id: attrs.key,
            text: attrs.text
          };
          select2.data(initial);
        }
        field['selected'] = select2.data();
        element.on('change', function(e) {
          field['selected'] = select2.data();
          if (attrs.required) {
            if (!field['selected'] || field['selected'].length === 0) {
              select2.container.find('.select2-choices').addClass('select2-required');
              return scope.$apply(function() {
                return field.$setValidity("required", false);
              });
            } else {
              select2.container.find('.select2-choices').removeClass('select2-required');
              return scope.$apply(function() {
                return field.$setValidity("required", true);
              });
            }
          }
        });
        return $timeout(function() {
          return element.trigger('change');
        }, 0);
      };
      return {
        restrict: "A",
        require: "^form",
        link: link
      };
    }
  ]);

  app.directive("omnibox", [
    "$timeout", "$log", "Flow", function($timeout, $log, Flow) {
      var arbitraryAddFunction, extraAndArbitraryAddFunction, link, omniArbitraryNumberOption, omniFormatOmniboxItem, omniFormatOmniboxOption, omniFormatOmniboxSelection, omniRemap, omnibox, parseData;
      omniRemap = function(element, callback) {
        callback();
      };
      omniArbitraryNumberOption = function(term, data) {
        if (anon_org) {
          return null;
        }
        if ($(data).filter(function() {
          return this.text.localeCompare(term) === 0;
        }).length === 0) {
          if (!isNaN(parseFloat(term)) && isFinite(term)) {
            return {
              id: "n-" + term,
              text: term
            };
          }
        }
      };
      omniFormatOmniboxSelection = function(item) {
        if (item.length === 0) {
          return "";
        }
        return omniFormatOmniboxItem(item);
      };
      omniFormatOmniboxOption = function(item, container, query) {
        if (query.term[0] === "+") {
          query.term = query.term.substring(1, query.length);
        }
        return omniFormatOmniboxItem(item);
      };
      omniFormatOmniboxItem = function(item) {
        var clazz, text;
        text = item.text;
        if (item.extra != null) {
          text = item.text + " (" + item.extra + ")";
        }
        clazz = '';
        if (item.id.indexOf("g-") === 0) {
          clazz = 'omni-group';
        } else if (item.id.indexOf("c-") === 0) {
          clazz = 'omni-contact';
        } else if (item.id.indexOf("u-") === 0) {
          if (item.scheme === 'tel') {
            clazz = 'omni-tel';
          } else if (item.scheme === 'twitter') {
            clazz = 'omni-twitter';
          }
        }
        return '<div class="omni-option ' + clazz + '">' + text + '</div>';
      };
      arbitraryAddFunction = function(term, data) {
        if (term.indexOf('@') !== 0 && data.length === 0) {
          return {
            id: term,
            text: term
          };
        }
      };
      extraAndArbitraryAddFunction = function(term, data) {
        if (/^@extra.(\w+)(\.\w+)*$/.test(term)) {
          return {
            id: term,
            text: term
          };
        } else {
          return arbitraryAddFunction(term, data);
        }
      };
      omnibox = function(ele, options) {
        var data, idx, multiple, placeholder, q, types, v;
        data = [];
        if (options === undefined) {
          options = {};
        }
        if (options.completions) {
          for (idx in options.completions) {
            v = "@" + options.completions[idx].name.toLowerCase();
            data.push({
              id: v,
              text: v
            });
          }
        }
        if (options.types) {
          types = options.types;
        } else {
          types = 'cg';
        }
        if (options.types === 'g') {
          placeholder = gettext("Enter one or more contact groups");
        } else {
          placeholder = gettext("Recipients, enter contacts or groups");
        }
        ele.attr("placeholder", placeholder);
        q = "";
        if (options.arbitraryAdd) {
          if (options.allowExtra) {
            options.createSearchChoice = extraAndArbitraryAddFunction;
          } else {
            options.createSearchChoice = arbitraryAddFunction;
          }
        } else if (!options.createSearchChoice && types && types.indexOf('u') >= 0) {
          options.createSearchChoice = omniArbitraryNumberOption;
        }
        multiple = true;
        if (options.multiple !== undefined) {
          multiple = options.multiple;
        }
        return ele.removeClass("loading").select2({
          placeholder: placeholder,
          data: data,
          allowClear: false,
          initSelection: omniRemap,
          selectOnBlur: false,
          minimumInputLength: 0,
          multiple: multiple,
          createSearchChoice: options.createSearchChoice,
          ajax: {
            url: "/contact/omnibox/?types=" + types,
            dataType: "json",
            data: function(term, page, context) {
              q = term;
              return {
                search: term,
                page: page
              };
            },
            results: function(response, page, context) {
              var variable;
              if (data && q) {
                q = q.toLowerCase();
                if (q.indexOf("@") === 0) {
                  for (idx in data) {
                    variable = data[idx];
                    if (variable.id.indexOf(q) === 0) {
                      response.results.unshift(variable);
                    }
                  }
                }
              }
              return response;
            }
          },
          escapeMarkup: function(m) {
            return m;
          },
          containerCssClass: "omnibox-select2",
          formatSelection: omniFormatOmniboxSelection,
          formatResult: omniFormatOmniboxOption
        });
      };
      parseData = function(data) {
        var contacts, groups, i, item, len, variables;
        groups = [];
        contacts = [];
        variables = [];
        for (i = 0, len = data.length; i < len; i++) {
          item = data[i];
          if (item.id[0] === 'g') {
            groups.push({
              id: parseInt(item.id.slice(2)),
              name: item.text
            });
          } else if (item.id[0] === 'c') {
            contacts.push({
              id: parseInt(item.id.slice(2)),
              name: item.text
            });
          } else if (item.id[0] === '@') {
            variables.push({
              id: item.id,
              name: item.id
            });
          } else {
            groups.push(item.text);
          }
        }
        return {
          groups: groups,
          contacts: contacts,
          variables: variables,
          total: groups.length + contacts.length + variables.length
        };
      };
      link = function(scope, element, attrs, form) {
        var contact, data, field, group, i, j, k, len, len1, len2, options, ref, ref1, ref2, select2, variable;
        options = {};
        if (attrs.omnibox) {
          options = JSON.parse(attrs.omnibox);
        }
        if (options.completions) {
          options.completions = Flow.completions;
        }
        data = [];
        if (scope.groups) {
          ref = scope.groups;
          for (i = 0, len = ref.length; i < len; i++) {
            group = ref[i];
            if (group.name) {
              data.push({
                id: 'g-' + group.id,
                text: group.name
              });
            } else {
              data.push({
                id: group,
                text: group
              });
            }
          }
        }
        if (scope.contacts) {
          ref1 = scope.contacts;
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            contact = ref1[j];
            if (contact.name) {
              data.push({
                id: 'c-' + contact.id,
                text: contact.name
              });
            } else {
              data.push({
                id: contact,
                text: contact
              });
            }
          }
        }
        if (scope.variables) {
          ref2 = scope.variables;
          for (k = 0, len2 = ref2.length; k < len2; k++) {
            variable = ref2[k];
            data.push({
              id: variable.id,
              text: variable.id
            });
          }
        }
        select2 = omnibox(element, options).data('select2');
        select2.data(data);
        field = form[attrs['name']];
        field['selected'] = parseData(data);
        element.on('change', function(e) {
          field['selected'] = parseData(select2.data());
          if (attrs.required) {
            if (field['selected'].total === 0) {
              select2.container.find('.select2-choices').addClass('select2-required');
              return scope.$apply(function() {
                return field.$setValidity("required", false);
              });
            } else {
              select2.container.find('.select2-choices').removeClass('select2-required');
              return scope.$apply(function() {
                return field.$setValidity("required", true);
              });
            }
          }
        });
        return $timeout(function() {
          return element.trigger('change');
        }, 0);
      };
      return {
        restrict: "AC",
        require: "^form",
        scope: {
          groups: "=",
          contacts: "=",
          variables: "="
        },
        link: link
      };
    }
  ]);

}).call(this);
