const PROXY_CONFIG = [
    {
        context: [
            "/api/subSheds",
            "/api/login",
        ],
        target: "http://localhost",
        secure: true
    }
]

module.exports = PROXY_CONFIG;
