// first server of waf

import http from "http";

// create server
const server = http.createServer((req, res) => {
    // handle routes
    switch (req.url) {
        case '/about':
            res.end("About page");
            break;

        // default routes homepage (not recommended: but if nothing matching then revert user to homepage)
        case '/':
        default:
            res.end("Homepage");
    }
})

server.listen(3000, "localhost", () => console.log("server is running at http://localhost:3000"));

// Todo: save logs of each request