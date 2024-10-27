import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const JitsiMeet = () => {
  const { videolink } = useParams();
  const roomName = videolink || "VideoConsultant";

  useEffect(() => {
    if (window.JitsiMeetExternalAPI) {
      const domain = "meet.jit.si";
      const options = {
        roomName: roomName,
        width: "100%",
        height: "100%",
        parentNode: document.getElementById('jitsi-container'),
        interfaceConfigOverwrite: {
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          TOOLBAR_BUTTONS: [
            'microphone', 'camera', 'chat', 'raisehand', 'tileview', 
            'hangup', 'screenshare', 'recording', 'fullscreen', 'security'
          ], // Adding moderator tools like screen sharing, recording
        },
        configOverwrite: {
          startWithAudioMuted: true,
          startWithVideoMuted: true,
          enableNoAudioDetection: true,
          enableNoisyMicDetection: true,
          prejoinPageEnabled: true,  // Keep prejoin for control over the meeting
          requireDisplayName: true,  // Display names for users
          enableLobby: true,         // Enable lobby for moderator control
        },
        userInfo: {
          displayName: "Doctor",  // Display doctor as the participant
        },
      };

      const api = new window.JitsiMeetExternalAPI(domain, options);

      // Event when participants join
      api.addEventListener('participantJoined', (event) => {
        console.log('Participant joined:', event);
      });

      // Event when the conference ends
      api.addEventListener('videoConferenceLeft', () => {
        console.log('Conference ended');
      });

      return () => {
        api.dispose();
      };
    } else {
      console.error('Jitsi Meet API script not loaded');
    }
  }, [roomName]);

  return (
    <div>
      <div className="p-4 text-center">
        <h1 className="text-xl font-bold">Doctor's Video Consultation</h1>
        <p>You have control over the session. Manage participants and meeting settings as required.</p>
      </div>
      <div id="jitsi-container" style={{ height: "600px", width: "100%" }}>
        {/* Jitsi iframe will be inserted here */}
      </div>
    </div>
  );
};

export default JitsiMeet;
