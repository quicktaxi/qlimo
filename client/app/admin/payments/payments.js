'use strict';

angular.module('aacrudApp').config(function ($stateProvider) {
  $stateProvider.state('payments',{
    url: '/payments',
    template: '<payments> </payments>'
  });
});