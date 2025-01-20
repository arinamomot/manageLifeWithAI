import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Title } from "./title";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";

interface Props {
  title: string;
  text: string;
  className?: string;
  imageUrl?: string;
}

export const InfoBlock: React.FC<Props> = ({
  className,
  title,
  text,
  imageUrl,
}) => {
  return (
    <div
      className={cn(
        className,
        "flex flex-col lg:flex-row items-center lg:justify-between gap-6 lg:gap-12 w-full max-w-[840px] mx-auto p-4"
      )}
    >
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
        <div className="w-full max-w-[445px]">
          <Title size="lg" text={title} className="font-extrabold" />
          <p className="text-gray-400 text-base lg:text-lg mt-2">{text}</p>
        </div>

        <div className="flex gap-3 mt-6">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft />
              Back to home
            </Button>
          </Link>
          <a href="">
            <Button
              variant="outline"
              className="text-gray-500 border-gray-400 hover:bg-gray-50"
            >
              Refresh
            </Button>
          </a>
        </div>
      </div>

      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full max-w-[300px] h-auto object-contain"
        />
      )}
    </div>
  );
};
