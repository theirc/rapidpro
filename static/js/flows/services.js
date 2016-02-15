(function() {
  var ModalController, app, errorRetries, quietPeriod, version,
    slice = [].slice,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  app = angular.module('temba.services', []);

  version = new Date().getTime();

  quietPeriod = 500;

  errorRetries = 10;

  app.service("utils", function() {
    var isScope, isWindow, toJsonReplacer;
    isWindow = function(obj) {
      return obj && obj.document && obj.location && obj.alert && obj.setInterval;
    };
    isScope = function(obj) {
      return obj && obj.$evalAsync && obj.$watch;
    };
    toJsonReplacer = function(key, value) {
      var val;
      val = value;
      if (typeof key === "string" && (key.charAt(0) === "$" || key.charAt(0) === "_")) {
        val = void 0;
      } else if (isWindow(value)) {
        val = "$WINDOW";
      } else if (value && document === value) {
        val = "$DOCUMENT";
      } else if (isScope(value)) {
        val = "$SCOPE";
      }
      return val;
    };
    return {
      toJson: function(obj, pretty) {
        if (typeof obj === 'undefined') {
          return void 0;
        }
        return JSON.stringify(obj, toJsonReplacer, pretty != null ? pretty : {
          '  ': null
        });
      },
      clone: function(obj) {
        var flags, key, newInstance;
        if ((obj == null) || typeof obj !== 'object') {
          return obj;
        }
        if (obj instanceof Date) {
          return new Date(obj.getTime());
        }
        if (obj instanceof RegExp) {
          flags = '';
          if (obj.global != null) {
            flags += 'g';
          }
          if (obj.ignoreCase != null) {
            flags += 'i';
          }
          if (obj.multiline != null) {
            flags += 'm';
          }
          if (obj.sticky != null) {
            flags += 'y';
          }
          return new RegExp(obj.source, flags);
        }
        newInstance = new obj.constructor();
        for (key in obj) {
          newInstance[key] = this.clone(obj[key]);
        }
        return newInstance;
      },
      checkCollisions: function(ele) {
        var collision, i, len, node, nodes;
        nodes = ele.parent().children('.node');
        collision = false;
        for (i = 0, len = nodes.length; i < len; i++) {
          node = nodes[i];
          if (node !== ele[0]) {
            if (this.collides($(node), ele)) {
              collision = true;
              break;
            }
          }
        }
        if (collision) {
          return ele.addClass("collision");
        } else {
          return ele.removeClass("collision");
        }
      },
      collides: function(a, b) {
        var aBox, aOffset, bBox, bOffset;
        aOffset = a.offset();
        bOffset = b.offset();
        aBox = {
          left: aOffset.left,
          top: aOffset.top,
          bottom: a.outerHeight() + aOffset.top,
          right: a.outerWidth() + aOffset.left
        };
        bBox = {
          left: bOffset.left,
          top: bOffset.top,
          bottom: b.outerHeight() + bOffset.top,
          right: b.outerWidth() + bOffset.left
        };
        if (aBox.bottom < bBox.top) {
          return false;
        }
        if (aBox.top > bBox.bottom) {
          return false;
        }
        if (aBox.left > bBox.right) {
          return false;
        }
        if (aBox.right < bBox.left) {
          return false;
        }
        return true;
      }
    };
  });

  app.service('DragHelper', [
    '$rootScope', '$timeout', '$log', function($rootScope, $timeout, $log) {
      return {
        show: function(source, message) {
          var helpText, helper, sourceOffset;
          sourceOffset = source.offset();
          helper = $('#drag-helper');
          helpText = helper.find('.help-text');
          helper.css('opacity', 0);
          helpText.css('opacity', 0).css('left', -10);
          helper.show();
          if (message) {
            helper.find('.help-text').html(message);
          }
          helper.offset({
            left: sourceOffset.left - 8,
            top: sourceOffset.top - 20
          });
          return helper.animate({
            top: sourceOffset.top + 14,
            opacity: 1
          }, {
            complete: function() {
              return helper.find('.help-text').animate({
                left: 30,
                opacity: 1
              }, {
                duration: 200,
                complete: function() {
                  if ($rootScope.dragHelperId) {
                    $timeout.cancel($rootScope.dragHelperId);
                    $rootScope.dragHelperId = void 0;
                  }
                  return $rootScope.dragHelperId = $timeout(function() {
                    return helper.fadeOut();
                  }, 20000);
                }
              });
            }
          });
        },
        showSaveResponse: function(source) {
          return this.show(source, 'To save responses to this message <span class="attn">drag</span> the red box');
        },
        showSendReply: function(source) {
          return this.show(source, 'To send back a reply <span class="attn">drag</span> the red box');
        },
        hide: function() {
          $('#drag-helper').fadeOut();
          if ($rootScope.dragHelperId) {
            $timeout.cancel($rootScope.dragHelperId);
            return $rootScope.dragHelperId = void 0;
          }
        }
      };
    }
  ]);

  app.service("Plumb", [
    "$timeout", "$rootScope", "$log", function($timeout, $rootScope, $log) {
      var sourceDefaults, targetDefaults;
      jsPlumb.setSuspendDrawing(true);
      $('#flow').css('visibility', 'hidden');
      $timeout(function() {
        $('#flow').css('visibility', 'visible');
        jsPlumb.setSuspendDrawing(false);
        return jsPlumb.repaintEverything();
      }, 500);
      jsPlumb.importDefaults({
        DragOptions: {
          cursor: 'pointer',
          zIndex: 2000
        },
        DropOptions: {
          tolerance: "touch",
          hoverClass: "drop-hover"
        },
        Endpoint: "Blank",
        EndpointStyle: {
          strokeStyle: "transparent"
        },
        PaintStyle: {
          lineWidth: 5,
          strokeStyle: "#98C0D9"
        },
        HoverPaintStyle: {
          strokeStyle: "#27ae60"
        },
        HoverClass: "connector-hover",
        ConnectionsDetachable: window.mutable,
        Connector: [
          "Flowchart", {
            stub: 12,
            midpoint: .85,
            alwaysRespectStubs: false,
            gap: [0, 7],
            cornerRadius: 2
          }
        ],
        ConnectionOverlays: [
          [
            "PlainArrow", {
              location: .9999,
              width: 12,
              length: 12,
              foldback: 1
            }
          ]
        ],
        Container: "flow"
      });
      targetDefaults = {
        anchor: [
          "Continuous", {
            faces: ["top", "left", "right"]
          }
        ],
        endpoint: [
          "Rectangle", {
            width: 20,
            height: 20,
            hoverClass: 'endpoint-hover'
          }
        ],
        hoverClass: 'target-hover',
        dropOptions: {
          tolerance: "touch",
          hoverClass: "drop-hover"
        },
        dragAllowedWhenFull: false,
        deleteEndpointsOnDetach: true,
        isTarget: true
      };
      sourceDefaults = {
        anchor: "BottomCenter",
        deleteEndpointsOnDetach: true,
        maxConnections: 1,
        dragAllowedWhenFull: false,
        isSource: true,
        paintStyle: {
          fillStyle: "blue",
          outlineColor: "black",
          outlineWidth: 1
        }
      };
      return {
        makeSource: function(sourceId, scope) {
          return $timeout(function() {
            return jsPlumb.makeSource(sourceId, angular.extend({
              scope: scope
            }, sourceDefaults));
          }, 0);
        },
        makeTarget: function(targetId, scope) {
          return $timeout(function() {
            return jsPlumb.makeTarget(targetId, angular.extend({
              scope: scope
            }, targetDefaults));
          }, 0);
        },
        getSourceConnection: function(source) {
          var connections;
          connections = jsPlumb.getConnections({
            source: source.attr('id'),
            scope: '*'
          });
          if (connections && connections.length > 0) {
            return connections[0];
          }
        },
        detachSingleConnection: function(connection) {
          return jsPlumb.detach(connection);
        },
        recalculateOffsets: function(nodeId) {
          if (window.testing) {
            return;
          }
          return $timeout(function() {
            jsPlumb.revalidate(nodeId);
            jsPlumb.recalculateOffsets(nodeId);
            return jsPlumb.repaint(nodeId);
          }, 0);
        },
        removeElement: function(id) {
          return jsPlumb.remove(id);
        },
        disconnectAllConnections: function(id) {
          jsPlumb.select({
            target: id
          }).each(function(connection) {
            return jsPlumb.setSourceEnabled(connection.sourceId, true);
          });
          jsPlumb.detachAllConnections(id);
          return $('#' + id + ' .source').each(function() {
            id = $(this).attr('id');
            return jsPlumb.detachAllConnections(id);
          });
        },
        disconnectOutboundConnections: function(id) {
          jsPlumb.detachAllConnections(id);
          if (jsPlumb.isSource(id)) {
            return jsPlumb.setSourceEnabled(id, true);
          }
        },
        setSourceEnabled: function(source, enabled) {
          return jsPlumb.setSourceEnabled(source, enabled);
        },
        connect: function(sourceId, targetId, scope, fireEvent) {
          var Plumb, endpoint, existing, i, len, targetPoint;
          if (fireEvent == null) {
            fireEvent = true;
          }
          sourceId += '_source';
          Plumb = this;
          Plumb.disconnectOutboundConnections(sourceId);
          $('html').scope().plumb = Plumb;
          if (targetId != null) {
            existing = jsPlumb.getEndpoints(targetId);
            targetPoint = null;
            if (existing) {
              for (i = 0, len = existing.length; i < len; i++) {
                endpoint = existing[i];
                if (endpoint.connections.length === 0) {
                  targetPoint = existing[0];
                  break;
                }
              }
            }
            if (!targetPoint) {
              targetPoint = jsPlumb.addEndpoint(targetId, {
                scope: scope
              }, targetDefaults);
            }
            if (jsPlumb.getConnections({
              source: sourceId,
              scope: scope
            }).length === 0) {
              if (jsPlumb.isSource(sourceId)) {
                Plumb.setSourceEnabled(sourceId, true);
              }
              jsPlumb.connect({
                maxConnections: 1,
                dragAllowedWhenFull: false,
                deleteEndpointsOnDetach: true,
                editable: false,
                source: sourceId,
                target: targetPoint,
                fireEvent: fireEvent
              });
              return $timeout(function() {
                Plumb.setSourceEnabled(sourceId, false);
                return Plumb.repaint(sourceId);
              }, 0);
            }
          }
        },
        updateConnection: function(actionset) {
          var Plumb;
          Plumb = this;
          return $timeout(function() {
            Plumb.disconnectOutboundConnections(actionset.uuid + '_source');
            if (actionset.destination) {
              Plumb.connect(actionset.uuid, actionset.destination, 'rules');
            }
            return Plumb.recalculateOffsets(actionset.uuid);
          }, 0);
        },
        updateConnections: function(ruleset) {
          var Plumb;
          Plumb = this;
          return $timeout(function() {
            var category, i, len, ref;
            ref = ruleset._categories;
            for (i = 0, len = ref.length; i < len; i++) {
              category = ref[i];
              Plumb.connect(ruleset.uuid + '_' + category.source, category.target, 'actions');
            }
            return Plumb.recalculateOffsets(ruleset.uuid);
          }, 0);
        },
        setPageHeight: function() {
          return $("#flow").each(function() {
            var $this, pageHeight;
            pageHeight = 0;
            $this = $(this);
            $.each($this.children(), function() {
              var bottom, child;
              child = $(this);
              bottom = child.offset().top + child.height();
              if (bottom > pageHeight) {
                return pageHeight = bottom + 500;
              }
            });
            return $this.height(pageHeight);
          });
        },
        repaint: function(element) {
          var service;
          if (element == null) {
            element = null;
          }
          if (!window.loaded) {
            return;
          }
          service = this;
          return $timeout(function() {
            if (element) {
              jsPlumb.repaint(element);
            } else {
              jsPlumb.repaintEverything();
            }
            return service.setPageHeight();
          }, 0);
        },
        disconnectRules: function(rules) {
          var i, len, results, rule;
          results = [];
          for (i = 0, len = rules.length; i < len; i++) {
            rule = rules[i];
            results.push(jsPlumb.remove(rule.uuid + '_source'));
          }
          return results;
        },
        getConnectionMap: function(selector) {
          var connections;
          if (selector == null) {
            selector = {};
          }
          connections = {};
          jsPlumb.select(selector).each(function(connection) {
            var source;
            if (connection.targetId && connection.targetId.length > 24) {
              source = connection.sourceId.substr(0, connection.sourceId.lastIndexOf('_'));
              return connections[source] = connection.targetId;
            }
          });
          return connections;
        }
      };
    }
  ]);

  app.factory("Revisions", [
    '$http', '$log', function($http, $log) {
      var Revisions;
      return new (Revisions = (function() {
        function Revisions() {}

        Revisions.prototype.updateRevisions = function(flowId) {
          var _this;
          _this = this;
          return $http.get('/flow/revisions/' + flowId + '/').success(function(data, status, headers) {
            if (headers('content-type') === 'application/json') {
              return _this.revisions = data;
            }
          });
        };

        Revisions.prototype.getRevision = function(revision) {
          var _this;
          _this = this;
          return $http.get('/flow/revisions/' + flowId + '/?definition=' + revision.id).success(function(data, status, headers) {
            if (headers('content-type') === 'application/json') {
              return _this.definition = data;
            }
          });
        };

        return Revisions;

      })());
    }
  ]);

  app.factory('Flow', [
    '$rootScope', '$window', '$http', '$timeout', '$interval', '$log', '$modal', 'utils', 'Plumb', 'Revisions', 'DragHelper', function($rootScope, $window, $http, $timeout, $interval, $log, $modal, utils, Plumb, Revisions, DragHelper) {
      var Flow;
      return new (Flow = (function() {
        var ALL, SURVEY, TEXT, VOICE;

        TEXT = 'F';

        VOICE = 'V';

        SURVEY = 'S';

        ALL = [TEXT, VOICE, SURVEY];

        function Flow() {
          this.actions = [
            {
              type: 'say',
              name: 'Play Message',
              verbose_name: 'Play a message',
              icon: 'icon-bubble-3',
              message: true,
              filter: [VOICE]
            }, {
              type: 'play',
              name: 'Play Recording',
              verbose_name: 'Play a contact recording',
              icon: 'icon-mic',
              filter: [VOICE]
            }, {
              type: 'reply',
              name: 'Send Message',
              verbose_name: 'Send an SMS response',
              icon: 'icon-bubble-3',
              message: true,
              filter: ALL
            }, {
              type: 'send',
              name: 'Send Message',
              verbose_name: 'Send an SMS to somebody else',
              icon: 'icon-bubble-3',
              message: true,
              filter: [TEXT, VOICE]
            }, {
              type: 'add_label',
              name: 'Add Label',
              verbose_name: 'Add a label to a Message',
              icon: 'icon-tag',
              filter: ALL
            }, {
              type: 'save',
              name: 'Update Contact',
              verbose_name: 'Update the contact',
              icon: 'icon-user',
              filter: ALL
            }, {
              type: 'add_group',
              name: 'Add to Groups',
              verbose_name: 'Add contact to a group',
              icon: 'icon-users-2',
              groups: true,
              filter: ALL
            }, {
              type: 'del_group',
              name: 'Remove from Groups',
              verbose_name: 'Remove contact from a group',
              icon: 'icon-users-2',
              groups: true,
              filter: ALL
            }, {
              type: 'api',
              name: 'Webhook',
              verbose_name: 'Make a call to an external server',
              icon: 'icon-cloud-upload',
              filter: [TEXT, VOICE]
            }, {
              type: 'email',
              name: 'Send Email',
              verbose_name: 'Send an email',
              icon: 'icon-bubble-3',
              filter: [TEXT, VOICE]
            }, {
              type: 'lang',
              name: 'Set Language',
              verbose_name: 'Set language for contact',
              icon: 'icon-language',
              filter: ALL
            }, {
              type: 'flow',
              name: 'Start Another Flow',
              verbose_name: 'Start another flow',
              icon: 'icon-tree',
              flows: true,
              filter: [TEXT, VOICE]
            }, {
              type: 'trigger-flow',
              name: 'Start Someone in a Flow',
              verbose_name: 'Start someone else in a flow',
              icon: 'icon-tree',
              flows: true,
              filter: [TEXT, VOICE]
            }
          ];
          this.rulesets = [
            {
              type: 'wait_message',
              name: 'Wait for Response',
              verbose_name: 'Wait for response',
              split: 'message response',
              filter: [TEXT, SURVEY]
            }, {
              type: 'wait_recording',
              name: 'Get Recording',
              verbose_name: 'Wait for recording',
              filter: VOICE
            }, {
              type: 'wait_digit',
              name: 'Get Menu Selection',
              verbose_name: 'Wait for menu selection',
              filter: VOICE
            }, {
              type: 'wait_digits',
              name: 'Get Digits',
              verbose_name: 'Wait for multiple digits',
              split: 'digits',
              filter: VOICE
            }, {
              type: 'webhook',
              name: 'Call Webhook',
              verbose_name: 'Call webhook',
              split: 'webhook response',
              filter: [TEXT, VOICE]
            }, {
              type: 'flow_field',
              name: 'Split by Flow Field',
              verbose_name: 'Split by flow field',
              filter: ALL
            }, {
              type: 'contact_field',
              name: 'Split by Contact Field',
              verbose_name: 'Split by contact field',
              filter: ALL
            }, {
              type: 'expression',
              name: 'Split by Expression',
              verbose_name: 'Split by expression',
              filter: ALL
            }, {
              type: 'form_field',
              name: 'Split by Message Form',
              verbose_name: 'Split by message form',
              filter: ALL
            }
          ];
          this.supportsRules = ['wait_message', 'expression', 'flow_field', 'contact_field', 'wait_digits', 'form_field'];
          this.operators = [
            {
              type: 'contains_any',
              name: 'Contains any',
              verbose_name: 'has any of these words',
              operands: 1,
              localized: true
            }, {
              type: 'contains',
              name: 'Contains all',
              verbose_name: 'has all of the words',
              operands: 1,
              localized: true
            }, {
              type: 'not_empty',
              name: 'Not empty',
              verbose_name: 'is not empty',
              operands: 0,
              localized: true
            }, {
              type: 'starts',
              name: 'Starts with',
              verbose_name: 'starts with',
              operands: 1,
              voice: true,
              localized: true
            }, {
              type: 'number',
              name: 'Has a number',
              verbose_name: 'has a number',
              operands: 0,
              voice: true
            }, {
              type: 'lt',
              name: 'Less than',
              verbose_name: 'has a number less than',
              operands: 1,
              voice: true
            }, {
              type: 'eq',
              name: 'Equal to',
              verbose_name: 'has a number equal to',
              operands: 1,
              voice: true
            }, {
              type: 'gt',
              name: 'More than',
              verbose_name: 'has a number more than',
              operands: 1,
              voice: true
            }, {
              type: 'between',
              name: 'Number between',
              verbose_name: 'has a number between',
              operands: 2,
              voice: true
            }, {
              type: 'date',
              name: 'Has date',
              verbose_name: 'has a date',
              operands: 0,
              validate: 'date'
            }, {
              type: 'date_before',
              name: 'Date before',
              verbose_name: 'has a date before',
              operands: 1,
              validate: 'date'
            }, {
              type: 'date_equal',
              name: 'Date equal to',
              verbose_name: 'has a date equal to',
              operands: 1,
              validate: 'date'
            }, {
              type: 'date_after',
              name: 'Date after',
              verbose_name: 'has a date after',
              operands: 1,
              validate: 'date'
            }, {
              type: 'phone',
              name: 'Has a phone',
              verbose_name: 'has a phone number',
              operands: 0,
              voice: true
            }, {
              type: 'state',
              name: 'Has a state',
              verbose_name: 'has a state',
              operands: 0
            }, {
              type: 'district',
              name: 'Has a district',
              verbose_name: 'has a district',
              operands: 1,
              auto_complete: true,
              placeholder: '@flow.state'
            }, {
              type: 'regex',
              name: 'Regex',
              verbose_name: 'matches regex',
              operands: 1,
              voice: true,
              localized: true
            }, {
              type: 'true',
              name: 'Other',
              verbose_name: 'contains anything',
              operands: 0
            }
          ];
          this.opNames = {
            'lt': '< ',
            'gt': '> ',
            'eq': '',
            'between': '',
            'number': '',
            'starts': '',
            'contains': '',
            'contains_any': '',
            'date': '',
            'date_before': '',
            'date_equal': '',
            'date_after': '',
            'regex': ''
          };
        }

        $rootScope.errorDelay = quietPeriod;

        Flow.prototype.determineFlowStart = function() {
          var actionset, checkTop, i, j, len, len1, ref, ref1, ruleset, topNode;
          topNode = null;
          checkTop = function(node) {
            if (topNode === null || node.y < topNode.y) {
              return topNode = node;
            } else if (topNode === null || topNode.y === node.y) {
              if (node.x < topNode.x) {
                return topNode = node;
              }
            }
          };
          ref = this.flow.action_sets;
          for (i = 0, len = ref.length; i < len; i++) {
            actionset = ref[i];
            checkTop(actionset);
          }
          ref1 = this.flow.rule_sets;
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            ruleset = ref1[j];
            checkTop(ruleset);
          }
          if (topNode) {
            return this.flow.entry = topNode.uuid;
          }
        };

        Flow = Flow;

        $rootScope.$watch((function() {
          return Flow.dirty;
        }), function(current, prev) {
          var cancelled;
          if (current) {
            if (!window.mutable) {
              $rootScope.error = "Your changes cannot be saved. You don't have permission to edit this flow.";
              return;
            }
            Flow.dirty = false;
            Flow.determineFlowStart();
            if ($rootScope.saving) {
              cancelled = $timeout.cancel($rootScope.saving);
              if (!cancelled) {
                $timeout(function() {
                  return Flow.dirty = true;
                }, quietPeriod);
                return;
              }
            }
            return $rootScope.saving = $timeout(function() {
              $rootScope.error = null;
              $log.debug("Saving.");
              return $http.post('/flow/json/' + Flow.flowId + '/', utils.toJson(Flow.flow)).error(function(data, statusCode) {
                var modalInstance;
                if (statusCode === 400) {
                  $rootScope.saving = false;
                  if (UserVoice) {
                    UserVoice.push([
                      'set', 'ticket_custom_fields', {
                        'Error': data.description
                      }
                    ]);
                  }
                  modalInstance = $modal.open({
                    templateUrl: "/partials/modal?v=" + version,
                    controller: ModalController,
                    resolve: {
                      type: function() {
                        return "error";
                      },
                      title: function() {
                        return "Error Saving";
                      },
                      body: function() {
                        return "Sorry, but we were unable to save your flow. Please reload the page and try again, this may clear your latest changes.";
                      },
                      details: function() {
                        return data.description;
                      },
                      ok: function() {
                        return 'Reload';
                      }
                    }
                  });
                  modalInstance.result.then(function(reload) {
                    if (reload) {
                      return document.location.reload();
                    }
                  });
                  return;
                }
                $rootScope.errorDelay += quietPeriod;
                if ($rootScope.errorDelay < (quietPeriod * (errorRetries + 1))) {
                  $log.debug("Couldn't save changes, trying again in " + $rootScope.errorDelay);
                  return $timeout(function() {
                    $rootScope.saving = false;
                    return Flow.dirty = true;
                  }, $rootScope.errorDelay);
                } else {
                  $rootScope.saving = false;
                  $rootScope.error = "Your changes may not be saved. Please check your network connection.";
                  return $rootScope.errorDelay = quietPeriod;
                }
              }).success(function(data, statusCode) {
                var modalInstance;
                $rootScope.error = null;
                $rootScope.errorDelay = quietPeriod;
                if (data.status === 'unsaved') {
                  modalInstance = $modal.open({
                    templateUrl: "/partials/modal?v=" + version,
                    controller: ModalController,
                    resolve: {
                      type: function() {
                        return "error";
                      },
                      title: function() {
                        return "Editing Conflict";
                      },
                      body: function() {
                        return data.saved_by + " is currently editing this Flow. Your changes will not be saved until the Flow is reloaded.";
                      },
                      ok: function() {
                        return 'Reload';
                      }
                    }
                  });
                  modalInstance.result.then(function(reload) {
                    if (reload) {
                      return document.location.reload();
                    }
                  });
                } else {
                  Flow.flow.metadata.revision = data.revision;
                  Flow.flow.metadata.saved_on = data.saved_on;
                  $http.get('/flow/completion/?flow=' + Flow.flowId).success(function(data) {
                    Flow.completions = data.message_completions;
                    Flow.function_completions = data.function_completions;
                    return Flow.variables_and_functions = slice.call(Flow.completions).concat(slice.call(Flow.function_completions));
                  });
                  Revisions.updateRevisions(Flow.flowId);
                }
                return $rootScope.saving = null;
              });
            }, quietPeriod);
          }
        });

        Flow.prototype.getNode = function(uuid) {
          var actionset, i, j, len, len1, ref, ref1, ruleset;
          ref = this.flow.action_sets;
          for (i = 0, len = ref.length; i < len; i++) {
            actionset = ref[i];
            if (actionset.uuid === uuid) {
              return actionset;
            }
          }
          ref1 = this.flow.rule_sets;
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            ruleset = ref1[j];
            if (ruleset.uuid === uuid) {
              return ruleset;
            }
          }
        };

        Flow.prototype.isPausingRuleset = function(node) {
          var ref;
          if (!(node != null ? node.actions : void 0)) {
            return (ref = node.ruleset_type) === 'wait_message' || ref === 'wait_recording' || ref === 'wait_digit' || ref === 'wait_digits';
          }
          return false;
        };

        Flow.prototype.detectLoop = function(nodeId, targetId, path) {
          var i, len, node, ref, results, rule;
          if (path == null) {
            path = [];
          }
          if (nodeId === targetId) {
            throw new Error('Loop detected: ' + nodeId);
          }
          node = this.getNode(targetId);
          if (node && this.isPausingRuleset(node)) {
            return false;
          }
          if (indexOf.call(path, targetId) >= 0) {
            throw new Error('Loop detected: ' + path + ',' + targetId);
          }
          path = path.slice();
          path.push(targetId);
          if (node != null ? node.rules : void 0) {
            ref = node.rules;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              rule = ref[i];
              if (rule.destination) {
                results.push(this.detectLoop(node.uuid, rule.destination, path));
              } else {
                results.push(void 0);
              }
            }
            return results;
          } else {
            if (node != null ? node.destination : void 0) {
              return this.detectLoop(node.uuid, node.destination, path);
            }
          }
        };

        Flow.prototype.isConnectionAllowed = function(sourceId, targetId) {
          return this.getConnectionError(sourceId, targetId) === null;
        };

        Flow.prototype.getConnectionError = function(sourceId, targetId) {
          var e, path, source, sourceNode, targetNode;
          source = sourceId.split('_')[0];
          path = [source];
          sourceNode = this.getNode(source);
          targetNode = this.getNode(targetId);
          if (this.isPausingRuleset(sourceNode) && this.isPausingRuleset(targetNode)) {
            return 'The flow cannot wait for two consecutive responses from the contact. Instead, send them a message between waiting for a response.';
          }
          try {
            this.detectLoop(source, targetId, path);
          } catch (_error) {
            e = _error;
            $log.debug(e.message);
            return 'Connecting these together would create an infinite loop in your flow. To connect these, make sure to pass it through an action that waits for a response.';
          }
          return null;
        };

        Flow.prototype.slugify = function(label) {
          return label.toString().toLowerCase().replace(/([^a-z0-9]+)/g, '_');
        };

        Flow.prototype.getFlowFields = function(excludeRuleset) {
          var details, flowFields, i, id, label, len, ref, result, ruleset, uuid;
          flowFields = {};
          if (this.flow) {
            ref = this.flow.rule_sets;
            for (i = 0, len = ref.length; i < len; i++) {
              ruleset = ref[i];
              flowFields[this.slugify(ruleset.label)] = [ruleset.uuid, ruleset.label];
            }
          }
          result = [];
          for (id in flowFields) {
            details = flowFields[id];
            uuid = details[0];
            label = details[1];
            if (uuid !== (excludeRuleset != null ? excludeRuleset.uuid : void 0)) {
              result.push({
                id: id,
                text: label
              });
            }
          }
          return result;
        };

        Flow.prototype.getFieldSelection = function(fields, operand, isFlowFields) {
          var field, i, isContact, isFlow, len, slugged;
          isFlow = false;
          isContact = false;
          if (operand) {
            if (operand.length > 6 && operand.slice(0, 5) === '@flow') {
              isFlow = true;
              operand = operand.slice(6);
            } else if (operand.length > 9 && operand.slice(0, 8) === '@contact') {
              isContact = true;
              operand = operand.slice(9);
            }
          }
          for (i = 0, len = fields.length; i < len; i++) {
            field = fields[i];
            if (field.id === operand) {
              return field;
            }
          }
          if (operand && ((isFlow && isFlowFields) || (isContact && !isFlowFields))) {
            slugged = Flow.slugify(operand);
            field = {
              id: operand,
              text: slugged + ' (missing)',
              missing: true
            };
            fields.push(field);
            return field;
          }
          return fields[0];
        };

        Flow.prototype.getContactField = function(ruleset) {
          if (Flow.contactFieldSearch) {
            return this.getFieldSelection(Flow.contactFieldSearch, ruleset.operand, false);
          }
        };

        Flow.prototype.getFlowField = function(ruleset) {
          var fields;
          fields = Flow.getFlowFields(ruleset);
          return this.getFieldSelection(fields, ruleset.operand, true);
        };

        Flow.prototype.applyActivity = function(node, activity) {
          var category, count, i, j, key, len, len1, ref, ref1, source;
          count = 0;
          if (activity && activity.active && node.uuid in activity.active) {
            count = activity.active[node.uuid];
          }
          node._active = count;
          if (node._categories) {
            ref = node._categories;
            for (i = 0, len = ref.length; i < len; i++) {
              category = ref[i];
              count = 0;
              if (activity && activity.visited) {
                ref1 = category.sources;
                for (j = 0, len1 = ref1.length; j < len1; j++) {
                  source = ref1[j];
                  key = source + ':' + category.target;
                  if (key in activity.visited) {
                    count += activity.visited[key];
                  }
                }
              }
              category._visited = count;
            }
          } else {
            key = node.uuid + ':' + node.destination;
            count = 0;
            if (activity && activity.visited && key in activity.visited) {
              count += activity.visited[key];
            }
            node._visited = count;
          }
        };

        Flow.prototype.deriveCategories = function(ruleset, base_language) {
          var cat, categories, category, existing, i, j, k, len, len1, len2, name, ref, rule, rule_cat;
          categories = [];
          ref = ruleset.rules;
          for (i = 0, len = ref.length; i < len; i++) {
            rule = ref[i];
            if (!rule.uuid) {
              rule.uuid = uuid();
            }
            if (rule.test.type === "between") {
              if (!rule.category) {
                rule.category = {
                  base_language: rule.test.min + "-" + rule.test.max
                };
              }
            }
            if (rule.category) {
              rule_cat = rule.category[base_language].toLocaleLowerCase();
              existing = (function() {
                var j, len1, results;
                results = [];
                for (j = 0, len1 = categories.length; j < len1; j++) {
                  category = categories[j];
                  results.push(category.name[base_language].toLocaleLowerCase());
                }
                return results;
              })();
              if (rule.test.type === 'true' || indexOf.call(existing, rule_cat) < 0) {
                categories.push({
                  name: rule.category,
                  sources: [rule.uuid],
                  target: rule.destination,
                  type: rule.test.type
                });
              } else {
                for (j = 0, len1 = categories.length; j < len1; j++) {
                  cat = categories[j];
                  name = cat.name;
                  if (base_language in cat.name) {
                    name = cat.name[base_language];
                  }
                  if ((name != null ? name.toLocaleLowerCase() : void 0) === (rule_cat != null ? rule_cat.toLocaleLowerCase() : void 0)) {
                    cat.sources.push(rule.uuid);
                    if (cat.target) {
                      rule.destination = cat.target;
                    }
                  }
                }
              }
            }
          }
          for (k = 0, len2 = categories.length; k < len2; k++) {
            cat = categories[k];
            cat.source = cat.sources[0];
          }
          ruleset._categories = categories;
          this.applyActivity(ruleset, $rootScope.visibleActivity);
        };

        Flow.prototype.markDirty = function() {
          Flow = this;
          return $timeout(function() {
            return Flow.dirty = true;
          }, 0);
        };

        Flow.prototype.updateDestination = function(source, target) {
          var actionset, category, i, j, k, l, len, len1, len2, len3, ref, ref1, ref2, ref3, ref4, results, results1, rule, ruleset;
          source = source.split('_');
          if (source.length > 1 && source[source.length - 1] === 'source') {
            source.pop();
          }
          if (source.length > 1) {
            ref = Flow.flow.rule_sets;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              ruleset = ref[i];
              if (ruleset.uuid === source[0]) {
                if (ruleset._categories) {
                  ref1 = ruleset._categories;
                  for (j = 0, len1 = ref1.length; j < len1; j++) {
                    category = ref1[j];
                    if (category.source === source[1]) {
                      category.target = target;
                      ref2 = ruleset.rules;
                      for (k = 0, len2 = ref2.length; k < len2; k++) {
                        rule = ref2[k];
                        if (ref3 = rule.uuid, indexOf.call(category.sources, ref3) >= 0) {
                          rule.destination = target;
                        }
                      }
                      break;
                    }
                  }
                }
                Plumb.updateConnections(ruleset);
                break;
              } else {
                results.push(void 0);
              }
            }
            return results;
          } else {
            ref4 = Flow.flow.action_sets;
            results1 = [];
            for (l = 0, len3 = ref4.length; l < len3; l++) {
              actionset = ref4[l];
              if (actionset.uuid === source[0]) {
                actionset.destination = target;
                Plumb.updateConnection(actionset);
                this.applyActivity(actionset, $rootScope.activity);
                break;
              } else {
                results1.push(void 0);
              }
            }
            return results1;
          }
        };

        Flow.prototype.getActionConfig = function(action) {
          var cfg, i, len, ref;
          ref = this.actions;
          for (i = 0, len = ref.length; i < len; i++) {
            cfg = ref[i];
            if (cfg.type === action.type) {
              return cfg;
            }
          }
        };

        Flow.prototype.getRulesetConfig = function(ruleset) {
          var cfg, i, len, ref;
          ref = this.rulesets;
          for (i = 0, len = ref.length; i < len; i++) {
            cfg = ref[i];
            if (cfg.type === ruleset.type) {
              return cfg;
            }
          }
        };

        Flow.prototype.getOperatorConfig = function(operatorType) {
          var cfg, i, len, ref;
          ref = this.operators;
          for (i = 0, len = ref.length; i < len; i++) {
            cfg = ref[i];
            if (cfg.type === operatorType) {
              return cfg;
            }
          }
        };

        Flow.prototype.fetchRecentMessages = function(step, connectionTo, connectionFrom) {
          if (connectionFrom == null) {
            connectionFrom = '';
          }
          return $http.get('/flow/recent_messages/' + Flow.flowId + '/?step=' + step + '&destination=' + connectionTo + '&rule=' + connectionFrom).success(function(data) {});
        };

        Flow.prototype.fetch = function(flowId, onComplete) {
          if (onComplete == null) {
            onComplete = null;
          }
          this.flowId = flowId;
          Revisions.updateRevisions(flowId);
          Flow = this;
          return $http.get('/flow/json/' + flowId + '/').success(function(data) {
            var action, actionset, flow, i, j, k, l, lang, languages, len, len1, len2, len3, ref, ref1, ref2, ref3, ref4;
            flow = data.flow;
            flow.type = window.flow_type;
            ref = flow.action_sets;
            for (i = 0, len = ref.length; i < len; i++) {
              actionset = ref[i];
              ref1 = actionset.actions;
              for (j = 0, len1 = ref1.length; j < len1; j++) {
                action = ref1[j];
                action.uuid = uuid();
              }
            }
            languages = [];
            ref2 = data.languages;
            for (k = 0, len2 = ref2.length; k < len2; k++) {
              lang = ref2[k];
              if (lang.iso_code === flow.base_language) {
                languages.push(lang);
                Flow.language = lang;
              }
            }
            ref3 = data.languages;
            for (l = 0, len3 = ref3.length; l < len3; l++) {
              lang = ref3[l];
              if (lang.iso_code !== flow.base_language) {
                languages.push(lang);
              }
            }
            if (!Flow.language && flow.base_language) {
              Flow.language = {
                iso_code: flow.base_language
              };
            }
            if (languages) {
              if (ref4 = flow.base_language, indexOf.call((function() {
                var len4, m, results;
                results = [];
                for (m = 0, len4 = languages.length; m < len4; m++) {
                  lang = languages[m];
                  results.push(lang.iso_code);
                }
                return results;
              })(), ref4) < 0) {
                languages.unshift({
                  iso_code: flow.base_language,
                  name: gettext('Default')
                });
              }
            }
            Flow.languages = languages;
            Flow.flow = flow;
            if (onComplete) {
              onComplete();
            }
            $http.get('/flow/completion/?flow=' + flowId).success(function(data) {
              Flow.completions = data.message_completions;
              Flow.function_completions = data.function_completions;
              return Flow.variables_and_functions = slice.call(Flow.completions).concat(slice.call(Flow.function_completions));
            });
            $http.get('/contactfield/json/').success(function(fields) {
              var contactFieldSearch, field, len4, m;
              Flow.contactFields = fields;
              contactFieldSearch = [];
              for (m = 0, len4 = fields.length; m < len4; m++) {
                field = fields[m];
                contactFieldSearch.push({
                  id: field.key,
                  text: field.label
                });
              }
              return Flow.contactFieldSearch = contactFieldSearch;
            });
            $http.get('/label/').success(function(labels) {
              return Flow.labels = labels;
            });
            return $timeout(function() {
              window.loaded = true;
              return Plumb.repaint();
            }, 0);
          });
        };

        Flow.prototype.replaceRuleset = function(ruleset, markDirty) {
          var found, i, idx, len, previous, ref;
          if (markDirty == null) {
            markDirty = true;
          }
          ruleset._flowFieldName = null;
          ruleset._contactFieldName = null;
          found = false;
          if (!ruleset.operand) {
            ruleset.operand = '@step.value';
          }
          ref = Flow.flow.rule_sets;
          for (idx = i = 0, len = ref.length; i < len; idx = ++i) {
            previous = ref[idx];
            if (ruleset.uuid === previous.uuid) {
              this.deriveCategories(ruleset, Flow.flow.base_language);
              Flow.flow.rule_sets.splice(idx, 1, ruleset);
              found = true;
              if (markDirty) {
                this.markDirty();
              }
              break;
            }
          }
          if (!found) {
            Flow.flow.rule_sets.push(ruleset);
            if (markDirty) {
              this.markDirty();
            }
          }
          Plumb.repaint();
        };

        Flow.prototype.updateTranslationStats = function() {
          var action, actionset, category, flow, i, items, j, k, l, len, len1, len2, len3, missing, ref, ref1, ref2, ref3, ref4, ruleset;
          if (this.language) {
            flow = this.flow;
            items = 0;
            missing = 0;
            ref = flow.action_sets;
            for (i = 0, len = ref.length; i < len; i++) {
              actionset = ref[i];
              ref1 = actionset.actions;
              for (j = 0, len1 = ref1.length; j < len1; j++) {
                action = ref1[j];
                if ((ref2 = action.type) === 'send' || ref2 === 'reply' || ref2 === 'say') {
                  items++;
                  if (action._missingTranslation) {
                    missing++;
                  }
                }
              }
            }
            ref3 = flow.rule_sets;
            for (k = 0, len2 = ref3.length; k < len2; k++) {
              ruleset = ref3[k];
              ref4 = ruleset._categories;
              for (l = 0, len3 = ref4.length; l < len3; l++) {
                category = ref4[l];
                items++;
                if (category._missingTranslation) {
                  missing++;
                }
              }
            }
            flow._pctTranslated = Math.floor(((items - missing) / items) * 100);
            flow._missingTranslation = items > 0;
            if (flow._pctTranslated === 100 && flow.base_language !== this.language.iso_code) {
              $rootScope.gearLinks = [
                {
                  title: 'Default Language',
                  id: 'default_language'
                }, {
                  id: 'divider'
                }
              ];
            } else {
              $rootScope.gearLinks = [];
            }
            return flow._pctTranslated;
          }
        };

        Flow.prototype.setMissingTranslation = function(missing) {
          return Flow.flow._missingTranslation = missing;
        };

        Flow.prototype.removeConnection = function(connection) {
          return this.updateDestination(connection.sourceId, null);
        };

        Flow.prototype.removeRuleset = function(ruleset) {
          var flow;
          DragHelper.hide();
          flow = Flow.flow;
          Flow = this;
          $timeout(function() {
            var connections, i, idx, len, ref, results, rs, source;
            connections = Plumb.getConnectionMap({
              target: ruleset.uuid
            });
            for (source in connections) {
              Flow.updateDestination(source, null);
            }
            ref = flow.rule_sets;
            results = [];
            for (idx = i = 0, len = ref.length; i < len; idx = ++i) {
              rs = ref[idx];
              if (rs.uuid === ruleset.uuid) {
                flow.rule_sets.splice(idx, 1);
                break;
              } else {
                results.push(void 0);
              }
            }
            return results;
          }, 0);
          return this.markDirty();
        };

        Flow.prototype.addNote = function(x, y) {
          if (!Flow.flow.metadata.notes) {
            Flow.flow.metadata.notes = [];
          }
          return Flow.flow.metadata.notes.push({
            x: x,
            y: y,
            title: 'New Note',
            body: '...'
          });
        };

        Flow.prototype.removeNote = function(note) {
          var idx;
          idx = Flow.flow.metadata.notes.indexOf(note);
          Flow.flow.metadata.notes.splice(idx, 1);
          return this.markDirty();
        };

        Flow.prototype.moveActionUp = function(actionset, action) {
          var idx;
          idx = actionset.actions.indexOf(action);
          actionset.actions.splice(idx, 1);
          actionset.actions.splice(idx - 1, 0, action);
          actionset._lastActionMissingTranslation = null;
          return this.markDirty();
        };

        Flow.prototype.removeActionSet = function(actionset) {
          var flow, service;
          flow = Flow.flow;
          service = this;
          return $timeout(function() {
            var as, connections, i, idx, len, ref, results, source;
            connections = Plumb.getConnectionMap({
              target: actionset.uuid
            });
            for (source in connections) {
              service.updateDestination(source, null);
            }
            ref = flow.action_sets;
            results = [];
            for (idx = i = 0, len = ref.length; i < len; idx = ++i) {
              as = ref[idx];
              if (as.uuid === actionset.uuid) {
                flow.action_sets.splice(idx, 1);
                break;
              } else {
                results.push(void 0);
              }
            }
            return results;
          }, 0);
        };

        Flow.prototype.removeAction = function(actionset, action) {
          var found, i, idx, len, previous, ref;
          DragHelper.hide();
          found = false;
          ref = actionset.actions;
          for (idx = i = 0, len = ref.length; i < len; idx = ++i) {
            previous = ref[idx];
            if (previous.uuid === action.uuid) {
              actionset.actions.splice(idx, 1);
              found = true;
              break;
            }
          }
          if (found) {
            if (actionset.actions.length === 0) {
              this.removeActionSet(actionset);
            } else {
              Plumb.recalculateOffsets(actionset.uuid);
            }
            this.checkTerminal(actionset);
            this.markDirty();
          }
        };

        Flow.prototype.checkTerminal = function(actionset) {
          var action, hasMessage, i, len, ref, startsFlow, terminal;
          hasMessage = false;
          startsFlow = false;
          ref = actionset.actions;
          for (i = 0, len = ref.length; i < len; i++) {
            action = ref[i];
            if (action.type === 'flow') {
              startsFlow = true;
            }
          }
          terminal = startsFlow;
          if (actionset._terminal !== terminal) {
            return actionset._terminal = terminal;
          }
        };

        Flow.prototype.isMoveableAction = function(action) {
          if (!action) {
            return true;
          }
          return action.type !== 'flow';
        };

        Flow.prototype.saveAction = function(actionset, action) {
          var as, found, i, idx, j, lastAction, len, len1, previous, ref, ref1;
          actionset._lastActionMissingTranslation = null;
          found = false;
          lastAction = null;
          ref = actionset.actions;
          for (idx = i = 0, len = ref.length; i < len; idx = ++i) {
            previous = ref[idx];
            lastAction = previous;
            if (previous.uuid === action.uuid) {
              if (!this.isMoveableAction(action)) {
                actionset.actions.splice(idx, 1);
                actionset.actions.push(action);
                found = true;
              } else {
                actionset.actions.splice(idx, 1, action);
                found = true;
              }
              break;
            }
          }
          if (!found) {
            action.uuid = uuid();
            if (!this.isMoveableAction(lastAction)) {
              actionset.actions.splice(actionset.actions.length - 1, 0, action);
            } else {
              actionset.actions.push(action);
            }
          }
          Plumb.recalculateOffsets(actionset.uuid);
          found = false;
          ref1 = Flow.flow.action_sets;
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            as = ref1[j];
            if (as.uuid === actionset.uuid) {
              found = true;
              break;
            }
          }
          if (!found) {
            Flow.flow.action_sets.push(actionset);
          }
          if (Flow.flow.action_sets.length === 1) {
            $timeout(function() {
              return DragHelper.showSaveResponse($('#' + Flow.flow.action_sets[0].uuid + ' .source'));
            }, 0);
          }
          this.checkTerminal(actionset);
          return this.markDirty();
        };

        return Flow;

      })());
    }
  ]);

  ModalController = function($scope, $modalInstance, type, title, body, details, ok) {
    if (details == null) {
      details = null;
    }
    if (ok == null) {
      ok = null;
    }
    $scope.type = type;
    $scope.title = title;
    $scope.body = body;
    $scope.error = error;
    $scope.details = details;
    if (ok) {
      $scope.okButton = ok;
      $scope.ok = function() {
        return $modalInstance.close(true);
      };
    } else {
      $scope.okButton = "Ok";
      $scope.ok = function() {
        return $modalInstance.dismiss("cancel");
      };
    }
    $scope.cancel = function() {
      return $modalInstance.dismiss("cancel");
    };
    return $scope.showHelpWidget = function() {
      if (UserVoice) {
        return UserVoice.push([
          'show', {
            mode: 'contact'
          }
        ]);
      }
    };
  };

}).call(this);
