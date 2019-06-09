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
        /* -----------------------AUTO REGISTRO DE PACIENTES------------------------------------ */
        .when("/altaRegistro", {
            templateUrl: "../views/altaRegistro.html",
            controller: "registroPac"
        })
        .when("/altaRegistro-success", {
            templateUrl: "../views/principal.html",
            controller: "registroPac"
        })
        /* ------------------------REGISTRO DE MÉDICOS----------------------------------- */
        .when("/medico", {
            templateUrl: "../views/medico.html",
            controller: "inicioMed"
        })
        .when("/regisMedico", {
            templateUrl: "../views/registroMedico.html",
            controller: "registroMed"
        })
        .when("/medico-success", {
            templateUrl: "../views/principal.html",
            controller: "registroMed"
        })
        /* -------------------------REGISTRO DE ENFERMERAS---------------------------------- */
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
        /* -------------------------PÁGINAS DEL MÉDICO---------------------------------- */
        .when("/indexMed", {
            templateUrl: "../views/logins/medico/medico.html",
            controller: "indexMedico"
        })
        .when("/consulta", {
            templateUrl: "../views/logins/medico/videochat.html"
        })
        .when("/misCons", {
            templateUrl: "../views/logins/medico/consultas.html"
        })
        // Este controlador supongo que debe de llevar a un controlador de cerrar sesión (?) 
        // De mientras lo voy a dejar comentado, si lo dejo activo se traba la página (idk) 
        /*.when("/logOut", {
            templateUrl: "../index.html"
        })*/
        /* -------------------------PÁGINAS DE LA ENFERMERA---------------------------------- */
        /* -------------------------PÁGINAS DEL ADMINISTRADOR---------------------------------- */
        /* -------------------------ERROR---------------------------------- */
        .otherwise({
            templateUrl: "../views/error.html"
        });
});
/* NUNCA BORRAR ESTE CONTROLADOR */
app.controller('homeController', function($scope) {
    $scope.message = 'Realiza tu consulta online con nosotros';
});

/* -------------------------------- FORMULARIO ALTA REGISTRO PACIENTE -------------------------------*/

app.controller('registroPac', ['$scope', '$location', function($scope, $location) {
    $scope.paciente = [];
    $scope.paciente.sexo = [
        { value: "Masculino", label: "Masculino" },
        { value: "Femenino", label: "Femenino" }
    ]
    $scope.paciente.nivelEcon = [
        { value: "Bajo", label: "Bajo" },
        { value: "Medio", label: "Medio" },
        { value: "Alto", label: "Alto" }
    ]

    $scope.registrar = function() {
        $location.path('/altaRegistro-success');

        console.log("********entro**********");
        var nombre = $scope.nombre;
        var correo = $scope.correo;
        var contra = $scope.contra;

        //parametrizacion

        var data = {
            nombre: nombre,
            correo: correo,
            contra: contra
        };
        console.log(data);
        $http.post('/enviar', data)
            .then(function(response) {
                    alert(response.data.message);

                },
                function(response) {
                    alert(response.data.message);
                }
            );
    };
}]);
/* -------------------------------- FORMULARIO REGISTRO MÉDICO -------------------------------*/

app.controller('registroMed', ['$scope', '$location', '$http', function($scope, $location, $http) {
    console.log("Inicio controlador registro medico");
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

    $scope.registro = function() {
        console.log("boton registro presionado");
        let nombre = $scope.medico.nombre;
        let correo = $scope.medico.correo;
        let contra = $scope.medico.contra;

        let data = {
            nombre: nombre,
            correo: correo,
            contra: contra
        };

        $http.post('/registroMed', data)
            .then(function(response) {
                    alert(response.data.message);

                },
                function(response) {
                    alert(response.data.message);
                }
            );
    };



}]);

/*--------------------------------- INICIO SESION MEDICO-------------------------------------*/

app.controller('inicioMed', ['$scope', '$location', function($scope, $location) {
    console.log("Inicio controlador inicio medico");
    $scope.medico = [];


}]);
//--------------------------------P+AGINAS DEL MÉDICO------------------------------

app.controller('indexMedico', function() {
    document.getElementById('cabecera').style.display = "none";
});

//------------------------------------Verificacion cuenta-------------------------------------

app.controller('verificacion', ['$scope', '$location', '$http', function($scope, $location, $http) {
    console.log("Inicio controlador verificacion");

    $scope.verificar = function() {
        let data = $.param({
                token: $scope.tokenU
            }

        );
        console.log(data);



        $http({
            url: '/infoToken',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            data: data

        }).then(function success(response) {
            alert(response.data.message);
            //redirigir a la pagina principal
            window.location.replace("http://localhost:3000/#!/medico");

        }, function error(response) {
            alert(response.data.message);
        });
    };

}]);



/* ------------------------------ FORMULARIO REGISTRO ENFERMERA -----------------------------*/
app.controller('registroEnf', ['$scope', '$location', function($scope, $location) {
    $scope.enfermera = [];
    $scope.registrarEnf = function() {
        $location.path('/enfermera-success');
    };
}]);