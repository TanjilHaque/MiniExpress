/**
 * miniexpress frame work project.
 * for project --> routes, middleware, outSideRoutes
 * tech JS --> Promise
 * Node JS ---> fs, http, events
 */

const { log } = require("console");
const miniExpress = require("./framework/app");
const app = new miniExpress();

app.use((req, res, next) => {
  log("middleware funciton 1", req.url);
  next();
});
app.use((req, res, next) => {
  log("middleware funciton 2", req.method);
  res.end("The middleware ended");
});
app.get("/home", (req, res) => {
  res.end("we are in home route");
});
app.get("/about", () => {});
app.get("/blog", () => {});
app.post("/submit", () => {});
app.miniExpressListen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
