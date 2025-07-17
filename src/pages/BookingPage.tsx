import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, Calendar, Users, MapPin, Clock, Shield, 
  Check, AlertCircle, Mail, Download 
} from "lucide-react";
import { venturePacks } from "@/data/venturePacks";
import { toast } from "@/hooks/use-toast";

export default function BookingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ventureId = searchParams.get('venture');
  const selectedDate = searchParams.get('date');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    guests: '1',
    specialRequests: '',
    emergencyContact: '',
    emergencyPhone: '',
    paymentMethod: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    agreeTerms: false,
    agreeNewsletter: false
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const venture = venturePacks.find(v => v.id === ventureId);

  if (!venture) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold text-venture-coral mb-4">Booking Error</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Invalid venture selected. Please go back and try again.
          </p>
          <Button onClick={() => navigate('/venture-packs')}>
            Browse Ventures
          </Button>
        </div>
      </div>
    );
  }

  const totalCost = parseInt(venture.price.slice(1)) * parseInt(formData.guests);
  const taxAmount = Math.round(totalCost * 0.16); // 16% VAT
  const finalAmount = totalCost + taxAmount;

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateBookingReference = () => {
    return 'VNT-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 4).toUpperCase();
  };

  const generateReceipt = (bookingRef: string) => {
    const receiptContent = `
VENTURE BOOKING RECEIPT
=======================

Booking Reference: ${bookingRef}
Date of Booking: ${new Date().toLocaleDateString()}

VENTURE DETAILS:
${venture.title}
Location: ${venture.location}
Duration: ${venture.duration}
Selected Date: ${selectedDate || 'To be confirmed'}

CUSTOMER DETAILS:
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Number of Guests: ${formData.guests}

COST BREAKDOWN:
Venture Cost: $${venture.price.slice(1)} x ${formData.guests} = $${totalCost}
VAT (16%): $${taxAmount}
Total Amount: $${finalAmount}

PAYMENT METHOD: ${formData.paymentMethod}
Status: CONFIRMED

IMPORTANT INFORMATION:
- Present this booking reference at the venue
- Share with your guide: ${bookingRef}
- Free cancellation up to 24 hours before
- Contact us: hello@venture.co.ke | +254 700 123 456

Thank you for choosing Venture!
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Venture-Receipt-${bookingRef}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.paymentMethod) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      const bookingReference = generateBookingReference();
      
      // Generate and download receipt
      generateReceipt(bookingReference);

      // Simulate sending email
      toast({
        title: "Booking Confirmed! 🎉",
        description: `Your booking reference is ${bookingReference}. Receipt sent to ${formData.email}`,
      });

      // Navigate to bookings page after successful booking
      setTimeout(() => {
        navigate('/bookings');
      }, 2000);
      
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-venture-coral mb-4">
              Complete Your Booking
            </h1>
            <p className="text-xl text-muted-foreground">
              You're just a few steps away from your amazing adventure!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="guests">Number of Guests *</Label>
                        <Select value={formData.guests} onValueChange={(value) => handleInputChange('guests', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num} Guest{num > 1 ? 's' : ''}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Emergency Contact */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Emergency Contact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="emergencyContact">Contact Name</Label>
                        <Input
                          id="emergencyContact"
                          value={formData.emergencyContact}
                          onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="emergencyPhone">Contact Phone</Label>
                        <Input
                          id="emergencyPhone"
                          value={formData.emergencyPhone}
                          onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="specialRequests">Special Requests or Dietary Requirements</Label>
                      <Textarea
                        id="specialRequests"
                        value={formData.specialRequests}
                        onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                        placeholder="Any special requirements, allergies, or requests..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="paymentMethod">Payment Method *</Label>
                      <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="credit-card">Credit Card</SelectItem>
                          <SelectItem value="debit-card">Debit Card</SelectItem>
                          <SelectItem value="paypal">PayPal</SelectItem>
                          <SelectItem value="mpesa">M-Pesa</SelectItem>
                          <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {(formData.paymentMethod === 'credit-card' || formData.paymentMethod === 'debit-card') && (
                      <>
                        <div>
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input
                            id="cardName"
                            value={formData.cardName}
                            onChange={(e) => handleInputChange('cardName', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                              id="expiryDate"
                              placeholder="MM/YY"
                              value={formData.expiryDate}
                              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={formData.cvv}
                              onChange={(e) => handleInputChange('cvv', e.target.value)}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Terms and Conditions */}
                <Card>
                  <CardContent className="space-y-4 pt-6">
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="agreeTerms" 
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) => handleInputChange('agreeTerms', checked)}
                      />
                      <Label htmlFor="agreeTerms" className="text-sm leading-6">
                        I agree to the <span className="text-venture-coral underline cursor-pointer">Terms and Conditions</span> and <span className="text-venture-coral underline cursor-pointer">Privacy Policy</span> *
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="agreeNewsletter" 
                        checked={formData.agreeNewsletter}
                        onCheckedChange={(checked) => handleInputChange('agreeNewsletter', checked)}
                      />
                      <Label htmlFor="agreeNewsletter" className="text-sm">
                        I'd like to receive updates about new adventures and special offers
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </form>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="text-4xl">{venture.image}</div>
                      <div>
                        <h3 className="font-semibold">{venture.title}</h3>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {venture.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {venture.duration}
                          </div>
                          {selectedDate && (
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(selectedDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>{venture.price} × {formData.guests} guest{parseInt(formData.guests) > 1 ? 's' : ''}</span>
                      <span>${totalCost}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>VAT (16%)</span>
                      <span>${taxAmount}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-venture-coral">${finalAmount}</span>
                  </div>

                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Check className="h-3 w-3 mr-2" />
                      Free cancellation up to 24 hours
                    </div>
                    <div className="flex items-center">
                      <Check className="h-3 w-3 mr-2" />
                      Instant confirmation
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-3 w-3 mr-2" />
                      Receipt sent to your email
                    </div>
                    <div className="flex items-center">
                      <Download className="h-3 w-3 mr-2" />
                      Downloadable voucher
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    form="booking-form"
                    onClick={handleBookingSubmit}
                    className="w-full bg-venture-coral hover:bg-venture-coral/90"
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      `Complete Booking - $${finalAmount}`
                    )}
                  </Button>

                  <div className="flex items-center justify-center text-xs text-muted-foreground">
                    <Shield className="h-3 w-3 mr-1" />
                    Secured by 256-bit SSL encryption
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}