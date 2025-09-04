// pages/DigestiveHealthPage.jsx
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Calendar, Upload, Stethoscope, FileText, ShieldCheck,
  Utensils, Pill, HeartPulse, Phone, Mail, Lock, Search
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";

const API_BASE = "http://localhost:5000/api";

async function handleBooking(data) {
  const res = await fetch(`${API_BASE}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

async function handleUpload(fileList, notes) {
  if (!fileList || fileList.length === 0) return { message: "⚠️ Please select files" };

  const formData = new FormData();
  for (const file of Array.from(fileList)) {
    formData.append("files", file);
  }
  formData.append("notes", notes);

  const res = await fetch(`${API_BASE}/records`, { method: "POST", body: formData });
  return res.json();
}

function BookingForm({ onChange }) {
  const [form, setForm] = useState({ fullname: "", email: "", date: "", time: "", reason: "" });

  function updateField(field, value) {
    const updated = { ...form, [field]: value };
    setForm(updated);
    onChange(updated);
  }

  return (
    <div className="grid gap-3">
      <Label className="text-teal-700">Full name</Label>
      <Input className="border-teal-200 focus:border-teal-600 focus:ring-teal-600" value={form.fullname} onChange={(e) => updateField("fullname", e.target.value)} />
      <Label className="text-teal-700">Email</Label>
      <Input type="email" className="border-teal-200 focus:border-teal-600 focus:ring-teal-600" value={form.email} onChange={(e) => updateField("email", e.target.value)} />
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-teal-700">Date</Label>
          <Input type="date" className="border-teal-200 focus:border-teal-600 focus:ring-teal-600" value={form.date} onChange={(e) => updateField("date", e.target.value)} />
        </div>
        <div>
          <Label className="text-teal-700">Time</Label>
          <Input type="time" className="border-teal-200 focus:border-teal-600 focus:ring-teal-600" value={form.time} onChange={(e) => updateField("time", e.target.value)} />
        </div>
      </div>
      <Label className="text-teal-700">Reason for visit</Label>
      <Textarea className="border-teal-200 focus:border-teal-600 focus:ring-teal-600" value={form.reason} onChange={(e) => updateField("reason", e.target.value)} />
    </div>
  );
}

function BookingAndRecords() {
  const [consent, setConsent] = useState(false);
  const [bookingData, setBookingData] = useState({});
  const fileInputRef = useRef(null);
  const [notes, setNotes] = useState("");

  return (
    <div className="py-10 grid md:grid-cols-2 gap-6">
      {/* Booking */}
      <Card className="bg-teal-50 border-teal-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-teal-700">
            <Calendar className="w-5 h-5 text-teal-600" /> Gastroenterology Appointment
          </CardTitle>
          <CardDescription className="text-teal-600">Schedule a digestive health consultation</CardDescription>
        </CardHeader>
        <CardContent>
          <BookingForm onChange={setBookingData} />
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-xs text-teal-600 flex items-center gap-1">
            <Lock className="w-3 h-3" /> Encrypted
          </div>
          <Button
            className="bg-teal-600 hover:bg-teal-700 text-white"
            disabled={!consent}
            onClick={async () => {
              const res = await handleBooking(bookingData);
              alert(res.message);
            }}
          >
            Confirm
          </Button>
        </CardFooter>
        <Separator />
        <div className="p-4 flex items-center gap-3">
          <Switch checked={consent} onCheckedChange={setConsent} />
          <Label className="text-teal-700 text-sm">I consent to share my info</Label>
        </div>
      </Card>

      {/* Records */}
      <Card className="bg-teal-50 border-teal-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-teal-700">
            <Upload className="w-5 h-5 text-teal-600" /> Upload digestive health reports
          </CardTitle>
          <CardDescription className="text-teal-600">Upload endoscopy, colonoscopy, or lab reports securely</CardDescription>
        </CardHeader>
        <CardContent>
          <Input ref={fileInputRef} type="file" multiple accept=".pdf,.jpg,.png,.dcm" className="border-teal-200 focus:border-teal-600 focus:ring-teal-600" />
          <Textarea
            className="mt-3 border-teal-200 focus:border-teal-600 focus:ring-teal-600"
            placeholder="Notes for gastroenterologist..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button
            className="bg-teal-600 hover:bg-teal-700 text-white"
            onClick={async () => {
              const res = await handleUpload(fileInputRef.current?.files ?? null, notes);
              alert(res.message);
            }}
          >
            <Upload className="w-4 h-4 mr-2" /> Upload
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function DigestiveHealthPage() {
  return (
    <ScrollArea className="h-screen w-full bg-teal-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold mb-6 text-teal-700">
          Digestive System Health
        </motion.h1>

        <p className="text-teal-600 mb-8">
          Access trusted gastroenterology specialists, upload your digestive health reports, and receive expert
          consultations digitally.
        </p>

        <BookingAndRecords />

        {/* Specialists */}
        <div className="py-10">
          <h2 className="text-xl font-semibold mb-4 text-teal-700">Our Specialists</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Dr. Patel", role: "Gastroenterologist", tag: "Colonoscopy", img: "https://randomuser.me/api/portraits/men/32.jpg" },
              { name: "Dr. Wong", role: "Hepatologist", tag: "Liver Health", img: "https://randomuser.me/api/portraits/women/44.jpg" },
              { name: "Dr. Smith", role: "Dietitian", tag: "Nutrition", img: "https://randomuser.me/api/portraits/men/27.jpg" },
            ].map((doc, i) => (
              <Card key={i} className="p-4 bg-teal-50 border-teal-200">
                <div className="flex items-center gap-3">
                  <Avatar><AvatarImage src={doc.img} /><AvatarFallback>{doc.name[0]}</AvatarFallback></Avatar>
                  <div>
                    <h3 className="font-semibold text-teal-700">{doc.name}</h3>
                    <p className="text-sm text-teal-600">{doc.role}</p>
                    <Badge className="bg-green-100 text-green-700">{doc.tag}</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Knowledge Hub */}
        <div className="py-10">
          <h2 className="text-xl font-semibold mb-4 text-teal-700">Knowledge Hub</h2>
          <Tabs defaultValue="ibs">
            <TabsList className="border-b border-teal-200">
              <TabsTrigger value="ibs" className="text-teal-700">IBS</TabsTrigger>
              <TabsTrigger value="acid-reflux" className="text-teal-700">Acid Reflux</TabsTrigger>
              <TabsTrigger value="ulcers" className="text-teal-700">Ulcers</TabsTrigger>
            </TabsList>
            <TabsContent value="ibs">
              <Card className="bg-teal-50 border-teal-200"><CardContent>Irritable Bowel Syndrome (IBS) affects the large intestine and can cause cramps, bloating, and irregular bowel movements.</CardContent></Card>
            </TabsContent>
            <TabsContent value="acid-reflux">
              <Card className="bg-teal-50 border-teal-200"><CardContent>Acid reflux occurs when stomach acid backs up into the esophagus, causing heartburn and indigestion.</CardContent></Card>
            </TabsContent>
            <TabsContent value="ulcers">
              <Card className="bg-teal-50 border-teal-200"><CardContent>Ulcers are open sores in the stomach or small intestine, often caused by infection or medications.</CardContent></Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ScrollArea>
  );
}
