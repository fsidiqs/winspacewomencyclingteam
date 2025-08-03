import React, { useEffect, useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import EventCalendar from "../components/EventCalendar/EventCalendar";
import Footer from "../components/Footer/Footer";
import ModernCalendar from "../components/ModernCalendar/ModernCalendar";
import Navigation from "../components/Navigation/Navigation";
import racesCsv from '../races.csv?raw';
import { useLanguage } from '../context/LanguageContext';

// Unified event type
export type CalendarEvent = {
  date: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  title: string;
  description?: string;
  image?: string;
  startTime?: string;
  endTime?: string;
  price?: string;
  country?: string;
  countryFlag?: string;
};

function parseEventCSVRow(row: any): CalendarEvent {
  // row keys: event, description, start, end, Nbr of races, country, country_flag
  // Convert DD/MM/YYYY or D/M/YYYY to YYYY-MM-DD
  function toISO(dateStr: string) {
    if (!dateStr) return "";
    const [d, m, y] = dateStr.split("/");
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }
  return {
    title: row.event,
    description: row.description,
    date: toISO(row.start),
    endDate: toISO(row.end),
    country: row.country,
    countryFlag:
      row.country_flag && row.country_flag.length > 0
        ? countryFlagEmoji(row.country_flag)
        : undefined,
  };
}

function countryFlagEmoji(code: string) {
  // Convert country code (e.g. 'ES') to emoji flag
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

const breadcrumbsContent = {
  EN: {
    title: 'RACES',
    items: ['Home', 'Races']
  },
  FR: {
    title: 'COURSES',
    items: ['Accueil', 'Courses']
  }
};

export default function Races() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const bc = breadcrumbsContent[language];

  useEffect(() => {
    setLoading(true);
    try {
      const csvText = racesCsv;
      const rows = parseCSV(csvText);
      setEvents(Array.isArray(rows) ? rows.map(parseEventCSVRow) : []);
    } catch (e) {
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // CSV parser (simple, assumes no quoted commas)
  function parseCSV(csv: string): any[] {
    const [headerLine, ...lines] = csv.split(/\r?\n/).filter(Boolean);
    const headers = headerLine.split(',');
    return lines.map(line => {
      const values = line.split(',');
      const obj: any = {};
      headers.forEach((h, i) => { obj[h.trim()] = (values[i] || '').trim(); });
      return obj;
    });
  }

  return (
    <>
      <Navigation />
      <Breadcrumbs title={bc.title} items={bc.items} />
      {loading ? (
        <div>Loading events...</div>
      ) : (
        <>
          <EventCalendar events={events} />
          <ModernCalendar events={events} />
        </>
      )}
      <Footer />
    </>
  );
}
