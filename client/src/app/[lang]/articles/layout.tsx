import {Toaster} from "@/components/ui/toast";

export default function layout({children}: {children: React.ReactNode}) {
  return (
    <div>
      {children}

      <Toaster />
    </div>
  );
}
