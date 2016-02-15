(function() {
  window.AutoComplete = (function() {
    var KEY_LEFT, KEY_RIGHT;

    KEY_LEFT = 37;

    KEY_RIGHT = 39;

    function AutoComplete(variables1, functions) {
      var ac, f, i, len, ref;
      this.variables = variables1 != null ? variables1 : [];
      this.functions = functions != null ? functions : [];
      this.parser = new window.excellent.Parser('@', ['channel', 'contact', 'date', 'extra', 'flow', 'step']);
      this.completions = this.variables.concat(this.functions);
      ref = this.functions;
      for (i = 0, len = ref.length; i < len; i++) {
        f = ref[i];
        f['function'] = true;
        f['example'] = f['signature'];
      }
      ac = this;
      this.config = {
        at: "@",
        insertBackPos: 1,
        data: this.variables,
        searchKey: "name",
        insertTpl: this.getInsertTemplate,
        startWithSpace: true,
        displayTpl: this.getDisplayTemplate,
        limit: 100,
        maxLen: 100,
        suffix: "",
        callbacks: {
          highlighter: function(li, query) {
            return li;
          },
          matcher: function(flag, subtext) {
            if (ac.parser.isInStringLiteral(subtext)) {
              return null;
            }
            return ac.parser.expressionContext(subtext);
          },
          filter: function(query, data, searchKey) {
            var lastIdx, results, start, subQuery;
            if (query && query[0] === '(') {
              data = ac.completions;
            }
            subQuery = ac.parseFilterQuery(query);
            lastIdx = subQuery.lastIndexOf('.');
            start = subQuery.substring(0, lastIdx);
            results = ac.findCompletions(subQuery, data, start, lastIdx);
            return results;
          },
          sorter: function(query, items, searchKey) {
            var item, j, lastOptFunctions, len1, results, subQuery;
            lastOptFunctions = {
              'name': '(',
              'display': "Functions",
              'function': true
            };
            subQuery = ac.parseQuery(query);
            results = [];
            for (j = 0, len1 = items.length; j < len1; j++) {
              item = items[j];
              if (query) {
                item.order = new String(item[searchKey]).toLowerCase().indexOf(subQuery.toLowerCase());
                if (item.order > -1) {
                  results.push(item);
                }
              } else {
                results.push(item);
              }
            }
            if (!query || query.match(/[(.]/g) === null) {
              results.push(lastOptFunctions);
            }
            results.sort(function(a, b) {
              if (a.order !== b.order) {
                return a.order - b.order;
              }
              if (a["function"] && !b["function"]) {
                return 1;
              } else if (b["function"] && !a["function"]) {
                return -1;
              }
              if ((a["function"] && b["function"]) || (!a["function"] && !b["function"])) {
                if (a.name > b.name) {
                  return 1;
                } else {
                  return -1;
                }
              }
            });
            return results;
          },
          tplEval: function(tpl, map, action) {
            var error, query, subQuery, template;
            template = tpl;
            query = this.query.text;
            subQuery = ac.parseQuery(query);
            try {
              template = tpl(map, query, subQuery);
              return template.replace(/\$\{([^\}]*)\}/g, function(tag, key, pos) {
                return map[key];
              });
            } catch (_error) {
              error = _error;
              return "";
            }
          },
          beforeInsert: function(value, item) {
            var completionChars, hasMore, isFunction, j, k, len1, len2, match, option, ref1, ref2, valueForName;
            completionChars = new RegExp("([A-Za-z_\d\.]*)$", 'gi');
            valueForName = "";
            match = completionChars.exec(value);
            if (match) {
              valueForName = match[2] || match[1];
            }
            hasMore = false;
            ref1 = ac.variables;
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              option = ref1[j];
              hasMore = valueForName && option.name.indexOf(valueForName) === 0 && option.name !== valueForName;
              if (hasMore) {
                break;
              }
            }
            if (hasMore) {
              value += '.';
            }
            isFunction = false;
            ref2 = ac.functions;
            for (k = 0, len2 = ref2.length; k < len2; k++) {
              option = ref2[k];
              isFunction = valueForName && option.name.indexOf(valueForName) === 0 && option.name === valueForName;
              if (isFunction) {
                break;
              }
            }
            if (isFunction) {
              value += '()';
            }
            if (valueForName === "" && value === '@(') {
              value += ')';
            } else if (valueForName && !hasMore && !isFunction) {
              value += " ";
            }
            return value;
          }
        }
      };
    }

    AutoComplete.prototype.getDisplayTemplate = function(map, query, subQuery) {
      var template;
      template = "<li><div class='completion-dropdown'><div class='option-name'>${name}</div><small class='option-display'>${display}</small></div></li>";
      if (typeof map.example !== "undefined") {
        template = "<li><div class='completion-dropdown'><div class='option-name'>${name}</div><div class='option-example'><div class='display-labels'>Example</div>${example}</div><div class='option-display'><div class='display-labels'>Summary</div>${display}</div></div></li>";
      }
      return template;
    };

    AutoComplete.prototype.getInsertTemplate = function(map, query, subQuery) {
      var regexp, template;
      if (query && query[0] === '(') {
        if (query.length === 1 && subQuery === "") {
          template = '@(${name}';
        } else {
          regexp = new RegExp("@*" + subQuery + "$");
          template = ('@' + query).replace(regexp, '${name}');
        }
      } else {
        regexp = new RegExp(subQuery + "$");
        template = ('@' + query).replace(regexp, '${name}');
      }
      return template;
    };

    AutoComplete.prototype.parseFilterQuery = function(query) {
      if (!query) {
        return query;
      }
      return this.parser.autoCompleteContext(query) || '';
    };

    AutoComplete.prototype.parseQuery = function(query) {
      var parsedQuery;
      parsedQuery = this.parseFilterQuery(query);
      if (!parsedQuery) {
        return parsedQuery;
      }
      if (parsedQuery[0] === '#') {
        parsedQuery = parsedQuery.slice(1);
      }
      return parsedQuery;
    };

    AutoComplete.prototype.findCompletions = function(query, data, start, lastIdx, prependChar) {
      var display, i, j, justFirstResult, key, len, len1, matched, matchingOption, name, nextDot, option, ref, results, suffix;
      if (prependChar == null) {
        prependChar = void 0;
      }
      matched = {};
      results = [];
      justFirstResult = false;
      if (query[0] === '#') {
        console.log(query);
        query = query.slice(1);
        justFirstResult = true;
      }
      for (i = 0, len = data.length; i < len; i++) {
        option = data[i];
        if (option.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
          nextDot = option.name.indexOf('.', lastIdx + 1);
          if (nextDot === -1) {
            if (prependChar) {
              name = start + prependChar + option.name;
            } else {
              name = option.name;
            }
            display = option.display;
          } else {
            name = "";
            suffix = option.name.substring(lastIdx + 1, nextDot);
            if (start.length > 0 && start !== suffix) {
              name = start + ".";
            }
            name += suffix;
            if (name.toLowerCase().indexOf(query.toLowerCase()) !== 0) {
              continue;
            }
            display = null;
          }
          if (!(name in matched)) {
            matched[name] = name;
            matchingOption = {
              name: name,
              display: display
            };
            ref = Object.keys(option);
            for (j = 0, len1 = ref.length; j < len1; j++) {
              key = ref[j];
              if (key !== 'name' && key !== 'display') {
                matchingOption[key] = option[key];
              }
            }
            results.push(matchingOption);
          }
        }
      }
      if (justFirstResult) {
        return results.slice(0, 1);
      }
      return results;
    };

    AutoComplete.prototype.bind = function(selector, variables) {
      var $inputor;
      if (variables == null) {
        variables = null;
      }
      if (variables) {
        this.completions = variables.concat(this.functions);
      }
      $inputor = $(selector).atwho(this.config);
      $inputor.atwho('run');
      $inputor.on('inserted.atwho', function(atEvent, li, browserEvent) {
        var caretPos, content, subtext;
        content = $inputor.val();
        caretPos = $inputor.caret('pos');
        subtext = content.slice(0, caretPos);
        if (subtext.match(/\(\)$/) !== null) {
          return $inputor.caret('pos', subtext.length - 1);
        }
      });
      $inputor.off('click.atwhoInner').on('click.atwhoInner', function(e) {
        return $.noop();
      });
      return $inputor.off('keyup.atwhoInner').on('keyup.atwhoInner', function(e) {
        var app, atwho, caretPos, content, ref, subtext, text, view;
        atwho = $inputor.data('atwho');
        if (atwho) {
          app = atwho.setContextFor('@');
          view = (ref = app.controller()) != null ? ref.view : void 0;
          switch (e.keyCode) {
            case KEY_LEFT:
            case KEY_RIGHT:
              if (view.visible()) {
                app.dispatch(e);
              }
              return;
            default:
              app.onKeyup(e);
          }
          content = $inputor.val();
          caretPos = $inputor.caret('pos');
          subtext = content.slice(0, caretPos);
          if (subtext.slice(-2) === '@(') {
            text = subtext + ')' + content.slice(caretPos + 1);
            $inputor.val(text);
          }
          return $inputor.caret('pos', caretPos);
        }
      });
    };

    return AutoComplete;

  })();

}).call(this);
