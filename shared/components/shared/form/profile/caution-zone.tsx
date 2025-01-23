import React from "react";
import { AlertTriangle, Check } from "lucide-react";
import {
  CardTitle,
  CardContent,
  CardHeader,
  Card,
  Button,
  Separator,
} from "@/shared/components";
import { cn } from "@/shared/lib/utils";
import { DeleteActionItem } from "./delete-action-item";

interface CautionZoneProps {
  className?: string;
}

export const CautionZone: React.FC<CautionZoneProps> = React.memo(
  ({ className }) => {
    const cautionItems = [
      {
        type: "delete" as const,
        title: "Delete Account",
        description: "Delete your account and all associated data.",
      },
      {
        type: "reset" as const,
        title: "Reset All Data",
        description:
          "Reset all your data, all progress and go back to ground zero.",
      },
    ];

    return (
      <Card className={cn("w-[30%] m-4", className)}>
        <CardHeader>
          <CardTitle className="flex flex-row items-center gap-2 text-xl">
            <AlertTriangle className="w-5 h-5" /> Caution Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {cautionItems.map((item, index) => (
            <div key={item.type}>
              <DeleteActionItem {...item} />
              {index !== cautionItems.length - 1 && (
                <Separator className="mt-6" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }
);

CautionZone.displayName = "CautionZone";
