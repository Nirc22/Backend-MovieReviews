const {response, request} = require('express');


const validar = async (req, res = response, next) =>{

    const validacion = validar(req.file,'Y')
    if(req.file){
        

    }
    // var errors = []
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