import { useMemo } from 'react';
import { CalendarEvent } from '../pages/Races';

export function useEventData(events: CalendarEvent[]) {
  const { eventDays, eventsByDate } = useMemo(() => {
    const eventDays = new Set<string>();
    const eventsByDate = new Map<string, CalendarEvent[]>();

    events.forEach(event => {
      if (!event.date) return;
      
      const [startYear, startMonth, startDay] = event.date.split('-').map(Number);
      const startDate = new Date(Date.UTC(startYear, startMonth - 1, startDay));

      const endDateString = event.endDate || event.date;
      const [endYear, endMonth, endDay] = endDateString.split('-').map(Number);
      const endDate = new Date(Date.UTC(endYear, endMonth - 1, endDay));
      
      let currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        const dateKey = currentDate.toISOString().split('T')[0];
        eventDays.add(dateKey);
        if (!eventsByDate.has(dateKey)) {
          eventsByDate.set(dateKey, []);
        }
        eventsByDate.get(dateKey)!.push(event);
        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
      }
    });

    return { eventDays, eventsByDate };
  }, [events]);

  return { eventDays, eventsByDate };
}
