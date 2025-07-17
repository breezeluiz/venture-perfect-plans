import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatDialog } from "@/components/ChatDialog";
import { ModifyBookingDialog } from "@/components/ModifyBookingDialog";
import { ReviewDialog } from "@/components/ReviewDialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, MapPin, Clock, Users, Star, Download, 
  Phone, Mail, AlertCircle, CheckCircle, XCircle, MessageCircle
} from "lucide-react";

interface Booking {
  id: string;
  ventureTitle: string;
  ventureImage: string;
  location: string;
  date: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  totalAmount: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  bookingReference: string;
  participants: number;
  duration: string;
  guideName: string;
  guideImage?: string;
}

export default function BookingsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Sample booking data - in real app, this would come from API
  const [bookings] = useState<Booking[]>([
    {
      id: '1',
      ventureTitle: 'Romantic Lamu Getaway',
      ventureImage: '⛵',
      location: 'Lamu Island, Kenya',
      date: '2024-03-15',
      status: 'upcoming',
      totalAmount: 560,
      paymentStatus: 'completed',
      bookingReference: 'VEN-2024-001',
      participants: 2,
      duration: '2 Days',
      guideName: 'Amina Hassan',
      guideImage: '/placeholder-avatar.jpg'
    },
    {
      id: '2',
      ventureTitle: 'Maasai Mara Luxury Safari',
      ventureImage: '🦁',
      location: 'Maasai Mara, Kenya',
      date: '2024-02-20',
      status: 'completed',
      totalAmount: 900,
      paymentStatus: 'completed',
      bookingReference: 'VEN-2024-002',
      participants: 2,
      duration: '3 Days',
      guideName: 'David Kiprop',
      guideImage: '/placeholder-avatar.jpg'
    },
    {
      id: '3',
      ventureTitle: 'Diani Beach Day Escape',
      ventureImage: '🏖️',
      location: 'Diani Beach, Kenya',
      date: '2024-01-10',
      status: 'completed',
      totalAmount: 240,
      paymentStatus: 'completed',
      bookingReference: 'VEN-2024-003',
      participants: 2,
      duration: 'Full Day',
      guideName: 'Grace Mwangi',
      guideImage: '/placeholder-avatar.jpg'
    }
  ]);

  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
  const completedBookings = bookings.filter(b => b.status === 'completed');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  const getStatusBadge = (status: string, paymentStatus: string) => {
    if (status === 'upcoming') {
      return (
        <Badge className="bg-blue-100 text-blue-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Confirmed
        </Badge>
      );
    }
    if (status === 'completed') {
      return (
        <Badge className="bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Completed
        </Badge>
      );
    }
    if (status === 'cancelled') {
      return (
        <Badge variant="destructive">
          <XCircle className="h-3 w-3 mr-1" />
          Cancelled
        </Badge>
      );
    }
  };

  const getPaymentBadge = (paymentStatus: string) => {
    if (paymentStatus === 'completed') {
      return (
        <Badge variant="outline" className="text-green-600 border-green-600">
          Paid
        </Badge>
      );
    }
    if (paymentStatus === 'pending') {
      return (
        <Badge variant="outline" className="text-yellow-600 border-yellow-600">
          Pending
        </Badge>
      );
    }
    if (paymentStatus === 'failed') {
      return (
        <Badge variant="outline" className="text-red-600 border-red-600">
          Failed
        </Badge>
      );
    }
  };

  const BookingCard = ({ booking }: { booking: Booking }) => {
    const handleBookNow = () => {
      // Simulate booking process
      toast({
        title: booking.status === 'completed' ? "Booking again!" : "Booking confirmed!",
        description: `${booking.ventureTitle} has been ${booking.status === 'completed' ? 'booked again' : 'booked'}. Check your email for details.`,
      });
    };

    const handleDownloadVoucher = () => {
      // Create and download voucher
      const voucherContent = `
VENTURE BOOKING VOUCHER
======================

Booking Reference: ${booking.bookingReference}
Adventure: ${booking.ventureTitle}
Location: ${booking.location}
Date: ${new Date(booking.date).toLocaleDateString()}
Duration: ${booking.duration}
Participants: ${booking.participants}
Total Amount: $${booking.totalAmount}
Payment Status: ${booking.paymentStatus}
Guide: ${booking.guideName}

Terms & Conditions:
- Present this voucher at the meeting point
- Arrive 15 minutes before departure
- Valid for the date specified only
- Cancellations must be made 24 hours in advance

Contact: bookings@venture.co.ke | +254 700 123 456
`;

      const blob = new Blob([voucherContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `voucher_${booking.bookingReference}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Voucher downloaded",
        description: "Your booking voucher has been downloaded successfully.",
      });
    };

    return (
    <Card className="mb-6 hover:shadow-medium transition-all duration-300 card-hover">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="text-5xl">{booking.ventureImage}</div>
            <div>
              <CardTitle className="text-xl font-display font-semibold mb-1">{booking.ventureTitle}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {booking.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(booking.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {booking.duration}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {booking.participants} participants
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(booking.status, booking.paymentStatus)}
                {getPaymentBadge(booking.paymentStatus)}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-venture-coral mb-1">
              ${booking.totalAmount}
            </div>
            <div className="text-sm text-muted-foreground">
              Ref: {booking.bookingReference}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleDownloadVoucher}>
              <Download className="h-4 w-4 mr-2" />
              Download Voucher
            </Button>
            {booking.status === 'upcoming' && (
              <ChatDialog 
                guideName={booking.guideName}
                guideImage={booking.guideImage}
                bookingId={booking.bookingReference}
                triggerButton={
                  <Button variant="outline" size="sm" className="hover-scale">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat with Guide
                  </Button>
                }
              />
            )}
            {booking.status === 'completed' && (
              <ReviewDialog
                ventureTitle={booking.ventureTitle}
                bookingId={booking.bookingReference}
                triggerButton={
                  <Button variant="outline" size="sm" className="hover-scale">
                    <Star className="h-4 w-4 mr-2" />
                    Leave Review
                  </Button>
                }
              />
            )}
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              onClick={handleBookNow}
              className="bg-venture-coral hover:bg-venture-coral/90 hover-scale"
            >
              {booking.status === 'completed' ? 'Book Again' : 'Book Now'}
            </Button>
            {booking.status === 'upcoming' && (
              <ModifyBookingDialog
                bookingId={booking.bookingReference}
                currentDate={booking.date}
                currentParticipants={booking.participants}
                ventureTitle={booking.ventureTitle}
                triggerButton={
                  <Button variant="outline" size="sm" className="hover-scale">
                    Modify Booking
                  </Button>
                }
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold text-venture-coral mb-4">
            Please Sign In
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            You need to be signed in to view your bookings.
          </p>
          <Button onClick={() => navigate('/auth')}>
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-venture-coral mb-4 animate-fade-in">
            My Bookings
          </h1>
          <p className="text-xl text-muted-foreground font-sans">
            Manage your adventures and track your journey with us.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-venture-coral">{bookings.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{upcomingBookings.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completedBookings.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                ${bookings.reduce((sum, b) => sum + b.totalAmount, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Bookings ({bookings.length})</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedBookings.length})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({cancelledBookings.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            {bookings.length > 0 ? (
              <div>
                {bookings.map(booking => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-2xl font-semibold mb-2">No bookings yet</h3>
                <p className="text-muted-foreground mb-6">
                  Your adventure starts here! Book your first venture today.
                </p>
                <Button onClick={() => navigate('/venture-packs')}>
                  Browse Adventures
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="upcoming" className="mt-6">
            {upcomingBookings.length > 0 ? (
              <div>
                {upcomingBookings.map(booking => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-2xl font-semibold mb-2">No upcoming adventures</h3>
                <p className="text-muted-foreground mb-6">
                  Time to plan your next escape! Browse our curated experiences.
                </p>
                <Button onClick={() => navigate('/venture-packs')}>
                  Plan Next Adventure
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="mt-6">
            {completedBookings.length > 0 ? (
              <div>
                {completedBookings.map(booking => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🌟</div>
                <h3 className="text-2xl font-semibold mb-2">No completed adventures yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start creating memories that will last a lifetime!
                </p>
                <Button onClick={() => navigate('/venture-packs')}>
                  Book Your First Adventure
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="cancelled" className="mt-6">
            {cancelledBookings.length > 0 ? (
              <div>
                {cancelledBookings.map(booking => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-semibold mb-2">No cancelled bookings</h3>
                <p className="text-muted-foreground mb-6">
                  Great! All your adventures are on track.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Help Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-venture-coral" />
              Need Help?
            </CardTitle>
            <CardDescription>
              Our team is here to assist you with any questions about your bookings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <div className="font-semibold">Call Us</div>
                  <div className="text-sm text-muted-foreground">+254 700 123 456</div>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <div className="font-semibold">Email Support</div>
                  <div className="text-sm text-muted-foreground">bookings@venture.co.ke</div>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <div className="font-semibold">Available</div>
                  <div className="text-sm text-muted-foreground">24/7 Support</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}