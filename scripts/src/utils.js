/**
 * Regex to match urls
 * @const
 */
var URL_REGEX = /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

/**
 * Util function to test if url is valid format
 * @param {string} url 
 */
export var validateUrl = (url) => {
  return URL_REGEX.test(url);
};

/**
 * Util function to get querystring parameter from url
 * @param {string} variableName
 */
export var getQueryVariable = (variableName) => {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variableName){return pair[1];}
  }
  return(false);
};