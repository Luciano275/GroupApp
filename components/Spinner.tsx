export default function Spinner({width = 40, height = 40, borderWidth = 4}: { width?: number; height?: number; borderWidth?: number }) {
  return (
    <span
      className={`border-4 rounded-full animate-spin-clockwise border-t-blue-400`}
      style={{
        width,
        height,
        borderWidth,
        animation: "spin-clockwise 0.6s ease-in-out infinite"
      }}
    ></span>
  );
}