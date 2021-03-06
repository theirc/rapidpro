(function() {
  var calculateColor, highlightStyle, visibleStyle;

  visibleStyle = function(feature) {
    return {
      fillColor: feature.properties.color,
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: 1
    };
  };

  highlightStyle = function(feature) {
    return {
      fillColor: feature.properties.color,
      opacity: 1,
      weight: 5,
      color: feature.properties.borderColor,
      fillOpacity: 1
    };
  };

  calculateColor = function(breaks, scores) {
    var colors, i, j, ref, score;
    score = scores.score;
    if (scores.count === 0) {
      return 'rgb(200, 200, 200)';
    }
    colors = ['rgb(165,0,38)', 'rgb(215,48,39)', 'rgb(244,109,67)', 'rgb(253,174,97)', 'rgb(254,224,139)', 'rgb(255,255,191)', 'rgb(217,239,139)', 'rgb(166,217,106)', 'rgb(102,189,99)', 'rgb(26,152,80)', 'rgb(0,104,55)'];
    for (i = j = 0, ref = breaks.length; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      if (score <= breaks[i]) {
        return colors[i];
      }
    }
  };

  app.directive("choropleth", [
    "$http", "$log", function($http, $log) {
      var link;
      link = function(scope, element, attrs) {
        var clickFeature, highlightFeature, onEachFeature, resetHighlight, showStates, updateLegend;
        scope.legend = null;
        scope.map = null;
        scope.info = null;
        scope.districtId = null;
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
          return [scope.chartSize, scope.showChoropleth];
        }, function(newSize, oldSize) {
          return scope.map.invalidateSize();
        });
        scope.$watch(function() {
          return scope.$parent.filters;
        }, function(oldFilters, newFilters) {
          if (scope.features) {
            scope.map.removeLayer(scope.features);
          }
          return scope.loadFeature(scope.ruleId, scope.osmId, true);
        }, true);
        scope.map = L.map(element.context.id, {
          scrollWheelZoom: false,
          zoomControl: false,
          touchZoom: false,
          trackResize: true,
          dragging: false
        });
        scope.map.setView([0, 1], 4);
        scope.map.attributionControl.setPrefix('');
        scope.map.on('resize', function(e) {
          if (scope.states) {
            return scope.map.fitBounds(scope.states.getBounds());
          }
        });
        scope.info = L.control();
        scope.colors = ['rgb(165,0,38)', 'rgb(215,48,39)', 'rgb(244,109,67)', 'rgb(253,174,97)', 'rgb(254,224,139)', 'rgb(255,255,191)', 'rgb(217,239,139)', 'rgb(166,217,106)', 'rgb(102,189,99)', 'rgb(26,152,80)', 'rgb(0,104,55)'];
        scope.info.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info');
          this.update();
          return this._div;
        };
        scope.info.update = function(scores) {
          var html, idx, j, len, ref, result;
          if (scores != null) {
            html = '<div class="summary">';
            html += '<div class="title">' + scores.name + '</div>';
            html += '<div class="total">' + scores.count + ' responses</div>';
            html += '<div class="categories">';
            ref = scores.results;
            for (idx = j = 0, len = ref.length; j < len; idx = ++j) {
              result = ref[idx];
              html += '<div class="category category-' + idx + '">';
              html += '<span class="pct">' + result.percentage + '<span class="unit">%</unit></span><span class="count">' + result.count + '</span><span class="label">' + result.label + '</span>';
              html += '</div>';
            }
            html += '</div>';
            html += '</div>';
            return this._div.innerHTML = html;
          } else {
            return this._div.innerHTML = "";
          }
        };
        scope.info.addTo(scope.map);
        showStates = function() {
          if (scope.features) {
            scope.map.removeLayer(scope.features);
          }
          scope.features = scope.states;
          scope.map.fitBounds(scope.features.getBounds());
          return scope.features.addTo(scope.map);
        };
        clickFeature = function(e) {
          var geojson;
          if (e.target.feature) {
            if (e.target.feature.properties.level === 1) {
              scope.features.resetStyle(e.target);
              geojson = L.geoJson(e.target.toGeoJSON());
              scope.map.fitBounds(geojson.getBounds());
              return scope.loadFeature(scope.ruleId, e.target.feature.properties.osm_id);
            } else {
              scope.totals = scope.state_totals;
              return showStates();
            }
          }
        };
        onEachFeature = function(feature, layer) {
          return layer.on({
            mouseover: function(e) {
              return highlightFeature(e.target);
            },
            mouseout: function(e) {
              return resetHighlight(e.target);
            },
            click: clickFeature
          });
        };
        highlightFeature = function(layer) {
          if (layer) {
            scope.info.update(layer.feature.properties.scores);
            layer.setStyle(highlightStyle(layer.feature));
            if (!L.Browser.ie && !L.Browser.opera) {
              return layer.bringToFront();
            }
          }
        };
        resetHighlight = function(layer) {
          scope.info.update(scope.totals);
          if (layer) {
            return scope.features.resetStyle(layer);
          }
        };
        updateLegend = function(map) {
          var category, div, i, idx, lower, upper;
          div = L.DomUtil.create("div", "info legend");
          if (scope.legend && scope.scores && scope.breaks && scope.categories) {
            i = 0;
            while (i < scope.breaks.length) {
              idx = scope.breaks.length - i - 1;
              lower = idx > 0 ? scope.breaks[idx - 1] : 0;
              upper = scope.breaks[idx];
              if (lower < .5 && upper < .5) {
                category = scope.categories[1];
                upper = Math.round((1 - upper) * 100);
                div.innerHTML += "<i style=\"background:" + scope.colors[idx] + "\"></i> " + upper + "% " + category + "<br/>";
              } else if (lower > .5 && upper > .5) {
                category = scope.categories[0];
                lower = Math.round(lower * 100);
                div.innerHTML += "<i style=\"background:" + scope.colors[idx] + "\"></i> " + lower + "% " + category + "<br/>";
              } else {
                div.innerHTML += "<i style=\"background:" + scope.colors[i] + "\"></i>Even<br/>";
              }
              i++;
            }
          }
          return div;
        };
        scope.loadFeature = function(ruleId, osmId, states) {
          var categories, category, filter, filter_arg, filter_args, group, groups, j, k, l, len, len1, len2, ref, ref1, ref2, url_params;
          if (states == null) {
            states = false;
          }
          filter_args = [];
          ref = scope.$parent.filters;
          for (j = 0, len = ref.length; j < len; j++) {
            filter = ref[j];
            if (filter.isGroupFilter) {
              groups = [];
              ref1 = filter.categories;
              for (k = 0, len1 = ref1.length; k < len1; k++) {
                group = ref1[k];
                if (group.isFilter) {
                  groups.push(group.id);
                }
              }
              filter_arg = {
                groups: groups
              };
            } else {
              filter_arg = {
                ruleset: filter.fieldId
              };
              categories = [];
              ref2 = filter.categories;
              for (l = 0, len2 = ref2.length; l < len2; l++) {
                category = ref2[l];
                if (category.isFilter) {
                  categories.push(category.label);
                }
              }
              filter_arg.categories = categories;
            }
            filter_args.push(filter_arg);
          }
          url_params = "filters=" + encodeURIComponent(JSON.stringify(filter_args));
          return $http.get('/ruleset/choropleth/' + ruleId + '/?_format=json&boundary=' + osmId + '&' + url_params).success(function(scoreData) {
            scope.totals = scoreData.totals;
            scope.scores = scoreData.scores;
            scope.breaks = scoreData.breaks;
            scope.categories = scoreData.categories;
            scope.info.update(scope.totals);
            if (states) {
              scope.state_scores = scope.scores;
              scope.state_totals = scope.totals;
            }
            if (!scope.legend) {
              scope.legend = L.control({
                position: "bottomleft"
              });
              scope.legend.onAdd = updateLegend;
              scope.legend.addTo(scope.map);
            }
            return $http.get("/adminboundary/geometry/" + osmId + "/").success(function(geoData) {
              var feature, len3, m, ref3;
              ref3 = geoData.features;
              for (m = 0, len3 = ref3.length; m < len3; m++) {
                feature = ref3[m];
                feature.properties.scores = scoreData.scores[feature.properties.osm_id];
                feature.properties.color = calculateColor(scope.breaks, feature.properties.scores);
                feature.properties.borderColor = 'white';
              }
              if (scope.features) {
                scope.map.removeLayer(scope.features);
              }
              scope.features = L.geoJson(geoData, {
                style: visibleStyle,
                onEachFeature: onEachFeature
              });
              scope.map.fitBounds(scope.features.getBounds());
              scope.features.addTo(scope.map);
              if (states) {
                return scope.states = scope.features;
              }
            });
          });
        };
        return scope.loadFeature(scope.ruleId, scope.osmId, true);
      };
      return {
        restrict: "EA",
        scope: {
          osmId: "=osmId",
          ruleId: "=ruleId",
          chartSize: "=chartSize",
          showChoropleth: "=showChoropleth"
        },
        transclude: true,
        replace: true,
        link: link
      };
    }
  ]);

}).call(this);
