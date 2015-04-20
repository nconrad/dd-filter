/*
 * dd-filter.js
 * An Angular.js/Bootstrap dropdown directive with filter.
 *
 * Readme:
 *  https://github.com/nconrad/dd-filter
 *
 * Authors:
 *  https://github.com/nconrad
 *
*/
angular.module('dd-filter', [])
.directive('ddFilter', ['$timeout', function($timeout) {
    return {
        restrict: 'EA',
        terminal: true,
        require: '?ngModel',
        scope: {
            ddID: '@ddID',
            ddClass: '@ddClass',
            ddPlaceholder: '@ddPlaceholder',
            ddTitle: '@ddTitle',
            items: '=ddData',
            ngModel: '=ngModel'
        },
        templateUrl: 'lib/dd-filter/dd-filter.html',
        link: function(scope, element, attrs, ngModel) {
            if (!ngModel) return;

            // model for search filter
            scope.ddModel;

            // if there is data at start of runtime, set it
            if (scope.items && scope.items.length === 0 )
                labelAsEmpty();

            scope.$watch('ngModel', function(item) {
                if (item) scope.ddDisplayed = item.name;
            })

            // update data if it changes
            attrs.$observe('items', function(value) {
                console.log('change', value)
                if (scope.items && attrs.ddRequired && scope.items.length > 0)
                    ngModel.$setValidity('required', true);
                else
                    ngModel.$setValidity('required', false);

                if (!scope.items || scope.items.length == 0) labelAsEmpty();
            })


            scope.selectedIndex = -1;
            scope.ddSelect = function($index, item) {
                scope.selectedIndex = $index;
                scope.ddDisplayed = item.name;
                ngModel.$setViewValue( item );

                if (attrs.ddChange)
                    scope.$emit(attrs.ddChange, scope.ddDisplayed);
            }

            // need to make work for state resets
            scope.openDDSelector = function() {
                angular.element(element).find('.input-group-btn').addClass('open');
                $timeout(function(){
                    angular.element(element).find('input').focus();
                });
            }

            // need to make work for state resets
            scope.closeDDSelector = function() {
                angular.element(element)
                       .find('.input-group-btn').removeClass('open');
            }

            function labelAsEmpty() {
                if (attrs.ddEmptyString)
                    scope.ddDisplayed = attrs.ddEmptyString;
                else
                    scope.ddDisplayed = "None available";
            }
        }
    }
}])