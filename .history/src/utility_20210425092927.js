import React, {useState, useEffect, useRef} from 'react'


 const Typewriter  = ({text}) => {
     const index = useRef(0)

    const [inittext, changedtext] = useState('')
    useEffect (() => {
      const timeout = setTimeout(() => {
    changedtext((value) => value + text.charAt(index.current))
    index.current += 1
      },2000)
      return (() => {
          clearTimeout(timeout)
      })
    }, [inittext, text])
return(
    <div>
        <p> {text}</p>
    </div>
)

}
export default Typewriter
