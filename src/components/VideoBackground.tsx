export function VideoBackground() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-80 blur-md scale-105"
      >
        <source src="/images/4776005_Health_Security_3840x2160.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}
