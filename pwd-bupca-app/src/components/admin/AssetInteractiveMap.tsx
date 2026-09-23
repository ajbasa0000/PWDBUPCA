'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { EquipmentAsset, WorkshopLocation } from '@/types';
import { MapPin, Activity, AlertTriangle, Clock } from 'lucide-react';

interface AssetMapProps {
  locations: WorkshopLocation[];
  assets: EquipmentAsset[];
  selectedLocationId: string;
  onSelectLocation: (locationId: string) => void;
  onSelectAsset: (asset: EquipmentAsset) => void;
}

// Custom Marker Icons for Leaflet
const createCustomIcon = (activeCount: number, isSelected: boolean) => {
  return L.divIcon({
    className: 'custom-map-pin',
    html: `
      <div style="
        background: ${isSelected ? '#2563eb' : '#0f172a'};
        color: white;
        border: 2px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        border-radius: 9999px;
        padding: 4px 10px;
        display: flex;
        align-items: center;
        gap: 6px;
        font-family: inherit;
        font-size: 11px;
        font-weight: 700;
        white-space: nowrap;
        transform: translate(-50%, -50%);
      ">
        <span style="
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: ${activeCount > 0 ? '#10b981' : '#f59e0b'};
        "></span>
        <span>${activeCount} Machines</span>
      </div>
    `,
    iconSize: [80, 30],
    iconAnchor: [40, 15],
  });
};

// Map Recenter Helper Component
const MapViewUpdater: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [center, zoom, map]);
  return null;
};

export const AssetInteractiveMap: React.FC<AssetMapProps> = ({
  locations,
  assets,
  selectedLocationId,
  onSelectLocation,
  onSelectAsset,
}) => {
  const selectedLocation = locations.find((l) => l.id === selectedLocationId);
  const mapCenter: [number, number] = selectedLocation
    ? [selectedLocation.lat, selectedLocation.lng]
    : [14.6555, 121.068];
  const mapZoom = selectedLocation ? 16 : 15;

  return (
    <div className="relative w-full h-[380px] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-zinc-800 shadow-xs z-0">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        scrollWheelZoom={false}
        className="w-full h-full z-0"
        style={{ height: '100%', width: '100%' }}
      >
        <MapViewUpdater center={mapCenter} zoom={mapZoom} />

        {/* Clean OpenStreetMap TileLayer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((loc) => {
          const locAssets = assets.filter((a) => a.locationId === loc.id);
          const activeCount = locAssets.filter((a) => a.status === 'online' || a.status === 'in_use').length;
          const isSelected = selectedLocationId === loc.id;

          return (
            <Marker
              key={loc.id}
              position={[loc.lat, loc.lng]}
              icon={createCustomIcon(locAssets.length, isSelected)}
              eventHandlers={{
                click: () => onSelectLocation(loc.id),
              }}
            >
              <Popup className="custom-leaflet-popup">
                <div className="p-1 space-y-2 min-w-[220px]">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                      UP Diliman Workshop Hub
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 leading-snug">{loc.name}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{loc.address}</p>
                  </div>

                  <div className="border-t border-slate-100 pt-2 space-y-1">
                    <span className="text-[11px] font-semibold text-slate-700 block">
                      Stationed Machinery ({locAssets.length}):
                    </span>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {locAssets.map((ast) => (
                        <div
                          key={ast.id}
                          onClick={() => onSelectAsset(ast)}
                          className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50 hover:bg-blue-50 cursor-pointer text-xs"
                        >
                          <span className="font-medium text-slate-800 truncate max-w-[130px]">
                            {ast.name}
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                            ast.status === 'online' || ast.status === 'in_use'
                              ? 'bg-emerald-100 text-emerald-800'
                              : ast.status === 'idle'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {ast.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Floating Map Legend Overlay */}
      <div className="absolute bottom-3 left-3 z-[400] bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200/80 dark:border-zinc-800 text-[11px] text-slate-600 dark:text-slate-300 shadow-md flex items-center gap-3 pointer-events-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Online / In-Use</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          <span>Idle Standby</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-400"></span>
          <span>Maintenance</span>
        </div>
      </div>
    </div>
  );
};
