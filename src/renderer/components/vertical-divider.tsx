interface VerticalDividerProps {
  width?: string;
  height?: string;
  marginLeft?: string;
  borderColor?: string;
  sizeBorderBottom?: string;
}

export default function VerticalDivider({
  width,
  height,
  marginLeft,
  borderColor,
  sizeBorderBottom,
}: VerticalDividerProps) {
  return (
    <div
      className={`mx-3 ${height} ${width} border-b-${sizeBorderBottom} ${borderColor}`}
    />
  );
}
