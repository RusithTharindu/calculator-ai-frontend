import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

//11.02

const Home = () => {
     useEffect(() => {
        const canvas = canvasRef.current;

        if(canvas) {
            const ctx = canvas.getContext("2d");
            if(ctx){
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight; - canvas.offsetTop;
                ctx.lineCap = "round"; //for brush type
                ctx.lineWidth = 3; // For brush Size
            }
        }
     }, []);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if(canvas){
            canvas.style.background = "black";
            const ctx = canvas.getContext("2d");
            if(ctx) {
                ctx.beginPath();
                ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                setIsDrawing(true);
            }
        }
    }

    const stopDrawing = () => {
        setIsDrawing(false);
    }

    //drawing method
    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if(!isDrawing){
            return;
        }
        const canvas = canvasRef.current;
        if(canvas){
            const ctx = canvas.getContext('2d');
            if(ctx){
                ctx.strokeStyle = "white";
                ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                ctx.stroke();
            }
        }
    } 
    
  return (
    <>
        <canvas
            ref={canvasRef}
            id="canvas"
            className="absolute top-0 left-0 w-full h-full"
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
        />
    </>
  )
}

export default Home;