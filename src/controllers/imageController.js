const path = require('path');
const { randomName } = require('../helpers/hooks');
const fs = require('fs-extra');

const imageController = {};

imageController.imageUpload = async (req, res) => {
    const imgName = randomName();
    const imageTempPath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    const targetPath = path.resolve(`public/uploads/${imgName}${ext}`);

    if( ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif'){
        try {
            await fs.move(imageTempPath, targetPath);
        } catch (err) {
            console.error(err)
        }
    };
    
    res.send(req.file);
    res.end('works');
};

module.exports = imageController;