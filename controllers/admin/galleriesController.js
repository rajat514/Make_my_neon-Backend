const Galleries = require("../../modals/galleries");
const { imageValidation } = require("../../middleware/image")


const handlePostGallery = async (req, res) => {
    try {
        const { type, text } = req.body;

        const files = req.body.file;
        console.log(files)
        if (!files) return res.status(400).json({ errorMsg: 'no file uploaded!' });

        if (Array.isArray(files)) {
            return res.status(400).json({ errorMsg: 'only one file upload!' });
        }

        const value = await imageValidation(files);

        if (value) {
            console.log(value)
            return res.status(400).json({ errorMsg: value });
        }

        if (type === 'corousel') {
            if (['image/jpeg', 'image/png', 'image/gif'].includes(files.mimetype)) {
                const galleryData = await Galleries.create({
                    type,
                    url: files.name
                });

                return res.status(201).json({ successMsg: 'file uploaded.', data: galleryData });
            }
            else {
                return res.status(400).json({ errorMsg: 'file not correct!' })
            }
        }
        if (type === 'videoGallery') {
            if (files.mimetype === 'video/mp4') {
                const galleryData = await Galleries.create({
                    type,
                    url: files.name,
                    text
                });

                return res.status(201).json({ successMsg: 'file uploaded.', data: galleryData });
            }
            else {
                return res.status(400).json({ errorMsg: 'file not correct!' })
            }
        }
        else return res.status(400).json({ errorMsg: 'no file is uploaded!' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error })
    }
};


const handleCorouselGallery = async (req, res) => {
    try {
        const corouselData = await Galleries.find({ type: 'corousel' })

        return res.status(200).json({ data: corouselData })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error })
    }
};

const handleVideoGallery = async (req, res) => {
    try {
        const videoData = await Galleries.find({ type: 'videoGallery' });

        return res.status(200).json({ data: videoData })
    } catch (error) {
        return res.status(500).json({ errorMsg: error })
    }
};

const handleDeleteGallery = async (req, res) => {
    try {
        const { galleryId } = req.query;

        await Galleries.findByIdAndDelete(galleryId);

        return res.status(200).json({ successMsg: 'gallery successfully deleted!' });

    } catch (error) {
        return res.status(500).json({ errorMsg: error })
    }
}


module.exports = {
    handlePostGallery, handleCorouselGallery, handleVideoGallery, handleDeleteGallery
}