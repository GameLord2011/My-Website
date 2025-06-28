import { useState, useRef } from "react";
import Link from "next/link";
import GitHubCard from "components/ghCard";

export default function GitHubHoverLink({
  href,
  children,
  ...props
}: React.ComponentProps<typeof Link>) {
  const [show, setShow] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  return (
    <span className="relative"
      onMouseEnter={() => {
        clearTimeout((timeout.current) as NodeJS.Timeout);
        setShow(true);
      }}
      onMouseLeave={() => {
        timeout.current = setTimeout(() => setShow(false), 200);
      }}
    >
      <Link href={href} {...props}>{children}</Link>
      {show && <GitHubCard url={href as string} />}
    </span>
  );
}