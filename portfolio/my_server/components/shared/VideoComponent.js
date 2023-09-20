import React from 'react';

function VideoComponent() {
    return (
      <div>
        <h1>MP4 Video Example</h1>
        <video width="640" height="360" controls>
          <source src="/images/your_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
  
  export default VideoComponent;
  