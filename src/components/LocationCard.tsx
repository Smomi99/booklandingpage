
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Users, Calendar, Clock, ChevronRight } from 'lucide-react';

interface LocationCardProps {
  id: string;
  name: string;
  address: string;
  image: string;
  rating: number;
  reviewCount: number;
  availability: string;
  popular?: boolean;
  waitTime?: string;
  className?: string;
}

const LocationCard = ({
  id,
  name,
  address,
  image,
  rating,
  reviewCount,
  availability,
  popular = false,
  waitTime,
  className,
}: LocationCardProps) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg group border border-border/40",
        className
      )}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        {popular && (
          <Badge className="absolute top-3 left-3 z-10 bg-primary text-white">
            Popular
          </Badge>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-[1]"></div>
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          loading="lazy"
        />
      </div>
      
      <CardContent className="p-5">
        <div className="mb-2 flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg mb-1">{name}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 mr-1 text-primary/70" />
              <span>{address}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
            <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
          <div className="text-xs text-muted-foreground ml-1 flex items-center">
            <span>({reviewCount})</span>
          </div>
          {waitTime && (
            <div className="ml-auto flex items-center text-xs">
              <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
              <span className="text-muted-foreground">{waitTime} avg. wait</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1 text-primary/70" />
            <span>{availability}</span>
          </div>
        </div>
        
        <Button className="w-full group" variant="outline">
          Check Availability
          <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default LocationCard;
