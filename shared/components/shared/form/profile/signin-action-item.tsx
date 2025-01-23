import { Button } from "@/shared/components/ui/button";
import { AccountType } from "@/shared/constants/types";
import { User } from "@prisma/client";

interface SignInActionItemProps {
  linked: boolean;
  title: string;
  description: string;
  type: AccountType;
  data: User;
}

const icons = {
  google: "https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg",
  github: "https://github.githubassets.com/favicons/favicon.svg",
  email: "https://cdn-icons-png.flaticon.com/512/561/561127.png",
};

export const SignInActionItem: React.FC<SignInActionItemProps> = ({
  linked,
  title,
  description,
  type,
  data,
}) => {
  return (
    <div className="flex items-center space-x-4 justify-between">
      <img className="w-6 h-6" src={icons[type]} />
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{title}</p>
        <p className="text-sm text-muted-foreground">
          {linked ? data.email : description}
        </p>
      </div>
      <Button type="button" variant="destructive" className="min-w-[72px]">
        {linked ? "Unlink" : "Link"}
      </Button>
    </div>
  );
};
