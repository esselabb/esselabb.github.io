var app = angular.module('myApp', []);
app.controller('chatController', function($scope) {
    $scope.message = 'ok';
    
    $scope.enterMessage = function (keyEvent) {
        if (keyEvent.which === 13)
            alert('I am an alert');
    };
});