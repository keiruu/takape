import React, { Component, useState, Fragment, useContext } from 'react'
import Select from 'react-select'
import phil, { sort } from 'phil-reg-prov-mun-brgy'


var provinceobj = phil.provinces
provinceobj = provinceobj.map(function(obj) {
  obj['label'] = obj['name']; // Assign new key
  obj['value'] = obj['prov_code']
  delete obj['name']; // Delete old key
  delete obj['prov_code']
  return obj;
});



function cityobject(selected){
  var cityobj = phil.getCityMunByProvince(selected)
  cityobj = cityobj.map(function(ob) {
    ob['label'] = ob['name']; // Assign new key
    ob['value'] = ob['mun_code']
    delete ob['name']; // Delete old key
    delete ob['mun_code']
    return ob;
  });

  return cityobj
}


export default function SelectDropdown({dropdown, clickHandler, disabled, selected}){
  return(
    <Fragment>
      <Select placeholder={dropdown === "provinceobj" ? <div>Select a province</div> : <div>Select a city</div>} isDisabled={disabled} isSearchable={true} options={dropdown === "provinceobj" ? provinceobj : cityobject(selected)} className="w-56 text-left m-2" onChange={clickHandler}/>
      {/* <Select isDisabled={disable} isClearable={true} isSearchable={true} options={dropdown === "provinceobj" ? provinceobj : cityobj} className={dropdown === "cityobj" ? "w-56 text-left mx-2" : "hidden"}/> */}
    </Fragment>
  )
}
