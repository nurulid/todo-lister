import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

const ConfirmDialog = ({ children, ...props }) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>{children}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/80 data-[state=open]:animate-overlayShow" />
      <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
        <Dialog.Title className="m-0 text-lg font-medium">
          Are you sure to delete this item?
        </Dialog.Title>
        <Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal opacity-50">
          This action cannot be undone.
        </Dialog.Description>
        <div className="mt-[25px] flex justify-end">
          <Dialog.Close asChild>
            <button
              {...props}
              className="inline-flex h-[35px] items-center justify-center rounded bg-red-200 px-[15px] font-medium leading-none text-red-700 hover:bg-red-300 focus:outline-none transition-all"
            >
              Delete
            </button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button
            className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full opacity-50 hover:opacity-100 focus:outline-none"
            aria-label="Close"
            type="button"
          >
            <X />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default ConfirmDialog;
