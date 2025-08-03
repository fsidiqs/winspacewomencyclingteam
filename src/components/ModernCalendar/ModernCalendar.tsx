"use client";

import React, { useState, useMemo } from 'react';
import styles from './ModernCalendar.module.css';
import { FiSearch } from 'react-icons/fi';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { CalendarEvent } from '../../pages/Races';
import { useEventData } from '../../hooks/useEventData';
import { formatDateString } from '@/lib/cleanUrl';

interface ModernCalendarProps {
  events: CalendarEvent[];
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function getDaysInMonth(year: number, month: number) {
  const date = new Date(year, month + 1, 0);
  return date.getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  // Returns 0 for Monday, 6 for Sunday
  const day = new Date(year, month, 1).getDay();
  return (day + 6) % 7;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}



function ModernCalendar({ events }: ModernCalendarProps) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = useMemo(() => {
    return events.filter(event =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [events, searchTerm]);

  const { eventDays, eventsByDate } = useEventData(filteredEvents);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleThisMonth = () => {
    setViewMonth(today.getMonth());
    setViewYear(today.getFullYear());
    setSelectedDate(today);
  };

  const formatYMD = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDayOfWeek = getFirstDayOfWeek(viewYear, viewMonth);
  const weeks: (number | null)[][] = [];
  let currentWeek: (number | null)[] = [];

  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  const selectedDateKey = formatYMD(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
  const selectedEvents = eventsByDate.get(selectedDateKey) || [];

  return (
    <div className={`${styles.calendarContainer}`}>
      <div className={styles.header}>
        <div className={styles.dropdownGroup}>
          <select
            className={styles.monthSelect}
            value={viewMonth}
            onChange={e => setViewMonth(Number(e.target.value))}
          >
            {months.map((m, i) => (
              <option value={i} key={m}>{m}</option>
            ))}
          </select>
          <select
            className={styles.yearSelect}
            value={viewYear}
            onChange={e => setViewYear(Number(e.target.value))}
          >
            {Array.from({ length: 10 }, (_, i) => today.getFullYear() - 5 + i).map(y => (
              <option value={y} key={y}>{y}</option>
            ))}
          </select>
          <div className={styles.searchContainer}>
            <span className={styles.searchIcon}><FiSearch /></span>
            <input
              type="text"
              placeholder="Search events..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.weekdays}>
          {["M", "T", "W", "T", "F", "S", "S"].map((d, idx) => (
            <div key={idx} className={styles.weekday}>{d}</div>
          ))}
        </div>
        {weeks.map((week, i) => (
          <div className={styles.week} key={i}>
            {week.map((day, j) => {
              const isSelected = day &&
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === viewMonth &&
                selectedDate.getFullYear() === viewYear;
              const dateKey = day ? formatYMD(viewYear, viewMonth, day) : '';
              const hasEvent = day && eventDays.has(dateKey);
              return (
                <div
                  key={j}
                  className={
                    styles.day +
                    (isSelected ? ' ' + styles.selected : '')
                  }
                  onClick={() => day && setSelectedDate(new Date(Date.UTC(viewYear, viewMonth, day)))}
                >
                  {day && (
                    <div className={styles.dayContent}>
                      <span>{day}</span>
                      {hasEvent && <span className={styles.dot}></span>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className={styles.eventDetails}>
        {selectedEvents.length > 0 ? (
          selectedEvents.map((event, idx) => (
            <div key={idx} className={styles.eventBlock}>
              <div className={styles.eventDate}>{formatDateString(event.date)}{event.endDate ? ` - ${formatDateString(event.endDate)}` : ''}</div>
              <div className={styles.eventTitle}>{event.title}</div>
              {event.country && (
                <div className={styles.eventCountry}>
                  {event.countryFlag && <span className={styles.flag}>{event.countryFlag}</span>} {event.country}
                </div>
              )}
              {event.description && <div className={styles.eventDesc}>{event.description}</div>}
            </div>
          ))
        ) : (
          <div className={styles.noEvent}>No event for this date.</div>
        )}
      </div>
      <div className={styles.bottomNav}>
        <button className={styles.arrowBtn} onClick={handlePrevMonth}><FiChevronLeft /></button>
        <button className={styles.thisMonthBtn} onClick={handleThisMonth}>This Month</button>
        <button className={styles.arrowBtn} onClick={handleNextMonth}><FiChevronRight /></button>
      </div>
    </div>
  );
}

export default ModernCalendar;
