const mongoose = require('mongoose');
const slugify = require('slugify');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A book must have a title'],
      unique: true,
      trim: true,
      minlength: [
        10,
        'A book title must have more or equal then 10 characters',
      ],
      maxlength: [
        225,
        'A book title must have less or equal then 10 characters',
      ],
    },
    slug: String,
    authors: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A book must have least one authors'],
      },
    ],
    pageCount: {
      type: Number,
      required: [true, 'A book must have page number'],
      default: 2,
    },
    publishingCompany: {
      type: String,
      required: [true, 'A book must have a publishing company'],
      default: 'Vô danh',
      unique: true,
      trim: true,
    },
    publisher: {
      type: String,
      required: [true, 'A book must have a publisher'],
      default: 'Vô danh',
      unique: true,
      trim: true,
    },
    publishedDate: {
      type: Date,
      default: Date.now,
    },
    thumbnailUrl: {
      type: String,
    },
    shortDescription: {
      type: String,
      trim: true,
    },
    longDescription: {
      type: String,
      trim: true,
      required: [true, 'A book must have a description'],
    },
    status: {
      type: String,
      trim: true,
      default: 'PUBLISH',
    },
    price: {
      type: Number,
      default: 1,
      required: [true, 'A book must have a price'],
      min: 1,
    },
    discount: {
      type: Number,
      min: 0,
      validate: function (val) {
        return val < this.price;
      },
      message: 'Discount price ({VALUE}) should be below regular price',
    },
    categories: [String],
    star: {
      type: Number,
      default: 4.5,
      min: 1,
      max: 5,
    },
    avgStar: {
      type: Number,
      default: 4.5,
      min: 1,
      max: 5,
    },
    secretBook: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

bookSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});
bookSchema.pre('findOneAndUpdate', async function (next) {
  const title = this.getUpdate();
  const book = await this.model.findOne(this.getQuery());
  if (title !== book.title) {
    book.slug = slugify(title.title, { lower: true });
    await this.model.updateOne(this.getQuery(), {
      slug: book.slug,
    });
  }
  next();
});
bookSchema.pre(/^find/, function (next) {
  this.find({ secretBook: { $ne: true } });
  this.populate({
    path: 'authors',
    select: 'name -_id',
  });
  next();
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
