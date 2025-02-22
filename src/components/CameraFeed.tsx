import React, { useRef, useEffect } from "react";

const CameraFeed: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    startCamera();
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full bg-black">
      <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover rounded-lg" />
    </div>
  );
};

export default CameraFeed;
