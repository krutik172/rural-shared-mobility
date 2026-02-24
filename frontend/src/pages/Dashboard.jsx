import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Badge } from '../components/UI';
import { Plus, Users, Clock, MapPin, IndianRupee } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock Active RideGroups Data
  const activeRideGroups = [
    {
      id: 1,
      origin: "Sanand Main Chowk",
      destination: "Ahmedabad SG Highway",
      scheduled_time: "Tomorrow, 8:00 AM",
      passengers: 2,
      per_seat_cost: 65,
    },
    {
      id: 2,
      origin: "Viramgam Station",
      destination: "City Central Hospital",
      scheduled_time: "Today, 4:30 PM",
      passengers: 1,
      per_seat_cost: 110,
    }
  ];

  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-between items-center px-1">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Good Morning</h2>
          <p className="text-slate-500 text-sm">Where are we going today?</p>
        </div>
      </div>

      <Button onClick={() => navigate('/request/new')} className="h-16 text-lg shadow-md mb-8">
        <Plus className="w-6 h-6 mr-1" />
        Request a New Ride
      </Button>

      <div className="space-y-4">
        <h3 className="font-semibold text-slate-800 text-lg px-1">Join Neighbours Traveling</h3>
        
        {activeRideGroups.map((group) => (
          <Card 
            key={group.id} 
            className="cursor-pointer active:scale-[0.98] transition-transform"
            onClick={() => navigate(`/group/${group.id}`)}
          >
             <div className="flex justify-between items-start mb-3">
               <Badge isSuccess={group.passengers > 1}>{group.passengers}/4 Joined</Badge>
               <div className="flex items-center text-primary-600 font-bold">
                 <IndianRupee className="w-4 h-4" />
                 {group.per_seat_cost}/seat
               </div>
             </div>
             
             <div className="space-y-3 relative">
                <div className="absolute left-2.5 top-3 bottom-3 w-0.5 bg-slate-200"></div>
                
                <div className="flex items-start gap-3 relative z-10">
                  <div className="bg-slate-100 p-1 rounded-full mt-1 border-2 border-white">
                    <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">From</p>
                    <p className="font-medium text-slate-800">{group.origin}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 relative z-10">
                  <div className="bg-primary-100 p-1 rounded-full mt-1 border-2 border-white">
                    <MapPin className="w-2.5 h-2.5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">To</p>
                    <p className="font-medium text-slate-800">{group.destination}</p>
                  </div>
                </div>
             </div>

             <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-sm text-slate-600">
               <Clock className="w-4 h-4 mr-2 text-slate-400" />
               Departure: {group.scheduled_time}
             </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
