(function() {
  var BoundaryController, app, fadeStyle, highlightStyle, visibleStyle,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  app = angular.module("locations", ["monospaced.elastic"]);

  app.filter('collapse', function() {
    return function(text) {
      if (text) {
        return text.replace(/\s*\n/g, ', ');
      }
      return '';
    };
  });

  app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol("[[");
    return $interpolateProvider.endSymbol("]]");
  });

  fadeStyle = function(feature) {
    return {
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.35,
      fillColor: "#2387ca"
    };
  };

  visibleStyle = function(feature) {
    return {
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7,
      fillColor: "#2387ca"
    };
  };

  highlightStyle = {
    weight: 3,
    color: "white",
    fillOpacity: 1,
    fillColor: "#2387ca"
  };

  app.directive("uniqueAlias", function() {
    return {
      restrict: "A",
      require: "ngModel",
      scope: {
        currentBoundary: '=',
        boundaries: '=',
        currentAliases: '='
      },
      link: function(scope, elem, attr, ngModel) {
        ngModel.$parsers.unshift(function(value) {
          var alias, boundary, child, i, j, k, l, len, len1, len2, len3, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, result, valid, values;
          valid = true;
          value = value.toLowerCase();
          values = value.split('\n');
          if (scope.currentBoundary) {
            ref = scope.boundaries;
            for (i = 0, len = ref.length; i < len; i++) {
              boundary = ref[i];
              if (!valid) {
                break;
              }
              if (boundary.osm_id !== scope.currentBoundary.osm_id) {
                if (ref1 = boundary.name.toLowerCase(), indexOf.call(values, ref1) >= 0) {
                  valid = false;
                }
                if (valid && boundary.aliases) {
                  ref2 = boundary.aliases.trim().split('\n');
                  for (j = 0, len1 = ref2.length; j < len1; j++) {
                    alias = ref2[j];
                    if (ref3 = alias.toLowerCase(), indexOf.call(values, ref3) >= 0) {
                      valid = false;
                    }
                  }
                }
                if (!valid) {
                  break;
                }
              }
              if (boundary.children != null) {
                ref4 = boundary.children;
                for (k = 0, len2 = ref4.length; k < len2; k++) {
                  child = ref4[k];
                  if (child.osm_id !== scope.currentBoundary.osm_id) {
                    if (ref5 = child.name.toLowerCase(), indexOf.call(values, ref5) >= 0) {
                      valid = false;
                    }
                    if (valid && child.aliases) {
                      ref6 = child.aliases.split('\n');
                      for (l = 0, len3 = ref6.length; l < len3; l++) {
                        alias = ref6[l];
                        if (ref7 = alias.toLowerCase(), indexOf.call(values, ref7) >= 0) {
                          valid = false;
                        }
                      }
                    }
                    if (!valid) {
                      break;
                    }
                  }
                }
              }
            }
          }
          ngModel.$setValidity("uniqueAlias", valid);
          result = valid ? value : void 0;
          return result;
        });
        ngModel.$formatters.unshift(function(value) {
          ngModel.$setValidity("uniqueAlias", true);
          return value;
        });
      }
    };
  });

  app.directive("leaflet", [
    "$http", function($http) {
      var link;
      link = function(scope, element, attrs) {
        var clickFeature, highlightFeature, loadState, onEachFeature, resetHighlight, resetStates;
        scope.layerMap = {};
        scope.safeApply = function(fn) {
          var phase;
          phase = this.$root.$$phase;
          if (phase === "$apply" || phase === "$digest") {
            if (fn && (typeof fn === "function")) {
              return fn();
            }
          } else {
            return this.$apply(fn);
          }
        };
        scope.$watchCollection(function() {
          return [scope.stateBoundary, scope.districtBoundary];
        }, function(current, previous) {
          return scope.safeApply(function() {
            if (current) {
              if (scope.districtBoundary) {
                return loadState(scope.stateBoundary.osm_id, [scope.districtBoundary.osm_id]);
              } else if (scope.stateBoundary) {
                return resetStates([scope.stateBoundary.osm_id]);
              } else {
                return resetStates([]);
              }
            } else {
              return resetStates();
            }
          });
        });
        scope.$watch(function() {
          return scope.hoveredBoundary;
        }, function(newHover, oldHover) {
          if (newHover) {
            highlightFeature(scope.layerMap[newHover.osm_id]);
          }
          if (oldHover) {
            return resetHighlight(scope.layerMap[oldHover.osm_id]);
          }
        });
        highlightFeature = function(layer) {
          if (layer) {
            layer.setStyle(highlightStyle);
            if (!L.Browser.ie && !L.Browser.opera) {
              layer.bringToFront();
            }
            if (scope.info.update) {
              return scope.info.update(layer.feature.properties);
            }
          }
        };
        resetHighlight = function(layer) {
          if (layer) {
            scope.states.resetStyle(layer);
          }
          if (scope.info.update) {
            return scope.info.update();
          }
        };
        resetStates = function(highlightOsmIds) {
          console.log("resetStates: " + highlightOsmIds);
          if (scope.districts && scope.map.hasLayer(scope.districts)) {
            scope.map.removeLayer(scope.districts);
          }
          if (scope.states && !scope.map.hasLayer(scope.states)) {
            scope.map.addLayer(scope.states);
            scope.states.setStyle(visibleStyle);
          }
          if (scope.states) {
            scope.map.fitBounds(scope.states.getBounds());
          }
          return scope.safeApply(function() {
            var i, id, layer, len, ref, results;
            if (scope.states) {
              ref = scope.states._layers;
              for (id in ref) {
                layer = ref[id];
                resetHighlight(layer);
              }
              if (highlightOsmIds) {
                results = [];
                for (i = 0, len = highlightOsmIds.length; i < len; i++) {
                  id = highlightOsmIds[i];
                  results.push(highlightFeature(scope.layerMap[id]));
                }
                return results;
              }
            }
          });
        };
        loadState = function(osmId, highlightOsmIds) {
          if (!osmId) {
            return;
          }
          console.log("loadState(" + osmId + ")");
          scope.states.setStyle(fadeStyle);
          return scope.safeApply(function() {
            return $http.get("/adminboundary/geometry/" + osmId + "/").success(function(data) {
              var i, id, len, results;
              if (scope.districts) {
                scope.map.removeLayer(scope.districts);
              }
              scope.districts = L.geoJson(data, {
                style: visibleStyle,
                onEachFeature: onEachFeature
              });
              scope.districts.addTo(scope.map);
              scope.map.fitBounds(scope.districts.getBounds());
              scope.map.removeLayer(scope.states);
              results = [];
              for (i = 0, len = highlightOsmIds.length; i < len; i++) {
                id = highlightOsmIds[i];
                results.push(highlightFeature(scope.layerMap[id]));
              }
              return results;
            });
          });
        };
        clickFeature = function(e) {
          return scope.safeApply(function() {
            return scope.selectedLayer = e.target.feature.properties;
          });
        };
        onEachFeature = function(feature, layer) {
          scope.layerMap[feature.properties.osm_id] = layer;
          return layer.on({
            mouseover: function(e) {
              scope.hoveredBoundary = e.target.feature.properties;
              return scope.safeApply();
            },
            mouseout: function(e) {
              scope.hoveredBoundary = null;
              return scope.safeApply();
            },
            click: clickFeature
          });
        };
        scope.map = L.map(element.context.id, {
          scrollWheelZoom: false,
          zoomControl: false
        }).setView([0, 1], 4);
        scope.map.attributionControl.setPrefix('');
        scope.info = L.control();
        if (scope.showLabels) {
          scope.info.onAdd = function(map) {
            this._div = L.DomUtil.create('div', 'info');
            this.update();
            return this._div;
          };
          scope.info.update = function(props) {
            if (props != null) {
              return this._div.innerHTML = '<h2>' + props.name + '</h2>';
            } else {
              return this._div.innerHTML = "";
            }
          };
          scope.info.addTo(scope.map);
        }
        return $http.get("/adminboundary/geometry/" + scope.osmId + "/").success(function(data) {
          scope.states = L.geoJson(data, {
            style: visibleStyle,
            onEachFeature: onEachFeature
          });
          scope.map.fitBounds(scope.states.getBounds());
          return scope.states.addTo(scope.map);
        });
      };
      return {
        restrict: "EA",
        scope: {
          osmId: "=osmId",
          hoveredBoundary: "=",
          stateBoundary: "=",
          districtBoundary: "=",
          selectedLayer: "="
        },
        transclude: true,
        replace: true,
        link: link
      };
    }
  ]);

  BoundaryController = function($scope, $http) {
    $scope.saveButtonName = 'Save Changes';
    $scope.safeApply = function(fn) {
      var phase;
      phase = this.$root.$$phase;
      if (phase === "$apply" || phase === "$digest") {
        if (fn && (typeof fn === "function")) {
          return fn();
        }
      } else {
        return this.$apply(fn);
      }
    };
    $scope.safeApply(function() {
      console.log($scope.osmId);
      return $http.get("/adminboundary/boundaries/" + $scope.osmId + "/").success(function(boundaries) {
        return $scope.boundaries = boundaries;
      });
    });
    $scope.$watch(function() {
      return $scope.query;
    }, function(query) {
      if (false) {
        return console.log(query);
      }
    });
    $scope.$watch(function() {
      return $scope.selectedLayer;
    }, function(current, previous) {
      return $scope.safeApply(function() {
        var boundary, child, i, j, len, len1, ref, ref1, results, results1;
        if ($scope.boundaries) {
          if (current) {
            if (current.level === 1) {
              ref = $scope.boundaries;
              results = [];
              for (i = 0, len = ref.length; i < len; i++) {
                boundary = ref[i];
                if (boundary.osm_id === current.osm_id) {
                  results.push($scope.currentBoundary = boundary);
                } else {
                  results.push(void 0);
                }
              }
              return results;
            } else if (current.level === 2) {
              ref1 = $scope.boundaries;
              results1 = [];
              for (j = 0, len1 = ref1.length; j < len1; j++) {
                boundary = ref1[j];
                results1.push((function() {
                  var k, len2, ref2, results2;
                  ref2 = boundary.children;
                  results2 = [];
                  for (k = 0, len2 = ref2.length; k < len2; k++) {
                    child = ref2[k];
                    if (child.osm_id === current.osm_id) {
                      results2.push($scope.currentBoundary = child);
                    } else {
                      results2.push(void 0);
                    }
                  }
                  return results2;
                })());
              }
              return results1;
            }
          }
        }
      });
    });
    $scope.$watch(function() {
      return $scope.currentBoundary;
    }, function(boundary, previous) {
      return $scope.safeApply(function() {
        $scope.saveButtonName = 'Save Changes';
        if (boundary) {
          if (boundary.level === 1) {
            $scope.districtBoundary = null;
            $scope.stateBoundary = boundary;
          } else if (boundary.level === 2) {
            $scope.districtBoundary = boundary;
          }
          $scope.currentAliases = $scope.currentBoundary.aliases;
        } else {
          $scope.stateBoundary = null;
          $scope.districtBoundary = null;
        }
        return $scope.aliasForm.$setPristine(true);
      });
    });
    $scope.search = function(query) {
      return function(boundary) {
        if ($scope.query && $scope.query.length > 2) {
          return boundary.name.toLowerCase().indexOf($scope.query.toLowerCase()) > -1;
        }
        return true;
      };
    };
    $scope.clickBoundary = function(state, district) {
      return $scope.safeApply(function() {
        $scope.stateBoundary = state;
        $scope.districtBoundary = district;
        if (district) {
          return $scope.currentBoundary = district;
        } else {
          return $scope.currentBoundary = state;
        }
      });
    };
    $scope.enterBoundary = function(boundary) {
      return $scope.hoveredBoundary = boundary;
    };
    $scope.leaveBoundary = function() {
      return $scope.hoveredBoundary = null;
    };
    $scope.reset = function() {
      return $scope.safeApply(function() {
        $scope.query = '';
        $scope.stateBoundary = null;
        return $scope.districtBoundary = null;
      });
    };
    return $scope.saveAliases = function() {
      return $scope.safeApply(function() {
        var alias, aliases, child, childMatch, delim, i, j, len, len1, newMatch, new_aliases, parentMatch, ref;
        aliases = $scope.currentAliases.split('\n');
        console.log(aliases);
        new_aliases = '';
        delim = '';
        for (i = 0, len = aliases.length; i < len; i++) {
          alias = aliases[i];
          console.log(alias.strip());
          console.log(alias.strip().length);
          if (alias.strip().length > 0) {
            new_aliases += delim + alias;
            delim = '\n';
          }
        }
        $scope.currentBoundary.aliases = new_aliases;
        if ($scope.currentBoundary.level === 2) {
          newMatch = ' ' + $scope.currentBoundary.name.toLowerCase() + ' ' + $scope.currentBoundary.aliases.toLowerCase();
          $scope.currentBoundary.match = $scope.stateBoundary.name.toLowerCase() + ' ' + $scope.stateBoundary.aliases.toLowerCase() + newMatch;
          $scope.stateBoundary.match += newMatch;
        } else {
          parentMatch = ' ' + $scope.currentBoundary.name.toLowerCase() + ' ' + $scope.currentBoundary.aliases.toLowerCase();
          childMatch = '';
          if ($scope.currentBoundary.children != null) {
            ref = $scope.currentBoundary.children;
            for (j = 0, len1 = ref.length; j < len1; j++) {
              child = ref[j];
              child.match += parentMatch;
              childMatch += ' ' + child.name.toLowerCase();
              if (child.aliases) {
                childMatch += ' ' + child.aliases.toLowerCase();
              }
            }
          }
          $scope.currentBoundary.match = parentMatch + childMatch;
        }
        $scope.aliasForm.$setPristine(true);
        $scope.saveButtonName = 'Saving..';
        return $http.post("/adminboundary/boundaries/" + $scope.osmId + "/", JSON.stringify($scope.boundaries)).success(function(boundaries) {
          return $scope.saveButtonName = 'Saved!';
        }).error(function() {
          $scope.saveButtonName = 'Failed';
          return $scope.savingError = true;
        });
      });
    };
  };

  app.controller("BoundaryController", BoundaryController);

}).call(this);
