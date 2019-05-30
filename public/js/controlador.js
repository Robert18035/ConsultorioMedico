/* ----------------------------------- ROUTING -----------------------------------*/
var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "../views/principal.html"
        })
        .when("/about", {
            templateUrl: "../views/about.html"
        })
        .when("/registro", {
            templateUrl: "../views/registro.html"
        })
        .when("/altaRegistro", {
            templateUrl: "../views/altaRegistro.html"
        })
        .otherwise({
            templateUrl: "../views/error.html"
        });
});

/* ----------------------------------- VALIDAR FORMULARIO -----------------------------------*/


app.controller('pacienteController', function($scope) {
    $scope.persons = {};
    $scope.edad = 0;
    $scope.sexo = '';
    $scope.register = function() {
        $scope.nameInvalid = false;
        $scope.emailInvalid = false;
        $scope.sexInvalid = false;
        $scope.ageInvalid = false;
        if (!$scope.registrationForm.nombre.$valid) {
            $scope.nameInvalid = true;
        }
        if (!$scope.registrationForm.email.$valid) {
            $scope.emailInvalid = true;
        }
        if (!$scope.registrationForm.sexo.$valid) {
            $scope.emailInvalid = true;
        }
        if (!$scope.registrationForm.edad.$valid) {
            $scope.emailInvalid = true;
        }
        if ($scope.registrationForm.$valid) {
            alert("Registro exitoso");
        }
    }
});