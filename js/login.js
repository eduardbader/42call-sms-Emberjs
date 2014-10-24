var resturl = 'https://login.42call.com/api/rest/v3/';
var u = null;
var p = null;

function mylogin(username, password) {
   u = username;
   p = password;
   return restRequest('login', {});
}

function mySMS(number, text) {
   var data = { act: "sendSms", phonenumbers : number, message : text};
   return restRequest('sms', data);
}

function restRequest(process, data) {
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
}
