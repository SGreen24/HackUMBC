// adobe.js
const initializeAdobeEditor = () => {
    const canvas = document.getElementById("adobeCanvas");
    const context = canvas.getContext("2d");
  
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
  
    // Create a rectangle
    const rectangle = {
      x: 100,
      y: 20,
      width: 200,
      height: 150,
      color: "rgba(204, 153, 51, 0.7)" // Equivalent to RGB [0.8, 0.6, 0.2] and alpha 0.7
    };
  
    // Draw the rectangle on the canvas
    context.fillStyle = rectangle.color;
    context.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    
    console.log("Rectangle drawn on canvas:", rectangle); // Debugging
  };
  
  export default initializeAdobeEditor;
  