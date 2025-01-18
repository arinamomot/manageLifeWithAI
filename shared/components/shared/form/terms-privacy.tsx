"use client";

import React, { useState } from "react";
import { Checkbox } from "@/shared/components/ui/checkbox";

interface Props {
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
}

export const TermsAndPrivacy: React.FC<Props> = ({
  isChecked,
  setIsChecked,
}) => {
  return (
    <div className="flex items-center space-x-2 mt-2">
      <Checkbox
        id="register-terms"
        className="border-black"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <label htmlFor="register-terms" className="text-xs">
        I agree to Blissipline's{" "}
        <a href="#" target="_blank" className="text-blue-500 hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" target="_blank" className="text-blue-500 hover:underline">
          Privacy Policy
        </a>
        .
      </label>
    </div>
  );
};
