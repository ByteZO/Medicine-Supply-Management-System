import React from "react";

const HeartbeatAnimation = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="relative flex items-center justify-center w-40 h-40 bg-red-500 rounded-md animate-pulse">
        {/* Medical Cross */}
        <div className="absolute w-16 h-4 bg-white"></div>
        <div className="absolute h-16 w-4 bg-white"></div>

        {/* Heartbeat Line */}
        <div className="absolute bottom-0 flex w-full overflow-hidden">
          <div className="w-1/4 bg-white h-1 animate-beat-1"></div>
          <div className="w-1/4 bg-white h-1 animate-beat-2"></div>
          <div className="w-1/4 bg-white h-1 animate-beat-3"></div>
          <div className="w-1/4 bg-white h-1 animate-beat-1"></div>
        </div>
      </div>
    </div>
  );
};

export default HeartbeatAnimation;
