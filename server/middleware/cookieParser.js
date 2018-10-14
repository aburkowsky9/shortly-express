const parseCookies = (req, res, next) => {
  console.log(req.get('Cookie'));
  var cookie = req.headers.cookie;
  if (!cookie) {
    next();
  } 
  else {
    var cookiesArr = cookie.split('; ');
    cookiesArr.forEach((item) => {
      var cookieSplit = item.split('=');
      req.cookies[cookieSplit[0]] = cookieSplit[1];
    })
    next();
  }
  
};

module.exports = parseCookies;