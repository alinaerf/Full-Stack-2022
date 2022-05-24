import {useState} from 'react'
const DisplayInfo=({country})=>{
    const id=String(country.latlng[0])+String(country.latlng[1]);
    const [show, setShow]=useState('false')
    const languages=Object.entries(country.languages)
    const lang_output=languages.map((lang)=>{
        return(
            `<li key=${lang[0]}>${lang[1]}</li>`
        )
        })
    var info=document.createElement('div')
    info.innerHTML=
        `<h2> ${country.name.common}</h2>`+
        `<div>capital ${country.capital}</div>`+
        `<div> area ${country.area}</div>`+
        '<b> languages:</b>'+
        '<ul>'+ 
        lang_output+'</ul>';
    info.appendChild(document.createElement('img')).src=country.flags.png
    info.setAttribute('id',id+'add')
    return(
      <div key={id} id={id}>
        {country.name.common}
        <button onClick={()=>{
            if (show){
                document.getElementById(id).appendChild(info)
            }
            else{
                console.log(document.getElementById(id).childNodes)
                document.getElementById(id).removeChild(document.getElementById(id+'add'))
            }
            setShow(!show)
            
        }}>{show? 'show':'hide'}</button>
      </div>)
}      
export default DisplayInfo