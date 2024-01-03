import React, { ComponentProps } from "react";

type LinkType = {
  children: React.ReactNode;
};

const Link = ({ children, ...props }: LinkType & ComponentProps<"a">) => {
  return <a {...props}>{children}</a>;
};

export default Link;
