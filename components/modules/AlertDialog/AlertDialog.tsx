import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { ReactNode } from "react";

interface AlertDialogProps {
  title: string;
  description: string;
  confirmButtonText?: string;
  confirmButtonColor?: "error" | "success" | "warning" | "primary";
  cancelButtonText?: string;
  onConfirm?: () => void;
  children: ReactNode | ReactNode[];
}

export const AlertDialog = ({
  title,
  description,
  confirmButtonText,
  confirmButtonColor,
  cancelButtonText,
  onConfirm,
  children,
}: AlertDialogProps) => {
  return (
    <RadixAlertDialog.Root>
      <RadixAlertDialog.Trigger asChild>{children}</RadixAlertDialog.Trigger>

      <RadixAlertDialog.Portal>
        <RadixAlertDialog.Overlay className="absolute top-0 left-0 w-screen h-screen bg-base-300 opacity-50" />

        <RadixAlertDialog.Content className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 card bg-base-200 z-30">
          <div className="card-body">
            <RadixAlertDialog.Title className="card-title">
              {title}
            </RadixAlertDialog.Title>

            <RadixAlertDialog.Description>
              {description}
            </RadixAlertDialog.Description>

            <div className="card-actions mt-8 justify-end">
              <RadixAlertDialog.Cancel className="btn bg-base-100">
                {cancelButtonText}
              </RadixAlertDialog.Cancel>

              <RadixAlertDialog.Action
                className={`btn btn-${confirmButtonColor}`}
                onClick={onConfirm}
              >
                {confirmButtonText}
              </RadixAlertDialog.Action>
            </div>
          </div>
        </RadixAlertDialog.Content>
      </RadixAlertDialog.Portal>
    </RadixAlertDialog.Root>
  );
};
