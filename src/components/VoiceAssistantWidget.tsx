import React from "react";

export default function VoiceAssistantWidget() {
  // Avoid JSX type-checking issues with custom element tag using 'as any'
  const ElevenLabsWidget = "elevenlabs-convai" as any;

  return (
    <div id="brightr-voice-embed-root" className="pointer-events-auto">
      {/* ElevenLabs Conversational AI Widget custom element */}
      <ElevenLabsWidget agent-id="agent_0201ktaxnnr1ef392p538s2v8nfc" />
    </div>
  );
}
