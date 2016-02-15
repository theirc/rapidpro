(function() {
  var NodeEditorController, RuleOptionsController, SimpleMessageController, TerminalWarningController, TranslateRulesController, TranslationController, app, version,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  app = angular.module('temba.controllers', ['ui.bootstrap', 'temba.services', 'ngAnimate']);

  version = new Date().getTime();

  app.controller('RevisionController', [
    '$scope', '$rootScope', '$log', '$timeout', 'Flow', 'Revisions', function($scope, $rootScope, $log, $timeout, Flow, Revisions) {
      $scope.revisions = function() {
        return Revisions.revisions;
      };
      $scope.apply = function() {
        return $scope.applyDefinition(Flow.flow);
      };
      $scope.cancel = function() {
        if (Revisions.original) {
          return $scope.applyDefinition(Revisions.original);
        } else {
          return $scope.hideRevisions();
        }
      };
      $scope.showRevision = function(revision) {
        var i, len, other, ref;
        ref = Revisions.revisions;
        for (i = 0, len = ref.length; i < len; i++) {
          other = ref[i];
          other.selected = false;
        }
        revision.selected = true;
        if (!Revisions.original) {
          Revisions.original = Flow.flow;
        }
        return Revisions.getRevision(revision).then(function() {
          return $scope.showDefinition(Revisions.definition);
        });
      };
      $scope.showDefinition = function(definition, onChange) {
        $rootScope.visibleActivity = false;
        Flow.flow = null;
        jsPlumb.reset();
        return $timeout(function() {
          Flow.flow = definition;
          if (onChange) {
            return onChange();
          }
        }, 0);
      };
      $scope.applyDefinition = function(definition) {
        var action, actionset, i, j, k, len, len1, len2, markDirty, other, ref, ref1, ref2;
        ref = definition.action_sets;
        for (i = 0, len = ref.length; i < len; i++) {
          actionset = ref[i];
          ref1 = actionset.actions;
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            action = ref1[j];
            action.uuid = uuid();
          }
        }
        ref2 = Revisions.revisions;
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          other = ref2[k];
          other.selected = false;
        }
        markDirty = false;
        if (definition.metadata.revision !== Revisions.original.metadata.revision) {
          definition.metadata.saved_on = Revisions.original.metadata.saved_on;
          markDirty = true;
        }
        return $scope.showDefinition(definition, function() {
          $scope.hideRevisions();
          if (markDirty) {
            return Flow.markDirty();
          }
        });
      };
      return $scope.hideRevisions = function() {
        Revisions.original = null;
        $rootScope.visibleActivity = true;
        return $rootScope.showRevisions = false;
      };
    }
  ]);

  app.controller('FlowController', [
    '$scope', '$rootScope', '$timeout', '$modal', '$log', '$interval', '$upload', 'Flow', 'Plumb', 'DragHelper', 'utils', function($scope, $rootScope, $timeout, $modal, $log, $interval, $upload, Flow, Plumb, DragHelper, utils) {
      var showDialog, showRecentDelay;
      $rootScope.gearLinks = [];
      $rootScope.ivr = window.ivr;
      $scope.getContactFieldName = function(ruleset) {
        if (!ruleset._contactFieldName) {
          ruleset._contactFieldName = Flow.getContactField(ruleset);
        }
        return ruleset._contactFieldName;
      };
      $scope.getFlowFieldName = function(ruleset) {
        if (!ruleset._flowFieldName) {
          ruleset._flowFieldName = Flow.getFlowField(ruleset);
        }
        return ruleset._flowFieldName;
      };
      $scope.clickGearMenuItem = function(id) {
        var modal;
        if (id === 'default_language') {
          modal = new ConfirmationModal(gettext('Default Language'), gettext('The default language for the flow is used for contacts which have no preferred language. Are you sure you want to set the default language for this flow to') + ' <span class="attn">' + Flow.language.name + "</span>?");
          modal.addClass('warning');
          modal.setListeners({
            onPrimary: function() {
              return $scope.setBaseLanguage(Flow.language);
            }
          });
          modal.show();
        }
        return false;
      };
      $rootScope.activityInterval = 5000;
      $scope.init = function() {
        return Flow.fetch(window.flowId, function() {
          $scope.updateActivity();
          return $scope.flow = Flow.flow;
        });
      };
      showDialog = function(title, body, okButton, hideCancel) {
        if (okButton == null) {
          okButton = 'Okay';
        }
        if (hideCancel == null) {
          hideCancel = true;
        }
        $scope.dialog = $modal.open({
          templateUrl: "/partials/modal",
          controller: SimpleMessageController,
          resolve: {
            title: function() {
              return title;
            },
            body: function() {
              return body;
            },
            okButton: function() {
              return okButton;
            },
            hideCancel: function() {
              return hideCancel;
            }
          }
        });
        return $scope.dialog;
      };
      $scope.showRevisionHistory = function() {
        return $scope.$evalAsync(function() {
          return $rootScope.showRevisions = true;
        });
      };
      $scope.setBaseLanguage = function(lang) {
        if (Flow.languages[0].name === gettext('Default')) {
          Flow.languages.splice(0, 1);
        }
        Flow.languages.splice(Flow.languages.indexOf(lang), 1);
        Flow.languages.unshift(lang);
        Flow.flow.base_language = lang.iso_code;
        return $timeout(function() {
          $scope.setLanguage(lang);
          return Flow.markDirty();
        }, 0);
      };
      $scope.onFileSelect = function($files, actionset, action) {
        var file, modal, scope;
        if (window.dragging || !window.mutable) {
          return;
        }
        scope = this;
        if ($files.length > 1) {
          showDialog("Too Many Files", "To upload a sound file, please drag and drop one file for each step.");
          return;
        }
        file = $files[0];
        if (file.type !== 'audio/wav' && file.type !== 'audio/x-wav') {
          showDialog('Wrong File Type', 'Audio files need to in the WAV format. Please choose a WAV file and try again.');
          return;
        }
        if (action._translation_recording) {
          modal = showDialog('Overwrite Recording', 'This step already has a recording, would you like to replace this recording with ' + file.name + '?', 'Overwrite Recording', false);
          modal.result.then(function(value) {
            if (value === 'ok') {
              action._translation_recording = null;
              return scope.onFileSelect($files, actionset, action);
            }
          });
          return;
        }
        action.uploading = true;
        $scope.upload = $upload.upload({
          url: window.uploadURL,
          data: {
            actionset: actionset.uuid,
            action: action.uuid
          },
          file: file
        }).progress(function(evt) {
          $log.debug("percent: " + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function(data, status, headers, config) {
          if (!action.recording) {
            action.recording = {};
          }
          action.recording[Flow.language.iso_code] = data['path'];
          action.uploading = false;
          action.dirty = true;
          Flow.saveAction(actionset, action);
        });
      };
      $scope.scheduleActivityUpdate = function() {
        $timeout(function() {
          return $scope.updateActivity();
        }, $rootScope.activityInterval);
        return $rootScope.activityInterval += 200;
      };
      $scope.setLanguage = function(lang) {
        Flow.setMissingTranslation(false);
        Flow.language = lang;
        $scope.language = lang;
        return Plumb.repaint();
      };
      $scope.updateActivity = function() {
        if (window.simulation) {
          $scope.scheduleActivityUpdate();
          return;
        }
        return $.ajax({
          type: "GET",
          url: activityURL,
          cache: false,
          success: function(data, status, xhr) {
            $rootScope.pending = data.pending;
            if (xhr.status === 200 && data.activity) {
              $rootScope.activity = {
                active: data.activity,
                visited: data.visited
              };
              if (!window.simulation) {
                $rootScope.visibleActivity = $rootScope.activity;
              }
              return $scope.scheduleActivityUpdate();
            }
          },
          error: function(status) {
            console.log("Error:");
            return console.log(status);
          }
        });
      };
      $scope.$watch((function() {
        return Flow.flow;
      }), function(current) {
        $scope.flow = Flow.flow;
        $scope.languages = Flow.languages;
        $scope.language = Flow.language;
        if (current) {
          jsPlumb.bind('connectionDrag', function(connection) {
            return $scope.onConnectorDrag(connection);
          });
          jsPlumb.bind('connectionDragStop', function(connection) {
            return $scope.onConnectorDrop(connection);
          });
          return jsPlumb.bind('beforeDrop', function(sourceId, targetId) {
            return $scope.onBeforeConnectorDrop(sourceId, targetId);
          });
        } else {
          jsPlumb.unbind('connectionDrag');
          return jsPlumb.unbind('connectionDragStop');
        }
      });
      $scope.$watch((function() {
        return $rootScope.visibleActivity;
      }), function() {
        var i, len, node, ref;
        if ($rootScope.visibleActivity) {
          if (Flow.flow) {
            ref = Flow.flow.rule_sets.concat(Flow.flow.action_sets);
            for (i = 0, len = ref.length; i < len; i++) {
              node = ref[i];
              Flow.applyActivity(node, $rootScope.visibleActivity);
            }
          }
        }
      });
      $scope.getSource = function(category) {
        return category.sources[0];
      };
      $scope.onBeforeConnectorDrop = function(props) {
        var errorMessage;
        errorMessage = Flow.getConnectionError(props.sourceId, props.targetId);
        if (errorMessage) {
          $rootScope.ghost.hide();
          $rootScope.ghost = null;
          showDialog('Invalid Connection', errorMessage);
          return false;
        }
        return true;
      };
      $scope.onConnectorDrop = function(connection) {
        var actionset, category, createdNewNode, ghost, msg, ruleset, source, targetId, to;
        $(connection.sourceId).parent().removeClass('reconnecting');
        source = connection.sourceId.split('_');
        createdNewNode = false;
        if ($rootScope.ghost) {
          ghost = $rootScope.ghost;
          targetId = uuid();
          if (!ghost.hasClass('collision')) {
            if (ghost.hasClass('actions')) {
              msg = {};
              msg[Flow.flow.base_language] = '';
              actionset = {
                x: ghost[0].offsetLeft,
                y: ghost[0].offsetTop,
                uuid: targetId,
                actions: [
                  {
                    type: window.ivr ? 'say' : 'reply',
                    msg: msg,
                    uuid: uuid()
                  }
                ]
              };
              $scope.clickAction(actionset, actionset.actions[0], connection.sourceId);
              createdNewNode = true;
            } else {
              category = {};
              category[Flow.flow.base_language] = "All Responses";
              ruleset = {
                x: ghost[0].offsetLeft,
                y: ghost[0].offsetTop,
                uuid: targetId,
                label: "Response " + (Flow.flow.rule_sets.length + 1),
                operand: "@step.value",
                webhook_action: null,
                ruleset_type: window.ivr ? 'wait_digit' : 'wait_message',
                rules: [
                  {
                    test: {
                      test: "true",
                      type: "true"
                    },
                    category: category,
                    uuid: uuid()
                  }
                ]
              };
              $scope.clickRuleset(ruleset, source[0]);
              createdNewNode = true;
            }
          }
          $rootScope.ghost.hide();
          $rootScope.ghost = null;
        }
        if (!createdNewNode) {
          to = connection.targetId;
          if (!connection.source) {
            to = null;
          }
        }
        return $timeout(function() {
          Flow.updateDestination(connection.sourceId, to);
          return Flow.markDirty();
        }, 0);
      };
      $scope.onConnectorDrag = function(connection) {
        var scope;
        DragHelper.hide();
        $(connection.sourceId).parent().addClass('reconnecting');
        scope = jsPlumb.getSourceScope(connection.sourceId);
        $rootScope.ghost = $('.ghost.' + scope);
        return $timeout(function() {
          return $rootScope.ghost.show();
        }, 0);
      };
      $scope.createFirstAction = function() {
        var actionset, msg;
        msg = {};
        msg[Flow.flow.base_language] = '';
        actionset = {
          x: 100,
          y: 0,
          uuid: uuid(),
          actions: [
            {
              uuid: uuid(),
              type: window.ivr ? 'say' : 'reply',
              msg: msg
            }
          ]
        };
        return this.clickAction(actionset, actionset.actions[0]);
      };
      $scope.notBaseLanguageFilter = function(lang) {
        return lang.iso_code !== $scope.flow.base_language;
      };
      $scope.translatableRuleFilter = function(rule) {
        return rule.type === 'contains_any';
      };
      $scope.lastActionMissingTranslation = function(actionset) {
        var lastAction, ref;
        if (actionset._lastActionMissingTranslation === null) {
          lastAction = actionset.actions[actionset.actions.length - 1];
          actionset._lastActionMissingTranslation = false;
          if (Flow.language) {
            if (Flow.language.iso_code !== Flow.flow.base_language) {
              if (lastAction.msg && ((ref = lastAction.type) === 'reply' || ref === 'send' || ref === 'send' || ref === 'say') && !lastAction.msg[Flow.language.iso_code]) {
                actionset._lastActionMissingTranslation = true;
              }
            }
          }
        }
        return actionset._lastActionMissingTranslation;
      };
      $scope.broadcastToStep = function(uuid) {
        return window.broadcastToNode(uuid);
      };
      $scope.addNote = function(event) {
        return Flow.addNote(event.offsetX, event.offsetY);
      };
      $scope.removeNote = function(note) {
        return Flow.removeNote(note);
      };
      $scope.clickRuleset = function(ruleset, dragSource) {
        if (dragSource == null) {
          dragSource = null;
        }
        if (window.dragging || !window.mutable) {
          return;
        }
        DragHelper.hide();
        if (Flow.language && Flow.flow.base_language !== Flow.language.iso_code) {
          return $scope.dialog = $modal.open({
            templateUrl: "/partials/translate_rules",
            controller: TranslateRulesController,
            resolve: {
              languages: function() {
                return {
                  from: Flow.flow.base_language,
                  to: Flow.language.iso_code
                };
              },
              ruleset: function() {
                return ruleset;
              }
            }
          });
        } else {
          if (window.ivr) {
            return $scope.dialog = $modal.open({
              templateUrl: "/partials/node_editor",
              controller: NodeEditorController,
              resolve: {
                options: function() {
                  return {
                    nodeType: 'ivr',
                    ruleset: ruleset,
                    dragSource: dragSource
                  };
                },
                scope: $scope
              }
            });
          } else {
            return $scope.dialog = $modal.open({
              templateUrl: "/partials/node_editor",
              controller: NodeEditorController,
              resolve: {
                options: function() {
                  return {
                    nodeType: 'rules',
                    ruleset: ruleset,
                    dragSource: dragSource
                  };
                }
              }
            });
          }
        }
      };
      $scope.confirmRemoveWebhook = function(event, ruleset) {
        var removeWarning;
        if (window.dragging || !window.mutable) {
          return;
        }
        removeWarning = $(event.target).parent().children('.remove-warning');
        if (removeWarning.is(':visible')) {
          ruleset.webhook = null;
          ruleset.webhook_action = null;
          Plumb.repaint();
          Flow.markDirty();
        } else {
          removeWarning.fadeIn();
          $timeout(function() {
            return removeWarning.fadeOut();
          }, 1500);
        }
        return false;
      };
      $scope.confirmRemoveRuleset = function(event, ruleset) {
        var removeWarning;
        if (window.dragging || !window.mutable) {
          return;
        }
        removeWarning = $(event.target).parent().children('.remove-warning');
        if (removeWarning.is(':visible')) {
          Flow.removeRuleset(ruleset);
        } else {
          removeWarning.fadeIn();
          $timeout(function() {
            return removeWarning.fadeOut();
          }, 1500);
        }
        return false;
      };
      $scope.confirmRemoveConnection = function(connection) {
        var modal;
        modal = new ConfirmationModal(gettext('Remove'), gettext('Are you sure you want to remove this connection?'));
        modal.addClass('alert');
        modal.setListeners({
          onPrimary: function() {
            Flow.removeConnection(connection);
            return Flow.markDirty();
          }
        });
        modal.show();
        return false;
      };
      $scope.clickActionSource = function(actionset) {
        var connection, source;
        if (actionset._terminal) {
          return $scope.dialog = $modal.open({
            templateUrl: "/partials/modal",
            controller: TerminalWarningController,
            resolve: {
              actionset: function() {
                return actionset;
              },
              flowController: function() {
                return $scope;
              }
            }
          });
        } else {
          if (window.mutable) {
            source = $("#" + actionset.uuid + "> .source");
            connection = Plumb.getSourceConnection(source);
            if (connection) {
              return $scope.confirmRemoveConnection(connection);
            } else {
              return $timeout(function() {
                return DragHelper.showSaveResponse($('#' + actionset.uuid + ' .source'));
              }, 0);
            }
          }
        }
      };
      $scope.clickRuleSource = function(category) {
        var connection, source;
        if (window.mutable) {
          source = $("#" + category.sources[0] + "> .source");
          connection = Plumb.getSourceConnection(source);
          if (connection) {
            return $scope.confirmRemoveConnection(connection);
          } else {
            return $timeout(function() {
              return DragHelper.showSendReply($('#' + category.sources[0] + ' .source'));
            }, 0);
          }
        }
      };
      $scope.addAction = function(actionset) {
        if (window.dragging || !window.mutable) {
          return;
        }
        return $scope.dialog = $modal.open({
          templateUrl: "/partials/node_editor",
          controller: NodeEditorController,
          resolve: {
            options: function() {
              return {
                nodeType: 'actions',
                actionset: actionset,
                action: {
                  type: window.ivr ? 'say' : 'reply',
                  uuid: uuid()
                }
              };
            }
          }
        });
      };
      $scope.moveActionUp = function(actionset, action) {
        return Flow.moveActionUp(actionset, action);
      };
      $scope.isMoveable = function(action) {
        return Flow.isMoveableAction(action);
      };
      $scope.confirmRemoveAction = function(event, actionset, action) {
        var removeWarning;
        if (window.dragging || !window.mutable) {
          return;
        }
        removeWarning = $(event.target).parent().children('.remove-warning');
        if (removeWarning.is(':visible')) {
          Flow.removeAction(actionset, action);
        } else {
          removeWarning.fadeIn();
          $timeout(function() {
            return removeWarning.fadeOut();
          }, 1500);
        }
        return false;
      };
      $scope.playRecording = function(action_uuid) {
        $log.debug("Play audio: " + action_uuid);
        $('#' + action_uuid + "_audio").each(function() {
          var audio;
          audio = $(this)[0];
          if (!audio.paused) {
            audio.pause();
            return audio.currentTime = 0;
          }
        });
        return $('#' + action_uuid + "_audio")[0].play();
      };
      $scope.clickAction = function(actionset, action, dragSource) {
        var fromText, ref;
        if (dragSource == null) {
          dragSource = null;
        }
        if (window.dragging || !window.mutable) {
          return;
        }
        DragHelper.hide();
        if (Flow.language && Flow.flow.base_language !== Flow.language.iso_code) {
          if ((ref = action.type) === "send" || ref === "reply" || ref === "say") {
            fromText = action.msg[Flow.flow.base_language];
            $scope.dialog = $modal.open({
              templateUrl: "/partials/translation_modal",
              controller: TranslationController,
              resolve: {
                languages: function() {
                  return {
                    from: Flow.flow.base_language,
                    to: Flow.language.iso_code
                  };
                },
                translation: function() {
                  return {
                    from: fromText,
                    to: action.msg[Flow.language.iso_code]
                  };
                }
              }
            });
            $scope.dialog.opened.then(function() {
              return $('textarea').focus();
            });
            return $scope.dialog.result.then(function(translation) {
              action = utils.clone(action);
              if (translation && translation.strip().length > 0) {
                action.msg[Flow.language.iso_code] = translation;
              } else {
                delete action.msg[Flow.language.iso_code];
              }
              return Flow.saveAction(actionset, action);
            }, (function() {
              return $log.info("Modal dismissed at: " + new Date());
            }));
          }
        } else {
          return $scope.dialog = $modal.open({
            templateUrl: "/partials/node_editor",
            controller: NodeEditorController,
            resolve: {
              options: function() {
                return {
                  nodeType: 'actions',
                  actionset: actionset,
                  action: action,
                  dragSource: dragSource
                };
              }
            }
          });
        }
      };
      $scope.mouseMove = function($event) {
        $rootScope.activityInterval = 5000;
        if ($rootScope.ghost) {
          utils.checkCollisions($rootScope.ghost);
          if ($rootScope.ghost.hasClass('collision')) {
            if ($("#flow .drop-hover").length > 0) {
              $rootScope.ghost.hide();
            } else {
              $rootScope.ghost.show();
            }
          }
          $rootScope.ghost.offset({
            left: $event.pageX - ($rootScope.ghost.width() / 2),
            top: $event.pageY
          });
        }
        return false;
      };
      showRecentDelay = null;
      $scope.hideRecentMessages = function() {
        $timeout.cancel(showRecentDelay);
        if (this.category) {
          this.category._showMessages = false;
          this.$parent.ruleset._showMessages = false;
        }
        if (this.action_set) {
          return this.action_set._showMessages = false;
        }
      };
      return $scope.showRecentMessages = function() {
        var hovered;
        hovered = this;
        return showRecentDelay = $timeout(function() {
          var action_set, category, categoryFrom, categoryTo, ruleset;
          if (hovered.action_set) {
            action_set = hovered.action_set;
            action_set._showMessages = true;
            Flow.fetchRecentMessages(action_set.uuid, action_set.destination).then(function(response) {
              return action_set._messages = response.data;
            });
          }
          if (hovered.category) {
            category = hovered.category;
            ruleset = hovered.$parent.ruleset;
            ruleset._showMessages = true;
            category._showMessages = true;
            categoryFrom = category.sources.join();
            categoryTo = category.target;
            return Flow.fetchRecentMessages(ruleset.uuid, categoryTo, categoryFrom).then(function(response) {
              return category._messages = response.data;
            });
          }
        }, 500);
      };
    }
  ]);

  TranslateRulesController = function($scope, $modalInstance, Flow, utils, languages, ruleset) {
    var i, len, ref, rule;
    ruleset = utils.clone(ruleset);
    ref = ruleset.rules;
    for (i = 0, len = ref.length; i < len; i++) {
      rule = ref[i];
      if (rule.test.type === "between") {
        rule.category = null;
      }
      if (rule.category) {
        rule._translation = {
          category: {},
          test: {}
        };
        rule._translation.category['from'] = rule.category[Flow.flow.base_language];
        rule._translation.category['to'] = rule.category[Flow.language.iso_code];
        if (typeof rule.test.test === "object") {
          rule._translation.test['from'] = rule.test.test[Flow.flow.base_language];
          rule._translation.test['to'] = rule.test.test[Flow.language.iso_code];
        }
      }
    }
    $scope.ruleset = ruleset;
    $scope.languages = languages;
    $scope.language = Flow.language;
    $scope.ok = function() {
      var j, len1, ref1;
      ref1 = ruleset.rules;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        rule = ref1[j];
        if (rule.category) {
          if (rule._translation.category.to && rule._translation.category.to.strip().length > 0) {
            rule.category[Flow.language.iso_code] = rule._translation.category.to;
          } else {
            delete rule.category[Flow.language.iso_code];
          }
          if (typeof rule.test.test === "object") {
            if (rule._translation.test.to && rule._translation.test.to.strip().length > 0) {
              rule.test.test[Flow.language.iso_code] = rule._translation.test.to;
            } else {
              delete rule.test.test[Flow.language.iso_code];
            }
          }
        }
      }
      Flow.replaceRuleset(ruleset);
      return $modalInstance.close("");
    };
    return $scope.cancel = function() {
      return $modalInstance.dismiss("cancel");
    };
  };

  TranslationController = function($scope, $modalInstance, languages, translation) {
    $scope.translation = translation;
    $scope.languages = languages;
    $scope.ok = function(translationText) {
      return $modalInstance.close(translationText);
    };
    return $scope.cancel = function() {
      return $modalInstance.dismiss("cancel");
    };
  };

  RuleOptionsController = function($rootScope, $scope, $modal, $log, $modalInstance, $timeout, utils, ruleset, Flow, Plumb, methods, type) {
    $scope.ruleset = utils.clone(ruleset);
    $scope.methods = methods;
    $scope.type = type;
    if ($scope.ruleset.webhook_action === null) {
      $scope.ruleset.webhook_action = 'GET';
    }
    $scope.ok = function() {
      ruleset.webhook_action = $scope.ruleset.webhook_action;
      ruleset.webhook = $scope.ruleset.webhook;
      ruleset.operand = $scope.ruleset.operand;
      Flow.markDirty();
      $timeout(function() {
        return Plumb.recalculateOffsets(ruleset.uuid);
      }, 0);
      return $modalInstance.close("");
    };
    return $scope.cancel = function() {
      return $modalInstance.dismiss("cancel");
    };
  };

  NodeEditorController = function($rootScope, $scope, $modal, $modalInstance, $timeout, $log, Flow, Plumb, utils, options) {
    var action, actionset, config, flow, formData, found, i, j, k, l, lang, len, len1, len2, len3, len4, m, num, ref, ref1, ref2, ref3, ref4, rule, ruleset, startsFlow, stopWatching, toRemove;
    $scope.nodeType = options.nodeType;
    $scope.ivr = window.ivr;
    $scope.options = options;
    $scope.contactFields = Flow.contactFieldSearch;
    $scope.actionConfigs = Flow.actions;
    $scope.rulesetConfigs = Flow.rulesets;
    $scope.operatorConfigs = Flow.operators;
    $scope.languages = utils.clone(Flow.languages).filter(function(lang) {
      return lang.name !== "Default";
    });
    formData = {};
    if (options.nodeType === 'rules' || options.nodeType === 'ivr') {
      ruleset = options.ruleset;
      action = {
        type: window.ivr ? 'say' : 'reply',
        uuid: uuid()
      };
      actionset = {
        _switchedFromRule: true,
        x: ruleset.x,
        y: ruleset.y,
        uuid: uuid(),
        actions: [action]
      };
    } else if (options.nodeType === 'actions') {
      actionset = options.actionset;
      action = options.action;
      if (action.type === "lang") {
        found = false;
        ref = $scope.languages;
        for (i = 0, len = ref.length; i < len; i++) {
          lang = ref[i];
          if (lang.iso_code === action.lang) {
            found = true;
            break;
          }
        }
        if (!found) {
          $scope.languages.push({
            name: action.name,
            iso_code: action.lang
          });
          $scope.languages.sort(function(a, b) {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
        }
      }
      ruleset = {
        _switchedFromAction: true,
        x: actionset.x,
        y: actionset.y,
        uuid: uuid(),
        label: "Response " + (Flow.flow.rule_sets.length + 1),
        operand: "@step.value",
        webhook_action: null,
        ruleset_type: window.ivr ? 'wait_digit' : 'wait_message',
        rules: [
          {
            test: {
              test: "true",
              type: "true"
            },
            category: 'All Responses',
            uuid: uuid()
          }
        ]
      };
      ruleset.rules[0].category = {
        _base: 'All Responses'
      };
      ruleset.rules[0].category[Flow.flow.base_language] = 'All Responses';
    }
    formData.rulesetConfig = Flow.getRulesetConfig({
      type: ruleset.ruleset_type
    });
    $scope.updateActionForm = function(config) {
      if (config.type === 'email') {
        if (typeof $scope.action.msg === 'object') {
          if (Flow.flow.base_language in $scope.action.msg) {
            return $scope.action.msg = $scope.action.msg[Flow.flow.base_language];
          } else {
            return $scope.action.msg = '';
          }
        }
      }
    };
    $scope.showFlip = function() {
      return actionset.actions.length < 2;
    };
    $scope.ruleset = utils.clone(ruleset);
    $scope.removed = [];
    flow = Flow.flow;
    $scope.flowFields = Flow.getFlowFields(ruleset);
    $scope.fieldIndexOptions = [
      {
        text: 'first',
        id: 0
      }, {
        text: 'second',
        id: 1
      }, {
        text: 'third',
        id: 2
      }, {
        text: 'fourth',
        id: 3
      }, {
        text: 'fifth',
        id: 4
      }, {
        text: 'sixth',
        id: 5
      }, {
        text: 'seventh',
        id: 6
      }, {
        text: 'eighth',
        id: 7
      }, {
        text: 'ninth',
        id: 8
      }
    ];
    $scope.fieldDelimiterOptions = [
      {
        text: 'space',
        id: ' '
      }, {
        text: 'plus',
        id: '+'
      }, {
        text: 'period',
        id: '.'
      }
    ];
    formData.flowField = Flow.getFieldSelection($scope.flowFields, $scope.ruleset.operand, true);
    formData.contactField = Flow.getFieldSelection($scope.contactFields, $scope.ruleset.operand, false);
    config = $scope.ruleset.config;
    if (!config) {
      config = {};
    }
    formData.fieldIndex = Flow.getFieldSelection($scope.fieldIndexOptions, config.field_index, true);
    formData.fieldDelimiter = Flow.getFieldSelection($scope.fieldDelimiterOptions, config.field_delimiter, true);
    if (!$scope.ruleset.webhook_action) {
      $scope.ruleset.webhook_action = 'GET';
    }
    $scope.hasRules = function() {
      var ref1;
      if ($scope.formData.rulesetConfig) {
        return ref1 = $scope.formData.rulesetConfig.type, indexOf.call(Flow.supportsRules, ref1) >= 0;
      }
    };
    $scope.updateWebhook = function() {
      return $modal.open({
        templateUrl: "/partials/rule_webhook",
        controller: RuleOptionsController,
        resolve: {
          methods: function() {
            return ['GET', 'POST'];
          },
          type: function() {
            return 'api';
          },
          ruleset: function() {
            return $scope.ruleset;
          }
        }
      });
    };
    $scope.remove = function(rule) {
      var index;
      $scope.removed.push(rule);
      index = $scope.ruleset.rules.indexOf(rule);
      return $scope.ruleset.rules.splice(index, 1);
    };
    $scope.numericRule = {
      test: {
        type: 'between'
      },
      config: Flow.getOperatorConfig('between')
    };
    toRemove = [];
    ref1 = $scope.ruleset.rules;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      rule = ref1[j];
      if (!rule.category) {
        toRemove.push(rule);
        continue;
      }
      rule._config = Flow.getOperatorConfig(rule.test.type);
      if ((ref2 = rule.test.type) === 'date_before' || ref2 === 'date_after' || ref2 === 'date_equal') {
        rule.test._base = rule.test.test.slice(15, -1);
      } else if (rule.test.type !== "between") {
        if (rule.test.test && rule._config.localized) {
          rule.test._base = rule.test.test[flow.base_language];
        } else {
          rule.test = {
            _base: rule.test.test
          };
        }
      }
      rule.category._base = rule.category[flow.base_language];
    }
    if (window.ivr) {
      $scope.numbers = (function() {
        var k, results;
        results = [];
        for (num = k = 1; k <= 9; num = ++k) {
          results.push({
            number: num,
            uuid: uuid()
          });
        }
        return results;
      })();
      $scope.numbers.push({
        number: 0,
        uuid: uuid()
      });
      ref3 = $scope.ruleset.rules;
      for (k = 0, len2 = ref3.length; k < len2; k++) {
        rule = ref3[k];
        num = parseInt(rule.test._base);
        if (num >= 0 && num <= 9) {
          if (num === 0) {
            num = 10;
          }
          $scope.numbers[num - 1].category = rule.category;
          $scope.numbers[num - 1].uuid = rule.uuid;
          $scope.numbers[num - 1].destination = rule.destination;
        }
      }
    }
    for (l = 0, len3 = toRemove.length; l < len3; l++) {
      rule = toRemove[l];
      $scope.remove(rule);
    }
    $scope.sortableOptions = {
      forcePlaceholderSize: true,
      scroll: false,
      placeholder: "sort-placeholder"
    };
    $scope.updateSplitVariable = function() {
      return $modal.open({
        templateUrl: "/partials/split_variable",
        controller: RuleOptionsController,
        resolve: {
          methods: function() {
            return [];
          },
          type: function() {
            return 'reply';
          },
          ruleset: function() {
            return $scope.ruleset;
          }
        }
      });
    };
    $scope.updateCategory = function(rule) {
      var categoryName;
      if (!rule.category._autoName) {
        return;
      }
      categoryName = $scope.getDefaultCategory(rule);
      if (rule.category) {
        return rule.category._base = categoryName;
      } else {
        return rule.category = {
          _base: categoryName
        };
      }
    };
    $scope.isVisibleOperator = function(operator) {
      if ($scope.formData.rulesetConfig.type === 'wait_digits') {
        if (!operator.voice) {
          return false;
        }
      }
      if (operator.type === "true") {
        return false;
      }
      return true;
    };
    $scope.isVisibleRulesetType = function(rulesetConfig) {
      var ref4, valid;
      valid = (ref4 = flow.flow_type, indexOf.call(rulesetConfig.filter, ref4) >= 0);
      if ((rulesetConfig.type === 'flow_field' || rulesetConfig.type === 'form_field') && $scope.flowFields.length === 0) {
        return false;
      }
      if (rulesetConfig.type === 'contact_field' && $scope.contactFields.length === 0) {
        return false;
      }
      return valid;
    };
    $scope.getDefaultCategory = function(rule) {
      var categoryName, days, named, op, words;
      categoryName = '';
      if (rule.test && rule.test._base) {
        categoryName = rule.test._base.strip();
      }
      op = rule._config.type;
      if (op === "between") {
        if (rule.test.min) {
          categoryName = rule.test.min;
        }
        if (rule.test.min && rule.test.max) {
          categoryName += ' - ';
        }
        if (rule.test.max) {
          categoryName += rule.test.max;
        }
      } else if (op === "number") {
        categoryName = "numeric";
      } else if (op === "district") {
        categoryName = "district";
      } else if (op === "state") {
        categoryName = "state";
      } else if (op === "phone") {
        categoryName = "phone";
      } else if (op === "regex") {
        categoryName = "matches";
      } else if (op === "date") {
        categoryName = "is a date";
      } else if (op === "date_before" || op === "date_equal" || op === "date_after") {
        days = rule.test._base;
        if (days) {
          if (days[0] === '-') {
            categoryName = "today " + days;
          } else {
            categoryName = "today +" + days;
          }
          if (days === '1' || days === '-1') {
            categoryName = categoryName + " day";
          } else {
            categoryName = categoryName + " days";
          }
          if (op === 'date_before') {
            categoryName = "< " + categoryName;
          } else if (op === 'date_equal') {
            categoryName = "= " + categoryName;
          } else if (op === 'date_after') {
            categoryName = "> " + categoryName;
          }
        }
      } else if (op === "contains" || op === "contains_any" || op === "starts") {
        words = categoryName.trim().split(/\b/);
        if (words) {
          categoryName = words[0].toUpperCase();
          if (categoryName.length > 1) {
            categoryName = categoryName.charAt(0) + categoryName.substr(1).toLowerCase();
          }
        }
      } else {
        named = Flow.opNames[op];
        if (named) {
          categoryName = named + categoryName;
        }
      }
      return categoryName.substr(0, 36);
    };
    stopWatching = $scope.$watch((function() {
      return $scope.ruleset;
    }), function() {
      var complete, len4, m, ref4;
      complete = true;
      ref4 = $scope.ruleset.rules;
      for (m = 0, len4 = ref4.length; m < len4; m++) {
        rule = ref4[m];
        if (!rule._config.operands === 0) {
          if (!rule.category || !rule.category._base) {
            complete = false;
            break;
          }
        } else if (rule._config.operands === 1) {
          if (!rule.category || !rule.category._base || !rule.test._base) {
            complete = false;
            break;
          }
        } else if (rule._config.operands === 2) {
          if (!rule.category || !rule.category._base || !rule.test.min || !rule.test.min) {
            complete = false;
            break;
          }
        }
      }
      if (complete) {
        return $scope.ruleset.rules.splice($scope.ruleset.rules.length - 1, 0, {
          uuid: uuid(),
          test: {
            type: window.ivr ? "starts" : "contains_any"
          },
          category: {
            _autoName: true,
            _base: ''
          },
          _config: window.ivr ? Flow.getOperatorConfig('starts') : Flow.getOperatorConfig('contains_any')
        });
      }
    }, true);
    $scope.updateRules = function(ruleset, rulesetConfig) {
      var allCategory, category, destination, len4, len5, len6, m, n, o, option, ref4, ref5, ref6, ref7, ruleId, rules;
      rules = [];
      if (ruleset.ruleset_type === 'wait_digit') {
        ref4 = $scope.numbers;
        for (m = 0, len4 = ref4.length; m < len4; m++) {
          option = ref4[m];
          if (option.category && option.category._base) {
            rule = {
              uuid: option.uuid,
              destination: option.destination,
              category: option.category,
              test: {
                type: 'eq',
                test: option.number
              }
            };
            rule.category[flow.base_language] = option.category._base;
            rules.push(rule);
          }
        }
      }
      if ($scope.hasRules()) {
        ref5 = ruleset.rules;
        for (n = 0, len5 = ref5.length; n < len5; n++) {
          rule = ref5[n];
          if (rule._config.type === "true") {
            continue;
          }
          if ((!rule.category || !rule.category._base) && rule._config.type === 'between' && rule.test.min && rule.test.max) {
            rule.category = {
              _base: rule.test.min + " - " + rule.test.max
            };
          }
          if (!rule.category || (rule.category._base.strip().length === 0)) {
            continue;
          }
          rule.test.type = rule._config.type;
          if ((ref6 = rule._config.type) === "date_before" || ref6 === "date_after" || ref6 === "date_equal") {
            rule.test.test = "@(date.today + " + rule.test._base + ")";
          } else {
            if (rule._config.localized) {
              if (!rule.test.test) {
                rule.test.test = {};
              }
              rule.test.test[flow.base_language] = rule.test._base;
            } else {
              rule.test.test = rule.test._base;
            }
          }
          rule.category[flow.base_language] = rule.category._base;
          if (rule.category) {
            rules.push(rule);
          }
        }
      }
      allCategory = "All Responses";
      if (rules.length > 0) {
        allCategory = "Other";
      }
      ruleId = uuid();
      destination = null;
      ref7 = ruleset.rules;
      for (o = 0, len6 = ref7.length; o < len6; o++) {
        rule = ref7[o];
        if (rule._config.type === 'true') {
          destination = rule.destination;
          category = rule.category;
          ruleId = rule.uuid;
          break;
        }
      }
      if (!category) {
        category = {};
      }
      category[flow.base_language] = allCategory;
      rules.push({
        _config: Flow.getOperatorConfig("true"),
        test: {
          test: "true",
          type: "true"
        },
        destination: destination,
        uuid: ruleId,
        category: category
      });
      return $scope.ruleset.rules = rules;
    };
    $scope.okRules = function() {
      stopWatching();
      $modalInstance.close("");
      return $timeout(function() {
        var connections, contactField, flowField, len4, m, ref4, rulesetConfig;
        ruleset = $scope.ruleset;
        rulesetConfig = $scope.formData.rulesetConfig;
        contactField = $scope.formData.contactField;
        flowField = $scope.formData.flowField;
        ruleset.ruleset_type = rulesetConfig.type;
        if (rulesetConfig.type === 'form_field') {
          ruleset.operand = '@flow.' + flowField.id;
          ruleset.config = {
            field_index: $scope.formData.fieldIndex.id,
            field_delimiter: $scope.formData.fieldDelimiter.id
          };
        } else if (ruleset.ruleset_type === 'contact_field') {
          ruleset.operand = '@contact.' + contactField.id;
        } else if (ruleset.ruleset_type === 'flow_field') {
          ruleset.operand = '@flow.' + flowField.id;
        } else if (ruleset.ruleset_type === 'wait_message') {
          ruleset.operand = '@step.value';
        }
        if (ruleset.ruleset_type !== 'webhook') {
          ruleset.webhook = null;
          ruleset.webhook_action = null;
        }
        $scope.updateRules(ruleset, rulesetConfig);
        Plumb.disconnectRules($scope.removed);
        connections = Plumb.getConnectionMap({
          target: actionset.uuid
        });
        if (ruleset._switchedFromAction) {
          Flow.removeActionSet($scope.actionset);
        }
        Flow.replaceRuleset(ruleset, false);
        ref4 = ruleset.rules;
        for (m = 0, len4 = ref4.length; m < len4; m++) {
          rule = ref4[m];
          if (rule.destination && !Flow.isConnectionAllowed(ruleset.uuid + '_' + rule.uuid, rule.destination)) {
            Flow.updateDestination($scope.ruleset.uuid + '_' + rule.uuid, null);
          }
        }
        if (ruleset._switchedFromAction) {
          $timeout(function() {
            var results, ruleset_uuid, source;
            ruleset_uuid = ruleset.uuid;
            results = [];
            for (source in connections) {
              if (Flow.isConnectionAllowed(source, ruleset_uuid)) {
                results.push(Flow.updateDestination(source, ruleset_uuid));
              } else {
                results.push(void 0);
              }
            }
            return results;
          }, 0);
        }
        if ($scope.options.dragSource) {
          if (Flow.isConnectionAllowed($scope.options.dragSource, ruleset.uuid)) {
            Flow.updateDestination($scope.options.dragSource, ruleset.uuid);
          }
        }
        return Flow.markDirty();
      }, 0);
    };
    $scope.cancel = function() {
      stopWatching();
      return $modalInstance.dismiss("cancel");
    };
    $scope.action = utils.clone(action);
    $scope.actionset = actionset;
    $scope.flowId = window.flowId;
    startsFlow = false;
    ref4 = actionset.actions;
    for (m = 0, len4 = ref4.length; m < len4; m++) {
      action = ref4[m];
      if (action.type === 'flow' && $scope.action.uuid !== action.uuid) {
        startsFlow = true;
        break;
      }
    }
    $scope.base_language = Flow.flow.base_language;
    if (!$scope.action.lang) {
      $scope.action.lang = Flow.base_language;
    }
    $scope.methods = ['GET', 'POST'];
    if (!$scope.action.action) {
      $scope.action.action = 'GET';
    }
    $scope.config = Flow.getActionConfig({
      type: $scope.action.type
    });
    $scope.validActionFilter = function(action) {
      var ref5, valid;
      valid = false;
      if (action.filter) {
        valid = (ref5 = flow.flow_type, indexOf.call(action.filter, ref5) >= 0);
      }
      if (startsFlow && action.type === 'flow') {
        return false;
      }
      return valid;
    };
    $scope.savePlay = function() {
      $scope.action.type = 'play';
      Flow.saveAction(actionset, $scope.action);
      return $modalInstance.close();
    };
    $scope.saveMessage = function(message, type) {
      if (type == null) {
        type = 'reply';
      }
      if (typeof $scope.action.msg !== "object") {
        $scope.action.msg = {};
      }
      $scope.action.msg[$scope.base_language] = message;
      $scope.action.type = type;
      Flow.saveAction(actionset, $scope.action);
      return $modalInstance.close();
    };
    $scope.saveSend = function(omnibox, message) {
      $scope.action.groups = omnibox.groups;
      $scope.action.contacts = omnibox.contacts;
      $scope.action.variables = omnibox.variables;
      $scope.action.type = 'send';
      if (typeof $scope.action.msg !== "object") {
        $scope.action.msg = {};
      }
      $scope.action.msg[$scope.base_language] = message;
      Flow.saveAction(actionset, $scope.action);
      return $modalInstance.close();
    };
    $scope.saveLabels = function(msgLabels) {
      var label, labels, len5, len6, msgLabel, n, o, ref5;
      labels = [];
      for (n = 0, len5 = msgLabels.length; n < len5; n++) {
        msgLabel = msgLabels[n];
        found = false;
        ref5 = Flow.labels;
        for (o = 0, len6 = ref5.length; o < len6; o++) {
          label = ref5[o];
          if (label.id === msgLabel) {
            found = true;
            labels.push({
              id: label.id,
              name: label.text
            });
          }
        }
        if (!found) {
          labels.push({
            id: msgLabel.id,
            name: msgLabel.text
          });
        }
      }
      $scope.action.labels = labels;
      $scope.action.type = 'add_label';
      Flow.saveAction(actionset, $scope.action);
      return $modalInstance.close();
    };
    $scope.saveGroups = function(actionType, omnibox) {
      var len5, n, ref5, variable;
      $scope.action.type = actionType;
      $scope.action.groups = omnibox.groups;
      ref5 = omnibox.variables;
      for (n = 0, len5 = ref5.length; n < len5; n++) {
        variable = ref5[n];
        $scope.action.groups.push(variable.id);
      }
      Flow.saveAction(actionset, $scope.action);
      return $modalInstance.close();
    };
    $scope.saveUpdateContact = function(field, value) {
      if (field.id.indexOf('[_NEW_]') === 0 && field.text.indexOf("Add new variable:") === 0) {
        field.text = field.text.slice(18);
        field.id = field.id.slice(7);
        field.id = field.id.toLowerCase().replace(/[^0-9a-z]+/gi, ' ').strip().replace(/[^0-9a-z]+/gi, '_');
        Flow.contactFieldSearch.push({
          id: field.id,
          text: field.text
        });
      }
      $scope.action.type = 'save';
      $scope.action.field = field.id;
      $scope.action.label = field.text;
      $scope.action.value = value;
      Flow.saveAction(actionset, $scope.action);
      return $modalInstance.close();
    };
    $scope.saveWebhook = function(method, url) {
      $scope.action.type = 'api';
      $scope.action.action = method;
      $scope.action.webhook = url;
      Flow.saveAction(actionset, $scope.action);
      return $modalInstance.close();
    };
    $scope.saveEmail = function(addresses) {
      var address, len5, n, to;
      to = [];
      for (n = 0, len5 = addresses.length; n < len5; n++) {
        address = addresses[n];
        to.push(address.text);
      }
      $scope.action.emails = to;
      $scope.action.type = 'email';
      Flow.saveAction(actionset, $scope.action);
      return $modalInstance.close();
    };
    $scope.saveStartFlow = function(flow, omnibox) {
      if (omnibox) {
        $scope.action.type = 'trigger-flow';
        $scope.action.groups = omnibox.groups;
        $scope.action.contacts = omnibox.contacts;
        $scope.action.variables = omnibox.variables;
      } else {
        $scope.action.type = 'flow';
      }
      flow = flow[0];
      $scope.action.id = flow.id;
      $scope.action.name = flow.text;
      Flow.saveAction(actionset, $scope.action);
      return $modalInstance.close();
    };
    $scope.saveLanguage = function() {
      var len5, n, ref5;
      $scope.action.type = 'lang';
      ref5 = Flow.languages;
      for (n = 0, len5 = ref5.length; n < len5; n++) {
        lang = ref5[n];
        if (lang.iso_code === $scope.action.lang) {
          $scope.action.name = lang.name;
          break;
        }
      }
      Flow.saveAction(actionset, $scope.action);
      return $modalInstance.close();
    };
    $scope.ok = function() {
      var connections;
      $timeout(function() {
        $('.submit').click();
        if (options.dragSource) {
          return Flow.updateDestination(options.dragSource, actionset.uuid);
        }
      }, 0);
      if (actionset._switchedFromRule) {
        connections = Plumb.getConnectionMap({
          target: $scope.ruleset.uuid
        });
        Flow.removeRuleset($scope.ruleset);
        return $timeout(function() {
          var results, source;
          results = [];
          for (source in connections) {
            if (source.split('_').length > 1) {
              results.push(Flow.updateDestination(source, actionset.uuid));
            } else {
              results.push(Flow.updateDestination(source, null));
            }
          }
          return results;
        }, 0);
      }
    };
    $scope.cancel = function() {
      return $modalInstance.dismiss("cancel");
    };
    return $scope.formData = formData;
  };

  SimpleMessageController = function($scope, $modalInstance, $log, title, body, okButton, hideCancel) {
    if (hideCancel == null) {
      hideCancel = true;
    }
    $scope.title = title;
    $scope.body = body;
    $scope.okButton = okButton;
    $scope.hideCancel = hideCancel;
    $scope.ok = function() {
      return $modalInstance.close("ok");
    };
    $scope.cancel = function() {
      return $modalInstance.close("cancel");
    };
  };

  TerminalWarningController = function($scope, $modalInstance, $log, actionset, flowController) {
    var action, i, len, ref, startsFlow;
    $scope.title = "End of Flow";
    $scope.body = "You must first add a response to this branch in order to extend it.";
    $scope.okButton = "Add Response";
    startsFlow = false;
    ref = actionset.actions;
    for (i = 0, len = ref.length; i < len; i++) {
      action = ref[i];
      if (action.type === 'flow') {
        startsFlow = true;
        break;
      }
    }
    if (startsFlow) {
      $scope.body = "Once another flow is started, this flow can no longer continue. To extend this flow, remove any actions that start another flow.";
      $scope.okButton = "Ok";
    }
    $scope.ok = function() {
      $modalInstance.close("ok");
      if (!startsFlow) {
        return flowController.addAction(actionset);
      }
    };
    return $scope.cancel = function() {
      return $modalInstance.dismiss("cancel");
    };
  };

}).call(this);
