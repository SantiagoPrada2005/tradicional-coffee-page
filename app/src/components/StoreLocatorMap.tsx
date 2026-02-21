import React, { useEffect, useRef } from 'react';
import { APILoader, StoreLocator } from '@googlemaps/extended-component-library/react';

const CONFIGURATION = {
    "locations": [
        { "title": "Tradicional Coffee", "address1": "Carrera 7 No. 7-40", "address2": "Roldanillo, Roldanillo, Colombia", "coords": { "lat": 4.4109577, "lng": -76.1542103 }, "placeId": "ChIJs9SF7043OI4RDq9ojgneG2s" }
    ],
    "mapOptions": { "center": { "lat": 4.4109577, "lng": -76.1542103 }, "fullscreenControl": true, "mapTypeControl": false, "streetViewControl": false, "zoom": 15, "zoomControl": true, "maxZoom": 17, "mapId": "" },
    "mapsApiKey": (import.meta.env.MAP_API_KEY as string) || "",
    "capabilities": { "input": false, "autocomplete": false, "directions": false, "distanceMatrix": false, "details": false, "actions": false }
};

const StoreLocatorMap: React.FC = () => {
    const locatorRef = useRef<any>(null);

    useEffect(() => {
        if (locatorRef.current) {
            customElements.whenDefined('gmpx-store-locator').then(() => {
                if (locatorRef.current?.configureFromQuickBuilder) {
                    locatorRef.current.configureFromQuickBuilder(CONFIGURATION);
                }
            });
        }
    }, []);

    return (
        <div className="w-full h-[500px] md:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 relative z-10">
            <APILoader apiKey={(import.meta.env.MAP_API_KEY as string) || ""} solutionChannel="GMP_QB_locatorplus_v11_c" />
            <StoreLocator ref={locatorRef} mapId="DEMO_MAP_ID" style={{
                width: '100%',
                height: '100%',
                '--gmpx-color-surface': '#1a1a1a',
                '--gmpx-color-on-surface': '#f6edda',
                '--gmpx-color-on-surface-variant': 'rgba(246, 237, 218, 0.7)',
                '--gmpx-color-primary': '#d6bf90',
                '--gmpx-color-outline': 'rgba(255, 255, 255, 0.1)',
                '--gmpx-font-family-base': '"Plus Jakarta Sans", sans-serif',
                '--gmpx-font-family-headings': '"Plus Jakarta Sans", sans-serif',
                '--gmpx-hours-color-open': '#4ade80',
                '--gmpx-hours-color-closed': '#f87171',
                '--gmpx-rating-color': '#d6bf90',
                '--gmpx-rating-color-empty': 'rgba(255, 255, 255, 0.1)',
            } as React.CSSProperties} />
        </div>
    );
};

export default StoreLocatorMap;
