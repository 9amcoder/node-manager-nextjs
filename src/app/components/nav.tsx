
"use client";

import Link from "next/link";

function Nav() {
  return (
    <div className="navbar bg-gradient-to-r from-gray-200">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost normal-case text-xl">TekSavvy</Link>
      </div>
      <div className="navbar-end">
        <Link href="/create"className="btn btn-active btn-neutral ">Add Node +</Link>
      </div>
    </div>
  );
}

export default Nav;
