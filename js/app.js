var app = angular.module('myApp', []);
var firebase = new Firebase('https://scorching-inferno-4736.firebaseio.com/');

app.controller('chatController', function($scope) {
    $scope.message = '';
    
    $scope.enterMessage = function() {
        var message = ($scope.message).trim();
        if (message != '') {
            firebase.push({name: '', message: message});
        }
        $scope.message = '';
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
