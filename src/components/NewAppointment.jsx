// This will be the component for creating a new appointment
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';
import { medicalCategories } from './MedicalCategories';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'sonner';
import { Calendar, Clock, User, Stethoscope } from 'lucide-react';

const NewAppointment = ({ isOpen, onClose, selectedDoctor }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    reason: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);

  // Early return if no doctor selected
  if (!selectedDoctor) {
    return null;
  }

  // Get doctor's specialty information
  const doctorSpecialty = medicalCategories.find(
    (cat) => cat.id === selectedDoctor?.specialty
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !selectedDoctor) return;

    setLoading(true);
    try {
      const appointmentData = {
        // Patient info
        patientId: user.uid,
        patientEmail: user.email,
        patientName: user.displayName || 'Unknown Patient',
        
        // Doctor info
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.fullName,
        doctorEmail: selectedDoctor.email,
        doctorSpecialty: selectedDoctor.specialty,
        practiceName: selectedDoctor.practiceName || selectedDoctor.practice_name,
        
        // Appointment details
        date: formData.date,
        time: formData.time,
        reason: formData.reason,
        notes: formData.notes,
        
        // Status and timestamps
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, 'appointments'), appointmentData);
      
      toast.success('Appointment request sent successfully!');
      onClose();
      
      // Reset form
      setFormData({
        date: '',
        time: '',
        reason: '',
        notes: '',
      });
    } catch (error) {
      console.error('Error creating appointment:', error);
      toast.error('Failed to create appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Generate time slots (you can customize this based on doctor's working hours)
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = parseInt(selectedDoctor?.working_hours_start?.split(':')[0]) || 9;
    const endHour = parseInt(selectedDoctor?.working_hours_end?.split(':')[0]) || 17;
    
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            Book Appointment
          </DialogTitle>
        </DialogHeader>

        {/* Doctor Info Card */}
        {selectedDoctor && (
          <Card className="p-4 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-primary">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {selectedDoctor.fullName || 'Dr. Unknown'}
                </h3>
                <p className="text-primary font-medium">
                  {doctorSpecialty?.name || selectedDoctor.specialty || 'General'}
                </p>
                {(selectedDoctor.practiceName || selectedDoctor.practice_name) && (
                  <p className="text-sm text-muted-foreground">
                    {selectedDoctor.practiceName || selectedDoctor.practice_name}
                  </p>
                )}
                {selectedDoctor.experience_years && (
                  <p className="text-sm text-muted-foreground">
                    {selectedDoctor.experience_years} years experience
                  </p>
                )}
              </div>
            </div>
          </Card>
        )}


        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" className="block mb-1 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date
              </Label>
              <Input 
                type="date" 
                id="date" 
                name="date" 
                value={formData.date} 
                onChange={handleChange} 
                min={today}
                required 
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="time" className="block mb-1 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Time
              </Label>
              <Select 
                onValueChange={(value) => setFormData((prev) => ({ ...prev, time: value }))} 
                value={formData.time}
                required
              >
                <SelectTrigger id="time" className="w-full">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="reason" className="block mb-1">
              Reason for Visit *
            </Label>
            <Textarea 
              id="reason" 
              name="reason" 
              value={formData.reason} 
              onChange={handleChange} 
              placeholder="Describe your symptoms or reason for the appointment..."
              required 
              className="min-h-[100px]"
            />
          </div>

          <div>
            <Label htmlFor="notes" className="block mb-1">
              Additional Notes (optional)
            </Label>
            <Textarea 
              id="notes" 
              name="notes" 
              value={formData.notes} 
              onChange={handleChange} 
              placeholder="Any additional information the doctor should know..."
              className="min-h-[80px]"
            />
          </div>

          {/* Consultation Fee Display */}
          {selectedDoctor?.consultation_fee && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
              <p className="text-sm text-amber-800">
                <strong>Consultation Fee:</strong> ${selectedDoctor.consultation_fee}
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Booking...' : 'Book Appointment'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewAppointment;