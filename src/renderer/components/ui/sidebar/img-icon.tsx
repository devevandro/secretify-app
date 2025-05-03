"use client";

export function ImgIcon({ src }: { src: string }) {
  return <img src={`/svg/${src}`} alt="" className="w-5" />;
}
