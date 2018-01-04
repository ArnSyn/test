/**
 * The Util service is for thin, globally reusable, utility functions
 */

import {
  isFunction,
  noop,
} from 'lodash';
import { Response } from '@angular/http';
import { xml2jsParser } from 'xml2js';
/**
 * Return a callback or noop function
 *
 * @param  {Function|*} cb - a 'potential' function
 * @return {Function}
 */
export function safeCb(cb) {
  return isFunction(cb) ? cb : noop;
}

/**
 * Parse a given url with the use of an anchor element
 *
 * @param  {String} url - the url to parse
 * @return {Object}     - the parsed url, anchor element
 */
export function urlParse(url) {
  var a = document.createElement('a');
  a.href = url;

  // Special treatment for IE, see http://stackoverflow.com/a/13405933 for details
  if (a.host === '') {
    a.href = a.href;
  }

  return a;
}

/**
 * Test whether or not a given url is same origin
 *
 * @param  {String}           url       - url to test
 * @param  {String|String[]}  [origins] - additional origins to test against
 * @return {Boolean}                    - true if url is same origin
 */
export function isSameOrigin(url, origins) {
  url = urlParse(url);
  origins = (origins && [].concat(origins)) || [];
  origins = origins.map(urlParse);
  origins.push(window.location);
  origins = origins.filter(function (o) {
    let hostnameCheck = url.hostname === o.hostname;
    let protocolCheck = url.protocol === o.protocol;
    // 2nd part of the special treatment for IE fix (see above):
    // This part is when using well-known ports 80 or 443 with IE,
    // when window.location.port==='' instead of the real port number.
    // Probably the same cause as this IE bug: https://goo.gl/J9hRta
    let portCheck = url.port === o.port || (o.port === '' && (url.port === '80' || url.port === '443'));
    return hostnameCheck && protocolCheck && portCheck;
  });
  return origins.length >= 1;
}

export function extractData(res: Response) {
  if (!res.text()) return {};
  return res.json() || {};
}

export function promisesParser(string) {
  return new Promise(function (resolve, reject) {
    xml2jsParser.parseString(string, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}


export function plainTextToHTML(workString) {
  return new Promise(function (resolve, reject) {
    let linebs = '<br>';
    let i = workString.length,
      aRet = [],
      relq,
      re1, re4, re5;
    let finalWorkString = '';
    let workStringSplit: any;
    workString = workString.trim();
    workString = workString.replace(/\n\n/g, linebs);
    workString = workString.replace(/\r\n/g, linebs);
    workString = workString.replace(/\r/g, linebs);
    workString = workString.replace(/\n/g, linebs);
    workString = workString.replace(linebs + linebs, linebs);
    // workString.replace(/['"]+/g, '');
    //make some friendly replacements
    let tf1 = new Array('&#169;', '&#174;', '&#178;', '&#179;', '&#34;', '&#38;', '&#8211;', '&#8212;', '&#8216;', '&#8217;', '&#8220;', '&#8221;', '&#8226;', '&#8224;', '&#8225;', '&#8242;', '&#8243;', '&#8249;', '&#8250;', '&#8364;', '&#8482;', '&#732;', '&#710;', '&#9824;', '&#9827;', '&#9829;', '&#9830;', '&#9674;', '&#8592;', '&#8594;', '&#8593;', '&#8595;', '&#8596;', '&#172;', '&#161;', '&#162;', '&#163;', '&#164;', '&#165;', '&#166;', '&#167;', '&#168;', '&#170;', '&#171;', '&#172;', '&#173;', '&#175;', '&#176;', '&#177;', '&#180;', '&#181;', '&#182;', '&#183;', '&#184;', '&#185;', '&#186;', '&#187;', '&#188;', '&#189;', '&#190;', '&#191;', '&#192;', '&#193;', '&#194;', '&#195;', '&#196;', '&#197;', '&#198;', '&#199;', '&#200;', '&#201;', '&#202;', '&#203;', '&#204;', '&#205;', '&#206;', '&#207;', '&#208;', '&#209;', '&#210;', '&#211;', '&#212;', '&#213;', '&#214;', '&#215;', '&#216;', '&#217;', '&#218;', '&#219;', '&#220;', '&#221;', '&#222;', '&#223;', '&#224;', '&#225;', '&#226;', '&#227;', '&#228;', '&#229;', '&#230;', '&#231;', '&#232;', '&#233;', '&#234;', '&#235;', '&#236;', '&#237;', '&#238;', '&#239;', '&#240;', '&#241;', '&#242;', '&#243;', '&#244;', '&#245;', '&#246;', '&#247;', '&#248;', '&#249;', '&#250;', '&#251;', '&#252;', '&#253;', '&#254;', '&#255;');
    let tf2 = new Array('&copy;', '&reg;', '&sup2;', '&sup3;', '&quot;', '&amp;', '&ndash;', '&mdash;', '&lsquo;', '&rsquo;', '&ldquo;', '&rdquo;', '&bull;', '&dagger;', '&Dagger;', '&prime;', '&Prime;', '&lsaquo;', '&rsaquo;', '&euro;', '&trade;', '&tilde;', '&circ;', '&spades;', '&clubs;', '&hearts;', '&diams;', '&loz;', '&larr;', '&rarr;', '&uarr;', '&darr;', '&harr;', '&not;', '&iexcl;', '&cent;', '&pound;', '&curren;', '&yen;', '&brvbar;', '&sect;', '&uml;', '&ordf;', '&laquo;', '&not;', '&shy;', '&macr;', '&deg;', '&plusmn;', '&acute;', '&micro;', '&para;', '&middot;', '&cedil;', '&sup1;', '&ordm;', '&raquo;', '&frac14;', '&frac12;', '&frac34;', '&iquest;', '&Agrave;', '&Aacute;', '&Acirc;', '&Atilde;', '&Auml;', '&Aring;', '&AElig;', '&Ccedil;', '&Egrave;', '&Eacute;', '&Ecirc;', '&Euml;', '&Igrave;', '&Iacute;', '&Icirc;', '&Iuml;', '&ETH;', '&Ntilde;', '&Ograve;', '&Oacute;', '&Ocirc;', '&Otilde;', '&Ouml;', '&times;', '&Oslash;', '&Ugrave;', '&Uacute;', '&Ucirc;', '&Uuml;', '&Yacute;', '&THORN;', '&szlig;', '&agrave;', '&aacute;', '&acirc;', '&atilde;', '&auml;', '&aring;', '&aelig;', '&ccedil;', '&egrave;', '&eacute;', '&ecirc;', '&euml;', '&igrave;', '&iacute;', '&icirc;', '&iuml;', '&eth;', '&ntilde;', '&ograve;', '&oacute;', '&ocirc;', '&otilde;', '&ouml;', '&divide;', '&oslash;', '&ugrave;', '&uacute;', '&ucirc;', '&uuml;', '&yacute;', '&thorn;', '&yuml;');
    for (let ii = 0; ii < tf1.length; ii++) {
      workString = workString.replace(new RegExp(tf1[ii], 'g'), tf2[ii]);
    }
    // workString = '<p>' + workString + '</p>';
    // re1 = /\s+/g;
    // workString = workString.replace(re1, ' ');
    console.log(workString.split('<br>'));
    let container = document.createElement('DIV');
    let brk = document.createElement('BR');
    let k = 0;
    // let brk = document.createElement('br');
    workStringSplit = workString.split('<br>');
    for (let j = 0; j < workStringSplit.length; j++) {
      //console.log(workStringSplit[j]);
      for (let index = 0; index < workStringSplit[j].length; index++) {
        let node = document.createElement('span');
        node.setAttribute('id', k.toString());
        let textnode = document.createTextNode(workStringSplit[j][index]);
        node.appendChild(textnode);
        container.appendChild(node);
        k++;
        // finalWorkString += ' <span class="yolo" id= "' + index + '">' +  workStringSplit[j][index] + '</span> ';
      }
      container.innerHTML += linebs;
      console.log(container);
      // finalWorkString += '<br>';
    }
    resolve(container);
  });
}

export function markRanges(current, fullText, container) {

  console.log(current);
  current.forEach(element => {
    for (let index = element.start; index <  element.end; index++) {
      console.log(fullText.childNodes[index]);
      console.log(fullText.childNodes[index]['id']);
      fullText.childNodes[index]['style'].backgroundColor = element.color;
      fullText.childNodes[index]['style'].paddingTop = element.height;
      fullText.childNodes[index].setAttribute('data-marked', true);
      }
  });
  container.appendChild(fullText);

  return;
  // console.log(container.childNodes);
  // let spanNodes = container.childNodes;
  // for (let index = 0; index < spanNodes.length; index++) {
  //   spanNodes[index]['style'].backgroundColor = 'red';
  // }
  // return spanNodes;
}

