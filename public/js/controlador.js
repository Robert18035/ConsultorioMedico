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
        /* -------------------------ENFERMERAS---------------------------------- */
        .when("/enfermera", {
            templateUrl: "../views/enfermera.html"
        })

    /* -------------------------PÁGINAS DEL MÉDICO---------------------------------- */
    .when("/indexMed", {
            templateUrl: "../views/logins/medico/medico.html",
            controller: "indexMedico"
        })
        .when("/consulta", {
            templateUrl: "../views/logins/medico/videochat.html",
            controller: "sala"
        })
        .when("/misCons", {
            templateUrl: "../views/logins/medico/consultas.html",
            controller: "misConsultas"
        })
        // Este controlador supongo que debe de llevar a un controlador de cerrar sesión (?) 
        // De mientras lo voy a dejar comentado, si lo dejo activo se traba la página (idk) 
        /*.when("/logOut", {
            templateUrl: "../index.html"
        })*/
        /* -------------------------PÁGINAS DE LA ENFERMERA---------------------------------- */
        /* -------------------------PÁGINAS DEL ADMINISTRADOR---------------------------------- */
        .when("/admin", {
            templateUrl: "../views/logins/admin/admin.html",
            controller: "indexAdmin"
        })
        .when("/statistics", {
            templateUrl: "../views/logins/admin/estadisticas.html",
            controller: "stds"
        })
        .when("/regisEnfermera", {
            templateUrl: "../views/registroEnfermera.html",
            controller: "registroEnf"
        })
        .when("/enfermera-success", {
            templateUrl: "../views/principal.html",
            controller: "registroEnf"
        })
        /* -------------------------ERROR---------------------------------- */
        .otherwise({
            templateUrl: "../views/error.html"
        });
});
/* NUNCA BORRAR ESTE CONTROLADOR */
app.controller('homeController', function($scope) {
    $scope.message = 'Realiza tu consulta online con nosotros';
});

// SERVICIO DE AUTOIDENTIFICACIÓN

app.service('credenciales', function() {
    var credenciales;

    var setCredenciales = function(obj) {
        credenciales = obj[0];
        //console.log('Credenciales: ' + JSON.stringify(credenciales));
    }

    var getCredenciales = function() {
        return credenciales;
    }

    return {
        setCredenciales: setCredenciales,
        getCredenciales: getCredenciales
    };

});

/* -------------------------------- FORMULARIO ALTA REGISTRO PACIENTE -------------------------------*/

app.controller('registroPac', ['$scope', '$location', '$http', function($scope, $location, $http) {
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

        var nombre = $scope.paciente.nombre;
        var fechaNacimiento = $scope.paciente.fecha;
        var genero = $scope.paciente.gender;
        var correo = $scope.paciente.email;
        var nivelSocioEcono = $scope.paciente.nivelEcono;

        //parametrizacion

        var data = {
            nombre: nombre,
            fechaNacimiento: fechaNacimiento,
            sexo: genero,
            correo: correo,
            nivelSocioEcon: nivelSocioEcono
        };

        console.log(data);
        $http.post('/regisPaciente', data)
            .then(function(response) {
                    alert(response.data.message);
                    $location.path('/altaRegistro-success');
                },
                function(response) {
                    alert(response.data.message);
                    $location.path('/altaRegistro');
                }
            );
    };
}]);
/* -------------------------------- FORMULARIO REGISTRO MÉDICO -------------------------------*/

app.controller('registroMed', ['$scope', '$location', '$http', function($scope, $location, $http) {
    console.log("Inicio controlador registro medico");
    $scope.medico = [];
    var pass1 = $scope.medico.contra;
    var pass2 = $scope.medico.contra2;
    if (pass1 != pass2) {
        alert("Contraseñas no coinciden");
    } else {
        $scope.registrarMed = function() {
            $location.path('/medico');
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

app.controller('inicioMed', ['$scope', '$http', '$location', 'credenciales', function($scope, $http, $location, credenciales) {
    //console.log("Inicio controlador inicio medico");
    $scope.medico = [];
    $scope.login = function() {
        let correo = $scope.medico.correo;
        let pass = $scope.medico.pass;

        let data = {
            correo: correo,
            pass: pass
        };

        $http.post('/login', data)
            .then(function(response) {
                credenciales.setCredenciales(response.data);
                //console.log('Credenciales:' + JSON.stringify(credenciales.getCredenciales()));
                console.log(response.data[0]);
                sessionStorage.setItem('user', JSON.stringify(response.data[0]));
                $location.path("/indexMed");
                //almacenar sesion en local storage
                //console.log(response.data);

            }, function(response) {
                alert(JSON.stringify(response.data));
            });
    }
}]);
//--------------------------------PÁGINAS DEL MÉDICO------------------------------

app.controller('indexMedico', function($scope, $location, $http) {
    if (JSON.parse(sessionStorage.getItem('user'))) {
        document.getElementById('cabecera').style.display = "none";

        //console.log(JSON.parse(sessionStorage.getItem('user')).nombre);
        var user = JSON.parse(sessionStorage.getItem('user'));
        $scope.medico = user.nombre;
        $scope.id = user.idMed;
        $scope.nombre = user.nombre;
        $scope.correo = user.correo;
        //var data = user;

        /*$http({
            method: 'GET',
            url: 'infoMedico',
            params: data
        }).then(function(response) {

        }, function(response) {
            //alert(JSON.stringify(response.data));
        });
        /*$http.get('/infoMedico', data)
            .then(function(response) {

            }, function(response) {
                alert(JSON.stringify(response.data));
            });*/

    } else {
        $location.path('/');
    }



});

app.controller('sala', function($scope, $location) {
    if (JSON.parse(sessionStorage.getItem('user'))) {
        document.getElementById('cabecera').style.display = "none";
        console.log(JSON.parse(sessionStorage.getItem('user')).nombre);
        $scope.medico = JSON.parse(sessionStorage.getItem('user')).nombre;
    } else {
        $location.path('/');
    }
});

app.controller('misConsultas', function($scope, $location) {
    if (JSON.parse(sessionStorage.getItem('user'))) {
        document.getElementById('cabecera').style.display = "none";
        console.log(JSON.parse(sessionStorage.getItem('user')).nombre);
        $scope.medico = JSON.parse(sessionStorage.getItem('user')).nombre;
    } else {
        $location.path('/');
    }
});

//--------------------------------PÁGINAS DEL ADMINISTRADOR------------------------------

app.controller('indexAdmin', function() {
    document.getElementById('cabecera').style.display = "none";

});
app.controller('stds', function() {
    document.getElementById('cabecera').style.display = "none";
    var ctx = document.getElementById('chart');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
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
    document.getElementById('cabecera').style.display = "none";
    $scope.enfermera = [];
    $scope.registrarEnf = function() {
        $location.path('/enfermera-success');
    };
}]);