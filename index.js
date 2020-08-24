// Deklarasi Utama
const { request } = require("http");
const { json } = require("body-parser");

const   express     = require("express"),
        app         = express(),
        http        = require("http").Server(app),
        morgan      = require("morgan"),
        bodyParser  = require("body-parser"),
        path        = require("path"),
        md5         = require("md5");

app.engine("html", require("ejs").renderFile);
app.use((request, result, next) => {
    result.header("Access-Control-Allow-Origin", "*");
    result.header("Acess-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (Request.method === "OPTIONS") {
        result.header("Access-Control-Allow-Method", "PUT, POST, PATCH, DELETE, GET");

        return result.status(200).json({
            "status"    : "OKEY",
            "code"      : 200
        });
    }
});

app.use(morgan("combined", {
    skip : (Request, result, next) => {return result.statusCode < 400 }
}));

app.use("/", express.static("webkopi"));
app.use("/uploads", express.static("uploads"));
app.use("/assets", express.static(path.join(__dirname, "view/assets")));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.set("json space" , 2); 

app.use((Request, result, next) => {
    const error = new Error("404 Not Found");
    error.status = 404;
    next(error);
});

app.use((error, request, result, next) => {
    result.status(error.status || 500);
    result.json({
        error: {
            message : error.message
        }
    })
});

http.listen(8080);

module.exports = app;
