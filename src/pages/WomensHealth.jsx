import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Upload,
  ShieldCheck,
  Stethoscope,
  Baby,
  HeartPulse,
  FileText,
  Search,
  Phone,
  Mail,
  Clock,
  Video,
  Building2,
  MapPin,
  User2,
  MessageCircleQuestion,
  ArrowRight,
  Lock,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";

// shadcn/ui imports (available in this environment)
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

// ---- Mock Data ----
const specialists = [
  {
    id: 1,
    name: "Dr. Aisha Khumalo",
    title: "OB/GYN, Maternal-Fetal Medicine",
    avatar: "https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=600&auto=format&fit=crop",
    tags: ["Prenatal Care", "High-risk Pregnancy", "Ultrasound"],
    location: "Johannesburg Women’s Clinic",
    nextAvailable: "Wed 10:30",
  },
  {
    id: 2,
    name: "Dr. Naledi Mokoena",
    title: "Reproductive Endocrinologist",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=600&auto=format&fit=crop",
    tags: ["Fertility", "IVF", "PCOS"],
    location: "Cape Town Fertility Centre",
    nextAvailable: "Fri 14:00",
  },
  {
    id: 3,
    name: "Dr. Emma van der Merwe",
    title: "Urogynecologist",
    avatar: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=600&auto=format&fit=crop",
    tags: ["Pelvic Floor", "Incontinence", "Postpartum"],
    location: "Durban Coastal Hospital",
    nextAvailable: "Mon 09:15",
  },
];

const resources = [
  {
    title: "Preparing for Your First Prenatal Visit",
    description: "What to expect and the tests typically performed in the first trimester.",
  },
  {
    title: "Understanding PCOS",
    description: "Symptoms, diagnosis, and lifestyle tips to manage Polycystic Ovary Syndrome.",
  },
  {
    title: "Cervical Cancer Screening",
    description: "Pap test and HPV testing guidelines and how to interpret results.",
  },
];

const conditions = [
  "Prenatal & Antenatal Care",
  "Family Planning & Contraception",
  "Fertility & IVF",
  "Endometriosis",
  "PCOS",
  "Uterine Fibroids",
  "Menopause & Hormone Therapy",
  "Pelvic Floor Disorders",
  "STI Screening & Treatment",
  "Breast Health",
];

function SectionShell({ children, className = "" }) {
    
  return (
    <section className={`w-full max-w-6xl mx-auto px-4 md:px-6 ${className}`}>{children}</section>
  );
}

function Hero() {
  return (
    <div className="relative overflow-hidden">
        
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-pink-600 via-fuchsia-600 to-rose-600 text-white"
      >
        {/* Back Arrow */}
      <Link
        to="/"
        className="inline-flex items-center mb-6 text-white/80 hover:text-white transition-colors"
      >
        <ArrowLeft className="mr-2 w-4 h-4" />
        Back to Home
      </Link>
        <SectionShell className="py-14 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Baby className="w-5 h-5" aria-hidden />
                <Badge className="bg-white/20 hover:bg-white/20 text-white">Women’s Health</Badge>
              </div>
              <h1 className="text-3xl md:text-5xl font-semibold leading-tight">Reproduction & Women’s Health</h1>
              <p className="mt-4 text-white/90 text-base md:text-lg max-w-prose">
                Digitize medical documents and connect with trusted professionals. Book appointments,
                manage records, and receive secure, high‑quality care from anywhere.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button size="lg" className="bg-white text-pink-700 hover:bg-white/90" data-testid="cta-book">
                  <Calendar className="mr-2 h-4 w-4" /> Book an appointment
                </Button>
                <Button size="lg" variant="secondary" className="bg-white/20 backdrop-blur hover:bg-white/30" data-testid="cta-upload">
                  <Upload className="mr-2 h-4 w-4" /> Upload medical record
                </Button>
              </div>
              <div className="mt-4 flex items-center gap-2 text-white/80">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-sm">Bank‑grade encryption • POPIA compliant • You control access</span>
              </div>
            </div>
            <Card className="bg-white/95 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Stethoscope className="w-5 h-5" />Quick actions</CardTitle>
                <CardDescription>Start with a focused task</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-3">
                  <ActionTile icon={<Calendar />} title="Book" subtitle="In‑person or virtual" />
                  <ActionTile icon={<Upload />} title="Upload" subtitle="PDF, images, DICOM" />
                  <ActionTile icon={<Search />} title="Find" subtitle="OB/GYN & specialists" />
                </div>
              </CardContent>
            </Card>
          </div>
        </SectionShell>
      </motion.div>
    </div>
  );
}

function ActionTile({ icon, title, subtitle }) {
  return (
    <button className="group border rounded-2xl p-4 text-left hover:shadow-md transition-all bg-white">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-pink-50 group-hover:bg-pink-100">
          {React.cloneElement(icon, { className: "w-5 h-5 text-pink-600" })}
        </div>
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-xs text-muted-foreground">{subtitle}</div>
        </div>
        <ArrowRight className="ml-auto w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
      </div>
    </button>
  );
}

function Specialists() {
  return (
    <SectionShell className="py-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
          <HeartPulse className="w-5 h-5 text-pink-600" /> Specialists
        </h2>
        <div className="flex items-center gap-2">
          <Input placeholder="Search doctors, services…" className="w-64" data-testid="search-providers" />
          <Button variant="outline"><FilterIcon /> Filters</Button>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {specialists.map((s) => (
          <Card key={s.id} className="rounded-2xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={s.avatar} alt={s.name} />
                  <AvatarFallback>{s.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{s.name}</CardTitle>
                  <CardDescription>{s.title}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-3">
                {s.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="rounded-full">{t}</Badge>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="w-4 h-4" /> {s.location}
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" /> Next: {s.nextAvailable}
              </div>
              <Button size="sm" data-testid={`book-${s.id}`}>
                <Calendar className="mr-2 w-4 h-4" /> Book
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}

function FilterIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4" aria-hidden>
      <path d="M10 18h4v-2h-4v2zm-7-8v2h18v-2H3zm3-6v2h12V4H6z" fill="currentColor" />
    </svg>
  );
}

function BookingAndRecords() {
  const [isVirtual, setIsVirtual] = useState(true);
  const [consent, setConsent] = useState(false);

  return (
    <SectionShell className="py-10">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        {/* Booking */}
        <Card className="rounded-2xl" data-testid="booking-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Calendar className="w-5 h-5" /> Book an appointment</CardTitle>
            <CardDescription>Choose a mode and share your concerns in advance</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="virtual">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="virtual" onClick={() => setIsVirtual(true)} className="flex items-center gap-2"><Video className="w-4 h-4" /> Virtual</TabsTrigger>
                <TabsTrigger value="inperson" onClick={() => setIsVirtual(false)} className="flex items-center gap-2"><MapPin className="w-4 h-4" /> In‑person</TabsTrigger>
              </TabsList>
              <TabsContent value="virtual" className="pt-4">
                <BookingForm isVirtual={true} />
              </TabsContent>
              <TabsContent value="inperson" className="pt-4">
                <BookingForm isVirtual={false} />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Lock className="w-4 h-4" /> Your details are encrypted end‑to‑end.</div>
            <Button disabled={!consent} data-testid="confirm-booking">Confirm</Button>
          </CardFooter>
          <Separator />
          <div className="p-4 flex items-center gap-3">
            <Switch id="consent" checked={consent} onCheckedChange={setConsent} />
            <Label htmlFor="consent" className="text-sm text-muted-foreground">
              I consent to share my information with the selected provider for care purposes.
            </Label>
          </div>
        </Card>

        {/* Records */}
        <Card className="rounded-2xl" data-testid="records-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Upload className="w-5 h-5" /> Upload medical records</CardTitle>
            <CardDescription>Attach referrals, scans, lab results, or maternity notes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="file">Files</Label>
                <Input id="file" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.heic,.dcm" />
                <p className="text-xs text-muted-foreground">Supported: PDF, images, DICOM. Max 20MB each.</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes for your clinician</Label>
                <Textarea id="notes" placeholder="E.g., current symptoms, last menstrual period, medications…" />
              </div>
              <div className="flex gap-2 items-center">
                <Checkbox id="shareDoctor" />
                <Label htmlFor="shareDoctor" className="text-sm">Allow selected doctor to access these files.</Label>
              </div>
              <Button className="w-fit" data-testid="upload-records"><Upload className="mr-2 w-4 h-4" /> Upload securely</Button>
            </div>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> POPIA compliant access controls & audit logs.</div>
          </CardFooter>
        </Card>
      </div>
    </SectionShell>
  );
}

function BookingForm({ isVirtual }) {
  return (
    <div className="grid gap-4">

      <div className="grid gap-2 sm:grid-cols-2">
        <div>
          <Label htmlFor="fullname">Full name</Label>
          <Input id="fullname" placeholder="Your full name" required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" required />
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" required />
        </div>
        <div>
          <Label htmlFor="time">Time</Label>
          <Input id="time" type="time" required />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="reason">Reason for visit</Label>
        <Textarea id="reason" placeholder="E.g., prenatal checkup, fertility consult, contraception counseling…" />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <div>
          <Label htmlFor="doctor">Preferred specialist</Label>
          <select id="doctor" className="border rounded-md h-10 px-3">
            <option>Any available</option>
            {specialists.map((s) => (
              <option key={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="mode">Mode</Label>
          <Input id="mode" readOnly value={isVirtual ? "Virtual video consult" : "In‑person clinic visit"} />
        </div>
      </div>
    </div>
  );
}

function Knowledge() {
  return (
    <SectionShell className="py-10">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><FileText className="w-5 h-5" /> Learn & Prepare</CardTitle>
          <CardDescription>Guides and common topics in reproductive and women’s health</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Common Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-48 pr-4">
                  <ul className="space-y-2 list-disc pl-4 text-sm">
                    {conditions.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </ScrollArea>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Patient Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  {resources.map((r) => (
                    <li key={r.title} className="flex items-start gap-2">
                      <FileText className="w-4 h-4 mt-0.5 text-pink-600" />
                      <div>
                        <div className="font-medium">{r.title}</div>
                        <div className="text-muted-foreground">{r.description}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Questions?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> 24/7 Nurse Line: 0800‑123‑456</div>
                  <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@health.example</div>
                  <div className="flex items-center gap-2"><MessageCircleQuestion className="w-4 h-4" /> FAQ & care navigation</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </SectionShell>
  );
}

function FooterCTA() {
  return (
    <SectionShell className="py-12">
      <div className="rounded-3xl p-8 md:p-12 bg-gradient-to-br from-rose-50 to-pink-50 border">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-2">Bring your care journey online</h3>
            <p className="text-muted-foreground max-w-prose">Create a secure account to store your reproductive health history, share records with providers you trust, and schedule follow‑ups in a few clicks.</p>
          </div>
          <div className="flex gap-3">
            <Button size="lg"><User2 className="mr-2 w-4 h-4" /> Create account</Button>
            <Button size="lg" variant="outline"><Calendar className="mr-2 w-4 h-4" /> Book now</Button>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

export default function WomensHealthPage() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Specialists />
      <BookingAndRecords />
      <Knowledge />
      <FooterCTA />
      <footer className="py-10 text-center text-xs text-muted-foreground">
        <div className="flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4" /> Secure, encrypted, and privacy‑first.
        </div>
        <div className="mt-1">© {new Date().getFullYear()} CareLink – Digital Health Platform</div>
      </footer>
    </main>
  );
}