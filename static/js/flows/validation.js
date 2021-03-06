(function() {
  var REGEX_ALPHANUM, REGEX_NUMBER, REGEX_VARIABLE, app;

  app = angular.module('temba.validation', []);

  REGEX_NUMBER = /^\-?\d+[\.\d+]*$/;

  REGEX_ALPHANUM = /^[a-z\d\-_\s]+$/i;

  REGEX_VARIABLE = /^[ ]*@.+$/i;

  app.directive("number", function() {
    return {
      require: "ngModel",
      link: function(scope, elm, attrs, ctrl) {
        ctrl.$parsers.unshift(function(viewValue) {
          if (!viewValue || REGEX_NUMBER.test(viewValue)) {
            ctrl.$setValidity("number", true);
            return viewValue;
          } else {
            ctrl.$setValidity("number", false);
            return void 0;
          }
        });
      }
    };
  });

  app.directive("alphanum", function() {
    return {
      require: "ngModel",
      link: function(scope, elm, attrs, ctrl) {
        ctrl.$parsers.unshift(function(viewValue) {
          if (!viewValue || REGEX_ALPHANUM.test(viewValue)) {
            ctrl.$setValidity("alphanum", true);
            return viewValue;
          } else {
            ctrl.$setValidity("alphanum", false);
            return void 0;
          }
        });
      }
    };
  });

  app.directive("lowerThan", function($log) {
    var link;
    link = function($scope, $element, $attrs, ctrl) {
      var validate;
      validate = function(viewValue) {
        var comparisonModel, left, right;
        comparisonModel = $attrs.lowerThan;
        left = parseFloat(viewValue);
        right = parseFloat(comparisonModel);
        if (!isNaN(left) && !isNaN(right)) {
          if (!viewValue || !comparisonModel) {
            ctrl.$setValidity("lowerThan", true);
          }
          ctrl.$setValidity("lowerThan", left < right);
        } else {
          ctrl.$setValidity("lowerThan", true);
        }
        return viewValue;
      };
      ctrl.$parsers.unshift(validate);
      ctrl.$formatters.push(validate);
      $attrs.$observe("lowerThan", function(comparisonModel) {
        ctrl.$$lastCommittedViewValue = void 0;
        ctrl.$$invalidModelValue = void 0;
        return ctrl.$setViewValue(ctrl.$viewValue, true, true);
      });
    };
    return {
      require: "ngModel",
      link: link
    };
  });

  app.directive("validateType", function() {
    var link;
    link = function($scope, $element, $attrs, ctrl) {
      var validate;
      validate = function(viewValue) {
        var numeric, type;
        type = $attrs.validateType;
        if (type === 'eq' || type === 'lt' || type === 'gt') {
          numeric = parseFloat(viewValue);
          ctrl.$setValidity("validateType", !isNaN(numeric) || REGEX_VARIABLE.test(viewValue));
        } else {
          ctrl.$setValidity("validateType", true);
        }
        return viewValue;
      };
      ctrl.$parsers.unshift(validate);
      ctrl.$formatters.push(validate);
      $attrs.$observe("validateType", function(comparisonModel) {
        return validate(ctrl.$viewValue);
      });
    };
    return {
      require: "ngModel",
      link: link
    };
  });

}).call(this);
