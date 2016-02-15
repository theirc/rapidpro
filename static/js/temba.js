(function() {
  var ENTER, TAB, filters, findMatches,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  if (String.prototype.trim == null) {
    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, "");
    };
  }

  if (String.prototype.rtrim == null) {
    String.prototype.rtrim = function() {
      return this.replace(/^\s+/, "");
    };
  }

  if (String.prototype.ltrim == null) {
    String.prototype.ltrim = function() {
      return this.replace(/\s+$/, "");
    };
  }

  if (String.prototype.strip == null) {
    String.prototype.strip = function() {
      return this.replace(/^\s+|\s+$/g, "");
    };
  }

  TAB = 9;

  ENTER = 13;

  filters = [
    {
      name: 'title_case',
      display: 'changes to title case'
    }, {
      name: 'capitalize',
      display: 'capitalizes the first letter'
    }, {
      name: 'first_word',
      display: 'takes only the first word'
    }, {
      name: 'remove_first_word',
      display: 'takes everything after the first word'
    }, {
      name: 'upper_case',
      display: 'upper cases all letters'
    }, {
      name: 'lower_case',
      display: 'lower cases all letters'
    }, {
      name: 'read_digits',
      display: 'reads back a number in a friendly way'
    }
  ];

  findMatches = function(query, data, start, lastIdx, prependChar) {
    var display, i, len, matched, name, nextDot, option, results, suffix;
    if (prependChar == null) {
      prependChar = void 0;
    }
    matched = {};
    results = [];
    for (i = 0, len = data.length; i < len; i++) {
      option = data[i];
      if (option.name.indexOf(query) === 0) {
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
          if (name.indexOf(query) !== 0) {
            continue;
          }
          display = null;
        }
        if (!(name in matched)) {
          matched[name] = name;
          results.push({
            name: name,
            display: display
          });
        }
      }
    }
    return results;
  };

  this.useFontCheckbox = function(selector, displayLabel) {
    var checkboxes, chkBox, ele, glyphCheck;
    if (displayLabel == null) {
      displayLabel = false;
    }
    checkboxes = $(selector);
    checkboxes.each(function() {
      var controlGroup, help, html, input, label;
      input = $(this);
      controlGroup = input.parents('.control-group');
      label = controlGroup.children("label").text();
      help = input.parent().children(".help-block");
      html = "<div class='form-group font-checkbox'>";
      html += "<label";
      if (!displayLabel) {
        html += " id='checkbox-label'";
      }
      html += " class='control-label' for='";
      html += input.prop('id');
      html += "'>";
      html += label;
      html += "</label>";
      html += "<div class='controls field-input";
      if (input.prop('checked')) {
        html += " checked";
      }
      html += "'>";
      html += "<div class='hidden-input hide'>";
      html += "<input name='" + input.prop('name') + "' id='" + input.prop('id') + "' type='" + input.prop('type') + "' ";
      if (input.prop('checked')) {
        html += " checked";
      }
      html += "/>";
      html += "</div>";
      html += "<div class='glyph notif-checkbox'></div><div></div>";
      if (help) {
        if (!displayLabel) {
          html += "<div class='help-block'><label for='";
          html += input.prop('id');
          html += "'>" + help.text() + "</label></div>";
        } else {
          html += "<p class='help-block'>" + help.text() + "</p>";
        }
      }
      html += "</div></div>";
      return controlGroup.replaceWith(html);
    });
    ele = $(".font-checkbox");
    glyphCheck = ele.children('.controls').children('.glyph.notif-checkbox');
    glyphCheck.on('click', function() {
      var cell, ipt;
      cell = $(this).parent('.field-input');
      ipt = cell.children().children("input[type='checkbox']");
      if (ipt.prop('checked')) {
        cell.removeClass('checked');
        return ipt.prop('checked', false);
      } else {
        cell.addClass('checked');
        return ipt.prop('checked', true);
      }
    });
    chkBox = ele.find("input[type=checkbox]");
    return chkBox.on('change', function() {
      var cell;
      cell = ele.find('.field-input');
      if ($(this).prop('checked')) {
        return cell.addClass('checked');
      } else {
        return cell.removeClass('checked');
      }
    });
  };

  this.select2div = function(selector, width, placeholder, add_prefix) {
    var child, children, ele, i, len, option, options, selected;
    if (width == null) {
      width = "350px";
    }
    if (placeholder == null) {
      placeholder = null;
    }
    if (add_prefix == null) {
      add_prefix = null;
    }
    ele = $(selector);
    children = ele.children('option');
    options = [];
    selected = null;
    for (i = 0, len = children.length; i < len; i++) {
      child = children[i];
      option = {
        id: child.value,
        text: child.label
      };
      if (child.selected) {
        selected = option;
      }
      options.push(option);
    }
    ele.replaceWith("<input width='" + width + "' name='" + ele.attr('name') + "' style='width:" + width + "' id='" + ele.attr('id') + "'/>");
    ele = $(selector);
    if (add_prefix) {
      ele.select2({
        name: name,
        data: options,
        placeholder: placeholder,
        query: function(query) {
          var d, data, j, len1, ref;
          data = {
            results: []
          };
          ref = this['data'];
          for (j = 0, len1 = ref.length; j < len1; j++) {
            d = ref[j];
            if (d.text.toLowerCase().indexOf(query.term.toLowerCase().strip()) !== -1) {
              data.results.push({
                id: d.id,
                text: d.text
              });
            }
          }
          if (data.results.length === 0 && query.term.strip().length > 0) {
            data.results.push({
              id: '[_NEW_]' + query.term,
              text: add_prefix + query.term
            });
          }
          return query.callback(data);
        },
        createSearchChoice: function(term, data) {
          return data;
        }
      });
    } else {
      ele.select2({
        minimumResultsForSearch: 99,
        data: options,
        placeholder: placeholder
      });
    }
    if (selected) {
      return ele.data('select2').data(selected);
    }
  };


  /*
  
  
  @initAtMessageText = (selector, completions=null) ->
    completions = window.message_completions unless completions
  
    $(selector).atwho
      at: "@"
      limit: 15
      insert_space: false
      max_len: 100
      data: completions
      callbacks:
        before_insert: (value, item, selectionEvent) ->
  
           * see if there's more data to filter on
          data = this.settings['@']['data']
          hasMore = false
          for option in data
            if option.name.indexOf(value) == 0 and option.name != value
              hasMore = true
              break
  
          if selectionEvent.keyCode == TAB and hasMore
            value += '.'
          else
            value += ' '
          return value
  
        filter: (query, data, search_key) ->
  
          q = query.toLowerCase()
          lastIdx = q.lastIndexOf('.')
          start = q.substring(0, lastIdx)
  
          results = findMatches(q, data, start, lastIdx)
  
          if results.length > 0
            return results
  
          flag = "@"
          flag = "(?:^|\\s)" + flag.replace(/[\-\[\]\/\{\}\(\)\*\+\?\\\^\$\|]/g, "\\$&")
          regexp = new RegExp("([A-Za-z0-9_+-.]*\\|)([A-Za-z0-9_+-.]*)", "gi")
          match = regexp.exec(q)
  
          if match
  
             * check that we should even be matching
            name = q.substring(0, q.indexOf('|'))
            found = false
            for d in data
              if d.name == name
                found = true
                break
  
            if not found
              return results
  
            filterQuery = match[2]
            lastIdx = q.lastIndexOf('|') + 1
            start = q.substring(0, lastIdx - 1)
            filterQuery = q.substring(lastIdx)
            results = findMatches(filterQuery, filters, start , q.lastIndexOf('|'), '|')
  
          return results
  
  
        tpl_eval: (tpl, map) ->
  
          if not map.display
            tpl = "<li data-value='${name}'>${name}</li>"
          try
            return tpl.replace /\$\{([^\}]*)\}/g, (tag, key, pos) -> map[key]
          catch error
            return ""
  
        highlighter: (li, query) ->
          return li
  
        matcher: (flag, subtext) ->
          flag = "(?:^|\\s)" + flag.replace(/[\-\[\]\/\{\}\(\)\*\+\?\\\^\$\|]/g, "\\$&")
          regexp = new RegExp(flag + "([A-Za-z0-9_+-.\\|]*)$|" + flag + "([^\\x00-\\xff]*)$", "gi")
          match = regexp.exec(subtext)
          if match
            match[2] or match[1]
          else
            null
  
      tpl: "<li data-value='${name}'>${name} (<span>${display}</span>)</li>"
   */

  this.Modal = (function() {
    function Modal(title1, message1) {
      var modal, modalClose;
      this.title = title1;
      this.message = message1;
      modal = this;
      this.autoDismiss = true;
      this.ele = $('#modal-template').clone();
      this.ele.data('object', this);
      this.ele.attr('id', 'active-modal');
      this.keyboard = true;
      modalClose = this.ele.find('.close');
      modalClose.on('click', function() {
        return modal.dismiss();
      });
    }

    Modal.prototype.setIcon = function(icon) {
      this.icon = icon;
      return this.ele.find('.icon').addClass('glyph').addClass(this.icon);
    };

    Modal.prototype.setPrimaryButton = function(buttonName) {
      var primary;
      if (buttonName == null) {
        buttonName = gettext('Ok');
      }
      primary = this.ele.find('.primary');
      return primary.text(buttonName);
    };

    Modal.prototype.setTertiaryButton = function(buttonName, handler) {
      var tertiary;
      if (buttonName == null) {
        buttonName = 'Options';
      }
      tertiary = this.ele.find('.tertiary');
      tertiary.text(buttonName);
      tertiary.on('click', handler);
      return tertiary.show();
    };

    Modal.prototype.show = function() {
      var modal;
      modal = this;
      this.ele.on('hidden', function() {
        if (modal.listeners && modal.listeners.onDismiss) {
          return modal.listeners.onDismiss(modal);
        }
      });
      this.ele.find('#modal-title').html(this.title);
      if (this.message) {
        this.ele.find('#modal-message').html(this.message);
      } else {
        this.ele.find('#modal-message').hide();
      }
      return this.ele.modal({
        show: true,
        backdrop: 'static',
        keyboard: this.keyboard
      });
    };

    Modal.prototype.addListener = function(event, listener) {
      return this.listeners[event] = listener;
    };

    Modal.prototype.setListeners = function(listeners1, autoDismiss1) {
      var modal, primary;
      this.listeners = listeners1;
      this.autoDismiss = autoDismiss1 != null ? autoDismiss1 : true;
      modal = this;
      primary = this.ele.find('.primary');
      if (this.listeners.onPrimary) {
        return primary.off('click').on('click', function() {
          if (modal.listeners.onBeforePrimary) {
            if (modal.listeners.onBeforePrimary(modal)) {
              return;
            }
          }
          modal.listeners.onPrimary(modal);
          if (modal.autoDismiss) {
            return modal.dismiss();
          }
        });
      } else {
        if (modal.autoDismiss) {
          return primary.on('click', function() {
            return modal.dismiss();
          });
        }
      }
    };

    Modal.prototype.setMessage = function(message1) {
      this.message = message1;
    };

    Modal.prototype.dismiss = function() {
      this.ele.modal('hide');
      return this.ele.remove();
    };

    Modal.prototype.addClass = function(className) {
      return this.ele.addClass(className);
    };

    Modal.prototype.focusFirstInput = function() {
      return this.ele.find("input,textarea").filter(':first').focus();
    };

    return Modal;

  })();

  this.ConfirmationModal = (function(superClass) {
    extend(ConfirmationModal, superClass);

    function ConfirmationModal(title, message) {
      var modal, secondary;
      ConfirmationModal.__super__.constructor.call(this, title, message);
      modal = this;
      secondary = this.ele.find('.secondary');
      secondary.on('click', function() {
        return modal.dismiss();
      });
      secondary.show();
    }

    ConfirmationModal.prototype.hideSecondaryButton = function() {
      return this.ele.find('.secondary').hide();
    };

    ConfirmationModal.prototype.setForm = function(form) {
      return this.ele.find('.modal-body .form').append(form);
    };

    ConfirmationModal.prototype.getForm = function() {
      return this.ele.find('.modal-body .form').children(0);
    };

    ConfirmationModal.prototype.show = function() {
      ConfirmationModal.__super__.show.call(this);
      return this.focusFirstInput();
    };

    ConfirmationModal.prototype.setListeners = function(listeners, autoDismiss) {
      var modal, secondary;
      if (autoDismiss == null) {
        autoDismiss = true;
      }
      ConfirmationModal.__super__.setListeners.call(this, listeners, autoDismiss);
      modal = this;
      if (modal.listeners.onSecondary) {
        secondary = this.ele.find('.secondary');
        return secondary.on('click', function() {
          return modal.listeners.onSecondary(modal);
        });
      }
    };

    return ConfirmationModal;

  })(this.Modal);

  this.Modax = (function(superClass) {
    extend(Modax, superClass);

    function Modax(title, url) {
      var modal;
      this.url = url;
      Modax.__super__.constructor.call(this, title, null);
      modal = this;
      this.ele.find('.primary').on('click', function() {
        return modal.submit();
      });
    }

    Modax.prototype.setRedirectOnSuccess = function(redirectOnSuccess) {
      this.redirectOnSuccess = redirectOnSuccess;
    };

    Modax.prototype.setListeners = function(listeners, autoDismiss) {
      if (autoDismiss == null) {
        autoDismiss = false;
      }
      return Modax.__super__.setListeners.call(this, listeners, autoDismiss);
    };

    Modax.prototype.show = function() {
      var modal;
      Modax.__super__.show.call(this);
      this.ele.find('.loader').show();
      modal = this;
      modal.submitText = modal.ele.find('.primary').text();
      return fetchPJAXContent(this.url, "#active-modal .fetched-content", {
        onSuccess: function() {
          var submitText;
          modal.ele.find('.loader').hide();
          submitText = $(".form-group button[type='submit']").text();
          if (submitText) {
            modal.submitText = submitText;
          }
          modal.ele.find(".primary").text(modal.submitText);
          modal.focusFirstInput();
          if (modal.listeners && modal.listeners.onFormLoaded) {
            modal.listeners.onFormLoaded();
          }
          modal.wireEnter();
          return prepareOmnibox();
        }
      });
    };

    Modax.prototype.wireEnter = function() {
      var modal;
      modal = this;
      return modal.ele.find("form").on('keydown', function(e) {
        if (e.keyCode === ENTER) {
          modal.submit();
          return false;
        }
      });
    };

    Modax.prototype.submit = function() {
      var modal, postData;
      modal = this;
      modal.ele.find('.primary').text(gettext("Processing..")).addClass("disabled");
      postData = modal.ele.find('form').serialize();
      return fetchPJAXContent(this.url, '#active-modal .fetched-content', {
        postData: postData,
        shouldIgnore: function(data) {
          var ignore;
          ignore = /success-script/i.test(data);
          return ignore;
        },
        onIgnore: function(xhr) {
          var redirect;
          if (!modal.redirectOnSuccess) {
            modal.ele.find(".primary").removeClass("disabled").text(modal.submitText);
          }
          if (modal.listeners) {
            if (modal.listeners.onCompleted) {
              modal.listeners.onCompleted(xhr);
            }
            if (modal.listeners.onSuccess) {
              modal.listeners.onSuccess(xhr);
            }
          }
          if (modal.redirectOnSuccess) {
            modal.ele.find('.fetched-content').hide();
            modal.ele.find('.loader').show();
            redirect = xhr.getResponseHeader("Temba-Success");
            if (redirect) {
              return document.location.href = redirect;
            } else {
              return modal.dismiss();
            }
          } else {
            return modal.dismiss();
          }
        },
        onSuccess: function() {
          modal.ele.find(".primary").removeClass("disabled").text(modal.submitText);
          if (modal.listeners && modal.listeners.onCompleted) {
            return modal.listeners.onCompleted();
          } else {
            modal.wireEnter();
            return modal.focusFirstInput();
          }
        }
      });
    };

    return Modax;

  })(this.ConfirmationModal);

  $(function() {
    return $('.uv-send-message').click(function() {
      return UserVoice.push(['show', {}]);
    });
  });

}).call(this);
