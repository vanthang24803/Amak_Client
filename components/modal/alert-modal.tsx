"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Modal } from "./modal";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Bạn có chắc không?"
      description="Hành động này không thể quay lại!"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Thoát
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          Xác nhận
        </Button>
      </div>
    </Modal>
  );
};
