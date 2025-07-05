const { log } = require("console");
const http = require("http");

class App {
  constructor() {
    (this.routes = []), (this.middleware = []);
  }
  //use method
  //In Express.js, the use method registers
  //  middleware functions that execute for
  //  every request or for specific paths,
  //  regardless of HTTP method (GET, POST, etc.).
  use(middlewareFn) {
    this.middleware.push(middlewareFn);
  }

  //get method
  //The get method in Express defines a route
  //  that listens for HTTP GET requests on a
  //  specific path and sends a response.

  get(path, handlerFn) {
    const GETREQUEST = {
      method: "GET",
      path: path,
      handlerFn: handlerFn,
    };
    this.routes.push(GETREQUEST);
  }
  //post method
  //The post method in Express defines a route
  //  that handles HTTP POST requests, typically
  //  used to receive and process data sent from
  //  a client.

  post(path, handlerFn) {
    const POSTREQUEST = {
      method: "POST",
      path: path,
      handlerFn: handlerFn,
    };
    this.routes.push(POSTREQUEST);
  }
  //middleware
  executeMiddleware(req, res) {
    const dispatch = (i = 0) => {
      if (i >= this.middleware.length) return new Promise.resolve();
      const singleMw = this.middleware[i];
      return new Promise((resolve, reject) => {
        singleMw(req, res, () => {
          resolve(dispatch(i + 1));
        });
      });
    };
    return dispatch(0);
  }
  //The listen method in Express starts the
  //  server and makes it listen for incoming requests on a specified port.
  miniExpressListen(port, callback) {
    const server = http.createServer(async (req, res) => {
      //log(req.url); kon url theke hit korse eta dey
      //log(req.url); kon method theke call korse eta dey
      //search routes
      await this.executeMiddleware(req, res);
      const searchRoutes = this.routes.find(
        (r) => r.method === req.method && r.path === req.url
      );
      if (searchRoutes) {
        searchRoutes.handlerFn(req, res);
      } else {
        res.writeHead(404, {
          "content-type": "plain/text",
        });
        res.end("Route not found");
      }
    }); // creates http server
    server.listen(port, callback); //listen method of http
  }
}

module.exports = App;
