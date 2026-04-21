import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { MenuTab } from "@/types/menu-tab";

interface LnTabsProps {
  tabs: MenuTab[];
  className?: string;
}

export default function LnTabs({ tabs, className }: LnTabsProps) {
  return (
    <Tabs
      defaultValue={tabs[0].value}
      className={cn("flex flex-col gap-6", className)}
    >
      <TabsList className="bg-transparent gap-4 w-full">
        {tabs.map((tab) => (
          <TabsTrigger
            className="h-12 text-base shadow-none! outline data-active:bg-primary data-active:text-primary-foreground data-active:outline-primary"
            key={tab.value}
            value={tab.value}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
