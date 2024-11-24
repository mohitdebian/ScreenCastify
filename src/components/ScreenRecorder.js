import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const ScreenRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [frameRate, setFrameRate] = useState(60);
  const [resolution, setResolution] = useState('1080p');
  const [videoUrl, setVideoUrl] = useState(null);
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const videoRef = useRef(null);

  const resolutionOptions = {
    '4k': { width: 3840, height: 2160 },
    '2k': { width: 2560, height: 1440 },
    '1080p': { width: 1920, height: 1080 },
    '720p': { width: 1280, height: 720 },
    '480p': { width: 854, height: 480 },
  };

  useEffect(() => {
    if (stream) videoRef.current.srcObject = stream;
  }, [stream]);

  useEffect(() => {
    if (videoUrl) videoRef.current.src = videoUrl;
  }, [videoUrl]);

  const getMediaStream = async () => {
    const { width, height } = resolutionOptions[resolution];
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: { width, height, frameRate },
      audio: isMicEnabled ? { selfCapture: true } : false,
    });

    if (isMicEnabled) {
      try {
        const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        return new MediaStream([...screenStream.getTracks(), ...micStream.getTracks()]);
      } catch (error) {
        console.warn('Microphone access failed:', error);
      }
    }
    return screenStream;
  };

  const startRecording = async () => {
    try {
      const combinedStream = await getMediaStream();
      setStream(combinedStream);

      const mediaRecorder = new MediaRecorder(combinedStream, {
        mimeType: 'video/webm; codecs=vp9',
        videoBitsPerSecond: 20000000,
      });

      mediaRecorderRef.current = mediaRecorder;
      recordedChunksRef.current = [];
      setVideoUrl(null);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) recordedChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      console.error('Error starting screen recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
    if (stream) stream.getTracks().forEach((track) => track.stop());
    setRecording(false);
    setStream(null);
  };

  const downloadVideo = () => {
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = 'screen-recording.webm';
    a.click();
    URL.revokeObjectURL(videoUrl);
  };

  return (
    <div className="p-4 bg-transparent rounded-lg shadow-lg">
      {!stream && !videoUrl ? (
        <img src="/preview.jpg" alt="Screen preview" className="rounded-lg mb-4" />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          muted
          controls={false}
          className="w-full h-96 bg-black rounded-lg mb-4"
        />
      )}
      <div className="mb-4 flex items-center justify-center space-x-4">
        <div>
          <label className="mr-2 text-white-700">Frame Rate:</label>
          <select
            value={frameRate}
            onChange={(e) => setFrameRate(parseInt(e.target.value))}
            className="border p-2 rounded-md bg-gray-800 text-white"
          >
            {[120, 60, 30].map((rate) => (
              <option key={rate} value={rate}>
                {rate} FPS
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mr-2 text-white-700">Resolution:</label>
          <select
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
            className="border p-2 rounded-md bg-gray-800 text-white"
          >
            {Object.keys(resolutionOptions).map((res) => (
              <option key={res} value={res}>
                {res.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <div className='flex items-center justify-center h-full'>
  <StyledToggleWrapper className='flex items-center justify-center' style={{margin: '0'}}>
    <span className="text-white" style={{ marginRight: '10px', marginLeft: '10px' }}>Microphone</span>
    <label className="toggle" style={{ marginRight: '10px', marginLeft: '10px' }}>
      <input
        type="checkbox"
        checked={isMicEnabled}
        onChange={() => setIsMicEnabled(!isMicEnabled)}
        className="hidden" // Hide the default checkbox
      />
      <span className="slider" />
    </label>
  </StyledToggleWrapper>
</div>


      </div>

      <button
        className={`w-full py-2 rounded-md text-white ${recording ? 'bg-red-500' : 'bg-blue-500'}`}
        onClick={recording ? stopRecording : startRecording}
      >
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {videoUrl && (
        <button
          className="w-full py-2 mt-4 rounded-md text-white bg-green-500"
          onClick={downloadVideo}
        >
          Download Video
        </button>
      )}
    </div>
  );
};

const StyledToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  .toggle {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .toggle input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #4caf50; // Change to your desired color
  }

  input:checked + .slider:before {
    transform: translateX(26px);
  }
`;

export default ScreenRecorder;