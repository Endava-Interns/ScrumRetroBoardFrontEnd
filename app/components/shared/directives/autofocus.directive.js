(function () {
    'use strict';

    angular
        .module('scrum_retroboard')
        .directive('ngAutofocus', Directive);

    Directive.$inject = ['$timeout'];
    function Directive($timeout) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            restrict: 'A',
            link: link,
        };
        return directive;

        function link($scope, $element) {
            $timeout(function() {
                $element[0].focus();
            });
        }
    }
})();