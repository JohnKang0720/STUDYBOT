export const drawRect = (detections, ctx) => {
    detections.forEach(prediction => {
        //results
        const [x,y,width, height] = prediction['bbox']
        const text = prediction['class']
       

        //drawing
        const color = "red"
        ctx.strokeSylt = color;
        ctx.font =  '18px Arial'
        ctx.fillStyle = color

        //draw rectangle and text
        
        ctx.beginPath()
        ctx.fillText(text, x, y)
        ctx.rect(x,y,width,height)
        ctx.stroke()

    })
}