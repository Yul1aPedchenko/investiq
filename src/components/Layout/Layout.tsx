import type { LayoutProps } from "./Layout.types";

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      {/* header */}

      <main>{children}</main>
    </div>
  );
};
