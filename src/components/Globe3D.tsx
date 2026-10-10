"use client";

import { useCallback, useEffect, useRef, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { GlobeMethods } from "react-globe.gl";
import { MeshPhongMaterial } from "three";

const ReactGlobe = dynamic(() => import("react-globe.gl"), { ssr: false });

const highlightedCountryNames = new Set([
  "United States of America",
  "Canada",
  "United Kingdom",
  "Australia",
  "India",
]);

const globeMaterial = new MeshPhongMaterial({
  color: "#071A38",
  shininess: 18,
});

const markers = [
  { lat: 39.8, lng: -98.6, size: 0.22, label: "United States", href: "/contacts?country=united-states#contact-form" },
  { lat: 56.1, lng: -106.3, size: 0.2, label: "Canada", href: "/contacts?country=canada#contact-form" },
  { lat: 54.5, lng: -3, size: 0.2, label: "United Kingdom", href: "/contacts?country=united-kingdom#contact-form" },
  { lat: -25.3, lng: 133.8, size: 0.2, label: "Australia", href: "/contacts?country=australia#contact-form" },
  { lat: 20.5, lng: 78.9, size: 0.24, label: "India" },
];

const arcs = [
  { startLat: 20.5, startLng: 78.9, endLat: 39.9, endLng: -82.9 },
  { startLat: 20.5, startLng: 78.9, endLat: 43.6, endLng: -79.3 },
  { startLat: 20.5, startLng: 78.9, endLat: 51.5, endLng: -0.1 },
  { startLat: 20.5, startLng: 78.9, endLat: -33.8, endLng: 151.2 },
];

export default function Globe3D() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationTimerRef = useRef<number | null>(null);
  const globeReadyRef = useRef(false);
  const globeVisibleRef = useRef(false);
  const indiaShownRef = useRef(false);
  const [size, setSize] = useState(420);
  const [countries, setCountries] = useState<object[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson", {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load country boundaries");
        return response.json();
      })
      .then((data: { features?: Array<{ properties?: { ADMIN?: string } }> }) => {
        setCountries(data.features ?? []);
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        setCountries([]);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      setSize(Math.max(1, Math.floor(entry.contentRect.width)));
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const showIndiaFirst = useCallback(() => {
    if (!globeReadyRef.current || !globeVisibleRef.current || indiaShownRef.current) return;

    const globe = globeRef.current;
    if (!globe) return;

    indiaShownRef.current = true;
    const controls = globe.controls();
    controls.autoRotate = false;
    globe.pointOfView({ lat: 20.5, lng: 78.9, altitude: 2.1 }, 0);
    rotationTimerRef.current = window.setTimeout(() => {
      controls.autoRotate = true;
    }, 4500);
  }, []);

  const handleGlobeReady = useCallback(() => {
    const globe = globeRef.current;
    if (!globe) return;

    globeReadyRef.current = true;
    globe.controls().autoRotate = false;
    globe.controls().autoRotateSpeed = 0.38;
    globe.renderer().setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    globe.pointOfView({ lat: 20.5, lng: 78.9, altitude: 2.1 }, 0);
    showIndiaFirst();
  }, [showIndiaFirst]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        globeVisibleRef.current = entry.isIntersecting && entry.intersectionRatio >= 0.35;
        if (globeVisibleRef.current) showIndiaFirst();
      },
      { threshold: [0, 0.35, 1] },
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      if (rotationTimerRef.current !== null) window.clearTimeout(rotationTimerRef.current);
    };
  }, [showIndiaFirst]);

  const markerData = useMemo(() => markers, []);
  const arcData = useMemo(() => arcs, []);

  const openCountryPage = (marker: object) => {
    const href = (marker as (typeof markers)[number]).href;
    if (href) window.location.assign(href);
  };

  const getMarkerForCountry = (feature: object) => {
    const countryName = (feature as { properties?: { ADMIN?: string } }).properties?.ADMIN;
    return markers.find(({ label }) =>
      label === countryName || (label === "United States" && countryName === "United States of America"),
    );
  };

  return (
    <div
      ref={containerRef}
      role="group"
      aria-label="Interactive globe showing routes from India to the United States, Canada, the United Kingdom, and Australia"
      className="relative mx-auto aspect-square w-full max-w-[420px]"
    >
      <ReactGlobe
        ref={globeRef}
        onGlobeReady={handleGlobeReady}
        backgroundColor="rgba(0,0,0,0)"
        globeMaterial={globeMaterial}
        showGraticules
        showAtmosphere
        enablePointerInteraction
        rendererConfig={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        pointsData={markerData}
        pointLat="lat"
        pointLng="lng"
        pointColor={() => "#9AF5FF"}
        pointAltitude={0.035}
        pointRadius={(point) => (point as (typeof markers)[number]).size}
        pointLabel="label"
        onPointClick={openCountryPage}
        onPointHover={(point) => {
          if (!containerRef.current) return;
          containerRef.current.style.cursor = point && (point as (typeof markers)[number]).href ? "pointer" : "grab";
        }}
        pointsMerge={false}
        polygonsData={countries}
        polygonLabel={(feature) => (feature as { properties?: { ADMIN?: string } }).properties?.ADMIN ?? ""}
        polygonCapColor={(feature) =>
          highlightedCountryNames.has((feature as { properties?: { ADMIN?: string } }).properties?.ADMIN ?? "")
            ? "rgba(24,166,255,0.82)"
            : "rgba(22,76,145,0.82)"
        }
        polygonSideColor={() => "rgba(5,23,56,0.92)"}
        polygonStrokeColor={(feature) =>
          highlightedCountryNames.has((feature as { properties?: { ADMIN?: string } }).properties?.ADMIN ?? "")
            ? "rgba(130,235,255,0.98)"
            : "rgba(58,137,226,0.7)"
        }
        polygonAltitude={(feature) =>
          highlightedCountryNames.has((feature as { properties?: { ADMIN?: string } }).properties?.ADMIN ?? "")
            ? 0.014
            : 0.004
        }
        polygonCapCurvatureResolution={3}
        onPolygonClick={(feature) => {
          const marker = getMarkerForCountry(feature);
          if (marker) openCountryPage(marker);
        }}
        onPolygonHover={(feature) => {
          if (!containerRef.current) return;
          const marker = feature ? getMarkerForCountry(feature) : undefined;
          containerRef.current.style.cursor = marker?.href ? "pointer" : "grab";
        }}
        arcsData={arcData}
        arcColor={() => ["#FF9A9E", "#FF1744"]}
        arcDashLength={0.018}
        arcDashGap={0.02}
        arcDashAnimateTime={5000}
        arcStroke={0.65}
        atmosphereColor="#168DFF"
        atmosphereAltitude={0.16}
        ringsData={markerData}
        ringLat="lat"
        ringLng="lng"
        ringColor={() => (t: number) => `rgba(104,224,255,${1 - t})`}
        ringMaxRadius={2.2}
        ringPropagationSpeed={1.4}
        ringRepeatPeriod={1800}
        width={size}
        height={size}
      />
    </div>
  );
}
