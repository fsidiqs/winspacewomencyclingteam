import styles from './RacesSection.module.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../../context/LanguageContext';
import racesCsv from '../../races.csv?raw'; // Import the CSV file directly

interface Race {
  country: string;
  flag: string;
  startDate: string;
  endDate?: string;
  race: string;
}

interface RacesSectionProps {
  races?: Race[];
}

const defaultRaces: Race[] = [];



const sectionContent = {
  EN: {
    title: 'RACES',
    subtitle: 'UPCOMING RACES',
    country: 'Country',
    date: 'Date',
    race: 'Race',
    viewRaces: 'VIEW RACES PAGE',
  },
  FR: {
    title: 'COURSES',
    subtitle: 'COURSES À VENIR',
    country: 'Pays',
    date: 'Date',
    race: 'Course',
    viewRaces: 'VOIR TOUTES LES COURSES',
  },
};

const parseCSV = (csv: string): any[] => {
  const [headerLine, ...lines] = csv.split(/\r?\n/).filter(Boolean);
  const headers = headerLine.split(',');
  return lines.map(line => {
    const values = line.split(',');
    const obj: any = {};
    headers.forEach((h, i) => { obj[h.trim()] = (values[i] || '').trim(); });
    return obj;
  });
};

const parseEventCSVRowToRace = (row: any): Race => {
  // row keys: event, description, start, end, Nbr of races, country, country_flag
  // Convert DD/MM/YYYY or D/M/YYYY to readable date string
  function toDateString(dateStr: string) {
    if (!dateStr) return '';
    const [d, m, y] = dateStr.split('/');
    const date = new Date(`${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`);
    return date.toDateString();
  }
  console.log("row: ", row);
  return {
    country: row.country,
    flag: row.country_flag || '',
    startDate: toDateString(row.start),
    endDate: row.end ? toDateString(row.end) : undefined,
    race: row.event,
  };
};

const RacesSection: React.FC<RacesSectionProps> = ({ races: propRaces }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [races, setRaces] = useState<Race[]>(propRaces || defaultRaces);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        // const csvRes = await fetch("http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/06/correct-template-1-1.csv");
        // const csvText = await csvRes.text();
        // const rows = parseCSV(csvText);
        const csvRes = racesCsv;
        const rows = parseCSV(csvRes);
        // Filter, sort, and slice for upcoming races
        const today = new Date();
        const allRaces = Array.isArray(rows) ? rows.map(parseEventCSVRowToRace) : defaultRaces;
        const upcomingRaces = allRaces
          .filter(race => {
            const raceStartDate = new Date(race.startDate);
            const raceEndDate = race.endDate ? new Date(race.endDate) : null;
            return (
              raceStartDate >= today || // Upcoming races
              (raceStartDate <= today && raceEndDate && raceEndDate >= today) // In-progress races
            );
          })
          .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
          .slice(0, 5);
        setRaces(upcomingRaces);
      } catch (e) {
        setRaces(defaultRaces.slice(0, 5)); // Only display 5 races on error
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
    // eslint-disable-next-line
  }, []);

  const onViewRacesPage = () => {
    navigate('/races');
  };
  const lang = sectionContent[language];
  return (
    <section className={`${styles['races-section-wrapper']} component-padding-y`}>
      <div className={styles['races-section']}>
        <div className={styles['races-section__header']}>
          <div className='section-title'>{lang.title}</div>
          <div className='section-subtitle'>{lang.subtitle}</div>
        </div>
        <div className={styles['races-table-container']}>
          <table className={styles['standingsTable']}>
            <tbody>
              <tr>
                <th className={styles['standingsTable__th']}>{lang.country}</th>
                <th className={styles['standingsTable__th']}>{lang.date}</th>
                <th className={styles['standingsTable__th']}>{lang.race}</th>
              </tr>
              {loading ? (
                <tr><td colSpan={3}>Loading races...</td></tr>
              ) : (
                races.map((race, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? styles['standingsTable__rowEven'] : styles['standingsTable__rowOdd']}>
                    <td className={styles['standingsTable__td']}><img
                      src={`https://flagsapi.com/${race.flag}/flat/64.png`}
                      alt={race.country}
                    /></td>
                    <td className={styles['standingsTable__td']}>{race.startDate}</td>
                    <td className={styles['standingsTable__td']}>{race.race}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className={styles['races-section__footer']}>
          <button className={styles['races-section__btn']} onClick={onViewRacesPage}>{lang.viewRaces}</button>
        </div>
      </div>
    </section>
  );
};

export default RacesSection;
