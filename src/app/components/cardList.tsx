"use client";
import { Node } from "@/helper/interfaces";
import CardComponent from "./card";

interface CardListComponentProps {
  nodeList: Node[];
  setNodeList: (newList: Node[]) => void;
}

function CardListComponent({ nodeList, setNodeList }: CardListComponentProps) {
  const handleNodeDelete = (nodeId: string) => {
    // Filter out the deleted node and set the updated node list
    const updatedList = nodeList.filter((node) => node.nodeId !== nodeId);
    setNodeList(updatedList);
  };

  //handle node online status change
  const handleNodeStatusChange = (nodeId: string, isOnline: boolean) => {
    // Find the node by its ID
    const node = nodeList.find((node) => node.nodeId === nodeId);
    if (node) {
      // Update the node's online status
      node.isOnline = isOnline;
      // Update the node list
      const updatedList = nodeList.map((node) => {
        if (node.nodeId === nodeId) {
          return { ...node, isOnline };
        }
        return node;
      });
      setNodeList(updatedList);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {nodeList.map((node: Node, index: number) => (
        <CardComponent
          key={index}
          node={node}
          onDelete={() =>
            node.nodeId ? handleNodeDelete(node.nodeId) : undefined
          }
          onStatusChange={(isOnline: boolean) =>
            node.nodeId
              ? handleNodeStatusChange(node.nodeId, isOnline)
              : undefined
          }
        />
      ))}
    </div>
  );
}

export default CardListComponent;
