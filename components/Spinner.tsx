export default function Spinner({width = 40, height = 40, borderWidth = 4}: { width?: number; height?: number; borderWidth?: number }) {
  return (
    <span
      className={`border-4 rounded-full animate-spin border-t-blue-400`}
      style={{
        width,
        height,
        borderWidth
      }}
    ></span>
  );
}