/* ----------------------------------- ROUTING -----------------------------------*/
var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "../views/principal.html",
            controller: "homeController"
        })
        .when("/about", {
            templateUrl: "../views/about.html"
        })
        .when("/registro", {
            templateUrl: "../views/registro.html"
        })
        /* ----------------------------------------------------------- */
        .when("/altaRegistro", {
            templateUrl: "../views/altaRegistro.html",
            controller: "registroPac"
        })
        .when("/altaRegistro-success", {
            templateUrl: "../views/principal.html",
            controller: "registroPac"
        })
        /* ----------------------------------------------------------- */
        .when("/medico", {
            templateUrl: "../views/medico.html"
        })
        .when("/regisMedico", {
            templateUrl: "../views/registroMedico.html",
            controller: "registroMed"
        })
        .when("/medico-success", {
            templateUrl: "../views/principal.html",
            controller: "registroMed"
        })
        /* ----------------------------------------------------------- */
        .when("/enfermera", {
            templateUrl: "../views/enfermera.html"
        })
        .when("/regisEnfermera", {
            templateUrl: "../views/registroEnfermera.html",
            controller: "registroEnf"
        })
        .when("/enfermera-success", {
            templateUrl: "../views/principal.html",
            controller: "registroEnf"
        })
        .otherwise({
            templateUrl: "../views/error.html"
        });
});
/* NUNCA BORRAR ESTE CONTROLADOR */
app.controller('homeController', function($scope) {
    $scope.message = 'Realiza tu consulta online con nosotros';
});

/* -------------------------------- FORMULARIO ALTA REGISTRO -------------------------------*/

app.controller('registroPac', ['$scope', '$location', function($scope, $location) {
    $scope.paciente = [];
    $scope.paciente.sexo = [
        { value: "Masculino", label: "Masculino" },
        { value: "Femenino", label: "Femenino" }
    ]
    $scope.registrar = function() {
        $location.path('/altaRegistro-success');
    };
}]);
/* -------------------------------- FORMULARIO REGISTRO MÉDICO -------------------------------*/

app.controller('registroMed', ['$scope', '$location', function($scope, $location) {
    $scope.medico = [];
    var pass1 = $scope.medico.pass;
    var pass2 = $scope.medico.pass2;
    /* Falta implementar bien esto */
    if (pass1 != pass2) {
        alert("Contraseñas no coinciden");
    } else {
        $scope.registrarMed = function() {
            $location.path('/medico-success');
        };
    }
}]);

/* ------------------------------ FORMULARIO REGISTRO ENFERMERA -----------------------------*/
app.controller('registroEnf', ['$scope', '$location', function($scope, $location) {
    $scope.enfermera = [];
    $scope.registrarEnf = function() {
        $location.path('/enfermera-success');
    };
}]);