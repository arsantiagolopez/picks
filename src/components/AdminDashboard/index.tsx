import Link from "next/link";
import React, { FC } from "react";

interface Props {}

const AdminDashboard: FC<Props> = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 py-20">
      <Link href="/admin/new">
        <button className="font-Basic tracking-tighter text-2xl md:text-3xl text-primary dark:text-white bg-white dark:bg-secondary aspect-square shadow-md rounded-lg hover:animate-pulse hover:bg-gray-50 dark:hover:bg-tertiary">
          Add picks
        </button>
      </Link>

      <Link href="/admin/new-parlay">
        <button className="font-Basic tracking-tighter text-2xl md:text-3xl text-primary dark:text-white bg-white dark:bg-secondary aspect-square shadow-md rounded-lg hover:animate-pulse hover:bg-gray-50 dark:hover:bg-tertiary">
          Create parlay
        </button>
      </Link>

      <Link href="/admin/settings">
        <button className="font-Basic tracking-tighter text-2xl md:text-3xl text-primary dark:text-white bg-white dark:bg-secondary aspect-square shadow-md rounded-lg hover:animate-pulse hover:bg-gray-50 dark:hover:bg-tertiary">
          Settings
        </button>
      </Link>
    </div>
  );
};

export { AdminDashboard };
