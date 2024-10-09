import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SidebarSettings from "./_components/sidebar";
import { PropsWithChildren } from "react";

export default function SettingLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center justify-center">
      <Card className="m-4 max-w-screen-xl flex-1">
        <CardContent>
          <CardHeader>
            <div className="flex items-center mb-2">
              <h2 className="scroll-m-20 text-base font-semibold tracking-tight">
                Cài đặt
              </h2>
            </div>
            <Separator />
          </CardHeader>
          <div className="flex items-start gap-2">
            <SidebarSettings />
            <div className="w-4/5">{children}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
