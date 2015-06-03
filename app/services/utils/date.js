
/**
* Date Service
*
*/

var assert = require('assert');

DateService = function(){

  var self = {};

  self.convert = function(date){
    return (
      date.constructor === Date ? date :
      date.constructor === Array ? new Date(date[0],date[1],date[2]) :
      date.constructor === Number ? new Date(date) :
      date.constructor === String ? new Date(date) :
            typeof date === "object" ? new Date(date.year,date.month,date.date) :
            NaN
        );
  }

  /* format is dd/mm/yyyy */
  self.getDateToday = function(){
    var today = new Date();
    return self.getFormatedDate(today);
  }

  self.getFormatedDate = function(date){
    date = self.convert(date);
    var dd = date.getDate();
    var mm = date.getMonth()+1; //January is 0!
    var yyyy = date.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    formatedDate = yyyy+'-'+mm+'-'+dd;
    return formatedDate;
  }

  self.compare = function(date_a, date_b){
    return (
            isFinite(date_a=this.convert(date_a).valueOf()) &&
            isFinite(date_b=this.convert(date_b).valueOf()) ?
            (a>b)-(a<b) :
            NaN
        );
  }

  self.getDateWithOffset = function(day_offset){
    assert(true, day_offset.constructor === Number, 'offset must be a number');
    assert(true, day_offset > 0, 'offset must be positive');
    var date = new Date();
    var dateWithOffset = self.getFormatedDate(date.setDate(date.getDate()+parseInt(day_offset)));
    return dateWithOffset;
  }

  return self;

}


module.exports = DateService;
