import { db, storage } from '../Config/firebase';
import { collection, doc, updateDoc, onSnapshot, addDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { jsPDF } from 'jspdf';


// Real-time Drawing Update
export const initRealTimeDrawing = (canvasRef, projectId) => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');

  onSnapshot(doc(db, 'Projects', projectId), (doc) => {
    const drawingData = doc.data().drawing;
    const img = new Image();
    img.src = drawingData;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  });
};

// Save drawing data and update in real-time
export const saveDrawingInRealTime = async (canvasRef, projectId) => {
  const canvas = canvasRef.current;
  const drawingData = canvas.toDataURL('image/png');

  await updateDoc(doc(db, 'Projects', projectId), {
    drawing: drawingData,
  });
};

// Upload and edit images
export const uploadAndEditImage = async (fileUpload, canvasRef) => {
  if (!fileUpload) return;
  const fileRef = ref(storage, `images/${fileUpload.name}`);
  await uploadBytes(fileRef, fileUpload);
  
  const img = new Image();
  img.src = URL.createObjectURL(fileUpload);
  img.onload = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
};

// Real-Time Collaborative Drawing
export const initCollaborativeDrawing = (canvasRef, projectId) => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');

  onSnapshot(doc(db, 'Projects', projectId), (doc) => {
    const drawingData = doc.data().collaborativeDrawing;
    const img = new Image();
    img.src = drawingData;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  });
};

// Save collaborative drawings to Firebase
export const saveCollaborativeDrawing = async (canvasRef, projectId) => {
  const canvas = canvasRef.current;
  const drawingData = canvas.toDataURL('image/png');

  await updateDoc(doc(db, 'Projects', projectId), {
    collaborativeDrawing: drawingData,
  });
};

// Create new idea with drawing layers and metadata
export const createNewIdeaWithLayers = async (projectId, layers, metadata) => {
  await addDoc(collection(db, 'Projects', projectId, 'Ideas'), {
    layers: layers,
    metadata: metadata,
    createdAt: new Date(),
  });
};

// Annotate Images
export const annotateImage = (canvasRef, imageSrc, color) => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.src = imageSrc;

  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
  };

  let isDrawing = false;

  canvas.addEventListener('mousedown', () => {
    isDrawing = true;
  });

  canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  });

  canvas.addEventListener('mouseup', () => {
    isDrawing = false;
  });
};

// Save annotations to Firebase
export const saveAnnotations = async (canvasRef, projectId) => {
  const canvas = canvasRef.current;
  const annotationData = canvas.toDataURL('image/png');

  await updateDoc(doc(db, 'Projects', projectId), {
    annotations: annotationData,
  });
};

// Save project with full data
export const saveProjectWithFullData = async (projectId, projectData) => {
  await updateDoc(doc(db, 'Projects', projectId), projectData);
};

// Initialize drawing from layers
export const initLayeredDrawing = (canvasRef, layers) => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');

  layers.forEach((layer) => {
    const img = new Image();
    img.src = layer;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
  });
};

// Save canvas as image or PDF
export const saveCanvasAsImage = (canvasRef) => {
  const canvas = canvasRef.current;
  const imgData = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = imgData;
  a.download = 'canvas.png';
  a.click();
};

export const saveCanvasAsPDF = (canvasRef) => {
  const canvas = canvasRef.current;
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF();
  pdf.addImage(imgData, 'PNG', 0, 0);
  pdf.save('canvas.pdf');
};
