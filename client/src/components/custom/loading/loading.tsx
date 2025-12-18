import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import type { LoadingProps } from "./types";

const Loading = ({ msg, className }: LoadingProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 h-full",
        className
      )}
    >
      <Spinner className="size-10" />
      <span className="text-sm">{msg ?? "Loading"}</span>
    </div>
  );
};

export default Loading;
