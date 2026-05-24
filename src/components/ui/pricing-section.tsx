"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TimelineContent } from "@/components/ui/timeline-animation";
import NumberFlow from "@number-flow/react";
import { Cpu, Code2, Smartphone, CheckCheck, Layers } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";

const plans = [
  {
    name: "Robotics & AI",
    description: "Build robots that move, sense, and think. From Arduino circuits to AI face detection.",
    price: 2500,
    yearlyPrice: 22000,
    buttonText: "Enroll Now",
    buttonVariant: "outline" as const,
    badge: "Hardware + AI",
    icon: <Cpu size={20} />,
    features: [
      { text: "Arduino & Electronics",  icon: <Cpu size={20} /> },
      { text: "Robotics + IoT projects", icon: <Layers size={20} /> },
      { text: "AI Computer Vision",      icon: <Cpu size={20} /> },
    ],
    includes: [
      "Every level includes:",
      "Hardware kit (yours to keep)",
      "4 levels: Spark → Innovate",
      "Age 8–18 structured tracks",
      "Offline lab + online support",
    ],
  },
  {
    name: "Coding & Web Dev",
    description: "From Scratch games to React + AI web apps. Every student ships a live website.",
    price: 1800,
    yearlyPrice: 16000,
    buttonText: "Enroll Now",
    buttonVariant: "default" as const,
    popular: true,
    badge: "Web + JavaScript",
    icon: <Code2 size={20} />,
    features: [
      { text: "HTML, CSS, JavaScript",  icon: <Code2 size={20} /> },
      { text: "React + API projects",    icon: <Layers size={20} /> },
      { text: "Live deployed websites",  icon: <Code2 size={20} /> },
    ],
    includes: [
      "Every level includes:",
      "Live website deployment (Vercel)",
      "4 levels: Fun Coder → React Dev",
      "Age 6–18 structured tracks",
      "Portfolio of 3–5 real projects",
    ],
  },
  {
    name: "App & AI Dev",
    description: "Build Android apps and AI projects. Install your own app on your phone.",
    price: 2000,
    yearlyPrice: 18000,
    buttonText: "Enroll Now",
    buttonVariant: "outline" as const,
    badge: "Python + AI",
    icon: <Smartphone size={20} />,
    features: [
      { text: "MIT App Inventor + Python", icon: <Smartphone size={20} /> },
      { text: "AI API integration",        icon: <Cpu size={20} /> },
      { text: "Install app on your phone", icon: <Smartphone size={20} /> },
    ],
    includes: [
      "Every level includes:",
      "Real Android app build",
      "4 levels: Explorer → AI Builder",
      "Age 10–18 structured tracks",
      "AI story, voice & image projects",
    ],
  },
];

const PricingSwitch = ({ onSwitch }: { onSwitch: (value: string) => void }) => {
  const [selected, setSelected] = useState("0");
  const handleSwitch = (value: string) => { setSelected(value); onSwitch(value); };

  return (
    <div className="flex justify-center">
      <div className="relative z-50 mx-auto flex w-fit rounded-full bg-black/60 border border-[#639922]/40 p-1">
        {["Monthly", "Per Course"].map((label, i) => {
          const val = String(i);
          const isSelected = selected === val;
          return (
            <button
              key={val}
              onClick={() => handleSwitch(val)}
              className={`relative z-10 w-fit sm:h-12 h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors ${
                isSelected ? "text-white" : "text-white/60 hover:text-white"
              }`}
            >
              {isSelected && (
                <motion.span
                  layoutId="pswitch"
                  className="absolute top-0 left-0 sm:h-12 h-10 w-full rounded-full border-2 border-[#639922] bg-gradient-to-t from-[#27500A] to-[#639922]"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                {label}
                {i === 1 && (
                  <span className="rounded-full bg-[#EAF3DE] px-2 py-0.5 text-xs font-medium text-[#27500A]">
                    Save ~20%
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0, opacity: 1, filter: "blur(0px)",
      transition: { delay: i * 0.15, duration: 0.5 },
    }),
    hidden: { filter: "blur(10px)", y: -20, opacity: 0 },
  };

  const togglePricingPeriod = (value: string) => setIsYearly(Number.parseInt(value) === 1);

  return (
    <div
      className="px-4 pt-20 pb-20 min-h-screen mx-auto relative bg-[#0a0a0a]"
      ref={pricingRef}
      id="pricing"
    >
      {/* Green glow */}
      <div
        className="absolute top-0 left-[10%] right-[10%] w-[80%] h-full z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at center, #639922 0%, transparent 70%)`,
          opacity: 0.06,
        }}
      />

      <div className="text-center mb-10 max-w-3xl mx-auto relative z-10">
        <TimelineContent
          as="p"
          animationNum={0}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="text-[#639922] uppercase tracking-widest text-sm font-semibold mb-3"
        >
          Pricing
        </TimelineContent>
        <TimelineContent
          as="h2"
          animationNum={1}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="md:text-5xl sm:text-4xl text-3xl font-bold text-white mb-4"
        >
          Invest in Your Child&apos;s{" "}
          <TimelineContent
            as="span"
            animationNum={2}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="border border-dashed border-[#639922] px-2 py-1 rounded-xl bg-[#639922]/10 text-[#C0DD97] inline-block"
          >
            Creator Future
          </TimelineContent>
        </TimelineContent>
        <TimelineContent
          as="p"
          animationNum={3}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="text-white/60 sm:w-[70%] w-full mx-auto"
        >
          Affordable. Premium. Real projects in every session.
        </TimelineContent>
      </div>

      <TimelineContent
        as="div"
        animationNum={4}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="relative z-10"
      >
        <PricingSwitch onSwitch={togglePricingPeriod} />
      </TimelineContent>

      <div className="grid md:grid-cols-3 max-w-6xl gap-6 py-8 mx-auto relative z-10">
        {plans.map((plan, index) => (
          <TimelineContent
            key={plan.name}
            as="div"
            animationNum={5 + index}
            timelineRef={pricingRef}
            customVariants={revealVariants}
          >
            <Card
              className={`relative border ${
                plan.popular
                  ? "ring-2 ring-[#639922] bg-[#0d1a07] border-[#639922]/60"
                  : "bg-black/40 border-[#639922]/20"
              } h-full`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#639922] text-white px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-left pt-8">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#639922]">{plan.icon}</span>
                  <span className="text-xs text-[#639922] font-semibold uppercase tracking-widest">{plan.badge}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-white/50 mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-white/60 text-lg">₹</span>
                  <NumberFlow
                    value={isYearly ? plan.yearlyPrice : plan.price}
                    className="text-4xl font-bold text-white"
                  />
                  <span className="text-white/50 ml-1">/{isYearly ? "course" : "month"}</span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <a
                  href="https://wa.me/91XXXXXXXXXX"
                  className={`block w-full mb-6 p-3 text-center text-base font-semibold rounded-xl transition-all ${
                    plan.popular
                      ? "bg-gradient-to-t from-[#27500A] to-[#639922] shadow-lg shadow-[#639922]/30 border border-[#C0DD97]/20 text-white hover:brightness-110"
                      : "bg-gradient-to-t from-black to-white/5 border border-[#639922]/30 text-white hover:border-[#639922]/60"
                  }`}
                >
                  {plan.buttonText}
                </a>
                <ul className="space-y-2 font-medium py-4">
                  {plan.features.map((feature, fi) => (
                    <li key={fi} className="flex items-center gap-3">
                      <span className="text-[#639922]">{feature.icon}</span>
                      <span className="text-sm text-white/70">{feature.text}</span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-3 pt-4 border-t border-[#639922]/20">
                  <h4 className="font-semibold text-sm text-white/80 mb-2">{plan.includes[0]}</h4>
                  <ul className="space-y-2">
                    {plan.includes.slice(1).map((feature, fi) => (
                      <li key={fi} className="flex items-center gap-3">
                        <span className="h-5 w-5 bg-[#639922]/10 border border-[#639922]/40 rounded-full grid place-content-center flex-shrink-0">
                          <CheckCheck className="h-3 w-3 text-[#639922]" />
                        </span>
                        <span className="text-sm text-white/60">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TimelineContent>
        ))}
      </div>

      {/* Bundle note */}
      <div className="text-center mt-4 relative z-10">
        <p className="text-white/40 text-sm">
          Combo bundles available — Creator (Coding + App): 15% off · Full Stack Kids (All 3): 25% off
          · Registration: ₹500 one-time · Free Workshop available
        </p>
      </div>
    </div>
  );
}
