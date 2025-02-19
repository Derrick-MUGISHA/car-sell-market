"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import HeroFooter from "../_footer/hero-footer";

function HeroSection() {
  return (
    <div
      className="w-full min-h-[90vh] mb-4 flex items-center"
      style={{
        background: `linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 py-8 lg:py-12">
          {/* Card Section */}
          <div className="w-full lg:flex-1 lg:max-w-[50%] xl:max-w-[45%]">
            <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 sm:p-8 lg:p-10">
                <div className="w-full flex flex-col items-start space-y-6">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                    <span className="block mb-2">Find the perfect</span>
                    <span className="block">
                      car for you{" "}
                      <span className="text-green-500 whitespace-nowrap">
                        now
                      </span>
                    </span>
                  </h2>
                  <HeroFooter />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Image Section */}
          <div className="w-full lg:flex-1 lg:max-w-[50%] xl:max-w-[55%]">
            <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px]">
              <Image
                src="https://i.postimg.cc/cHCfJp8x/istockphoto-1150931120-612x612-removebg-preview.png"
                alt="hero-image"
                fill
                className="object-contain object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;