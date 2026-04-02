export default function LoadingDots() {
  return (
    <div className="flex items-center justify-center gap-2 w-full">
      <span className="loading-circle anim-loading"></span>
      <span className="loading-circle anim-loading delay-150"></span>
      <span className="loading-circle anim-loading delay-300"></span>
    </div>
  );
}
