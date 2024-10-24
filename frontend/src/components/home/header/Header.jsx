"use client";

import React, { useState } from "react";
import MainNav from "@/components/home/header/MainNav";
import SideNav from "@/components/home/header/SideNav";

export default function Page() {
  const [open, setOpen] = useState(false);

  const handleSideNavToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      {/* SideNav should only be visible when open */}
      <SideNav open={open} onSideNavToggle={handleSideNavToggle} />

      {/* MainNav should handle the side nav toggle */}
      <MainNav onSideNavToggle={handleSideNavToggle} open={open} />
    </div>
  );
}
