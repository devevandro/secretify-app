interface HorizontalDividerProps {
  height: string;
  borderColor: string;
}

export default function HorizontalDivider({
  height,
  borderColor,
}: HorizontalDividerProps) {
  return <div className={`ml-1 mr-2 ${height} border-r-2 ${borderColor}`} />;
}
