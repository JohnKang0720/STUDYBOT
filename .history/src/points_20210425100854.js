import React, {useState, useEffect}  from 'react'


const Pointcounter = (p1, p2, {count}) => {
if(p1 >= 250 || p2 <= 0.1){
    alert("You have lost points!")
   
}
return(
    <div>
        <p> {count}</p>
    </div>
)
}
export default Pointcounter