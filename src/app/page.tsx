"use client"

import Chat from "@/components/Chat";
import CreateRecord from "@/components/CreateRecord";
import Record from "@/components/Record";
import { useState } from "react";

export default function Home() {
  const [refresh, setRefresh] = useState<boolean>(false)
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-6 p-5 h-screen w-screen ">
      <div className="flex flex-col justify-between h-full overflow-hidden">

        <CreateRecord setRefresh={setRefresh} />

        {/* <div className="h-[68%]">
          <Record refresh={refresh} setRefresh={setRefresh} />
        </div> */}
      </div>
      <Chat />
    </div>
  );
}
