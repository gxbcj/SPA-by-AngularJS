define(['angular'], function  (angular) {

    var serviceApp = angular.module('uiRouterSample.contacts.service', []);
    serviceApp.factory('contacts', ['$http', 'utils', function ($http, utils) {
      var path = 'assets/contacts.json';
      var contacts = $http.get(path).then(function (resp) {
        return resp.data.contacts;
      });

      var factory = {};
      factory.all = function () {
        return contacts;
      };
      factory.get = function (id) {
        return contacts.then(function(){
          return utils.findById(contacts, id);
        })
      };
      return factory;
    }]);

});
