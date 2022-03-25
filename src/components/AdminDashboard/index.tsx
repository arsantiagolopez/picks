import Link from "next/link";
import React, { FC } from "react";

interface Props {}

const AdminDashboard: FC<Props> = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 py-20">
      <Link href="/admin/new">
        <button className="font-Basic tracking-tighter text-2xl md:text-3xl text-primary aspect-square shadow-md rounded-lg hover:animate-pulse hover:bg-gray-50">
          Add picks
        </button>
      </Link>

      <Link href="/admin/settings">
        <button className="font-Basic tracking-tighter text-2xl md:text-3xl text-primary aspect-square shadow-md rounded-lg hover:animate-pulse hover:bg-gray-50">
          Settings
        </button>
      </Link>
    </div>
  );
};

export { AdminDashboard };
