"use client";
import React from "react";

const Loading = () => {
  return (
    <div className="grid grid-rows-4 grid-flow-col gap-4">
      <div>
        <h1 className="text-xl">Loading...</h1>

      </div>
      <div>
        <p>Please wait while we load your content.</p>
      </div>
      <span className="loading loading-dots loading-lg"></span>
    </div>
  );
};

export default Loading;
