const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    const reqUrl = req.url;

    //  Hauptseite (indexGit.html)
    if (reqUrl === '/') {
        fs.readFile(path.join(__dirname, 'indexGit.html'), 'utf8', (err, data) => {
            if (err) { 
                res.statusCode = 500;
                res.end('Error loading HTML file');
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        });
    }

    //  CSS-Datei (styleGit.css)
    else if (reqUrl === '/styleGit.css') {
        fs.readFile(path.join(__dirname, 'styleGit.css'), 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Error loading CSS file');
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/css');
            res.end(data);
        });
    }

    //  JavaScript-Datei (hangmanGit.js)
    else if (reqUrl === '/hangmanGit.js') {
        fs.readFile(path.join(__dirname, 'hangmanGit.js'), 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Error loading JS file');
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/javascript');
            res.end(data);
        });
    }

    // Fallback für nicht gefundene Routen
    else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

// Server starten
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

