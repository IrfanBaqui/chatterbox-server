/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var obj = {results: []};

var requestHandler = exports.requestHandler = function(request, response) {

  //Primary Log
  console.log("Serving request type " + request.method + " for url " + request.url);
  //Supported URLs
  var baseURL1 = '/classes/room';
  var baseURL2 = '/classes/messages';
  var statusCode;

  // Unsupported URLs return 404 status code
  if (request.url.indexOf(baseURL1) === -1 && request.url.indexOf(baseURL2) === -1) {
    statusCode = 404;
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = "text/plain";
    response.writeHead(statusCode, headers);
    response.end("YES!!");
  }

  statusCode = 200;
  if (request.method === 'GET' && (request.url.indexOf(baseURL1) > -1 || request.url.indexOf(baseURL2) > -1)) {

    var headers = defaultCorsHeaders;
    headers['Content-Type'] = "text/plain";
    response.writeHead(statusCode, headers);
    console.log('GET method works');
    response.end(JSON.stringify(obj));
  }

  if (request.method === 'POST')  {
    var str = "";
    console.log('POST method works');

    request.on('data', function (chunk) {
      str = str + chunk;
    });
    request.on('end', function () {
      obj.results.push(JSON.parse(str));
    });
    statusCode = 201;
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = "text/plain";
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(obj));
  }
};

var defaultCorsHeaders = exports.defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

