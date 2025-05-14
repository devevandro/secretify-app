interface HorizontalDividerProps {
  height?: string;
  borderColor?: string;
}

export default function HorizontalDivider({
  height = "h-8",
  borderColor = "#3D3D3D",
}: HorizontalDividerProps) {
  return (
    <div className={`ml-1 mr-2 ${height} border-r-2 border-[${borderColor}]`} />
  );
}
