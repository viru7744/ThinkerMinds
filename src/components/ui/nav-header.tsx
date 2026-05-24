"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface NavHeaderProps {
  links?: { label: string; href: string }[];
}

function NavHeader({ links }: NavHeaderProps) {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });

  const defaultLinks = links ?? [
    { label: "Home",     href: "#home"      },
    { label: "Courses",  href: "#courses"   },
    { label: "Projects", href: "#projects"  },
    { label: "About",    href: "#about"     },
    { label: "Pricing",  href: "#pricing"   },
    { label: "Contact",  href: "#contact"   },
  ];

  return (
    <ul
      className="relative mx-auto flex w-fit rounded-full border border-[#639922]/40 bg-black/60 backdrop-blur-md p-1 flex-wrap"
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      {defaultLinks.map((link) => (
        <Tab key={link.label} href={link.href} setPosition={setPosition}>
          {link.label}
        </Tab>
      ))}
      <Cursor position={position} />
    </ul>
  );
}

const Tab = ({
  children,
  href,
  setPosition,
}: {
  children: React.ReactNode;
  href: string;
  setPosition: React.Dispatch<React.SetStateAction<{ left: number; width: number; opacity: number }>>;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-sm font-medium"
    >
      <a href={href}>{children}</a>
    </li>
  );
};

const Cursor = ({ position }: { position: { left: number; width: number; opacity: number } }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-7 rounded-full bg-[#639922] md:h-12"
    />
  );
};

export default NavHeader;
