import { Button } from "@/shared/components/ui/button";
import { DeleteActionType } from "@/shared/constants/types";

interface DeleteActionItemProps {
  type: DeleteActionType;
  title: string;
  description: string;
}

export const DeleteActionItem: React.FC<DeleteActionItemProps> = ({
  type,
  title,
  description,
}) => {
  return (
    <div className="flex items-center space-x-4 justify-between">
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Button type="button" variant="destructive" className="min-w-[72px]">
        {type === "delete" ? "Delete" : "Reset"}
      </Button>
    </div>
  );
};
