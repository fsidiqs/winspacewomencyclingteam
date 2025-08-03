import React, { useState } from 'react';
import styles from './EventCalendar.module.css';
import { CalendarEvent } from '../../pages/Races';
import { useEventData } from '../../hooks/useEventData';
import { formatDateString } from '@/lib/cleanUrl';

// Helper to get days in month
function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
}

// Helper to get first day of week (0=Sun, 1=Mon...)
function getFirstDayOfWeek(year: number, month: number) {
    return new Date(year, month, 1).getDay();
}

// Helper to format date as YYYY-MM-DD
function formatDate(year: number, month: number, day: number) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

interface EventCalendarProps {
  events: CalendarEvent[];
}

const EventCalendar: React.FC<EventCalendarProps> = ({ events }) => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [hoveredEvent, setHoveredEvent] = useState<CalendarEvent | null>(null);
  const [popupPos, setPopupPos] = useState<{ x: number, y: number } | null>(null);

  const { eventsByDate } = useEventData(events);

    // Navigation handlers
    const goToPrevMonth = () => {
        setCurrentMonth((prev) => {
            if (prev === 0) {
                setCurrentYear((y) => y - 1);
                return 11;
            }
            return prev - 1;
        });
    };
    const goToNextMonth = () => {
        setCurrentMonth((prev) => {
            if (prev === 11) {
                setCurrentYear((y) => y + 1);
                return 0;
            }
            return prev + 1;
        });
    };
    const goToThisMonth = () => {
        setCurrentYear(today.getFullYear());
        setCurrentMonth(today.getMonth());
    };
    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentMonth(Number(e.target.value));
    };
    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentYear(Number(e.target.value));
    };

    // Calendar grid
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfWeek = (getFirstDayOfWeek(currentYear, currentMonth) + 6) % 7; // Make Monday first
    const weeks: (number | null)[][] = [];
    let week: (number | null)[] = Array(firstDayOfWeek).fill(null);
    for (let day = 1; day <= daysInMonth; day++) {
        week.push(day);
        if (week.length === 7) {
            weeks.push(week);
            week = [];
        }
    }
    if (week.length > 0) {
        while (week.length < 7) week.push(null);
        weeks.push(week);
    }

    // Render
    return (
        <div className={`${styles.calendarWrapper} component-padding max-width`}>
            <div className={styles.calendarHeader}>
                <button onClick={goToPrevMonth}>&lt;</button>
                <button onClick={goToNextMonth}>&gt;</button>
                <button onClick={goToThisMonth}>THIS MONTH</button>
                <select value={currentMonth} onChange={handleMonthChange}>
                    {monthNames.map((name, idx) => (
                        <option value={idx} key={name}>{name.toUpperCase()}</option>
                    ))}
                </select>
                <input
                    type="number"
                    value={currentYear}
                    onChange={handleYearChange}
                />

            </div>
            <div className={styles.calendarTableWrapper}>
                <table className={styles.calendarTable}>
                    <thead>
                        <tr>
                            <th>MON</th>
                            <th>TUE</th>
                            <th>WED</th>
                            <th>THU</th>
                            <th>FRI</th>
                            <th>SAT</th>
                            <th>SUN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weeks.map((week, i) => (
                            <tr key={i}>
                                {week.map((day, j) => {
                                    const dateKey = day ? formatDate(currentYear, currentMonth, day) : '';
                                    const dayEvents = eventsByDate.get(dateKey) || [];
                                    return (
                                        <td key={j}
                                            onMouseEnter={e => {
                                                if (dayEvents.length > 0) {
                                                    const rect = (e.target as HTMLElement).getBoundingClientRect();
                                                    setHoveredEvent(dayEvents[0]);
                                                    setPopupPos({ x: rect.right + window.scrollX + 10, y: rect.top + window.scrollY });
                                                }
                                            }}
                                            onMouseLeave={() => {
                                                setHoveredEvent(null);
                                                setPopupPos(null);
                                            }}
                                            style={{ position: 'relative' }}
                                        >
                                            {day && <div><strong>{day}</strong></div>}
                                            {dayEvents.map((ev, idx) => (
                                                <div key={idx} className={styles.eventItem}>{ev.title}</div>
                                            ))}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {hoveredEvent && popupPos && (
                    <div
                        className={styles.eventPopup}
                        style={{ left: popupPos.x, top: popupPos.y, position: 'absolute', zIndex: 1000 }}
                    >
                        {/* <img src={hoveredEvent.image || '/file.svg'} alt="event" className={styles.eventPopupImg} /> */}
                        <div className={styles.eventPopupDate}>
                            {hoveredEvent.date ? formatDateString(hoveredEvent.date) : ''} – {hoveredEvent.endDate ? formatDateString(hoveredEvent.endDate) : ''}
                        </div>
                        <div className={styles.eventPopupTitle}>{hoveredEvent.title}</div>
                        <div className={styles.eventPopupDesc}>{hoveredEvent.description}</div>
                        <div className={styles.eventPopupPrice}>{hoveredEvent.price}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventCalendar;
