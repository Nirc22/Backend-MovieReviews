const jwt = require('jsonwebtoken');

const generarJWT = (uid, rol, nombre) => {
    return new Promise((resolve) => {
        const payload = {uid, rol, nombre};
        // const payload = {uid, rol};


        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if(err) {
                console.log(err);
                reject('No se pudo generar el token')
            } else {
                resolve(token)
            }
        })
    });
}

const obtenerIdUsuarioDesdeToken = (token) => {
    if(token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    try {
        const decoded  = jwt.verify(token, process.env.SECRET_KEY);
        // console.log("IDDDDDDDDD",decoded.uid)
        return decoded.uid;

    } catch (error) {
        console.error('Error al verificar el token:', error);
        return null; // Devolver null si hay un error al verificar el token
    }
}

module.exports = {
    generarJWT,
    obtenerIdUsuarioDesdeToken
};