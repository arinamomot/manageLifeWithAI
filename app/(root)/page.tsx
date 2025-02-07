import { Button, ClientHome } from "../../shared/components";
import Link from "next/link";

export default function Home() {
  // return <ClientHome />;
  return (
    <div className="flex flex-col gap-4">
      <ClientHome />
      <Link href="/calendar">
        <Button>Calendar</Button>
      </Link>
      <Link href="/trackers">
        <Button>Trackers</Button>
      </Link>
    </div>
  );
}
