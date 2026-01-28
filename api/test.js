module.exports = (req, res) => {
    res.status(200).json({
        message: 'Vercel Serverless Function is Working!',
        timestamp: new Date().toISOString(),
        path: req.url
    });
};
