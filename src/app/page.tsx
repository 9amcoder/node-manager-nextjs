"use client";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { Node } from "@/helper/interfaces";
import CardListComponent from "./components/cardList";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [nodeList, setNodeList] = useState<Node[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5129/api/nodes");
        if (response.ok) {
          const data: Node[] = await response.json();
          setNodeList(data);
          setLoading(false);
        } else {
          setLoading(false);
          setError(response.statusText);
        }
      } catch (error: any) {
        setLoading(false);
        setError(error.message);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="flex min-h-fit items-center p-4 sm:p-8 md:p-16 lg:p-24">
      {loading ? (
        <Loading />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <div className="flex flex-col">
            <div>
              <h1 className="text-xl md:text-4xl md:font-bold">Node Manager</h1>
              <p className="text-gray-500">
                Manage your nodes and their status
              </p>
            </div>
            <CardListComponent nodeList={nodeList} setNodeList={setNodeList}/>
          </div>
        </>
      )}
    </main>
  );
}
