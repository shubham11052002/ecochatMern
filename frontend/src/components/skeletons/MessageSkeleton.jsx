import { Skeleton } from "@nextui-org/react";

const MessageSkeleton = () => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {[...Array(6)].map((_, idx) => (
        <div
          key={idx}
          className={`flex gap-4 items-end ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}
        >
          {/* Avatar on left side (receiver) */}
          {idx % 2 === 0 && (
            <Skeleton
              className="rounded-full"
              style={{ width: "40px", height: "40px" }}
              classNames={{ base: "bg-gradient-to-br from-gray-300 to-gray-100 dark:from-gray-700 dark:to-gray-600" }}
            />
          )}

          <div className="flex flex-col gap-2 max-w-xs">
            <Skeleton
              className="rounded-full"
              style={{ width: "80px", height: "12px" }}
              classNames={{ base: "bg-gradient-to-r from-gray-300 to-gray-100 dark:from-gray-700 dark:to-gray-600" }}
            />
            <Skeleton
              className="rounded-2xl"
              style={{ width: "200px", height: "64px" }}
              classNames={{
                base:
                  idx % 2 === 0
                    ? "bg-gradient-to-br from-zinc-200 to-zinc-100 dark:from-zinc-700 dark:to-zinc-600"
                    : "bg-gradient-to-br from-blue-200 to-blue-100 dark:from-blue-700 dark:to-blue-600"
              }}
            />
          </div>

          {/* Avatar on right side (sender) */}
          {idx % 2 !== 0 && (
            <Skeleton
              className="rounded-full"
              style={{ width: "40px", height: "40px" }}
              classNames={{ base: "bg-gradient-to-br from-gray-300 to-gray-100 dark:from-gray-700 dark:to-gray-600" }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
