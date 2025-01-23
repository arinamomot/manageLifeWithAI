"use client";

import React, { useState, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
} from "@/shared/components";
import { PencilIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import { User } from "@prisma/client";

interface CardNameProps {
  data: User;
  className?: string;
}

export const CardName: React.FC<CardNameProps> = ({ data, className }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        // TODO: Implement your image upload logic here
        console.log("Upload file:", file);
      }
    },
    []
  );

  return (
    <Card className="max-w-[30%] m-4">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row justify-between">
            Profile Information
            <div className="flex flex-row justify-between">
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="w-fit"
              >
                <PencilIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-6 items-start">
          <div
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {data.image ? (
              <div className="relative">
                <Image
                  src={data.image}
                  alt="Profile Image"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                {isHovering && (
                  <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer">
                    <PencilIcon className="w-6 h-6 text-white" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
            ) : (
              <div className="relative">
                <div className="w-[100px] h-[100px] rounded-full bg-gray-200 flex items-center justify-center">
                  <UserIcon className="w-12 h-12 text-gray-500" />
                </div>
                {isHovering && (
                  <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer">
                    <PencilIcon className="w-6 h-6 text-white" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <p>{data.firstName}</p>
              <p>{data.lastName}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
