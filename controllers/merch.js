const { handleUpload } = require("../cloudinary");
const Merch = require("../models/Merch");
const ExpressError = require("../utils/ExpressError");

exports.getAllMerch = async (req, res, next) => {
  try {
    const merch = await Merch.find();
    res.status(200).json(merch);
  } catch (e) {
    next(new ExpressError(e.message, 500));
  }
};

exports.getCollections = async (req, res, next) => {
  const { collection } = req.params;
  try {
    const merch = await Merch.find({ category: collection });
    if (!merch) return next(new ExpressError("No such merch", 404));
    res.status(200).json(merch);
  } catch (e) {
    next(new ExpressError(e.message, 500));
  }
};

exports.getSingleMerch = async (req, res, next) => {
  try {
    const { merchId } = req.params;
    const merch = await Merch.findById(merchId);
    if (!merch) return next(new ExpressError("Merch not found", 404));

    res.status(200).json(merch);
  } catch (e) {
    next(new ExpressError(e.message, 500));
  }
};

exports.updateMerch = async (req, res, next) => {
  try {
    const { name, category, price, discountPrice, sizes } = req.body;
    console.log(req.body);
    const images = req.files;

    const sizesArray = sizes.trim().split(/\s+/);

    const { merchId } = req.params;

    console.log(req.body);

    if (!merchId) {
      //create new merch

      const merch = new Merch({ name, category, price, sizes: sizesArray });

      for (const image of images) {
        const uploadedImage = await handleUpload(image.buffer, "Rebirth Merch");
        merch.images.push(uploadedImage);
      }

      await merch.save();
      updatedMerch = merch;
    } else {
      //edit existing merch
      const existingMerch = await Merch.findById(merchId);
      if (!existingMerch) return next(new ExpressError("Merch not found", 404));
      if (images.length > 0) {
        for (const image of images) {
          const uploadedImage = await handleUpload(
            image.buffer,
            "Rebirth Merch"
          );
          existingMerch.images.push(uploadedImage);
        }
      }
      existingMerch.name = name;
      existingMerch.category = category;
      existingMerch.price = price;
      existingMerch.sizes = sizesArray;
      existingMerch.discountPrice = discountPrice;
      await existingMerch.save();
      updatedMerch = existingMerch;
    }

    res
      .status(merchId ? 200 : 201)
      .json({ message: "Merch Updated", updatedMerch });
  } catch (e) {
    next(new ExpressError(e.message, 500));
  }
};

exports.deleteMerch = async (req, res, next) => {
  const { merchId } = req.params;
  try {
    await Merch.findByIdAndDelete(merchId);
    res.status(200).json({ message: "Merch Deleted", merchId });
  } catch (e) {
    next(new ExpressError(e.message, 500));
  }
};
