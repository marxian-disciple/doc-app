import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Droplets,
  Syringe,
  Activity,
  CalendarCheck,
  FileText,
  Lock,
  Stethoscope,
  Users,
  BookOpen,
  PhoneCall,
  Upload,
  Search,
  HeartPulse,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// --- Helper: simple section wrapper
const Section = ({ id, title, subtitle, children, icon: Icon }) => (
  <section id={id} className="py-12 lg:py-16">
    <div className="max-w-6xl mx-auto px-4">
      <div className="mb-8 flex items-center gap-3">
        {Icon ? <Icon className="w-6 h-6 text-rose-600" /> : null}
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-rose-700">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="text-muted-foreground max-w-3xl mb-6">{subtitle}</p>
      )}
      {children}
    </div>
  </section>
);

export default function BloodCancerImmunityPage() {
  const [fileName, setFileName] = useState("");
  const [booked, setBooked] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-red-50 text-foreground">
      {/* Hero */}
      <div className="border-b bg-gradient-to-r from-red-600 via-rose-500 to-pink-500 text-white">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 text-sm mb-3">
                <ShieldCheck className="w-4 h-4" />
                <span>Secure & modern telehealth</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                Blood, Cancer & Immunity Care
              </h1>
              <p className="mt-4 opacity-90">
                Book appointments, manage medical records, and collaborate with hematology, oncology, and immunology specialists—all in one private, easy-to-use space.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button className="bg-teal-500 hover:bg-teal-600 text-white" asChild>
                  <a href="#book">Book an appointment</a>
                </Button>
                <Button className="bg-purple-500 hover:bg-purple-600 text-white" asChild>
                  <a href="#records">Manage records</a>
                </Button>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs opacity-80">
                <Lock className="w-4 h-4" /> End‑to‑end encryption in transit. Access controlled by you.
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <div className="relative p-6 rounded-2xl bg-white/10 border border-white/20">
                <div className="grid grid-cols-3 gap-3">
                  <Card className="rounded-2xl shadow-sm bg-white/90">
                    <CardContent className="p-4 flex flex-col items-center gap-2">
                      <Droplets className="w-6 h-6 text-red-600" />
                      <span className="text-sm text-rose-700">CBC</span>
                    </CardContent>
                  </Card>
                  <Card className="rounded-2xl shadow-sm bg-white/90">
                    <CardContent className="p-4 flex flex-col items-center gap-2">
                      <Syringe className="w-6 h-6 text-orange-500" />
                      <span className="text-sm text-orange-600">Chemo</span>
                    </CardContent>
                  </Card>
                  <Card className="rounded-2xl shadow-sm bg-white/90">
                    <CardContent className="p-4 flex flex-col items-center gap-2">
                      <Activity className="w-6 h-6 text-teal-600" />
                      <span className="text-sm text-teal-700">Immunity</span>
                    </CardContent>
                  </Card>
                </div>
                <div className="absolute -bottom-3 -right-3">
                  <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs bg-pink-100 text-pink-700">
                    24/7 support
                  </Badge>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <Section
        id="quick"
        title="What do you want to do today?"
        subtitle="A few common actions to get you started fast."
        icon={HeartPulse}
      >
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              title: "Find a specialist",
              desc: "Hematologists, oncologists, and immunologists",
              cta: "Search directory",
              href: "#directory",
              icon: Stethoscope,
            },
            {
              title: "Upload lab results",
              desc: "Share CBC, biopsy, imaging, and more",
              cta: "Upload now",
              href: "#records",
              icon: Upload,
            },
            {
              title: "Book or manage visits",
              desc: "Virtual or in‑person appointments",
              cta: "Go to booking",
              href: "#book",
              icon: CalendarCheck,
            },
          ].map((a, i) => (
            <Card key={i} className="rounded-2xl">
              <CardHeader className="flex flex-row items-center gap-3">
                <a.icon className="w-5 h-5" />
                <CardTitle className="text-lg">{a.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{a.desc}</p>
                <Button variant="secondary" asChild>
                  <a href={a.href}>{a.cta}</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Conditions & Services */}
      <Section
        id="services"
        title="Care we support"
        subtitle="From blood disorders to cancer care to immune system conditions."
        icon={BookOpen}
      >
        <div className="grid md:grid-cols-3 gap-4">
          {[{
            title: "Hematology",
            items: ["Anemia & iron disorders", "Clotting & bleeding", "Leukemia & lymphoma (workup)", "Platelet disorders"],
          },{
            title: "Oncology",
            items: ["Chemo / radiation coordination", "Second opinions", "Side‑effect management", "Survivorship plans"],
          },{
            title: "Immunology",
            items: ["Autoimmune conditions", "Allergy & hypersensitivity", "Primary immune deficiency", "Vaccination guidance"],
          }].map((col, idx) => (
            <Card key={idx} className="rounded-2xl">
              <CardHeader>
                <CardTitle>{col.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                  {col.items.map((it, i) => (
                    <li key={i}>{it}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Directory */}
      <Section id="directory" title="Specialist directory" subtitle="Browse verified professionals and request an appointment." icon={Users}>
        <div className="mb-4 grid md:grid-cols-3 gap-3">
          <Input placeholder="Search by name or clinic" />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hematology">Hematology</SelectItem>
              <SelectItem value="oncology">Oncology</SelectItem>
              <SelectItem value="immunology">Immunology</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Visit type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="virtual">Virtual</SelectItem>
              <SelectItem value="inperson">In‑person</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[1,2,3].map((n) => (
            <Card key={n} className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Dr. Specialist {n}</span>
                  <Badge variant="secondary">Verified</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Stethoscope className="w-4 h-4" /> Hematology & Oncology</div>
                <div className="flex items-center gap-2"><CalendarCheck className="w-4 h-4" /> New patients this week</div>
                <Button className="w-full" variant="secondary" asChild>
                  <a href="#book">Request visit</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Booking */}
      <Section id="book" title="Book an appointment" subtitle="We’ll confirm via secure messaging and email." icon={CalendarCheck}>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-2xl">
            <CardContent className="space-y-4 pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Full name</Label>
                  <Input placeholder="Jane Doe" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" placeholder="jane@email.com" />
                </div>
                <div>
                  <Label>Specialty</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Choose" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hematology">Hematology</SelectItem>
                      <SelectItem value="oncology">Oncology</SelectItem>
                      <SelectItem value="immunology">Immunology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Date</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>Time</Label>
                  <Input type="time" />
                </div>
                <div>
                  <Label>Visit type</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Virtual or In‑person" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="virtual">Virtual</SelectItem>
                      <SelectItem value="inperson">In‑person</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Reason for visit</Label>
                <Textarea rows={4} placeholder="Briefly describe your concern (e.g., abnormal CBC, chemotherapy side‑effects, frequent infections)…" />
              </div>
              <Button onClick={() => setBooked(true)} className="w-full">Submit request</Button>
              {booked && (
                <p className="text-sm text-green-600">Request received. You’ll get a secure confirmation shortly.</p>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>What to prepare</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>• Recent labs (CBC, metabolic panel), pathology or imaging reports</p>
              <p>• Current medications and allergies</p>
              <p>• Symptoms timeline and key questions for your clinician</p>
              <p className="flex items-center gap-2"><PhoneCall className="w-4 h-4" /> Emergency? Contact local emergency services.</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Records */}
      <Section id="records" title="Manage medical records" subtitle="Upload, organize, and share documents securely with your care team." icon={FileText}>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-2xl">
            <CardContent className="pt-6">
              <div className="border-2 border-dashed rounded-2xl p-6 text-center">
                <Upload className="w-6 h-6 mx-auto mb-3" />
                <p className="text-sm mb-4 text-muted-foreground">Drag & drop files here or click to browse</p>
                <Input
                  id="file"
                  type="file"
                  className="cursor-pointer"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                />
                {fileName && (
                  <p className="text-xs mt-3">Selected: <span className="font-medium">{fileName}</span></p>
                )}
                <div className="mt-4 flex justify-center gap-2">
                  <Badge variant="secondary">PDF</Badge>
                  <Badge variant="secondary">JPG/PNG</Badge>
                  <Badge variant="secondary">DICOM</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Recent uploads</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {["CBC_08-20.pdf", "BiopsyReport.pdf", "CT_Image.png"].map((f, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl border">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span className="text-muted-foreground">{f}</span>
                  </div>
                  <Button variant="secondary" size="sm">Share</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" title="FAQ" subtitle="Answers to common questions about privacy, booking, and results." icon={Search}>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              q: "How are my records protected?",
              a: "Your documents are encrypted in transit and stored with access controls. Only you and the clinicians you authorize can view them.",
            },
            {
              q: "Can I connect with my current oncologist?",
              a: "Yes. Invite them to view your records or schedule visits through your dashboard.",
            },
            {
              q: "Do you support second opinions?",
              a: "Absolutely. Upload your files and choose \"Second Opinion\" when booking.",
            },
            {
              q: "What file types can I upload?",
              a: "Most common medical document and image formats including PDF, JPG/PNG, and DICOM.",
            },
          ].map((item, i) => (
            <Card key={i} className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-base">{item.q}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{item.a}</CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-muted-foreground flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Private by design</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}