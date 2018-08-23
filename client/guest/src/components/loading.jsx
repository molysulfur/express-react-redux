import React from 'react'
import ReactLoading from 'react-loading'

const Loading = () => (
    <ReactLoading 
    type="spin" 
    color='rgb(105, 191, 131)' 
    delay={0}
    style={{
        "fill":"rgb(105, 191, 131)",
        "height":"64px",
        "width":"64px",
        "position": "absolute",
        "top": "0",
        "bottom": "0",
        "left": "0",
        "right": "0",
        "margin": "auto"
    }}
    />
)
export default Loading