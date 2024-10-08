import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  html: string;
  open: boolean;
  handleClose: () => void;
};

export const Preview = ({ html, open, handleClose }: Props) => {
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Preview</DialogTitle>
        </DialogHeader>
        {html ? (
          <div
            className=" overflow-auto transform scale-90 flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <p className="flex items-center justify-center text-[13px] tracking-tight">
            Nothing!
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};
