import React, {useState, useEffect, useRef} from 'react'


 const Typewriter  = ({text}) => {
    
     const index = useRef(0)

    const [inittext, changedtext] = useState('')

     useEffect (() => {
      index.current = 0;
      changedtext('')
     }, [text])

    useEffect (() => {
      const timeout = setTimeout(() => {
    changedtext((value) => value + text.charAt(index.current))
    index.current += 1
      },50)
      return (() => {
          clearTimeout(timeout)
      })
    }, [inittext, text])

return(
    <div>
        <p style = {{color: "orange", fontSize: "30px"}}> {inittext}</p>
    </div>
)

}
export default Typewriter
