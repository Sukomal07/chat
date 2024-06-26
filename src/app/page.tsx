import Chat from "@/components/Chat";
import CreateRecord from "@/components/CreateRecord";
import Record from "@/components/Record";

export default function Home() {
  return (
    <div className="grid md:grid-cols-2 gap-6 p-5 h-screen w-screen">
      <div className="flex flex-col gap-2 h-full">
        <div className="min-h-[50%] h-1/2">
          <CreateRecord />
        </div>
        <div className="min-h-[50%] h-1/2">
          <Record />
        </div>
      </div>
      <Chat />
    </div>
  );
}
