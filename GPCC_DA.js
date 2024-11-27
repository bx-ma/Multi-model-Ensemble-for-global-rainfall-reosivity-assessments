// ****************************************************************************************************************** //
// *********** Computing the climatic parameters from the precipitation data from Global Precipitation Climatology Centre (GPCC) *************** //
// ****************************************************************************************************************** //

//The precipitation data from Global Precipitation Climatology Centre (GPCC) from the Deutscher Wetterdienst (http://gpcc.dwd.de/)

// preprocess.js
exports.GPCC_DA_func = function(ImageCollection,ImageCollection2){

var month_12 = ee.List.sequence(1, 12);
var date = ee.List.sequence(1, 364);
var month_360 = ee.List.sequence(1, 360,30);

var year=require('users/zrjnwafu/functions:time').year;//changge the time to produce results from different years
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
     var month_p = ImageCollection2
     .filterDate(startdate,enddate).filter(date_range).sum()
     .set('month', j).set('year', year).rename('month_rainfall_gpcc');
  return month_p;};
var yearwise_pre_Em = ee.ImageCollection(month_12.map(year_func_Em));
var year_func_Ed = function(j){
   // var year_range = ee.Filter.calendarRange(i, i, 'year');.set('year', i)
     var date_range =ee.Filter.calendarRange(j, j, 'day_of_year');
     //var year=startdate.get('year');
     var daily_p = ImageCollection.filter(ee.Filter.date(startdate,enddate))
     .filter(date_range).mean().set('date', j).set('year', year)
     .rename('daily_rainfall_gpcc');
  return daily_p.updateMask(daily_p.gte(0));
};
var yearwise_pre_Ed = ee.ImageCollection(date.map(year_func_Ed));
var year_func_Edm = function(j){
     var date_range =ee.Filter.calendarRange(j, j, 'month');
     var daily_p = ImageCollection.filter(ee.Filter.date(startdate,enddate))
     .filter(date_range).max().set('month', j).set('year', year)
     .rename('daily_rainfall_gpcc');
  return daily_p.double();
};
var yearwise_pre_Edm = ee.ImageCollection(month_12.map(year_func_Edm));
var Days_Em=ee.ImageCollection(month_360.map(function(date){
  var month = ee.Number(date).add(29).divide(30).toInt();
  var D10 = yearwise_pre_Ed.filter(ee.Filter.gte('date',date))
      .filter(ee.Filter.lte('date',ee.Number(date).add(29)))
      .map(function(img){
  var results=img.where(img.gt(0),1).where(img.lte(0),0);
  return results;
}).sum();
  return D10.set('month', month);
}));
var Days_E=yearwise_pre_Ed.map(function(img){
  var results=img.where(img.gt(0),1).where(img.lt(0),0);
  return results;
}).sum();
var F24_E=yearwise_pre_Edm.max().pow(2).divide(yearwise_pre_Edm.sum());
var MFI_Ed=yearwise_pre_Ed.map(function(i){return i.pow(2)}).sum()
    .divide(yearwise_pre_Em.sum()).set('year', year);
var PCI_Ed=yearwise_pre_Ed.map(function(i){return i.pow(2)}).sum().multiply(100)
    .divide(yearwise_pre_Em.sum().pow(2)).set('year', year);

//////////////////////////////////////////////Daily 4.5mm\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////////////////////////////////////////////////////////////////////////////////////////////////////
var year_func_Edl = function(j){
     var date_range =ee.Filter.calendarRange(j, j, 'day_of_year');
     var daily = ImageCollection.filter(ee.Filter.date(startdate,enddate)).filter(date_range);
     var daily_p = daily.mean().set('date', j).set('year', year)
     .rename('daily_rainfall_era5');
  return daily_p;
};
var yearwise_pre_Gd4 = ee.ImageCollection(date.map(year_func_Edl))
                      .map(function(x){return x.updateMask(x.gte(4.5).mask())});
var yearwise_pre_Gd8 = ee.ImageCollection(date.map(year_func_Edl))
                      .map(function(x){return x.updateMask(x.gte(8).mask())});
var yearwise_pre_Gd10 = ee.ImageCollection(date.map(year_func_Edl))
                      .map(function(x){return x.updateMask(x.gte(10).mask())});     
var yearwise_pre_Gd12 = ee.ImageCollection(date.map(year_func_Edl))
                      .map(function(x){return x.updateMask(x.gte(12).mask())});                      

var Days_Gm10=ee.ImageCollection(month_360.map(function(date){
  var month = ee.Number(date).add(29).divide(30).toInt();
  var D10 = yearwise_pre_Gd10.filter(ee.Filter.gte('date',date))
      .filter(ee.Filter.lte('date',ee.Number(date).add(29)))
      .map(function(img){
  var results=img.where(img.gte(10),1).where(img.lt(10),0);
  return results;
}).sum();
  return D10.set('month', month);
}));
var P_Gm10=ee.ImageCollection(month_360.map(function(date){
  var month = ee.Number(date).add(29).divide(30).toInt();
  var P10 = yearwise_pre_Gd10.filter(ee.Filter.gte('date',date))
      .filter(ee.Filter.lte('date',ee.Number(date).add(29)))
      .map(function(img){
  var results=img.updateMask(img.gte(10));
  return results;
}).sum();
  return P10.set('month', month);
}));
var Pspring_Ed = yearwise_pre_Ed.filter(ee.Filter.and(ee.Filter.gte('date',60),ee.Filter.lte('date',150))); 
var Psummer_Ed = yearwise_pre_Ed.filter(ee.Filter.and(ee.Filter.gte('date',151),ee.Filter.lte('date',240))); 
var Pautumn_Ed = yearwise_pre_Ed.filter(ee.Filter.and(ee.Filter.gte('date',241),ee.Filter.lte('date',330)));
var Pwinner_Ed = yearwise_pre_Ed.filter(ee.Filter.or(ee.Filter.gte('date',331),ee.Filter.lte('date',59)));

  return {
    'yearwise_pre_GPd': yearwise_pre_Ed,
    'yearwise_pre_GPd4': yearwise_pre_Gd4,
    'yearwise_pre_GPd8': yearwise_pre_Gd8,
    'yearwise_pre_GPd10': yearwise_pre_Gd10,
    'yearwise_pre_GPd12': yearwise_pre_Gd12,
    'Days_GPm10': Days_Gm10,
    'P_GPm10': P_Gm10,    
    'Days_GPm': Days_Em,
    'Days_GP': Days_E,
    'yearwise_pre_GPdm': yearwise_pre_Edm,
    'F24_GP': F24_E,
    'MFI_GPd': MFI_Ed,
    'PCI_GPd': PCI_Ed,
    'Pspring_GPd': Pspring_Ed,
    'Psummer_GPd': Psummer_Ed,
    'Pautumn_GPd': Pautumn_Ed,
    'Pwinner_GPd': Pwinner_Ed,
  };
};
