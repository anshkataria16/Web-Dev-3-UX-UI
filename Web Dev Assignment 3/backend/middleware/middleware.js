const errorHandler = (err, req, res, next) => {

    console.log(err.message);

    // Validation Error
    if (err.name === "ValidationError") {
        return res.status(400).json({
            message: "Please Enter Valid Data",
            error: err.message
        });
    }
    if (err.code === 11000) {
    return res.status(400).json({
        message: "SKU Already Exists"
    });
}
    // Invalid ID Error
    if (err.name === "CastError") {
        return res.status(400).json({
            message: "Invalid Product ID"
        });
    }

    // Other Errors
    res.status(500).json({
        message: "Server Error"
    });
};

export default errorHandler;