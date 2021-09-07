import React, { Component, useState, Fragment, useContext, useRef, useEffect} from 'react'
import Select from 'react-select'
import phil from 'phil-reg-prov-mun-brgy'
import { CafeContext } from '../contexts/CafeContext';


var provinceobj = phil.getProvincesByRegion("06")
provinceobj.pop()
provinceobj.pop()
provinceobj = provinceobj.map(function(obj) {
  obj['label'] = obj['name']; // Assign new key
  obj['value'] = obj['prov_code']
  delete obj['name']; // Delete old key
  delete obj['prov_code']
  return obj;
});



const cityobject = (selected) => {
  var cityobj = phil.getCityMunByProvince(selected)
  // Checks the object's property if it contains a mun_code, if it has one we must change it to value
  // to match what React-Select needs. 
  // Else if it doesn't have one then we can just return the value.
  // Idk if this has a better solution but it works kekeke

  if(cityobj.some(city => city.hasOwnProperty('mun_code'))){
    cityobj = cityobj.map(function(ob) {
          ob['label'] = ob['name']; // Assign new key
          ob['value'] = ob['mun_code']
          delete ob['name']; // Delete old key
          delete ob['mun_code']
          return ob;
    });
    return cityobj
  } else {
    cityobj = cityobj.map(function(ob) {
          return ob;
    });
    return cityobj
  }
}


export default function SelectDropdown({dropdown, clickHandler, disabled, selected}){
  const selectRef = useRef(null)
  const cafe = useContext(CafeContext)

  function isClicked(browse){
    if(browse === true){
      selectRef.current.select.clearValue()
    }
  }

  useEffect(() => {
    isClicked(cafe.browse)
    return () => {
      cafe.setBrowse(false)
      cafe.setDisabled(true)
      cafe.setButtonDisable(true)
    }
  }, [cafe.browse])

  return(
    <div>
      <Select ref={selectRef} placeholder={dropdown === "provinceobj" ? <div>Select a province</div> : <div>Select a city</div>} isDisabled={disabled} isSearchable={true} options={dropdown === "provinceobj" ? provinceobj : cityobject(cafe.selected) } className="w-60 text-left m-2 lg:text-lg" onChange={clickHandler}
      theme={theme => ({
        ...theme,
        borderRadius: 10,
        colors: {
          ...theme.colors,
          primary25: '#EAE0D7',
          primary: '#EAE0D7',
          neutral60: '#EAE0D7',
          neutral20: '#EAE0D7',
          // hover
          neutral30: '#D2745E',
          neutral40: '#D2745E',
        },
      })}/>
    </div>
  )
}
