import React from "react";
import Link from "next/link";
import { Children } from "types/common";
import { useRouter } from "next/router";

type Props = {
  children: Children;
  href: string;
};

const SidebarLink = ({ href, children }: Props) => {
  const router = useRouter();
  let pathname = router.pathname;

  Object.keys(router.query).forEach((key) => {
    pathname = pathname.replace(`[${key}]`, router.query[key] as string);
  });

  const active = pathname === href;

  return (
    <div>
      <Link href={href} passHref>
        <a
          className={`
          inline-flex items-center gap-2 underline decoration-dashed decoration-1
          underline-offset-2 ${active && "font-bold text-blue-500"}`}
        >
          {children}
        </a>
      </Link>
    </div>
  );
};

export default SidebarLink;
