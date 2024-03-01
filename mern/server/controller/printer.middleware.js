
const printMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.originalUrl} - ${new Date().toLocaleString()}`);
    next();
};

export  default printMiddleware;
