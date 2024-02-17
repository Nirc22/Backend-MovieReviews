const { Schema, model } = require('mongoose');

const MovieReviewSchema = Schema({
    pelicula: {
        type: Schema.Types.ObjectId,
        ref: 'pelicula',
        required: true,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    sumReviews: {
        type: Number,
        required: true,
        default: 0
    },
    calificacion: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = model('movieReview', MovieReviewSchema)