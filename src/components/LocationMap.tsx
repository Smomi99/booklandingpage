
import React, { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LocationMap = () => {
  // Placeholder data for the pins
  const [locations] = useState([
    { id: '1', name: 'Downtown Test Center', lat: 40, lng: -73, available: true },
    { id: '2', name: 'Westside Driving School', lat: 40.01, lng: -73.02, available: true },
    { id: '3', name: 'East End Testing', lat: 40.03, lng: -72.95, available: false },
    { id: '4', name: 'North County DMV', lat: 40.05, lng: -73.05, available: true },
  ]);

  // State for the selected location (would be used for highlighting)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden border border-border/60 shadow-sm bg-secondary/30">
      {/* This would be replaced with an actual map library like Google Maps or Mapbox */}
      <div className="absolute inset-0 bg-[url('https://placehold.co/1200x800/e9eef2/e0e7eb')] bg-cover">
        {/* Placeholder for map */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-muted-foreground">
            <p className="text-center mb-4">Interactive map will be implemented with Mapbox</p>
            <Button className="flex mx-auto items-center" variant="outline" size="sm">
              <Navigation className="h-4 w-4 mr-2" />
              Show my location
            </Button>
          </div>
        </div>

        {/* Placeholder for map pins */}
        {locations.map((location) => (
          <div 
            key={location.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300
              ${selectedLocation === location.id ? 'scale-125 z-10' : 'hover:scale-110'}`}
            style={{ 
              left: `${(location.lng + 73.5) * 100}%`, 
              top: `${(40.1 - location.lat) * 100}%` 
            }}
            onClick={() => setSelectedLocation(location.id === selectedLocation ? null : location.id)}
          >
            <div className="relative">
              <MapPin 
                className={`h-8 w-8 ${location.available ? 'text-primary' : 'text-muted-foreground'} 
                ${location.available ? 'fill-primary/20' : 'fill-muted-foreground/10'}`} 
              />
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <div className={`px-2 py-1 rounded bg-white shadow-md text-xs font-medium
                  ${selectedLocation === location.id ? 'opacity-100' : 'opacity-0'} 
                  transition-opacity duration-200`}>
                  {location.name}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Map overlay with gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-white/5"></div>

      {/* Location search panel */}
      <div className="absolute top-4 left-4 right-4 md:right-auto md:w-72 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 border border-border/30">
        <h3 className="font-medium text-sm mb-3">Find Test Centers</h3>
        
        <div className="relative mb-4">
          <input 
            type="text" 
            placeholder="Enter your postal code"
            className="w-full px-3 py-2 rounded-md border border-border/50 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <Button size="icon" className="absolute right-1 top-1 h-6 w-6 bg-transparent hover:bg-transparent text-muted-foreground">
            <MapPin className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {locations.map((location) => (
            <div 
              key={location.id}
              className={`p-2 rounded-md cursor-pointer transition-colors text-sm
              ${selectedLocation === location.id ? 'bg-primary/10 border-l-2 border-primary' : 'hover:bg-muted/50 border-l-2 border-transparent'}`}
              onClick={() => setSelectedLocation(location.id === selectedLocation ? null : location.id)}
            >
              <div className="font-medium">{location.name}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                <span>2.3 miles away</span>
                {location.available && (
                  <span className="ml-auto text-primary flex items-center">
                    Available
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
