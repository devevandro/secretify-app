"use client";

export function ImgIcon({
  src,
  width,
  cursor,
  onClick,
}: {
  src: string;
  width?: string;
  cursor?: string;
  onClick?: () => void;
}) {
  return (
    <img
      src={`/svg/${src}`}
      alt=""
      className={`${width} ${cursor}`}
      onClick={onClick}
    />
  );
}
