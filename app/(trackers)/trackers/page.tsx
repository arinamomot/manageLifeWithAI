import Link from "next/link";
import { Button } from "@/shared/components";

export default function TrackersPage() {
  return (
    <div className="flex flex-col gap-4">
      <Link href="/trackers/habits">
        <Button>Habits</Button>
      </Link>
      <Link href="/trackers/todo">
        <Button>Todo</Button>
      </Link>
    </div>
  );
}
