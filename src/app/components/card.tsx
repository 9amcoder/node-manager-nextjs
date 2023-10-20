"use client";
import { Node } from "@/helper/interfaces";
import { useState } from "react";

interface CardComponentProps {
  node: Node;
  onDelete: () => void;
  onStatusChange: (isOnline: boolean) => void;
}

function CardComponent({ node, onDelete, onStatusChange }: CardComponentProps) {
  const onlineTime = new Date(node.onlineTime).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  // State to track if the delete button was clicked
  const [isDeleting, setIsDeleting] = useState(false);

  // Function to handle node deletion
  const handleDelete = async () => {
    try {
      // Make a DELETE request to delete the node by its ID
      const response = await fetch(
        `http://localhost:5129/api/nodes/${node.nodeId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the node. Please try again.");
      }

      // Call the onDelete function from CardListComponent to update the node list
      onDelete();

      // Handle the successful deletion here (e.g., show a message, update the UI)
      console.log("Node deleted successfully!");
      setIsDeleting(false);
    } catch (error) {
      // Handle errors, you can show an error message or log the error
      console.error(error);
    }
  };

  // Function to handle status change
  const handleStatusChange = async () => {
    try {
      // Make a PUT request to change the online status of the node
      const response = await fetch(
        `http://localhost:5129/api/nodes/${node.nodeId}/setOnline`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isOnline: !node.isOnline }), // Toggle the current status
        }
      );

      if (!response.ok) {
        throw new Error("Failed to change the status. Please try again.");
      }

        // Call the onStatusChange function from CardListComponent to update the node list
        onStatusChange(!node.isOnline)


      // Handle the successful status change here (e.g., update the UI)
      console.log("Status changed successfully!");
    } catch (error) {
      // Handle errors, you can show an error message or log the error
      console.error(error);
    }
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl my-8">
      <div className="card-body">
        <div className="alert bg-gradient-to-r from-indigo-200 mb-5 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>Location: {node.city}</span>
        </div>
        <button className="btn mb-5" onClick={handleStatusChange}>
          Change Status
        <div className={`badge ${node.isOnline ? "badge-accent" : "badge-secondary"}`}>
            {node.isOnline ? "Online" : "Offline"}
        </div>
        </button>
        <div className="stats stats-vertical shadow">
          <div className="stat">
            <div className="stat-title">Downloads</div>
            <div className="md:stat-value">{node.downloadUtilization} / MB</div>
            <div className="stat-desc">From Jan 1st - Feb 1st</div>
          </div>

          <div className="stat">
            <div className="stat-title">Upload</div>
            <div className="md:stat-value text-secondary">
              {node.uploadUtilization} / MB
            </div>
            <div className="stat-desc">From Jan 1st - Feb 1st</div>
          </div>

          <div className="stat">
            <div className="stat-title">Connected Clients</div>
            <div className="md:stat-value">{node.connectedClients}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Error rate</div>
            <div className="md:stat-value">{node.errorRate}</div>
          </div>
        </div>
        <p className="italic">ID: {node.nodeId}</p>
        <p className="md:font-bold">Created at: {onlineTime}</p>
        <div className="card-actions flex justify-center mt-3">
          <button className="btn btn-outline">View Details</button>
          <button className="btn btn-outline btn-secondary ml-2"
            onClick={handleDelete}
            disabled={isDeleting}
          >{isDeleting ? "Deleting..." : "Delete Node" }</button>
        </div>
      </div>
    </div>
  );
}

export default CardComponent;
