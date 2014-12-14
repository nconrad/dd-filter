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
.directive('ddFilter', function() {
    return {
        terminal: true,
        require: "?ngModel",
        templateUrl: 'lib/dd-filter/dd-filter.html',
        link: function(scope, element, attrs, ngModel) {
            if (!ngModel) return;

            scope.ddID = attrs.ddId;
            scope.ddTitle = attrs.ddTitle;
            scope.ddPlaceholder = attrs.ddPlaceholder;            

            // model for search filter
            scope.ddModel;

            // if there is a default for the button, use it
            if (attrs.ddDefault) scope.ddDisplayed = attrs.ddDefault;

            // if there is data at start of runtime, set it
            if (scope.items && scope.items.length > 0) scope.items = attrs.ddData;
            else labelAsEmpty();

            // update default value if it changes
            scope.$watch(attrs.ddDefault, function(value) {
                scope.ddDisplayed = value;
                ngModel.$setViewValue( scope.ddDisplayed );
            })            

            // update data if it changes
            scope.$watch(attrs.ddData, function(value) {
                scope.items = value;

                if (scope.items && attrs.ddRequired && scope.items.length > 0) 
                    ngModel.$setValidity('required', true);
                else 
                    ngModel.$setValidity('required', false);

                if (!scope.items || scope.items.length == 0) labelAsEmpty();                
            })

            // update title if it changes
            scope.$watch(attrs.ddTitle, function(value) {
                scope.ddTitle = value;
            })

            scope.selectedIndex = -1;
            scope.ddSelect = function($index, item) {
                scope.selectedIndex = $index;
                scope.ddDisplayed = item.name;
                ngModel.$setViewValue( scope.ddDisplayed );

                scope.$emit(attrs.ddChange, scope.ddDisplayed);             
            }
            
            // need to make work for state resets
            scope.openDDSelector = function() {
                angular.element(element).find('.input-group-btn').addClass('open');
                setTimeout(function(){
                    angular.element(element).find('input').focus(); 
                }, 0);
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
                console.log('setting as empty')
            }


        }
    }
})