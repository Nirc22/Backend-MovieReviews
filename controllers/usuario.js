const { response } = require('express');

const Usuario = require('../models/Usuario');
const Calificacion = require('../models/MovieReviews');


const getUsuarioById = async (req, resp = response) => {
    try {
        const {id} = req.params;
        const usuario = await Usuario.findById(id);
        resp.status(200).json({
            ok: true,
            msg: 'Usuario',
            usuario
        });
    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'error al listar Usuario',
        });
    }
}

const getUsuarios = async (req, resp = response) => {
    try {

        const usuario = await Usuario.find().populate('nombre');
        resp.status(200).json({
            ok: true,
            msg: 'Lista de usuarios',
            usuario
        });
        
    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'error al listar usuarios',
        });
    }
}

const crearUsuario = async (req, resp = response) => {
    try {
        const { email, password } = req.body;

        let usuario = await Usuario.findOne({ email});
        if(usuario){
            return resp.status(201).json({
                ok: false,
                msg: 'Ya existe un usuario registrado con ese email'
            })
        }
        usuario = new Usuario(req.body);

        //Encriptar contraseña
        // const salt = bcrypt.genSaltSync();
        // usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        return resp.status(200).json({
            ok: true,
            msg: 'Registro de usuario exitoso',
            uid: usuario.id,
            name: usuario.name
        });
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al crear el usuario'
        })
    }
}

module.exports = {
    getUsuarioById,
    crearUsuario,
    getUsuarios
}