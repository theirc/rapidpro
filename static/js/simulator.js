(function() {
  var checkForm, fitSimToScreen, getSimulateURL, hideSimulator, initSimulatorBody, initTextareaHeight, level_classes, moving_sim, processForm, resized, showSimulator, toExpand, verifyNumberSimulator;

  window.simulation = false;

  moving_sim = false;

  level_classes = {
    "I": "iinfo",
    "W": "iwarn",
    "E": "ierror"
  };

  window.updateSimulator = function(data) {
    var activity, direction, i, j, len, level, model, msg, node, ref, scope, top;
    $(".simulator-body").html("");
    i = 0;
    $('.simulator-body').data('message-count', data.messages.length);
    while (i < data.messages.length) {
      msg = data.messages[i];
      model = (msg.model === "msg" ? "imsg" : "ilog");
      level = (msg.level != null ? level_classes[msg.level] : "");
      direction = (msg.direction === "O" ? "from" : "to");
      $(".simulator-body").append("<div class=\"" + model + " " + level + " " + direction + "\">" + msg.text + "</div>");
      i++;
    }
    $(".simulator-body").scrollTop($(".simulator-body")[0].scrollHeight);
    $("#simulator textarea").val("");
    if (window.simulation) {
      scope = $('body').scope();
      if (scope) {
        scope.$apply(function() {
          return scope.visibleActivity = {
            active: data.activity,
            visited: data.visited
          };
        });
      }
      ref = $('#workspace').children('.node');
      for (j = 0, len = ref.length; j < len; j++) {
        node = ref[j];
        node = $(node).data('object');
        node.setActivity(data);
      }
    }
    activity = $('.activity:visible,.node .active:visible');
    if (activity) {
      if (activity.offset()) {
        top = activity.offset().top;
        return $('html, body').animate({
          scrollTop: top - 200
        });
      }
    }
  };

  $(function() {
    return $(window).scroll(function(evt) {
      return fitSimToScreen();
    });
  });

  toExpand = $("#simulator textarea");

  initTextareaHeight = toExpand.height();

  initSimulatorBody = $(".simulator-body").height();

  resized = toExpand.height();

  toExpand.autosize({
    callback: function() {
      var currentResized, footer;
      currentResized = toExpand.height();
      if (currentResized !== resized) {
        footer = currentResized + 10;
        resized = currentResized;
        $(".simulator-footer").css("height", footer);
        $(".simulator-body").css("height", initSimulatorBody - footer + 30);
        return $(".simulator-body").scrollTop($(".simulator-body")[0].scrollHeight);
      }
    }
  });

  checkForm = function(newMessage) {
    var valid;
    valid = true;
    if (newMessage === "") {
      $("#simulator textarea").addClass("error");
      valid = false;
    } else if (newMessage.length > 160) {
      $("#simulator textarea").val("");
      $("#simulator textarea").addClass("error");
      valid = false;
    }
    toExpand.css("height", initTextareaHeight);
    $(".simulator-footer").css("height", initTextareaHeight + 10);
    $(".simulator-body").css("height", "360px");
    return valid;
  };

  processForm = function(newMessage) {
    var scope;
    if (checkForm(newMessage)) {
      scope = $('html').scope('scope');
      if (scope && scope.saving) {
        setTimeout(function() {
          return processForm(newMessage);
        }, 500);
        return;
      }
      $.post(getSimulateURL(), JSON.stringify({
        new_message: newMessage
      })).done(function(data) {
        window.updateSimulator(data);
        $(".simulator-loading").css("display", "none");
        return $(".simulator-body").css("height", "360px");
      });
      return $("#simulator textarea").removeClass("error");
    }
  };

  fitSimToScreen = function() {
    var showSim, sim, simBottom, simTop, top, workspace, workspaceBottom;
    top = $(window).scrollTop();
    sim = $("#simulator");
    workspace = $("#workspace");
    showSim = $("#show-simulator");
    if (top > 110 && !sim.hasClass('scrollfix')) {
      sim.addClass('scrollfix');
      showSim.addClass('scrollfix');
    } else if (top <= 110 && sim.hasClass('scrollfix')) {
      sim.removeClass('scrollfix');
      showSim.removeClass('scrollfix');
    }
    simTop = sim.offset().top;
    simBottom = sim.height() + simTop;
    workspaceBottom = workspace.offset().top + workspace.height();
    if (simTop > top + 10 && sim.hasClass('on-footer')) {
      return sim.removeClass('on-footer');
    } else {
      if (simBottom > workspaceBottom - 30 && !sim.hasClass('on-footer')) {
        sim.addClass('on-footer');
      }
      if (simBottom < workspaceBottom && sim.hasClass('on-footer')) {
        return sim.removeClass('on-footer');
      }
    }
  };

  hideSimulator = function() {
    var scope, sim;
    moving_sim = true;
    sim = $("#simulator");
    sim.animate({
      right: -(sim.outerWidth() + 10)
    }, 400, "easeOutExpo", function() {
      var showButton;
      sim.hide();
      showButton = $("#show-simulator");
      showButton.css({
        right: -(showButton.outerWidth() + 10)
      });
      showButton.show();
      showButton.stop().animate({
        right: 0,
        width: 40
      }, 400, "easeOutExpo");
      return moving_sim = false;
    });
    window.simulation = false;
    $("#toolbar .actions").fadeIn();
    scope = $('body').scope();
    if (scope) {
      scope.$apply(function() {
        return scope.visibleActivity = scope.activity;
      });
    }
    if (window.is_voice) {
      return window.hangup();
    }
  };

  getSimulateURL = function() {
    var scope;
    scope = $('html').scope();
    if (scope && scope.language) {
      return window.simulateURL + '?lang=' + scope.language.iso_code;
    }
    return window.simulateURL;
  };

  showSimulator = function(reset) {
    var messageCount;
    if (reset == null) {
      reset = false;
    }
    messageCount = $(".simulator-body").data('message-count');
    if (reset || !messageCount || messageCount === 0) {
      resetSimulator();
    } else {
      refreshSimulator();
    }
    moving_sim = true;
    fitSimToScreen();
    $("#toolbar .actions").fadeOut();
    $("#show-simulator").stop().animate({
      right: '-110px'
    }, 200, function() {
      var sim;
      $(this).hide();
      $(this).find('.message').hide();
      sim = $("#simulator");
      sim.css({
        right: -(sim.outerWidth() + 10)
      });
      sim.show();
      return sim.animate({
        right: 30
      }, 400, "easeOutExpo", function() {
        $(".simulator-content textarea").focus();
        return moving_sim = false;
      });
    });
    return window.simulation = true;
  };

  window.refreshSimulator = function() {
    var scope;
    scope = $('html').scope('scope');
    if (scope && scope.saving) {
      setTimeout(refreshSimulator, 500);
      return;
    }
    return $.post(getSimulateURL(), JSON.stringify({
      has_refresh: false
    })).done(function(data) {
      window.updateSimulator(data);
      if (window.ivr && window.simulation) {
        return setTimeout(window.refreshSimulator, 2000);
      }
    });
  };

  window.resetSimulator = function() {
    var scope;
    $(".simulator-body").html("");
    $(".simulator-body").append("<div class='ilog from'>One moment..</div>");
    scope = $('html').scope('scope');
    if (scope && scope.saving) {
      setTimeout(resetSimulator, 500);
      return;
    }
    return $.post(getSimulateURL(), JSON.stringify({
      has_refresh: true
    })).done(function(data) {
      window.updateSimulator(data);
      if (window.ivr && window.simulation) {
        return setTimeout(window.refreshSimulator, 2000);
      }
    });
  };

  window.hangup = function() {
    $(".simulator-body").html("");
    return $.post(getSimulateURL(), JSON.stringify({
      hangup: true
    })).done(function(data) {});
  };

  $("#simulator .send-message").on("click", function() {
    var newMessage;
    newMessage = $("#simulator textarea").val();
    $(this).addClass("to-ignore");
    processForm(newMessage);
    if (newMessage && newMessage.length <= 160) {
      $("<div class=\"imsg to post-message\"></div>").text(newMessage).appendTo(".simulator-body");
      $("#simulator textarea").val("");
      $(".simulator-loading").css("display", "block");
      return $(".simulator-body").scrollTop($(".simulator-body")[0].scrollHeight);
    }
  });

  $("#simulator textarea").keypress(function(event) {
    var newMessage;
    if (event.which === 13) {
      event.preventDefault();
      newMessage = $("#simulator textarea").val();
      processForm(newMessage);
      if (newMessage && newMessage.length <= 160) {
        $("<div class=\"imsg to post-message\"></div>").text(newMessage).appendTo(".simulator-body");
        $("#simulator textarea").val("");
        $(".simulator-loading").css("display", "block");
        return $(".simulator-body").scrollTop($(".simulator-body")[0].scrollHeight);
      }
    }
  });

  $("#show-simulator").hover(function() {
    if (!moving_sim) {
      return $(this).stop().animate({
        width: '110px'
      }, 200, "easeOutBack", function() {
        return $(this).find('.message').stop().fadeIn('fast');
      });
    }
  }, function() {
    if (!moving_sim) {
      $(this).find('.message').hide();
      return $(this).stop().animate({
        width: '40px'
      }, 200, "easeOutBack", function() {});
    }
  });

  verifyNumberSimulator = function() {
    var modal;
    if (window.ivr) {
      modal = new Modax(gettext("Start Test Call"), '/usersettings/phone/');
      modal.setIcon("icon-phone");
      modal.setListeners({
        onSuccess: function() {
          return showSimulator(true);
        }
      });
      return modal.show();
    } else {
      return showSimulator();
    }
  };

  $("#show-simulator").click(function() {
    return verifyNumberSimulator();
  });

  $("#toggle-simulator").on("click", function() {
    if (!$("#simulator").is(":visible")) {
      return verifyNumberSimulator();
    } else {
      return hideSimulator();
    }
  });

  $(".simulator-close").on("click", function() {
    return hideSimulator();
  });

  $(".simulator-refresh").on("click", function() {
    return window.resetSimulator();
  });

}).call(this);
