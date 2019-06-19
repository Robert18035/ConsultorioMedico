const pool = require('./dbConexion');
const randomstring = require('randomstring');
const mailer = require('./mailer');


module.exports = app => {

    //*********************GET*********************************


    app.get('/', (req, res) => {
        res.render('index.html');
    });

    app.get('/verificar', (req, res) => {
        res.render('views/verificar.html');
    });


    //******************** POST *******************************

    app.post('/registroMed', async(req, res) => {
        console.log("entro al metodo post registro medico");
        const { nombre, correo, contra } = req.body;
        const validado = false;
        const activo = false;
        const token = randomstring.generate();

        await pool.query('INSERT INTO medicos SET ? ', {
            correo,
            contra,
            nombre,
            activo,
            validado,
            token
        });
        res.status(200).send({
            message: "Registro realizado, favor de verificar su correo"
        });

        //envio del correo
        const html = 'Hola medico <br> gracias por registrarte <br> Te invitamos a verificar tu cuenta <br> Ingresa el siguiente codigo: <b>' + token + '</b><br>en la siguiente página: <a href="http://localhost:3000/verificar">http://localhost:3000/verificar</a>';
        await mailer.sendEmail('consultorioMedico@edu.uaa.mx', correo, 'Verificacion Medico', html);
        console.log("termino post registro medicos");
    });

    app.post('/infoToken', async(req, res) => {

        var secretToken = req.body.token;
        var usuario = await pool.query('SELECT * FROM medicos WHERE token =?', secretToken);

        if (!usuario[0]) {
            console.log("token no valido");
            res.status(400).send({
                message: "Token no valido, favor de verificar"
            });
            return;
        }
        console.log("token valido")
        await pool.query('Update medicos SET validado = 1 WHERE token =?', secretToken);

        res.status(200).send({
            message: "Verificacion realizada, ahora podrá ingresar a su cuenta"
        });
    });
    /* LOGIN DEL MEDICO */
    app.post('/login', async(req, res) => {
        var correo = req.body.correo;
        var pass = req.body.pass;

        const resultado = await pool.query('SELECT * FROM medicos WHERE correo = ? AND contra = ?', [correo, pass]);

        console.log('Resultado: ' + JSON.stringify(resultado));

        if (!resultado[0]) {
            res.status(401).json({ message: "Datos invalidos" });
        } else {
            res.status(200).send(resultado);
        }
    });

};