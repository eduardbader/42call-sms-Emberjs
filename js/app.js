App = Ember.Application.create({});

App.Router.map(function() {
  this.resource('about');
  this.resource('login');
  this.resource('sms');
});

$( document ).ready(function() {
  $('#smsbtn').hide();
});

var showdown = new Showdown.converter();

Ember.Handlebars.helper('format-markdown', function(input) {
  return new Handlebars.SafeString(showdown.makeHtml(input));
});

Ember.Handlebars.helper('format-date', function(date) {
  return moment(date).fromNow();
});

App.LoginController = Ember.Controller.extend({
  login: function() {
    if(mylogin(this.get("username"), this.get("password"))) {
      this.set("loginOk", true);
      this.controllerFor('sms').set('loginOk', true);
      $('#smsbtn').show();
      $('#loginbtn').hide();
      document.location = "index.html#/sms";
    } else {
      this.controllerFor('sms').set('loginOk', false);
      this.set("loginFailed", true);
    }
  }
});

App.SmsController = Ember.Controller.extend({
  sendsms: function() {
    if(mySMS(this.get("number"), this.get("text"))) {
      this.set("smsOk", true);
    } else {
      this.set("smsFailed", true);
    }
  }
});
