var app = angular.module('myApp', []);
app.controller('chatController', function($scope) {
    $scope.message = 'ok';
    
    $scope.enterMessage = function() {
        alert('I am an alert');
    };
});

app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});
