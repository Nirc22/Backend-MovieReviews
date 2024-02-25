const multer = require('multer');

const upload = multer({dest: 'uploads/'});

const guardar = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) =>{
        if(file !== null){
            // const ext = file.originalname.split('.').pop()
            cb(null, file.originalname)
        }
    },
    // fileFilter:(req, file, cb) =>{
    //     if
    // }
})

const filtro = (req, file, cb) =>{
    if(file && (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const subirImagen = multer({storage:guardar, fileFilter: filtro})


module.exports = {
    upload,
    subirImagen

}