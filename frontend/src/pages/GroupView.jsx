import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Button, Badge } from '../components/UI';
import { ArrowLeft, User, Car, ShieldCheck, MapPin, IndianRupee } from 'lucide-react';

const GroupView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isJoined, setIsJoined] = React.useState(false);

  // Mock Group Data
  const group = {
    id: id || "124",
    status: isJoined ? "confirmed" : "forming",
    origin: "Sanand Main Chowk",
    destination: "Ahmedabad SG Highway",
    timeBlock: "Tomorrow, 8 AM - 10 AM",
    pickupPoint: "Main Banyan Tree Square",
    farePerSeat: 55,
    driver: {
      name: "Suresh Kumar",
      phone: "+91 98765 43210",
      rating: 4.8,
      isVerified: true,
      vehicle: "Maruti Omni (White)",
      numberPlate: "KA 01 AB 1234"
    },
    passengers: [
       { name: "You", seats: 1 },
       { name: "Ramesh", seats: 2 },
       { name: "Kamala", seats: 1 },
    ],
    totalSeats: 4
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-3 px-1">
        <button onClick={() => navigate(-1)} className="p-2 bg-slate-100 rounded-full active:bg-slate-200">
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Ride Details</h2>
          <p className="text-sm text-slate-500">Group #{group.id}</p>
        </div>
      </div>

      <Card className="bg-gradient-to-br from-primary-600 to-teal-500 text-white border-0 shadow-lg">
        <div className="flex justify-between items-start mb-6">
           <Badge className="bg-white/20 text-white capitalize">{group.status}</Badge>
           <div className="text-right">
             <p className="text-sm opacity-90">Your Share</p>
             <p className="text-2xl font-bold flex items-center justify-end"><IndianRupee className="w-5 h-5" />{group.farePerSeat}</p>
           </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="mt-1"><MapPin className="w-5 h-5 opacity-90"/></div>
            <div>
              <p className="text-xs uppercase tracking-wider opacity-80 font-medium">Common Pickup Point</p>
              <p className="font-bold text-lg">{group.pickupPoint}</p>
              <p className="text-sm opacity-90 mt-1">{group.timeBlock}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Driver Card */}
      <div>
        <h3 className="font-semibold text-slate-800 text-lg px-1 mb-3">Your Driver</h3>
        <Card className="border-l-4 border-l-green-500">
           <div className="flex items-start gap-4">
             <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-slate-400" />
             </div>
             <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 text-lg">{group.driver.name}</h4>
                  {group.driver.isVerified && <ShieldCheck className="w-4 h-4 text-green-500" />}
                </div>
                <div className="flex items-center text-sm text-slate-600 mt-1">
                  <span className="font-medium bg-slate-100 px-2 py-0.5 rounded">{group.driver.rating} ★</span>
                  <span className="mx-2">•</span>
                  <span>{group.driver.vehicle}</span>
                </div>
                <div className="mt-2 text-sm font-medium text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg inline-block">
                  {group.driver.numberPlate}
                </div>
             </div>
           </div>
           <div className="mt-4 pt-4 border-t border-slate-100">
             <Button variant="secondary" className="py-3" onClick={() => window.location.href = `tel:${group.driver.phone}`}>
               Call Driver
             </Button>
           </div>
        </Card>
      </div>

      {/* Passengers */}
      <div>
        <h3 className="font-semibold text-slate-800 text-lg px-1 mb-3">Co-Passengers ({group.totalSeats} seats)</h3>
        <Card>
          <div className="space-y-4">
            {group.passengers.map((p, idx) => (
              <div key={idx} className="flex items-center justify-between pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold text-sm">
                    {p.name.charAt(0)}
                  </div>
                  <span className={`font-medium ${p.name === 'You' ? 'text-primary-700' : 'text-slate-700'}`}>{p.name}</span>
                </div>
                <span className="text-sm text-slate-500">{p.seats} seat{p.seats > 1 ? 's' : ''}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {!isJoined && group.status === 'forming' && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 md:sticky md:bottom-auto md:mt-8 md:bg-transparent md:border-0 md:shadow-none md:p-0">
          <Button 
            className="w-full h-14 text-lg font-bold shadow-lg"
            onClick={() => {
              alert("Joined the ride! The backend is recalculating lower fares for everyone.");
              setIsJoined(true);
            }}
          >
            Join Ride for ₹{group.farePerSeat}
          </Button>
          <p className="text-center text-xs text-slate-500 mt-2 md:hidden">Joining will automatically assign a driver if 3 passengers are reached.</p>
        </div>
      )}
    </div>
  );
};

export default GroupView;
