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

                {data.map((project) => (
                    <CircleMarker
                        key={project.id}
                        center={[project.lat, project.lng]}
                        radius={selectedId === project.id ? 8 : 4}
                        pathOptions={{
                            color: selectedId === project.id ? '#a855f7' : '#ffffff',
                            fillColor: project.status === 'Alert' ? '#f43f5e' :
                                project.status === 'Active' ? '#10b981' :
                                    project.status === 'Completed' ? '#3b82f6' : '#f59e0b',
                            fillOpacity: 0.8,
                            weight: selectedId === project.id ? 3 : 0,
                        }}
                        eventHandlers={{
                            click: () => onSelect(project.id)
                        }}
                    >
                        <Popup>
                            <div className="text-slate-800">
                                <h3 className="font-bold text-sm">{project.projectName}</h3>
                                <p className="text-xs">Status: {project.status}</p>
                                <p className="text-xs text-slate-500">Lat: {project.lat.toFixed(2)}, Lng: {project.lng.toFixed(2)}</p>
                            </div>
                        </Popup>
                    </CircleMarker>
                ))}
                <MapController selectedLocation={selectedProject ? [selectedProject.lat, selectedProject.lng] : undefined} />
            </MapContainer>
        </div>
    );
};
