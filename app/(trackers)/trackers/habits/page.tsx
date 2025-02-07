import { prisma } from "@/prisma/prisma-client";
import { HabitsTracker } from "@/shared/components/shared/trackers/habits/habits-tracker";
import { getUserSession } from "@/shared/lib";
import { getHabits } from "@/shared/lib/get-habbits";
import { redirect } from "next/navigation";

export default async function HabitsPage() {
  const session = await getUserSession();
  if (!session) {
    return redirect("/not-auth");
  }

  const user = await prisma.user.findFirst({
    where: {
      id: Number(session?.id),
    },
  });

  if (!user) {
    return redirect("/not-auth");
  }

  const habits = await getHabits(user.id);

  return <HabitsTracker user={user} habits={habits} />;
}
