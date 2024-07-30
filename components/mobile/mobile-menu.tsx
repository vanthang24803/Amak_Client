import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

import { menubar } from '@/constants';

export const MobileMenu = () => {
  return (
    <div className="block md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost">
            <Menu className="w-4 h-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <div className="flex flex-col space-y-4 mt-8">
            <div className="flex flex-col space-y-6 ">
              {menubar.map((item, index) => (
                <Link key={index} href={item.href} className="font-semibold">
                  <SheetClose>{item.title}</SheetClose>
                </Link>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
