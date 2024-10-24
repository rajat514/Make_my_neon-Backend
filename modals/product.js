const mongoose = require("mongoose");
const slug = require("slug");

const productSchema = mongoose.Schema({
    categoryId: {
        type: mongoose.ObjectId,
        ref: 'category'
    },
    name: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        unique: true
    },
    images: [],
    // colors: [],
    // colour: [{
    //     // name: String,
    //     colourCode: String
    // }],
    width: {
        type: Number,
        require: true
    },
    height: {
        type: Number,
        require: true
    },
    // quantity: {
    //     type: Number,
    //     require: true,
    //     default: '1'
    // },
    price: {
        type: Number,
        require: true
    },
    discount: {
        type: Number
    },
    discountedPrice: {
        type: Number
    },
    productReview: [{
        userId: {
            type: mongoose.ObjectId,
            ref: 'users'
        },
        productId: {
            type: mongoose.ObjectId,
            ref: 'products'
        },
        type: {
            type: String,
            enum: ['neonSign', 'product', 'floroSign']
        },
        image: {
            type: String
        },
        rating: {
            type: String,
            enum: ['0', '1', '2', '3', '4', '5'],
            default: '0',
            require: true
        },
        totalReviewCount: {
            type: String
        },
        reviewTitle: {
            type: String
        },
        review: {
            type: String,
            require: true
        },
        createdAt: {
            type: Date,
            default: Date.now // Automatically add a createdAt field with the current date
        }
    }]
},
    { timestamps: true }
);



productSchema.pre("save", async function (next) {
    if (this.isModified("name")) {
        // Generate initial slug from the name
        let newSlug = slug(this.name, { lower: true });
        let slugExists = true;
        let count = 1;

        // Check if slug already exists in the database
        while (slugExists) {
            // Search for any documents with the same slug
            const existingProduct = await this.constructor.findOne({ slug: newSlug });

            if (!existingProduct || existingProduct._id.equals(this._id)) {
                // If no document is found or the slug belongs to the same document, break the loop
                slugExists = false;
            } else {
                // If the slug exists, append a number to make it unique
                newSlug = `${slug(this.name, { lower: true })}-${count++}`;
            }
        }

        // Assign the unique slug to the document
        this.slug = newSlug;
    }

    next();
});

const Product = mongoose.model('products', productSchema);


module.exports = Product