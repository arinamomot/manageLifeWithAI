import { prisma } from "@/prisma/prisma-client";
import { getUserSession } from "@/shared/lib";
import { redirect } from "next/navigation";
import {
  CardName,
  CautionZone,
  SignInMethod,
} from "@/shared/components/shared/form/profile";
import { Title } from "@/shared/components";

export default async function ProfilePage() {
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

  return (
    <div className="flex flex-col gap-6">
      <Title className="text-2xl font-bold mt-4 ml-4" text="Profile Settings" />
      <CardName data={user} />
      <SignInMethod data={user} />
      <CautionZone />
    </div>
  );
}
