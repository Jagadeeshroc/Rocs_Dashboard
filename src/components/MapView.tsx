import { MapContainer, TileLayer, CircleMarker, Popup, useMap, LayersControl } from 'react-leaflet';
import type { Project } from '../types';
import 'leaflet/dist/leaflet.css';
import { useEffect, useMemo } from 'react';

// Component to handle map view reset or flyTo
const MapController = ({ selectedLocation }: { selectedLocation?: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
        if (selectedLocation) {
            map.flyTo(selectedLocation, 8, { duration: 1.5 });
        }
    }, [selectedLocation, map]);
    return null;
};

interface MapViewProps {
    data: Project[];
    selectedId: string | null;
    onSelect: (id: string) => void;
}

export const MapView = ({ data, selectedId, onSelect }: MapViewProps) => {
    // Memoize markers to prevent unnecessary re-renders of all points when only selection changes
    const selectedProject = useMemo(() => data.find(d => d.id === selectedId), [data, selectedId]);

    return (
        <div className="h-full w-full rounded-xl overflow-hidden border border-slate-700 shadow-2xl relative z-0">
            <MapContainer
                center={[20, 0]}
                zoom={2}
                style={{ height: '100%', width: '100%', background: '#0f172a' }}
                preferCanvas={true} // Important for performance with many markers
            >
                <LayersControl position="topright">
                    <LayersControl.BaseLayer checked name="Dark Matter">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Light Voyager">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Satellite">
                        <TileLayer
                            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>

                {/* Static Markers - Memoized to prevent re-render on selection */}
                {useMemo(() => (
                    <>
                        {data.map((project) => (
                            <CircleMarker
                                key={project.id}
                                center={[project.lat, project.lng]}
                                radius={4}
                                pathOptions={{
                                    color: '#ffffff',
                                    fillColor: project.status === 'Alert' ? '#f43f5e' :
                                        project.status === 'Active' ? '#10b981' :
                                            project.status === 'Completed' ? '#3b82f6' : '#f59e0b',
                                    fillOpacity: 0.8,
                                    weight: 0,
                                }}
                                eventHandlers={{
                                    click: () => onSelect(project.id)
                                }}
                            />
                        ))}
                    </>
                ), [data, onSelect])}

                {/* Selected Marker - Rendered nicely on top */}
                {selectedProject && (
                    <CircleMarker
                        center={[selectedProject.lat, selectedProject.lng]}
                        radius={8}
                        pathOptions={{
                            color: '#a855f7',
                            fillColor: selectedProject.status === 'Alert' ? '#f43f5e' :
                                selectedProject.status === 'Active' ? '#10b981' :
                                    selectedProject.status === 'Completed' ? '#3b82f6' : '#f59e0b',
                            fillOpacity: 1,
                            weight: 3,
                        }}
                    >
                        <Popup>
                            <div className="text-slate-800">
                                <h3 className="font-bold text-sm">{selectedProject.projectName}</h3>
                                <p className="text-xs">Status: {selectedProject.status}</p>
                                <p className="text-xs text-slate-500">Lat: {selectedProject.lat.toFixed(2)}, Lng: {selectedProject.lng.toFixed(2)}</p>
                            </div>
                        </Popup>
                    </CircleMarker>
                )}

                <MapController selectedLocation={selectedProject ? [selectedProject.lat, selectedProject.lng] : undefined} />
            </MapContainer>
        </div>
    );
};
