// ****************************************************************************************************************** //
// *********** Computing the climatic parameters from the precipitation data from Global Precipitation Climatology Centre (GPCC) *************** //
// ****************************************************************************************************************** //

//The precipitation data from Global Precipitation Climatology Centre (GPCC) from the Deutscher Wetterdienst (http://gpcc.dwd.de/)

// preprocess.js
exports.GPCC_MO_func = function(ImageCollection){

var month_12 = ee.List.sequence(1, 12);
var year=require('users/zrjnwafu/functions:time').year;//change the time file to produce results of different year (1982-2020)
var month1=01;
var month12=12;
var startdate=ee.Date.fromYMD({
		year:year,
		month:month1,
		day:1,
//	timeZone:null,
});
var enddate=ee.Date.fromYMD({
		year:year,
		month:month12,
		day:31,
//	timeZone:null,
});

var year_func_Em=function(j){
     var date_range =ee.Filter.calendarRange(j, j, 'month');
     var month_p = ImageCollection
     .filterDate(startdate,enddate).filter(date_range).sum()
     .set('month', j).set('year', year).rename('month_rainfall_gpcc');
  return month_p.float();};
var yearwise_pre_Em = ee.ImageCollection(month_12.map(year_func_Em));
var Py_E=yearwise_pre_Em.sum().set('year', year);
var Rc_E=yearwise_pre_Em.map(function(i){
  var result = i.pow(2).divide(Py_E).copyProperties(i);
  return result;});
var MFI_E=yearwise_pre_Em.map(function(i){return i.pow(2)}).sum()
    .divide(yearwise_pre_Em.sum()).set('year', year);
var P6_9m_E=yearwise_pre_Em.filter(ee.Filter.and(ee.Filter.gte('month',6),ee.Filter.lte('month',9))).sum();
var P5_10m_E=yearwise_pre_Em.filter(ee.Filter.and(ee.Filter.gte('month',5),ee.Filter.lte('month',10))).sum();
var P4_10m_E=yearwise_pre_Em.filter(ee.Filter.and(ee.Filter.gte('month',4),ee.Filter.lte('month',10))).sum();
var P10_5m_E=yearwise_pre_Em.filter(ee.Filter.or(ee.Filter.lt('month',6),ee.Filter.gt('month',9))).sum();
var Pmmax_E=yearwise_pre_Em.max();
var CV_E = yearwise_pre_Em.map(function(i){var image=i.subtract(yearwise_pre_Em.mean()).pow(2);
      return image;
    }).sum().pow(0.5).divide(11).divide(yearwise_pre_Em.mean());
var FF_E=yearwise_pre_Em.mean().multiply(yearwise_pre_Em.map(function(i){
      var month = i.getNumber('month');
      var image=i.multiply(ee.Image(1).add(CV_E.pow(2)));
      return image;})
    .sum()).divide(Py_E).set('year', year);
var PCI_E=yearwise_pre_Em.map(function(i){return i.pow(2)}).sum().multiply(100)
    .divide(yearwise_pre_Em.sum().pow(2)).set('year', year);
var SI_E=yearwise_pre_Em.map(function(i){return i.subtract(Py_E.divide(12)).abs()}).sum()
    .divide(Py_E).set('year', year);
var FI_E=yearwise_pre_Em.map(function(i){return i.pow(2)}).max()
    .divide(yearwise_pre_Em.sum()).set('year', year);
var Pspring_E = yearwise_pre_Em.filter(ee.Filter.and(ee.Filter.gte('month',3),ee.Filter.lte('month',5))); 
var Psummer_E = yearwise_pre_Em.filter(ee.Filter.and(ee.Filter.gte('month',6),ee.Filter.lte('month',8))); 
var Pautumn_E = yearwise_pre_Em.filter(ee.Filter.and(ee.Filter.gte('month',9),ee.Filter.lte('month',11)));
var Pwinner_E = yearwise_pre_Em.filter(ee.Filter.or(ee.Filter.gte('month',12),ee.Filter.lte('month',2)));

  return {
    'yearwise_pre_GPm': yearwise_pre_Em,
    'Py_GP': Py_E,
    'Rc_GP': Rc_E,
    'MFI_GP': MFI_E,
    'P6_9m_GP': P6_9m_E,
    'P5_10m_GP': P5_10m_E,
    'P4_10m_GP': P4_10m_E   , 
    'P10_5m_GP': P10_5m_E,
    'Pmmax_GP': Pmmax_E,
    'CV_GP': CV_E,
    'FF_GP': FF_E,
    'PCI_GP': PCI_E,
    'SI_GP': SI_E,
    'FI_GP': FI_E,
    'Pspring_GP': Pspring_E,
    'Psummer_GP': Psummer_E,
    'Pautumn_GP': Pautumn_E,
    'Pwinner_GP': Pwinner_E
  };
};
