export interface Thresholds {
    maxUploadUtilization: number;
    maxDownloadUtilization: number;
    maxErrorRate: number;
    maxConnectedClients: number;
  }
  
  export interface Telemetry {
    uploadUtilization: number;
    downloadUtilization: number;
    errorRate: number;
    connectedClients: number;
  }

  
  
  export interface Node {
    nodeId?: string;
    city: string;
    onlineTime: string;
    isOnline: boolean;
    uploadUtilization: number;
    downloadUtilization: number;
    errorRate: number;
    connectedClients: number;
    thresholds: Thresholds;
    alarms: any[]; // Replace 'any' with the type of the elements in the 'alarms' array if known
    telemetry: Telemetry;
  }