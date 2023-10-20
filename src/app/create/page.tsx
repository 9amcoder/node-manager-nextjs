"use client";
import React, { useState, FormEvent, useEffect } from "react";
import { Node } from "@/helper/interfaces";
import { useRouter } from 'next/navigation'

export default function NodeForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Node>({
    city: "",
    onlineTime: "",
    isOnline: false,
    uploadUtilization: 0,
    downloadUtilization: 0,
    errorRate: 0,
    connectedClients: 0,
    thresholds: {
      maxUploadUtilization: 0,
      maxDownloadUtilization: 0,
      maxErrorRate: 0,
      maxConnectedClients: 0,
    },
    alarms: [],
    telemetry: {
      uploadUtilization: 0,
      downloadUtilization: 0,
      errorRate: 0,
      connectedClients: 0,
    },
  });

  // Set the "onlineTime" field to the current date when the component mounts
  useEffect(() => {
    const currentDate = new Date().toISOString();
    setFormData((prevData) => ({
      ...prevData,
      onlineTime: currentDate,
    }));
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5129/api/nodes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }

      // Handle response if necessary
      const data = await response.json();
      // ...
      
      // Redirect to the home page
      router.push('/');
      // Reset the form after a successful submission
      setFormData({
        city: "",
        onlineTime: "",
        isOnline: false,
        uploadUtilization: 0,
        downloadUtilization: 0,
        errorRate: 0,
        connectedClients: 0,
        thresholds: {
          maxUploadUtilization: 0,
          maxDownloadUtilization: 0,
          maxErrorRate: 0,
          maxConnectedClients: 0,
        },
        alarms: [],
        telemetry: {
          uploadUtilization: 0,
          downloadUtilization: 0,
          errorRate: 0,
          connectedClients: 0,
        },
      });
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    switch (name) {
      case "isOnline":
        setFormData((prevData) => ({
          ...prevData,
          [name]: e.target.checked,
        }));
        break;
      default:
        setFormData((prevData) => ({
          ...prevData,
          [name]: type === "number" ? parseFloat(value) : value,
        }));
        break;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <label className="block mb-4">
            City:
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text text-lg ">Set Online</span>
            <input
              type="checkbox"
              name="isOnline"
              checked={formData.isOnline}
              onChange={handleInputChange}
              className="checkbox"
            />
          </label>
          <label className="block mb-4">
            Upload Utilization:
            <input
              type="number"
              name="uploadUtilization"
              value={formData.uploadUtilization}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </label>
          <label className="block mb-4">
            Download Utilization:
            <input
              type="number"
              name="downloadUtilization"
              value={formData.downloadUtilization}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </label>
          <label className="block mb-4">
            Error Rate:
            <input
              type="number"
              name="errorRate"
              value={formData.errorRate}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </label>
          <label className="block mb-4">
            Connected Clients:
            <input
              type="number"
              name="connectedClients"
              value={formData.connectedClients}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </label>
          <label className="block mb-4">
            Max Upload Utilization:
            <input
              type="number"
              name="maxUploadUtilization"
              value={formData.thresholds.maxUploadUtilization}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </label>
          <label className="block mb-4">
            Max Download Utilization:
            <input
              type="number"
              name="maxDownloadUtilization"
              value={formData.thresholds.maxDownloadUtilization}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </label>
          <label className="block mb-4">
            Max Error Rate:
            <input
              type="number"
              name="maxErrorRate"
              value={formData.thresholds.maxErrorRate}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </label>
          <label className="block mb-4">
            Max Connected Clients:
            <input
              type="number"
              name="maxConnectedClients"
              value={formData.thresholds.maxConnectedClients}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </label>
          <label className="block mb-4">
            Upload Utilization:
            <input
              type="number"
              name="uploadUtilization"
              value={formData.telemetry.uploadUtilization}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </label>
          <label className="block mb-4">
            Download Utilization:
            <input
              type="number"
              name="downloadUtilization"
              value={formData.telemetry.downloadUtilization}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </label>
          <label className="block mb-4">
            Error Rate:
            <input
              type="number"
              name="errorRate"
              value={formData.telemetry.errorRate}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </label>
          <label className="block mb-4">
            Connected Clients:
            <input
              type="number"
              name="connectedClients"
              value={formData.telemetry.connectedClients}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </label>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
