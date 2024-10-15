import dynamic from "next/dynamic";
import { useState } from "react";
import UserOverview from "./userOverview";

const TaskOverview = dynamic(() => import("./TaskOverview"));
const UserDetails = dynamic(() => import("./UserDetails"));

export default function HomeContainer() {
  const [activeComponent, setActiveComponent] = useState(<UserDetails />);

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <div>
      <div className="flex justify-center">
        <button
          className="w-full mx-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 my-2"
          onClick={() => handleComponentChange(<UserDetails />)}
        >
          User Info
        </button>
        <button
          className="w-full mx-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 my-2"
          onClick={() => handleComponentChange(<TaskOverview />)}
        >
          Task Overview
        </button>
        <button
          className="w-full mx-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 my-2"
          onClick={() => handleComponentChange(<UserOverview />)}
        >
          User overview
        </button>
      </div>
      {activeComponent}
    </div>
  );
}
