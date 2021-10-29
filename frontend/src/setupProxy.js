const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
    app.use(
        "/api/v1",
        createProxyMiddleware({
            target: "http://localhost:8003",
            changeOrigin: true
        })
    )
};
