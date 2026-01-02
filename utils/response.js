function success(res, data = null, message = 'Success', meta = {}, status = 200) {
    const payload = {
        success: true,
        message,
        data,
        meta,
    };
    return res.status(status).json(payload);
}

function error(res, message = 'Error', status = 500, details = null) {
    const payload = {
        success: false,
        message,
        details,
    };
    return res.status(status).json(payload);
}

function attachResponses(req, res, next) {
    res.apiSuccess = (data, message = 'Success', meta = {}, status = 200) =>
        success(res, data, message, meta, status);

    res.apiError = (message = 'Error', status = 500, details = null) =>
        error(res, message, status, details);

    next();
}

module.exports = { success, error, attachResponses };
