'use client';

import { Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ApiKeyInput } from '@/components/ApiKeyInput';

export function Settings() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings2 className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>API Settings</SheetTitle>
          <SheetDescription>
            Configure your translation API preferences and keys.
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6">
          <ApiKeyInput />
        </div>
      </SheetContent>
    </Sheet>
  );
}