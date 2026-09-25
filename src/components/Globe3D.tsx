"use client";

import { useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";

const ReactGlobe = dynamic(() => import("react-globe.gl"), { ssr: false });

const markers = [
  { lat: 39.9, lng: -82.9, size: 0.08, label: "USA" },
  { lat: 43.6, lng: -79.3, size: 0.06, label: "Canada" },
  { lat: 51.5, lng: -0.1, size: 0.06, label: "UK" },
  { lat: -33.8, lng: 151.2, size: 0.05, label: "Australia" },
  { lat: 20.5, lng: 78.9, size: 0.06, label: "India" },
  { lat: 1.3, lng: 103.8, size: 0.05, label: "SE Asia" },
  { lat: -1.2, lng: 36.8, size: 0.05, label: "Africa" },
  { lat: 25.2, lng: 55.2, size: 0.05, label: "Middle East" },
];

const arcs = [
  { startLat: 39.9, startLng: -82.9, endLat: 51.5, endLng: -0.1 },
  { startLat: 39.9, startLng: -82.9, endLat: 43.6, endLng: -79.3 },
  { startLat: 39.9, startLng: -82.9, endLat: -33.8, endLng: 151.2 },
  { startLat: 39.9, startLng: -82.9, endLat: 20.5, endLng: 78.9 },
  { startLat: 51.5, startLng: -0.1, endLat: 1.3, endLng: 103.8 },
  { startLat: 43.6, startLng: -79.3, endLat: -1.2, endLng: 36.8 },
];

export default function Globe3D() {
  const globeRef = useRef<any>(null);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.8;
      globeRef.current.pointOfView({ altitude: 2.5 }, 0);
    }
  }, []);

  const markerData = useMemo(() => markers, []);
  const arcData = useMemo(() => arcs, []);

  return (
    <div className="relative h-[350px] w-full md:h-[420px]">
      <ReactGlobe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundColor="rgba(0,0,0,0)"
        pointsData={markerData}
        pointLat="lat"
        pointLng="lng"
        pointColor={() => "#F97316"}
        pointAltitude={0.01}
        pointRadius={0.08}
        pointsMerge={false}
        arcsData={arcData}
        arcColor={() => "#F97316"}
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        arcStroke={0.5}
        atmosphereColor="#F97316"
        atmosphereAltitude={0.15}
        width={420}
        height={420}
      />
    </div>
  );
}
