// This file will contains all the different directives we might need for the application


var myOwnClock = function($filter){
  return function(scope, element, attrs){
      var format;

      scope.$watch(attrs.myOwnClock, function(value) {
        if(value){
          format = value;
        }else{
          format = " dd/MM/yyyy  HH:mm:ss"
        }
          updateTime();
      });

      function updateTime(){
          var dt = $filter('date')(new Date(), format);
          element.text(dt);
      }

      function updateLater() {
          setTimeout(function() {
            updateTime(); // update DOM
            updateLater(); // schedule another update
          }, 1000);
      }
      updateLater();
  }
}


myOwnClock.$inject = ['$filter'];

angular.module('hrReminder').directive('myOwnClock', myOwnClock);
