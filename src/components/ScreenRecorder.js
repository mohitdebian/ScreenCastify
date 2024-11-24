// src/components/ScreenRecorder.js
import React, { useState, useRef, useEffect } from 'react';

const ScreenRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [frameRate, setFrameRate] = useState(60); // Default to 60 FPS
  const [resolution, setResolution] = useState('1080p'); // Default to 1080p
  const [videoUrl, setVideoUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const videoRef = useRef(null);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    if (videoUrl) {
      videoRef.current.src = videoUrl;
    }
  }, [videoUrl]);

  const startRecording = async () => {
    // Reset the recorded chunks and video URL before starting a new recording
    recordedChunksRef.current = [];
    setVideoUrl(null);

    let width, height;
    switch (resolution) {
      case '4k':
        width = 3840;
        height = 2160;
        break;
      case '2k':
        width = 2560;
        height = 1440;
        break;
      case '1080p':
        width = 1920;
        height = 1080;
        break;
      case '720p':
        width = 1280;
        height = 720;
        break;
      case '480p':
        width = 854;
        height = 480;
        break;
      default:
        width = 1920;
        height = 1080;
    }

    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: { mediaSource: 'screen', width, height, frameRate },
      audio: true
    });
    setStream(screenStream);

    const mediaRecorder = new MediaRecorder(screenStream, {
      mimeType: 'video/webm; codecs=vp9',
      videoBitsPerSecond: 20000000 // Adjust bitrate for 4K quality
    });
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);

      // Send the blob to the server
      fetch('/upload', {
        method: 'POST',
        body: blob
      }).then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    stream.getTracks().forEach(track => track.stop());
    setRecording(false);
    setStream(null); // Reset the stream
    setVideoUrl(null); // Reset the video URL
  };

  const downloadVideo = () => {
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = videoUrl;
    a.download = 'screen-recording.webm';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(videoUrl);
  };

  return (
    <div className="p-4 bg-transparent rounded-lg shadow-lg">
      {!stream && !videoUrl ? (
        <img src="/preview.jpg" alt="Screen preview" className="rounded-lg mb-4" />
      ) : (
        <video ref={videoRef} autoPlay controls={false} className="w-full h-96 bg-black rounded-lg mb-4" />
      )}
      <div className="mb-4">
        <label className="mr-2 text-white-700" style={{ fontSize: '1.25rem' }}>Frame Rate:</label>
        <select
          value={frameRate}
          onChange={(e) => setFrameRate(parseInt(e.target.value))}
          className="border p-2 rounded-md text-gray-700"
        >
          <option value={120}>Ultra Smooth (120 FPS)</option>
          <option value={60}>60 FPS</option>
          <option value={30}>30 FPS</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="mr-2 text-white-700" style={{ fontSize: '1.25rem' }}>Resolution:</label>
        <select
          value={resolution}
          onChange={(e) => setResolution(e.target.value)}
          className="border p-2 rounded-md text-gray-700"
        >
          <option value="4k">4K</option>
          <option value="2k">2K</option>
          <option value="1080p">1080p</option>
          <option value="720p">720p</option>
          <option value="480p">480p</option>
        </select>
      </div>
      <button
        className={`w-full py-2 rounded-md text-white ${recording ? 'bg-red-500' : ''}`}
        style={{ fontWeight: 550, backgroundColor: recording ? undefined : 'rgb(77, 47, 245)' }}
        onClick={recording ? stopRecording : startRecording}
      >
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {videoUrl && (
        <button
          className="w-full py-2 mt-4 rounded-md text-white bg-green-500" style={{ fontWeight: 550 }}
          onClick={downloadVideo}
        >
          Download Video
        </button>
      )}
    </div>
  );
};

export default ScreenRecorder;
