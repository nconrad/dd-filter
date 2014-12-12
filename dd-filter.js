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

            /*
            scope.$watch(
                function(){
                    return ngModel.$modelValue;
                }, function(newValue, oldValue){
                    console.log('in *thisDirective* model value changed...', newValue, oldValue);
                }, true);
            */

            // id for input field
            scope.ddID = attrs.ddId;

            scope.ddTitle = attrs.ddTitle;
            scope.ddPlaceholder = attrs.ddPlaceholder;            

            // model for input
            scope.ddModel = attrs.ddModel;

            // model for selected
            scope.ddSelected = attrs.ddSelected;

            // custom classes
            scope.ddClass = attrs.ddClass;

            // if there is a default for the text box, use it
            if (attrs.ddDefault) {
                scope.ddDisplayed = attrs.ddDefault;
                //ngModel.$setViewValue( scope.ddDisplayed );                
            } else {
                scope.ddDisplayed = "loading";
            }

            // update default value
            scope.$watch(attrs.ddDefault, function(value) {
                scope.ddDisplayed = value;
                ngModel.$setViewValue( scope.ddDisplayed );                
            })            

            // model to watch is the attr 'dd-data'
            scope.$watch(attrs.ddData, function(value) {
                scope.items = value;
            })

            // watch title if isn't a string
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




        }
    }
})