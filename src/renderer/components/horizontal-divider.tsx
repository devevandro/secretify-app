interface HorizontalDividerProps {
  height: string;
  marginLeft: string;
  borderColor: string;
}

export default function HorizontalDivider({
  height,
  marginLeft,
  borderColor,
}: HorizontalDividerProps) {
  return (
    <div className={`${marginLeft} mr-2 ${height} border-r-2 ${borderColor}`} />
  );
}
