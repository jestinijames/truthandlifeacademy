import * as React from "react";

import type {DialogProps} from "@radix-ui/react-dialog";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import {Command as CommandPrimitive} from "cmdk";
import {LuCheck, LuChevronsUpDown, LuSearch} from "react-icons/lu";

import {Button} from "@/components/ui/button";
import {Dialog, DialogContent} from "@/components/ui/dialog";

import {cn} from "@/utils/tailwind-helpers";

// Popover
const Popover = PopoverPrimitive.Root;

const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>
>(({className, ...props}, ref) => (
  <PopoverPrimitive.Trigger
    ref={ref}
    className={cn(
      "cursor-pointer font-sans [&[data-state=open]>svg]:rotate-180",
      className
    )}
    {...props}
  />
));
PopoverTrigger.displayName = PopoverPrimitive.Trigger.displayName;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({className, align = "center", sideOffset = 4, ...props}, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 font-sans text-popover-foreground shadow-md outline-none animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

// CMDK
const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({className, ...props}, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover font-sans text-popover-foreground",
      className
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

type CommandDialogProps = DialogProps;

const CommandDialog = ({children, ...props}: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-2xl">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({className, ...props}, ref) => (
  <div className="flex items-center border-b px-3">
    <LuSearch className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandInputUnstyled = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({className, ...props}, ref) => (
  <div className="flex items-center">
    <LuSearch className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
));

CommandInputUnstyled.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({className, ...props}, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({className, ...props}, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({className, ...props}, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({className, ...props}, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  );
};
CommandShortcut.displayName = "CommandShortcut";

// Combobox
// Define the ComboboxEntity type with value and label properties.
type ComboboxEntity = {
  value: string | number;
  label: string;
};

// Define the props type for the Combobox component.
interface ComboboxProps {
  currentValue?: string | number;
  setCurrentValue: React.Dispatch<React.SetStateAction<string | number>>;
  comboboxEntities: ComboboxEntity[];
  comboboxTitle?: string;
}

// Define the Combobox component.
export function Combobox({
  currentValue,
  setCurrentValue,
  comboboxEntities,
  comboboxTitle,
}: ComboboxProps) {
  // Declare state for tracking whether the combobox is open and its current value.
  const [open, setOpen] = React.useState(false);

  // Define a callback function to handle the selection of an item from the combobox.
  const handleSelect = React.useCallback(
    (selectedValue: string) => {
      const comboboxValue = comboboxEntities.find((comboboxEntity) => {
        return comboboxEntity.label.toLowerCase() === selectedValue;
      })?.value;

      if (!comboboxValue) {
        throw new Error(`Combobox value not found for ${selectedValue}`);
      }

      // Set the new value if it's different, or reset to an empty string if the same.
      setCurrentValue(comboboxValue === selectedValue ? "" : comboboxValue);
      setOpen(false);
    },
    [comboboxEntities, setCurrentValue, setOpen]
  );

  // Return the JSX for rendering the combobox component.
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between whitespace-nowrap"
          aria-haspopup="listbox"
        >
          {/* Render the selected currentvalue label or default selection prompt */}
          {currentValue
            ? comboboxEntities.find(
                (comboboxEntity) => comboboxEntity.value === currentValue
              )?.label
            : `Select ${comboboxTitle ? comboboxTitle : "an option"}`}
          <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          {/* Input field for searching the combobox items */}
          <CommandInput
            placeholder={`Search ${
              comboboxTitle ? comboboxTitle : "items"
            } ...`}
          />
          {/* Empty state message if no items are found */}
          <CommandEmpty>{`No ${
            comboboxTitle ? comboboxTitle : "items"
          } found...`}</CommandEmpty>
          <CommandGroup>
            {/* Render each combobox item with its corresponding label and value */}
            {comboboxEntities.map((comboboxEntity, i) => (
              <CommandItem key={i} onSelect={handleSelect}>
                <LuCheck
                  className={cn(
                    "mr-2 h-4 w-4",
                    currentValue === comboboxEntity.value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {comboboxEntity.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
  CommandInputUnstyled,
  Popover,
  PopoverTrigger,
  PopoverContent,
};
