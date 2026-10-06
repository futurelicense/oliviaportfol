import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  COVERAGE,
  EMAIL,
  LOCATION,
  PHONE_DISPLAY,
  PHONE_TEL,
  contactReasons,
  interestAreas,
} from "@/lib/site-data";

const emptyForm = { name: "", email: "", organization: "", reason: "", message: "" };

export function ContactSection() {
  const [form, setForm] = useState(emptyForm);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.reason || !form.message) {
      toast.error("Please complete the required fields.");
      return;
    }

    const subject = encodeURIComponent(`${form.reason} — ${form.name}`);
    const body = encodeURIComponent(
      [
        form.message,
        "",
        `From: ${form.name}`,
        `Email: ${form.email}`,
        form.organization ? `Organization: ${form.organization}` : "",
        `Reason: ${form.reason}`,
      ]
        .filter(Boolean)
        .join("\n"),
    );

    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    toast.success("Your email app should open with the message ready to send.");
    setForm(emptyForm);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1fr]">
      <div className="relative overflow-hidden rounded-2xl panel p-6 md:p-8">
        <div className="relative">
          <span className="eyebrow">Get in touch</span>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            I am glad to talk about marketing roles, research collaboration, speaking, or a market
            question you are trying to answer.
          </p>
          <ul className="mt-6 space-y-3 text-base">
            <li>
              <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 hover:text-primary">
                <Mail className="h-4 w-4 text-primary" />
                {EMAIL}
              </a>
            </li>
            <li>
              <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 hover:text-primary">
                <Phone className="h-4 w-4 text-primary" />
                {PHONE_DISPLAY}
              </a>
            </li>
            <li className="inline-flex items-start gap-2 text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                {LOCATION}
                <span className="mt-1 block">Covering {COVERAGE}</span>
              </span>
            </li>
          </ul>
          <ul className="mt-6 space-y-2">
            {interestAreas.map((area, i) => (
              <motion.li
                key={area}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-center gap-3"
              >
                <span className="h-6 w-6 shrink-0 rounded-full border border-primary/50" aria-hidden>
                  <span className="mx-auto mt-[9px] block h-1 w-1 rounded-full bg-energy animate-pulse-node" />
                </span>
                <span className="text-base">{area}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <form onSubmit={onSubmit} className="rounded-2xl panel p-6 md:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="organization">Organization</Label>
            <Input
              id="organization"
              value={form.organization}
              onChange={(e) => setForm({ ...form, organization: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for contact *</Label>
            <Select value={form.reason} onValueChange={(reason) => setForm({ ...form, reason })}>
              <SelectTrigger id="reason">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                {contactReasons.map((reason) => (
                  <SelectItem key={reason} value={reason}>
                    {reason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
          </div>
        </div>
        <Button type="submit" variant="signal" size="lg" data-magnetic className="mt-6 w-full sm:w-auto">
          Email Olivia
        </Button>
        <p className="mt-3 text-sm text-muted-foreground">
          This opens your email app addressed to {EMAIL}.
        </p>
      </form>
    </div>
  );
}
