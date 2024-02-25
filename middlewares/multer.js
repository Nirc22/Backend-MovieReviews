const multer = require('multer');
const { dirname, join } = require('path');
const { fileURLToPath } = require('url');
// import { dirname} from'path';


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



// const CURRENT_DIR = dirname(fileURLToPath(import.meta.url))

const MIMETYPES = ['image/jpeg','image/jpg','image/png']

const uploadImagen = multer({
    // dest: join(CURRENT_DIR, './uploads'),
    // dest: './uploads',
    storage: multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    }),
    fileFilter: (req, file, cb) => {
        if(MIMETYPES.includes(file.mimetype)){
            cb(null, true)
        }else{
            cb(new Error(`Solo se permiten archivos tipo ${MIMETYPES.join(' ')}`))
        }

        // if (!file || file === undefined) {
        //     console.log('vacioooooo')
        //     // Si el archivo es nulo o vacío, se considera inválido
        //     cb(new Error(`El archivo está vacío `));
        // } else if (!MIMETYPES.includes(file.mimetype)) {
        //     // Si el tipo de archivo no está permitido, se considera inválido
        //     cb(new Error(`Solo se permiten archivos tipo ${MIMETYPES.join(' ')}`));
        // } else {
        //     // Si el archivo cumple con todas las validaciones, se considera válido
        //     cb(null, true);
        // }
    },
    limits: {
        fileSize: 10000000
    },    
});


module.exports = {
    upload,
    subirImagen,
    uploadImagen

}