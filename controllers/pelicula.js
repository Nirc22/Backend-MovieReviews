const { response } = require('express');

const Pelicula = require('../models/Pelicula');
const Calificacion = require('../models/MovieReviews');

const fs = require('node:fs');

const getPeliculas = async (req, resp = response) => {
    try {
        const peliculas = await Pelicula.find().populate('director')
            .populate('actores.actor')
            .populate('generos.genero')
            .populate('calificacion');
        resp.status(200).json({
            ok: true,
            msg: 'Lista de Peliculas',
            peliculas
        })
    } catch (error) {

    }
}

const crearPelicula = async (req, resp = response) => {
    try {
        calificacion = new Calificacion();
        pelicula = new Pelicula(req.body);
        calificacion.pelicula = pelicula.id;
        pelicula.calificacion = calificacion.id;
        await pelicula.save();
        await calificacion.save();


        return resp.status(200).json({
            ok: true,
            msg: 'Pelicula registrada',
            uid: pelicula.id,
            calificacion: pelicula
        })
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al registrar pelicula'
        })
    }
}

const actualizarPelicula = async (req, resp = response) => {

    const peliculaId = req.params.id;

    try {

        const pelicula = await Pelicula.findById(peliculaId);

        if (!pelicula) {
            return resp.status(400).json({
                ok: false,
                msg: 'El id no corresponde a ninguna pelicula',
            });
        }

        const peliculaActualizada = await Pelicula.findByIdAndUpdate(peliculaId, req.body, { new: true });

        return resp.status(200).json({
            ok: true,
            msg: 'Pelicula actualizada de manera exitosa',
            rol: peliculaActualizada
        });


    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al actualizar la pelicula',
        });
    }
}

const getPeliculaById = async (req, resp = response) => {
    try {
        const { id } = req.params;
        const pelicula = await Pelicula.findById(id).populate('director')
            .populate('actores.actor')
            .populate('generos.genero')
            .populate('calificacion');
        return resp.status(200).json({
            ok: true,
            msg: 'Pelicula',
            pelicula
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al listar Pelicula',
        });
    }
}

imagen = async (req, resp = response) =>{
    console.log(req.file);
    saveImage(req.file)
    resp.send('Termina');
}

function saveImage(file){
    const newPath = `./uploads/${file.originalname}`;
    fs.renameSync(file.path, newPath);
    return newPath;
}

const savePelicula = async(req, resp= response) =>{
    try {
        // nuevaPelicula = new Pelicula(req.body);
        // console.log(nuevaPelicula)
        const {nombre, director, actores, anio, generos} = req.body
        const validacion = validar(req.file,'Y')
        if(validacion == ''){
            nuevaPelicula = new Pelicula({
                nombre:nombre,director:director,actores:actores,anio:anio,generos:generos,
                imagenPelicula:'./uploads/'+req.file.filename
            })
            console.log(nuevaPelicula)

            // return await nuevaPelicula.save().then(
            //     () => {resp.status(200).json({ok:true, msg:'Pelicula creada'})}
            // )
            await nuevaPelicula.save();

            return resp.status(200).json({
                ok: true,
                msg: 'Pelicula registrada',
                uid: nuevaPelicula
                // calificacion: pelicula.calificacion
            })
        }else{
            return resp.status(200).json({
                ok:false,
                mgs:validacion
            })
        }
        
    } catch (error) {
        return resp.status(500).json({
            ok:false,
            mgs:'error esssss',error
        })
        
    }
}

const validar = (nombre, director, actores, anio, generos, imagenPelicula, sevalida) =>{
    var errors = []
    // if(nombre === undefined||nombre.trim()===''){
    //     errors.push('El nombre NO debe estar vacío')
    // }
    if(sevalida === 'Y' && imagenPelicula === undefined){
        errors.push('Selecciona una imagen en formato jpg o png')
    }else{
        if(errors != ''){
            fs.unlinkSync('./uploads/'+imagenPelicula.filename)
        }
    }
    return errors
}

module.exports = {
    crearPelicula,
    getPeliculas,
    actualizarPelicula,
    getPeliculaById,
    imagen,
    saveImage,
    savePelicula
}