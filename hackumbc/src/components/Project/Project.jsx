import { useState, useRef, useEffect } from 'react';
import { HexColorPicker } from "react-colorful";  // Futuristic color picker
import { db, storage } from '../Config/firebase'; // Firebase Firestore and Storage
import { collection, getDocs, addDoc } from 'firebase/firestore';  // Firestore functions
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';  // Firebase Storage functions
import './Project.css';  // Import the CSS for futuristic styling

const Project = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState('#ffffff');  // Default color
  const [brushSize, setBrushSize] = useState(10);  // Brush size for free drawing
  const [isDrawing, setIsDrawing] = useState(false);  // Drawing state
  const [cursorStyle, setCursorStyle] = useState({});  // Custom cursor style
  const [undoStack, setUndoStack] = useState([]);  // Stack to store canvas states for undo
  const [redoStack, setRedoStack] = useState([]);  // Stack to store canvas states for redo

  // Save the current state of the canvas for undo/redo
  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    const state = canvas.toDataURL(); // Get current state as an image URL
    setUndoStack([...undoStack, state]);
    setRedoStack([]); // Clear the redo stack after new action
  };

  // Start drawing on the canvas
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
    saveCanvasState(); // Save the state before drawing begins
  };

  // Continue drawing on the canvas
  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  // Stop drawing on the canvas
  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Undo the last drawing action
  const undo = () => {
    if (undoStack.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const lastState = undoStack.pop();  // Remove the last state from the undo stack
    setRedoStack([...redoStack, canvas.toDataURL()]);  // Save the current state to redo stack
    setUndoStack([...undoStack]);
    
    // Restore the canvas to the last saved state
    const img = new Image();
    img.src = lastState;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  };

  // Redo the previously undone action
  const redo = () => {
    if (redoStack.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const redoState = redoStack.pop();  // Remove the last state from the redo stack
    setUndoStack([...undoStack, canvas.toDataURL()]);  // Save the current state to undo stack
    
    // Restore the canvas to the redo state
    const img = new Image();
    img.src = redoState;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  };

  // Save the drawing to Firebase Storage and store its reference in Firestore
  const saveDrawing = async () => {
    const canvas = canvasRef.current;
    const drawing = canvas.toDataURL('image/png'); // Get canvas image as data URL

    // Reference to Firebase Storage
    const storageRef = ref(storage, `drawings/${Date.now()}.png`);

    // Convert the data URL to Blob
    const blob = await (await fetch(drawing)).blob();

    // Upload Blob to Firebase Storage
    await uploadBytes(storageRef, blob);

    // Get the download URL from Firebase Storage
    const downloadURL = await getDownloadURL(storageRef);

    // Save the drawing metadata to Firestore
    await addDoc(collection(db, 'Projects'), {
      imageUrl: downloadURL,   // URL of the saved image
      timestamp: new Date()    // Timestamp for when the image was created
    });

    alert("Drawing saved to Firebase Storage and Firestore!");
  };

  // Set custom cursor to reflect brush size
  const handleMouseMove = (e) => {
    const cursorStyle = {
      left: `${e.pageX - brushSize / 2}px`,
      top: `${e.pageY - brushSize / 2}px`,
      width: `${brushSize}px`,
      height: `${brushSize}px`,
      backgroundColor: color,
      borderRadius: '50%',
    };
    setCursorStyle(cursorStyle);
  };

  return (
    <div className="project-page" onMouseMove={handleMouseMove}>
      <h1 className="title">FPI Board</h1>

      {/* Toolbar for settings */}
      <div className="toolbar">
        <HexColorPicker color={color} onChange={setColor} /> {/* New futuristic color picker */}
        <input
          type="range"
          min="1"
          max="50"
          value={brushSize}
          onChange={(e) => setBrushSize(Number(e.target.value))}
          className="slider"
        />
        <label>Brush Size: {brushSize}</label>
      </div>

      {/* Large Canvas */}
      <div className="drawing-container">
        <canvas
          ref={canvasRef}
          width={1200}  // Increased width for larger drawing area
          height={800}  // Increased height for larger drawing area
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
        ></canvas>
        <div className="cursor" style={cursorStyle}></div>
      </div>

      {/* Actions for undo/redo and saving */}
      <div className="actions">
        <button onClick={undo} className="button">Undo</button>
        <button onClick={redo} className="button">Redo</button>
        <button onClick={saveDrawing} className="button">Save Image</button>
      </div>
    </div>
  );
};

export default Project;
