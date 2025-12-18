import { TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ErrorProps } from "./types";

const Error = ({ msg, className }: ErrorProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 h-full",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <TriangleAlert className="text-destructive" /> Oops
      </div>
      <span className="text-sm">{msg ?? "Something went wrong"}</span>
    </div>
  );
};

export default Error;
