import { cn } from "@/lib/utils";

interface RobotFlybyProps {
  className?: string;
}

export const RobotFlyby = ({ className }: RobotFlybyProps) => {
  return (
    <div className={cn("w-full flex items-center justify-center bg-black", className)}>
      <div className="w-full h-full max-w-5xl rounded-2xl overflow-hidden border border-[#639922]/30 shadow-2xl shadow-[#639922]/10">
        <iframe
          src="https://my.spline.design/untitled-rv0hx3zVdoM6t2ydngxuS7zi/"
          className="w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          title="TinkerMinds Robot Demo"
        />
      </div>
    </div>
  );
};

export default RobotFlyby;
