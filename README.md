42call-sms-Emberjs
==================

This is a very simple Ember.js example for how to use the 42com REST Api Version 3 for a single page website.

REST AUTH:
http://developer.42com.com/documentation/authentication/

```javascript
var retVal = false;

var now = new Date();
date = new Date(now.getTime());
xdate = date.toISOString();

var passMd5 = CryptoJS.MD5(p);
passMd5 = passMd5.toString();

var hash = CryptoJS.HmacSHA1(passMd5 + "\n" + xdate, passMd5);
xauthorization = hash.toString(CryptoJS.enc.Base64);

$.ajax({
 type: "POST",
 url: resturl + process,
 async: false,
 headers: {
   'x-date': xdate,
   'x-authorization': u + ":" + xauthorization,
 },
 data: data,
}).done(function(data) {
var returnObject = jQuery.parseJSON(data);
if(Boolean(returnObject.error) == false) {
   retVal = true;
}
});

return retVal;
```
