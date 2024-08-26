import { cookies } from "next/headers";
import { SidebarWrapper } from "./sidebar-wrapper";

type Props = {
  children?: React.ReactNode;
};

export const SidebarDashboard = ({ children }: Props) => {
  const layout = cookies().get("react-resizable-panels:layout:mail");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <SidebarWrapper
      defaultLayout={defaultLayout}
      defaultCollapsed={defaultCollapsed}
      navCollapsedSize={4}
    >
      {children}
    </SidebarWrapper>
  );
};
