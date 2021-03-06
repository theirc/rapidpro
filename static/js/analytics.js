(function() {
  var ENTITY_MAP, FieldController, escapeHtml, positionDataLabel, updateFieldOptions,
    hasProp = {}.hasOwnProperty;

  updateFieldOptions = function() {
    var f, field, found, j, l, len, len1, ref, results1, scope;
    scope = angular.element($("#scope")).scope();
    window.filtered = [];
    results1 = [];
    for (j = 0, len = field_data.length; j < len; j++) {
      field = field_data[j];
      found = false;
      ref = scope.fields;
      for (l = 0, len1 = ref.length; l < len1; l++) {
        f = ref[l];
        if (f.id === field.id) {
          found = true;
          break;
        }
      }
      if (!found) {
        results1.push(filtered.push(field));
      } else {
        results1.push(void 0);
      }
    }
    return results1;
  };

  ENTITY_MAP = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  escapeHtml = function(input) {
    return String(input).replace(/[&<>"'\/]/g, function(s) {
      return ENTITY_MAP[s];
    });
  };

  $(function() {
    var scope;
    scope = angular.element($("#scope")).scope();
    window.field_data = [];
    return scope.safeApply(function() {
      var flow, flow_match, group, j, l, len, len1, len2, len3, len4, n, o, p, ref, report, rule, rules;
      if (currentReport) {
        scope.currentReport = currentReport;
        scope.showReport(currentReport);
      }
      for (j = 0, len = groups.length; j < len; j++) {
        group = groups[j];
        scope.addGroup(group);
      }
      flows.sort(function(a, b) {
        return b.stats.contacts - a.stats.contacts;
      });
      for (l = 0, len1 = flows.length; l < len1; l++) {
        flow = flows[l];
        scope.addFlow(flow);
        flow_match = "";
        rules = [];
        ref = flow.rules;
        for (n = 0, len2 = ref.length; n < len2; n++) {
          rule = ref[n];
          rule['type'] = 'rule';
          rule['match'] = flow.text.toLowerCase();
          flow_match += rule.text.toLowerCase() + " ";
          rules.push(rule);
        }
        flow['type'] = 'flow';
        flow['match'] = flow_match;
        field_data.push(flow);
        for (o = 0, len3 = rules.length; o < len3; o++) {
          rule = rules[o];
          field_data.push(rule);
        }
      }
      for (p = 0, len4 = reports.length; p < len4; p++) {
        report = reports[p];
        scope.addReport(report);
      }
      return $("#field-selector").select2({
        placeholder: gettext("Add a field"),
        data: function() {
          if (window.filtered) {
            return {
              results: window.filtered
            };
          } else {
            return {
              results: field_data
            };
          }
        },
        dropdownAutoWidth: true,
        formatResult: function(obj, container, query) {
          var text;
          if (obj.type === 'flow') {
            text = "<div class='field-flow'>" + obj.text + "</div>";
            if (obj.rules.length > 1) {
              text += "<div class='field-count'>" + gettext("Add all ") + obj.rules.length + gettext(" fields") + "</div>";
            }
            return text;
          }
          return text = "<div class='field-rule'>" + obj.text + "</div>";
        },
        escapeMarkup: function(m) {
          return m;
        },
        matcher: function(term, text, opt) {
          var matched;
          matched = text.toLowerCase().indexOf(term.toLowerCase()) >= 0 || opt.match.indexOf(term.toLowerCase()) >= 0;
          return matched;
        }
      }).on("change", function(evt) {
        var selection;
        selection = evt.added;
        if (selection.type === "flow") {
          scope.addFlowFields(selection);
        } else {
          scope.addField(selection.id, selection.stats.contacts, selection.text, true);
        }
        return $(this).select2("val", "");
      });
    });
  });

  FieldController = function($scope, $http) {
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
    $scope.chartTypes = [
      {
        type: "bar",
        icon: "icon-bars-3"
      }, {
        type: "pie",
        icon: "icon-pie-2"
      }, {
        type: "column",
        icon: "icon-bars-3"
      }, {
        type: "donut",
        icon: "icon-spinner"
      }
    ];
    $scope.dirty = false;
    $scope.fields = [];
    $scope.filters = [];
    $scope.segments = [];
    $scope.reports = [];
    $scope.flows = [];
    $scope.groups = [];
    $scope.currentGroupSegment = null;
    $scope.lastGroupSegment = null;
    $scope.currentReport = null;
    $scope.renameButtonText = "Rename";
    $scope.markDirty = function() {
      $scope.dirty = true;
      return $scope.renameButtonText = "Save";
    };
    $scope.unmarkDirty = function() {
      $scope.dirty = false;
      return $scope.renameButtonText = "Rename";
    };
    $scope.addReport = function(report) {
      report.text = report.text.strip();
      return $scope.reports.push(report);
    };
    $scope.addFlow = function(flow) {
      flow.text = flow.text.strip();
      return $scope.flows.push(flow);
    };
    $scope.addGroup = function(group) {
      group.name = group.name.strip();
      group.isActive = false;
      return $scope.groups.push(group);
    };
    $scope.addFlowFields = function(flow) {
      var chartSize, chartType, idx, j, len, ref, results1, rule, showChoropleth, showDataTable, smallCharts, types;
      idx = 0;
      types = ['bar', 'donut', 'column'];
      flow.rules.sort(function(a, b) {
        var categories;
        categories = b.stats.categories - a.stats.categories;
        if (categories !== 0) {
          return categories;
        } else {
          return b.stats.contacts - a.stats.contacts;
        }
      });
      smallCharts = 0;
      ref = flow.rules;
      results1 = [];
      for (j = 0, len = ref.length; j < len; j++) {
        rule = ref[j];
        chartType = types[idx % types.length];
        chartSize = 1;
        showDataTable = false;
        showChoropleth = false;
        if (smallCharts > 0) {
          smallCharts--;
        } else if (rule.stats.categories >= 3) {
          chartType = 'column';
          chartSize = 2;
          smallCharts = 2;
          if (idx > 0) {
            showDataTable = true;
          }
        }
        $scope.addField(rule.id, rule.contacts, rule.text, null, chartSize, chartType, showDataTable, showChoropleth, idx * 350);
        results1.push(idx++);
      }
      return results1;
    };
    $scope.addFilter = function(field, savedFilter) {
      var categories, category, filter, filterCategory, j, l, len, len1, ref, ref1, savedCategory;
      if (savedFilter == null) {
        savedFilter = null;
      }
      if (savedFilter && savedFilter.isGroupFilter) {
        $scope.addGroupFilter(savedFilter);
        return;
      }
      categories = [];
      ref = field.categories;
      for (j = 0, len = ref.length; j < len; j++) {
        category = ref[j];
        filterCategory = {
          label: category.label,
          contacts: category.contacts,
          isFilter: true
        };
        if (savedFilter) {
          filterCategory.isFilter = false;
          ref1 = savedFilter.categories;
          for (l = 0, len1 = ref1.length; l < len1; l++) {
            savedCategory = ref1[l];
            if (savedCategory.label === filterCategory.label) {
              filterCategory.isFilter = savedCategory.isFilter;
            }
          }
        }
        categories.push(filterCategory);
      }
      filter = {
        fieldId: field.id,
        isActive: true,
        label: field.label,
        categories: categories,
        isGroupFilter: false,
        showAllContacts: false
      };
      if (savedFilter) {
        filter.isActive = savedFilter.isActive;
        filter.showAllContacts = savedFilter.showAllContacts;
      }
      $scope.filters.push(filter);
      $scope.updateChartTotals();
      if (savedFilter) {
        return $scope.unmarkDirty();
      }
    };
    $scope.addGroupFilter = function(savedFilter) {
      var filterCategory, filterContactGroups, group, groupFilter, j, l, len, len1, ref, ref1, savedCategory;
      if (savedFilter == null) {
        savedFilter = null;
      }
      filterContactGroups = [];
      ref = $scope.groups;
      for (j = 0, len = ref.length; j < len; j++) {
        group = ref[j];
        filterCategory = {
          label: group.name,
          id: group.id,
          count: group.count,
          isFilter: false
        };
        if (savedFilter) {
          filter.isActive = false;
          ref1 = savedFilter.categories;
          for (l = 0, len1 = ref1.length; l < len1; l++) {
            savedCategory = ref1[l];
            if (savedCategory.label === filterCategory.label) {
              filterCategory.isActive = savedCategory.isActive;
            }
          }
        }
        filterContactGroups.push(filterCategory);
      }
      groupFilter = {
        isActive: true,
        label: "Contact Groups",
        categories: filterContactGroups,
        isGroupFilter: true,
        showAllContacts: true
      };
      if (savedFilter) {
        groupFilter.isActive = savedFilter.isActive;
        groupFilter.showAllContacts = savedFilter.showAllContacts;
      }
      $scope.filters.push(groupFilter);
      $scope.updateChartTotals();
      if (savedFilter) {
        return $scope.unmarkDirty();
      }
    };
    $scope.setFieldData = function(data) {
      var field, j, k, len, ref, v;
      ref = $scope.fields;
      for (j = 0, len = ref.length; j < len; j++) {
        field = ref[j];
        if (field.id === data.id) {
          for (k in data) {
            if (!hasProp.call(data, k)) continue;
            v = data[k];
            field[k] = v;
          }
          field.isLoaded = true;
          return field;
        }
      }
      $scope.fields.push(data);
      return data;
    };
    $scope.addField = function(id, contacts, label, visible, chartSize, chartType, showDataTable, showChoropleth, delay, savedFilters, savedSegments) {
      var field, j, len, ref;
      if (visible == null) {
        visible = null;
      }
      if (chartSize == null) {
        chartSize = 2;
      }
      if (chartType == null) {
        chartType = 'bar';
      }
      if (showDataTable == null) {
        showDataTable = false;
      }
      if (showChoropleth == null) {
        showChoropleth = false;
      }
      if (delay == null) {
        delay = 0;
      }
      if (savedFilters == null) {
        savedFilters = null;
      }
      if (savedSegments == null) {
        savedSegments = null;
      }
      ref = $scope.fields;
      for (j = 0, len = ref.length; j < len; j++) {
        field = ref[j];
        if (field.id === id) {
          return;
        }
      }
      field = {
        isLoaded: false,
        isVisible: contacts === 0,
        label: label,
        id: id
      };
      if (visible != null) {
        field.isVisible = visible;
      }
      $scope.fields.push(field);
      return setTimeout(function() {
        updateFieldOptions();
        return $scope.safeApply(function() {
          return $http.get("/ruleset/results/" + id + "/?_format=json").success(function(results) {
            var categories_with_contacts, category, data, filterConfig, l, len1, len2, n, results1, segmentConfig, total;
            data = {
              label: results.label,
              id: results.id,
              categories: results.results[0].categories
            };
            total = 0;
            categories_with_contacts = 0;
            for (category in data.categories) {
              total += category.count;
              if (category.count > 0) {
                categories_with_contacts++;
              }
            }
            if (categories_with_contacts === 1) {
              chartType = 'bar';
            } else if (data.categories.length > 20) {
              chartType = 'donut';
            }
            data.total = total;
            data.chartType = chartType;
            data.isVisible = true;
            if (visible != null) {
              data.isVisible = visible;
            }
            data.chartSize = chartSize;
            data.showDataTable = showDataTable;
            data.showChoropleth = showChoropleth;
            data.table = null;
            data.chart = {
              segments: [],
              categories: [],
              chartType: chartType,
              total: 0
            };
            data = $scope.setFieldData(data);
            $scope.updateChart(data);
            if (showDataTable && data.chart) {
              data.table = data.chart;
            }
            if (savedFilters) {
              for (l = 0, len1 = savedFilters.length; l < len1; l++) {
                filterConfig = savedFilters[l];
                if (filterConfig.fieldId === id) {
                  $scope.addFilter(field, filterConfig);
                }
              }
            }
            if (savedSegments) {
              results1 = [];
              for (n = 0, len2 = savedSegments.length; n < len2; n++) {
                segmentConfig = savedSegments[n];
                if (segmentConfig.fieldId === id) {
                  results1.push($scope.addSegment(field, segmentConfig));
                } else {
                  results1.push(void 0);
                }
              }
              return results1;
            }
          });
        });
      }, delay);
    };
    $scope.getField = function(id) {
      var field, j, len, ref, results1;
      ref = $scope.fields;
      results1 = [];
      for (j = 0, len = ref.length; j < len; j++) {
        field = ref[j];
        if (field.id === id) {
          results1.push(field);
        } else {
          results1.push(void 0);
        }
      }
      return results1;
    };
    $scope.setChartSize = function(field, newSize) {
      field.chartSize = newSize;
      field.chart.chartSize = newSize;
      return $scope.markDirty();
    };
    $scope.setChartType = function(field, newType) {
      if (newType === field.chartType) {
        field.chartType = 'hidden';
        field.chart.chartType = 'hidden';
        if (!field.showDataTable) {
          $scope.toggleDataTable(field);
        }
      } else {
        field.chartType = newType;
        field.chart.chartType = newType;
      }
      return $scope.markDirty();
    };
    $scope.remove = function(field) {
      var idx;
      idx = $scope.fields.indexOf(field);
      $scope.fields.splice(idx, 1);
      updateFieldOptions();
      return $scope.markDirty();
    };
    $scope.removeFilter = function(filter) {
      var idx;
      idx = $scope.filters.indexOf(filter);
      $scope.filters.splice(idx, 1);
      return $scope.updateChartTotals();
    };
    $scope.toggleChoropleth = function(field) {
      field.showChoropleth = !field.showChoropleth;
      if (field.chartType === 'hidden' && !field.showChoropleth && !field.showDataTable) {
        $scope.setChartType(field, 'bar');
      }
      return $scope.markDirty();
    };
    $scope.toggleDataTable = function(field) {
      field.showDataTable = !field.showDataTable;
      if (field.showDataTable) {
        field.table = field.chart;
      } else {
        field.table = null;
        if (field.chartType === 'hidden' && !field.showChoropleth) {
          $scope.setChartType(field, 'bar');
        }
      }
      return $scope.markDirty();
    };
    $scope.toggleCategorySegment = function(evt, segment, categoryLabel) {
      var activeIdx, category, colors, j, l, len, len1, ref, ref1;
      evt.stopPropagation();
      colors = Highcharts.getOptions().colors;
      activeIdx = 0;
      ref = segment.categories;
      for (j = 0, len = ref.length; j < len; j++) {
        category = ref[j];
        if (category.label === categoryLabel) {
          category.isSegment = !category.isSegment;
        }
        if (category.isSegment) {
          category.chartColor = colors[activeIdx++ % colors.length];
        } else {
          category.chartColor = null;
        }
      }
      if (segment.isGroupSegment) {
        ref1 = segment.categories;
        for (l = 0, len1 = ref1.length; l < len1; l++) {
          category = ref1[l];
          if (category.label === categoryLabel) {
            if (category !== $scope.currentGroupSegment) {
              if (category === $scope.lastGroupSegment) {
                $scope.lastGroupSegment = null;
                category.isSegment = false;
              } else {
                $scope.lastGroupSegment = $scope.currentGroupSegment;
                $scope.currentGroupSegment = category;
              }
            } else {
              $scope.currentGroupSegment = $scope.lastGroupSegment;
              $scope.lastGroupSegment = null;
              category.isSegment = false;
            }
          } else {
            category.isSegment = false;
          }
        }
        if ($scope.currentGroupSegment) {
          $scope.currentGroupSegment.isSegment = true;
        }
        if ($scope.lastGroupSegment) {
          $scope.lastGroupSegment.isSegment = true;
        }
      }
      return $scope.updateChartTotals();
    };
    $scope.removeSegment = function(segment) {
      var idx;
      idx = $scope.segments.indexOf(segment);
      $scope.segments.splice(idx, 1);
      return $scope.updateChartTotals();
    };
    $scope.addSegment = function(field, savedSegment) {
      var category, colors, j, l, len, len1, len2, n, newSegment, ref, ref1, ref2, savedCategory, segment, segmentCategories, segmentCategory;
      if (savedSegment == null) {
        savedSegment = null;
      }
      if (!savedSegment) {
        ref = $scope.segments;
        for (j = 0, len = ref.length; j < len; j++) {
          segment = ref[j];
          segment.isSegment = false;
        }
      } else {
        if (savedSegment.isGroupSegment) {
          $scope.addGroupSegment(savedSegment);
          return;
        }
      }
      segmentCategories = [];
      colors = Highcharts.getOptions().colors;
      ref1 = field.categories;
      for (l = 0, len1 = ref1.length; l < len1; l++) {
        category = ref1[l];
        segmentCategory = {
          label: category.label,
          isSegment: true,
          color: colors[segmentCategories.length % colors.length]
        };
        if (savedSegment) {
          ref2 = savedSegment.categories;
          for (n = 0, len2 = ref2.length; n < len2; n++) {
            savedCategory = ref2[n];
            if (segmentCategory.label === savedCategory.label) {
              segmentCategory.isSegment = savedCategory.isSegment;
              segmentCategory.color = savedCategory.color;
            }
          }
        }
        segmentCategories.push(segmentCategory);
      }
      newSegment = {
        fieldId: field.id,
        isSegment: true,
        isGroupSegment: false,
        label: field.label,
        categories: segmentCategories
      };
      if (savedSegment) {
        newSegment.isSegment = savedSegment.isSegment;
      }
      $scope.segments.push(newSegment);
      $scope.updateChartTotals();
      if (savedSegment) {
        return $scope.unmarkDirty();
      }
    };
    $scope.addGroupSegment = function(savedSegment) {
      var colors, group, groupSegment, j, l, len, len1, len2, n, ref, ref1, ref2, savedCategory, segment, segmentCategory, segmentContactGroups;
      if (savedSegment == null) {
        savedSegment = null;
      }
      if (!savedSegment) {
        ref = $scope.segments;
        for (j = 0, len = ref.length; j < len; j++) {
          segment = ref[j];
          segment.isSegment = false;
        }
      }
      segmentContactGroups = [];
      colors = Highcharts.getOptions().colors;
      ref1 = $scope.groups;
      for (l = 0, len1 = ref1.length; l < len1; l++) {
        group = ref1[l];
        segmentCategory = {
          label: group.name,
          id: group.id,
          count: group.count,
          isSegment: false,
          color: colors[segmentContactGroups.length % colors.length]
        };
        if (!savedSegment) {
          if (!$scope.lastGroupSegment) {
            $scope.lastGroupSegment = segmentCategory;
            $scope.lastGroupSegment.isSegment = true;
          } else {
            if (!$scope.currentGroupSegment && segmentCategory !== $scope.lastGroupCategory) {
              $scope.currentGroupSegment = segmentCategory;
              $scope.currentGroupSegment.isSegment = true;
            }
          }
        } else {
          ref2 = savedSegment.categories;
          for (n = 0, len2 = ref2.length; n < len2; n++) {
            savedCategory = ref2[n];
            if (segmentCategory.label === savedCategory.label) {
              segmentCategory.isSegment = savedCategory.isSegment;
              segmentCategory.color = savedCategory.color;
            }
          }
        }
        segmentContactGroups.push(segmentCategory);
      }
      groupSegment = {
        isSegment: true,
        isGroupSegment: true,
        label: "Contact Groups",
        categories: segmentContactGroups
      };
      if (savedSegment) {
        groupSegment.isSegment = savedSegment.isSegment;
      }
      $scope.segments.push(groupSegment);
      $scope.updateChartTotals();
      if (savedSegment) {
        return $scope.unmarkDirty();
      }
    };
    $scope.updateChartTotals = function() {
      var field, j, len, ref;
      ref = $scope.fields;
      for (j = 0, len = ref.length; j < len; j++) {
        field = ref[j];
        if (field.isLoaded) {
          $scope.updateChart(field);
        }
      }
      return $scope.markDirty();
    };
    $scope.updateChart = function(field) {
      var categories, category, filter, filter_arg, filter_args, group, groups, j, l, len, len1, len2, len3, len4, len5, n, o, p, q, ref, ref1, ref2, ref3, ref4, ref5, segment, segment_arg, url_params;
      filter_args = [];
      ref = $scope.filters;
      for (j = 0, len = ref.length; j < len; j++) {
        filter = ref[j];
        if (filter.isGroupFilter) {
          groups = [];
          ref1 = filter.categories;
          for (l = 0, len1 = ref1.length; l < len1; l++) {
            group = ref1[l];
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
          for (n = 0, len2 = ref2.length; n < len2; n++) {
            category = ref2[n];
            if (category.isFilter) {
              categories.push(category.label);
            }
          }
          filter_arg.categories = categories;
        }
        filter_args.push(filter_arg);
      }
      segment_arg = null;
      ref3 = $scope.segments;
      for (o = 0, len3 = ref3.length; o < len3; o++) {
        segment = ref3[o];
        if (segment.isSegment) {
          if (segment.isGroupSegment) {
            groups = [];
            ref4 = segment.categories;
            for (p = 0, len4 = ref4.length; p < len4; p++) {
              group = ref4[p];
              if (group.isSegment) {
                groups.push(group.id);
              }
            }
            segment_arg = {
              groups: groups
            };
          } else {
            segment_arg = {
              ruleset: segment.fieldId
            };
            categories = [];
            ref5 = segment.categories;
            for (q = 0, len5 = ref5.length; q < len5; q++) {
              category = ref5[q];
              if (category.isSegment) {
                categories.push(category.label);
                if (category.id) {
                  categories.push(category.id);
                }
              }
            }
            segment_arg.categories = categories;
          }
          break;
        }
      }
      url_params = "filters=" + encodeURIComponent(JSON.stringify(filter_args));
      url_params += "&segment=" + encodeURIComponent(JSON.stringify(segment_arg));
      return $http.get("/ruleset/results/" + field.id + "/?" + url_params).success(function(results) {
        var chart, chartCategory, len6, len7, r, ref6, ref7, segmentCategories, segmentTotal, t;
        chart = field.chart;
        chart.chartType = field.chartType;
        chart.total = 0;
        chart.segments = [];
        ref6 = results.results;
        for (r = 0, len6 = ref6.length; r < len6; r++) {
          segment = ref6[r];
          segmentCategories = [];
          segmentTotal = 0;
          ref7 = segment.categories;
          for (t = 0, len7 = ref7.length; t < len7; t++) {
            category = ref7[t];
            chartCategory = {
              label: category.label
            };
            chartCategory.count = category.count;
            chart.total += category.count;
            segmentTotal += category.count;
            segmentCategories.push(chartCategory);
          }
          chart.segments.push({
            label: segment.label,
            total: segmentTotal,
            categories: segmentCategories
          });
        }
        field.total = chart.total;
        if (field.table) {
          return field.table = chart;
        }
      });
    };
    $scope.toggleFilter = function(filter) {
      filter.isActive = !filter.isActive;
      return $scope.updateChartTotals();
    };
    $scope.toggleSegment = function(segment) {
      var j, len, ref, seg;
      if (!segment.isSegment) {
        ref = $scope.segments;
        for (j = 0, len = ref.length; j < len; j++) {
          seg = ref[j];
          seg.isSegment = false;
        }
      }
      segment.isSegment = !segment.isSegment;
      return $scope.updateChartTotals();
    };
    $scope.toggleCategoryFilter = function(evt, filter, categoryLabel) {
      var activeIdx, category, j, len, ref;
      evt.stopPropagation();
      activeIdx = 0;
      ref = filter.categories;
      for (j = 0, len = ref.length; j < len; j++) {
        category = ref[j];
        if (category.label === categoryLabel) {
          category.isFilter = !category.isFilter;
        }
      }
      if (filter.isGroupFilter) {
        filter.showAllContacts = false;
        $scope.adjustAllContactCheck(filter);
      }
      return $scope.updateChartTotals();
    };
    $scope.toggleVisibility = function(field) {
      field.isVisible = !field.isVisible;
      return $scope.markDirty();
    };
    $scope.adjustAllContactCheck = function(filter) {
      var category, check, j, len, ref;
      if (!filter.isGroupFilter) {
        return;
      }
      check = true;
      ref = filter.categories;
      for (j = 0, len = ref.length; j < len; j++) {
        category = ref[j];
        check = check && !category.isFilter;
      }
      return filter.showAllContacts = check;
    };
    $scope.activateAllContacts = function(evt, filter) {
      var category, j, len, ref;
      evt.stopPropagation();
      if (!filter.isGroupFilter) {
        return;
      }
      filter.showAllContacts = true;
      ref = filter.categories;
      for (j = 0, len = ref.length; j < len; j++) {
        category = ref[j];
        category.isFilter = false;
      }
      return $scope.updateChartTotals();
    };
    $scope.showReport = function(report) {
      var field, i, j, len, ref, savedConfig;
      savedConfig = JSON.parse(report.config);
      $scope.currentReport = report;
      $scope.fields = [];
      $scope.filters = [];
      $scope.segments = [];
      $scope.currentGroupSegment = null;
      $scope.lastGroupSegment = null;
      i = 0;
      ref = savedConfig.fields;
      for (j = 0, len = ref.length; j < len; j++) {
        field = ref[j];
        $scope.addField(field.id, 1, field.label, field.isVisible, field.chartSize, field.chartType, field.showDataTable, field.showChoropleth, i * 350, savedConfig.filters, savedConfig.segments);
        i++;
      }
      return $scope.unmarkDirty();
    };
    $scope.goToReadReport = function(report) {
      var path;
      path = "/report/read/" + report.id + "/";
      return window.location.replace(path);
    };
    $scope.showSaveReportModal = function(updateReport) {
      var listeners, modal;
      if (updateReport == null) {
        updateReport = null;
      }
      modal = new ConfirmationModal($('.creation > .title').html(), $('.creation > .body').html());
      listeners = {
        onPrimary: function() {
          var description, title, updateId;
          title = $('#active-modal #id_title').val().strip();
          description = $('#active-modal #id_description').val().strip();
          $('#active-modal #id_title').parent().parent().removeClass("error");
          $('#active-modal #id_description').parent().parent().removeClass("error");
          updateId = null;
          if (updateReport) {
            updateId = updateReport.id;
          }
          return $scope.saveReport(modal, title, description, updateId);
        }
      };
      modal.setListeners(listeners, false);
      modal.setPrimaryButton(gettext('Save Report'));
      modal.show();
      if (updateReport) {
        $('#active-modal #id_title').val(updateReport.text);
        return $('#active-modal #id_description').val(updateReport.description);
      }
    };
    $scope.checkForm = function(title, description) {
      var noError;
      noError = true;
      if (title === "" || title.length > 64) {
        $('#active-modal #id_title').parent().parent().addClass("error");
        noError = false;
      }
      if (description === "") {
        $('#active-modal #id_description').parent().parent().addClass("error");
        noError = false;
      }
      return noError;
    };
    return $scope.saveReport = function(modal, title, description, updateId) {
      var categories, category, config, field, fields, filter, filterObj, filters, j, l, len, len1, len2, len3, len4, n, o, p, ref, ref1, ref2, ref3, ref4, segment, segmentObj, segments;
      if (updateId == null) {
        updateId = null;
      }
      if (!$scope.checkForm(title, description)) {
        return;
      }
      fields = [];
      filters = [];
      segments = [];
      ref = $scope.fields;
      for (j = 0, len = ref.length; j < len; j++) {
        field = ref[j];
        fields.push({
          chartSize: field.chartSize,
          chartType: field.chartType,
          isVisible: field.isVisible,
          id: field.id,
          label: field.label,
          showDataTable: field.showDataTable,
          showChoropleth: field.showChoropleth
        });
      }
      ref1 = $scope.filters;
      for (l = 0, len1 = ref1.length; l < len1; l++) {
        filter = ref1[l];
        categories = [];
        ref2 = filter.categories;
        for (n = 0, len2 = ref2.length; n < len2; n++) {
          category = ref2[n];
          categories.push({
            isFilter: category.isFilter,
            label: category.label
          });
        }
        filterObj = {
          fieldId: filter.fieldId,
          isActive: filter.isActive,
          isGroupFilter: filter.isGroupFilter,
          label: filter.label,
          showAllcontacts: filter.showAllContacts,
          categories: categories
        };
        filters.push(filterObj);
      }
      ref3 = $scope.segments;
      for (o = 0, len3 = ref3.length; o < len3; o++) {
        segment = ref3[o];
        categories = [];
        ref4 = segment.categories;
        for (p = 0, len4 = ref4.length; p < len4; p++) {
          category = ref4[p];
          categories.push({
            isSegment: category.isSegment,
            label: category.label,
            color: category.color
          });
        }
        segmentObj = {
          fieldId: segment.fieldId,
          isSegment: segment.isSegment,
          isGroupSegment: segment.isGroupSegment,
          label: segment.label,
          categories: categories
        };
        segments.push(segmentObj);
      }
      config = {
        fields: fields,
        filters: filters,
        segments: segments
      };
      return $.post(saveReportURL, JSON.stringify({
        title: title,
        description: description,
        config: config,
        id: updateId
      })).done(function(data) {
        var idx, len5, q, ref5, rep;
        if (data.status === "success") {
          modal.dismiss();
          if (updateId) {
            idx = null;
            ref5 = $scope.reports;
            for (q = 0, len5 = ref5.length; q < len5; q++) {
              rep = ref5[q];
              if (rep.id === updateId) {
                idx = $scope.reports.indexOf(rep);
              }
            }
            if (idx != null) {
              $scope.reports.splice(idx, 1);
            }
          }
          $scope.reports.push(data.report);
          $scope.currentReport = data.report;
          $scope.safeApply();
          return $scope.unmarkDirty();
        }
      });
    };
  };

  app.controller("FieldController", FieldController);

  positionDataLabel = function(settings) {
    var j, l, len, len1, point, ref, ref1, series;
    ref = settings.series;
    for (j = 0, len = ref.length; j < len; j++) {
      series = ref[j];
      ref1 = series.data;
      for (l = 0, len1 = ref1.length; l < len1; l++) {
        point = ref1[l];
        if (settings.chart.type === 'bar') {
          point.dataLabels.x = -15;
          point.dataLabels.align = "right";
          if (point.y <= 15) {
            point.dataLabels.x = 30;
            point.dataLabels.color = "#232";
          }
        }
        if (settings.chart.type === 'column') {
          point.dataLabels.y = 25;
          if (point.y <= 15) {
            point.dataLabels.y = -10;
            point.dataLabels.color = "#232";
          }
        }
      }
    }
    return null;
  };

  app.directive("datatable", function() {
    return {
      restrict: "E",
      template: "<div></div>",
      scope: {
        config: "=config"
      },
      transclude: true,
      replace: true,
      link: function(scope, element, attrs) {
        return scope.$watch((function() {
          return scope.config;
        }), (function(config) {
          var cat, cat_segment, category, category_count, clazz, j, l, len, len1, len2, len3, n, o, percent, ref, ref1, ref2, ref3, segment, segment_idx, text;
          if (config) {
            text = "<table class='datatable table'>";
            cat_segment = config.segments[0];
            if (config.segments.length > 1) {
              text += "<tr><td></td>";
              ref = config.segments;
              for (segment_idx = j = 0, len = ref.length; j < len; segment_idx = ++j) {
                segment = ref[segment_idx];
                clazz = 'datatable-segment';
                if (segment_idx % 2 === 1) {
                  clazz += ' datatable-segment-odd';
                }
                text += "<td colspan=2 class='" + clazz + "'>" + escapeHtml(segment.label) + "</td>";
              }
              text += "</tr>";
            }
            ref1 = cat_segment.categories;
            for (l = 0, len1 = ref1.length; l < len1; l++) {
              category = ref1[l];
              text += "<tr><td class='datatable-label'>" + escapeHtml(category.label) + "</td>";
              ref2 = config.segments;
              for (segment_idx = n = 0, len2 = ref2.length; n < len2; segment_idx = ++n) {
                segment = ref2[segment_idx];
                clazz = 'datatable-value';
                if (segment_idx % 2 === 1) {
                  clazz += ' datatable-segment-odd';
                }
                category_count = 0;
                ref3 = segment.categories;
                for (o = 0, len3 = ref3.length; o < len3; o++) {
                  cat = ref3[o];
                  if (cat.label === category.label) {
                    category_count = cat.count;
                    break;
                  }
                }
                text += "<td class='" + clazz + "'>" + category_count + "</td>";
                percent = 0;
                if (segment.total > 0) {
                  percent = Math.round(category_count * 100 / segment.total);
                }
                text += "<td class='" + clazz + "'>" + percent + "%</td>";
              }
              text += "</tr>";
            }
            text += "</table>";
            return element.html(text);
          } else {
            return element.text("");
          }
        }), true);
      }
    };
  });

  app.directive("chart", function() {
    return {
      restrict: "E",
      template: "<div></div>",
      scope: {
        config: "=config"
      },
      transclude: true,
      replace: true,
      link: function(scope, element, attrs) {
        var chartDefaults;
        chartDefaults = {
          chart: {
            renderTo: element[0],
            type: attrs.type || null,
            width: attrs.width || null,
            marginTop: 0,
            title: {
              text: null
            }
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            bar: {
              colorByPoint: true,
              shadow: false
            },
            column: {
              colorByPoint: true,
              shadow: false
            },
            pie: {
              allowPointSelect: true,
              cursor: "pointer",
              size: "70%",
              minSize: "70%",
              dataLabels: {
                enabled: true,
                color: "#888",
                connectorColor: "#888",
                style: {
                  textShadow: "none"
                },
                formatter: function() {
                  if (this.point.percentage <= 0) {
                    return null;
                  } else {
                    return "<b>" + this.point.name + "</b> " + Math.round(this.point.percentage) + "%";
                  }
                }
              }
            }
          },
          yAxis: {
            min: 0,
            max: 100,
            allowDecimals: false,
            labels: {
              enabled: false
            },
            title: {
              text: null
            }
          },
          credits: {
            enabled: false
          },
          title: {
            text: null
          },
          labels: {
            items: []
          },
          tooltip: {
            formatter: function() {
              return "<b>" + escapeHtml(this.x) + "</b> - " + this.point.count + gettext(" of ") + this.point.total + gettext(" responses");
            }
          },
          xAxis: {
            labels: {
              style: {
                fontWeight: "200"
              }
            },
            categories: []
          }
        };
        return scope.$watch((function() {
          return scope.config;
        }), (function(config) {
          var categories, category, chart, chartHeight, chartType, data, deepCopy, i, j, len, newSettings, paneWidth, percent, pieSeries, pointLabels, ref, segment, segment_idx, series;
          if (!config) {
            return;
          }
          if (config.chartType === 'hidden') {
            element.hide();
          } else {
            element.show();
          }
          deepCopy = true;
          newSettings = {};
          $.extend(deepCopy, newSettings, chartDefaults);
          chartType = config.chartType;
          newSettings.chart.type = chartType;
          newSettings.series = [];
          series = newSettings.series;
          chartHeight = 125;
          if (config.segments.length > 1) {
            newSettings.plotOptions.bar.colorByPoint = false;
            newSettings.plotOptions.column.colorByPoint = false;
            newSettings.tooltip.formatter = function() {
              return "<b>" + escapeHtml(this.series.name) + " - " + this.x + "</b> - " + this.point.count + gettext(" of ") + this.point.total + gettext(" responses");
            };
          }
          ref = config.segments;
          for (segment_idx = j = 0, len = ref.length; j < len; segment_idx = ++j) {
            segment = ref[segment_idx];
            data = [];
            categories = [];
            if (chartType === "pie" || chartType === "donut") {
              chartHeight = 300;
              i = 0;
              while (i < segment.categories.length) {
                category = segment.categories[i];
                data.push([escapeHtml(category.label), category.count]);
                i++;
              }
              pieSeries = {
                name: escapeHtml(segment.label),
                data: data
              };
              series.push(pieSeries);
              if (chartType === "donut") {
                newSettings.chart.type = "pie";
                pieSeries.innerSize = "35%";
              }
              paneWidth = 100 / (config.segments.length * 2);
              pieSeries.center = [paneWidth + 2 * paneWidth * segment_idx + "%", "50%"];
              if (config.segments.length === 1) {
                newSettings.tooltip.formatter = function() {
                  return "<b>" + this.key + "</b> - " + this.y + gettext(" of ") + this.point.total + gettext(" responses");
                };
              } else {
                newSettings.tooltip.formatter = function() {
                  return "<b>" + this.series.name + " - " + this.key + "</b> - " + this.y + gettext(" of ") + this.point.total + gettext(" responses");
                };
              }
            } else if (chartType === "bar" || chartType === "column") {
              i = 0;
              while (i < segment.categories.length) {
                pointLabels = {};
                pointLabels.enabled = true;
                pointLabels.color = "#fff";
                pointLabels.x = 0;
                pointLabels.y = 0;
                pointLabels.format = "{point.y}%";
                category = segment.categories[i];
                percent = 0;
                if (segment.total > 0) {
                  percent = parseInt(category.count * 100 / segment.total);
                }
                data.push({
                  y: percent,
                  count: category.count,
                  total: segment.total,
                  label: category.label,
                  dataLabels: pointLabels
                });
                categories.push(category.label);
                i++;
              }
              if (chartType === "bar") {
                chartHeight = segment.categories.length * 80 * config.segments.length;
                if (config.chartSize === 1) {
                  chartHeight = 300;
                }
                newSettings.chart.marginLeft = 150;
                series.push({
                  name: segment.label,
                  data: data
                });
              } else {
                chartHeight = 300;
                series.push({
                  name: segment.label,
                  data: data
                });
              }
              newSettings.xAxis.categories = categories;
            }
          }
          newSettings.chart.height = chartHeight;
          return chart = new Highcharts.Chart(newSettings, positionDataLabel(newSettings));
        }), true);
      }
    };
  });

}).call(this);
