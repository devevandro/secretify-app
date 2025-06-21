"use client";

export function ImgIcon({
  src,
  width,
  cursor,
  disabled,
  onClick,
}: {
  src: string;
  width?: string;
  cursor?: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button onClick={onClick} disabled={disabled}>
      <img src={`/svg/${src}`} alt="" className={`${width} ${cursor}`} />
    </button>
  );
}
