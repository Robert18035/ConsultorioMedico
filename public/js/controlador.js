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
            templateUrl: "../views/altaRegistro.html",
            controller: "registroPac"
        })
        .when("/medico", {
            templateUrl: "../views/registroMedico.html",
            controller: "registroMed"
        })
        .when("/enfermera", {
            templateUrl: "../views/registroEnfermera.html",
            controller: "registroEnf"
        })
        .otherwise({
            templateUrl: "../views/error.html"
        });
});

/* -------------------------------- FORMULARIO ALTA REGISTRO -------------------------------*/

app.controller('registroPac', function($scope) {
    $scope.registrar = function() {
        var nombre = $scope.paciente.nombre;
        var email = $scope.paciente.email;
        $scope.paciente = {};
        console.log(nombre);
        console.log(email);
    }
});