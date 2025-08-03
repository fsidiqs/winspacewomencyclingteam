import React, { useState } from 'react';
import styles from './ContactForm.module.css';

interface ContactFormProps {
  labelSmall: string;
  heading: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  agree: string;
  privacy: string;
  sending: string;
  submit: string;
  thankYou: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  labelSmall,
  heading,
  name,
  email,
  subject,
  message,
  agree,
  privacy,
  sending,
  submit,
  thankYou
}) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    agree: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const apiHost = import.meta.env.VITE_API_HOST;
      const response = await fetch(`${apiHost}/api/send-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          name: form.name,
          subject: form.subject,
          message: form.message,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '', agree: false });
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.contactSection} component-padding max-width`}>
      <div className={styles.leftColumn}>
        <div className={styles.labelSmall}>{labelSmall}</div>
        <h1 className={styles.heading}>{heading.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br /></React.Fragment>)}</h1>
      </div>
      <div className={styles.rightColumn}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            {name}
            <input
              className={styles.input}
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
          <label className={styles.label}>
            {email}
            <input
              className={styles.input}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label className={styles.label}>
            {subject}
            <input
              className={styles.input}
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
            />
          </label>
          <label className={styles.label}>
            {message}
            <textarea
              className={styles.textarea}
              name="message"
              value={form.message}
              onChange={handleChange}
              required
            />
          </label>
          <div className={styles.privacyRow}>
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              required
              className={styles.checkbox}
            />
            <span>
              {agree}
              <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">{privacy}</a>.
            </span>
          </div>
          <button className={styles.submitBtn} type="submit" disabled={!form.agree || loading}>
            {loading ? sending : submit}
          </button>
          {error && <div className={styles.errorMsg}>{error}</div>}
          {submitted && <div className={styles.successMsg}>{thankYou}</div>}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
