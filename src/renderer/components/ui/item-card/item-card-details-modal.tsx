"use client";

interface ItemDetailsModalProps {
  label: string;
  text: string;
}

export function ItemCardDetailsModal({ label, text }: ItemDetailsModalProps) {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-white">{text}</p>
      </div>
    </div>
  );
}
