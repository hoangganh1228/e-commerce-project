const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
// Cloudinary

cloudinary.config({ 
    cloud_name: 'dnczc3gzn', 
    api_key: '185176958515381', 
    api_secret: '6HbsgOAVH3UloQF9JsJ5QpB3zEI' 
  });

//End Cloudinary


module.exports.upload = (req, res, next) => {
    if(req.file) {
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );

                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        async function upload(req) {
            let result = await streamUpload(req);
            req.body[req.file.fieldname] = result.secure_url;
            next();
            
        }

        upload(req);
    }
    else {
    next();

    }
}