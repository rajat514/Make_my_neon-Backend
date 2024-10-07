const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require("fs");

let uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}


async function imageValidation(files) {

    try {
        if (!files || Object.keys(files).length === 0) {
            return 'No files is uploaded.'
        }

        const allowedTypes = ['video/mp4', 'image/jpeg', 'image/png', 'image/gif'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (Array.isArray(files)) {
            // Handle multiple files
            for (const file of files) {

                if (!allowedTypes.includes(file.mimetype)) {
                    return 'Invalid file type. Only JPEG, PNG, and GIF files are allowed.'
                }

                // Validate file size
                if (file.size > maxSize) {
                    return 'File size exceeds the 5MB limit.'
                }
                file.name = Date.now() + '-' + file.name;
                let uploadPath = path.join(uploadDir, file.name);

                // Move each file to the uploads directory
                file.mv(uploadPath, err => {

                    if (err) {
                        return 'Error occurred while uploading the file.'
                    };
                    return;
                });
            }
            return
        } else {
            if (!allowedTypes.includes(files.mimetype)) {
                return 'Invalid file type. Only JPEG, PNG, and GIF files are allowed.';
            }
            // Validate file size
            if (files.size > maxSize) {
                return 'File size exceeds the 2MB limit.';
            }
            // If only one file is uploaded, handle it separately
            files.name = Date.now() + '-' + files.name
            let uploadPath = path.join(uploadDir, files.name);

            files.mv(uploadPath, err => {
                if (err) return 'Error occurred while uploading the file.'
                return
            });
        }
        return

    } catch (err) {
        // console.log(err.message);
        return 'err';
    }
};



module.exports = {
    imageValidation
}