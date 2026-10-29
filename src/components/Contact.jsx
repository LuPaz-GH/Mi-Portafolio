import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LuMail, LuDownload, LuSend, LuCircleCheck, LuCircleAlert, LuCalendarClock } from 'react-icons/lu';
import { FaWhatsapp, FaLinkedinIn } from 'react-icons/fa6';
import { track } from '../analytics';
import { asset, config, contacto, whatsappMsg } from '../data';
import { useLang } from '../lang';
import { viewport } from '../motion';

// Netlify Forms: el formulario oculto con el mismo nombre está en index.html para que Netlify lo detecte al publicar
const FORM_NAME = 'contacto';

function ContactForm({ f }) {
  const [status, setStatus] = useState('idle'); // idle | sending | ok | error | dev

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    // Netlify Forms solo recibe envíos en el sitio publicado; en la compu se avisa en vez de fallar
    if (import.meta.env.DEV) {
      setStatus('dev');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString(),
      });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      setStatus('ok');
      track('formulario-enviado');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form name={FORM_NAME} className="contact-form" onSubmit={onSubmit}>
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <p hidden>
        <label>No completar: <input name="bot-field" /></label>
      </p>
      <div className="form-row">
        <label>
          <span>{f.nombre}</span>
          <input name="nombre" required autoComplete="name" />
        </label>
        <label>
          <span>{f.email}</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <label>
        <span>{f.tipo}</span>
        <select name="motivo" defaultValue={f.tipos[0]}>
          {f.tipos.map((tipo) => <option key={tipo}>{tipo}</option>)}
        </select>
      </label>
      <label>
        <span>{f.mensaje}</span>
        <textarea name="mensaje" rows="5" required placeholder={f.placeholder} />
      </label>

      <motion.button type="submit" className="btn btn-primary" disabled={status === 'sending'} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <LuSend /> {status === 'sending' ? f.enviando : f.enviar}
      </motion.button>

      <AnimatePresence>
        {['ok', 'error', 'dev'].includes(status) && (
          <motion.p
            key={status}
            className={`form-status ${status}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
          >
            {status === 'ok' ? <LuCircleCheck /> : <LuCircleAlert />} {f[status]}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}

export default function Contact() {
  const { lang, t } = useLang();
  const c = t.contact;

  return (
    <section id="contacto" className="section">
      <motion.div
        className="contact-box"
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="contact-inner">
          <div className="contact-info">
            <span className="section-tag">// {c.tag}</span>
            <h2>{c.title}</h2>
            <p>{c.subtitle}</p>

            <div className="contact-card">
              <h3>{c.empresasTitulo}</h3>
              <p>{c.empresasTexto}</p>
              <div className="contact-mini">
                <a href={contacto.linkedin} target="_blank" rel="noreferrer" data-umami-event="linkedin"><FaLinkedinIn /> {c.linkedin}</a>
                <a href={asset(t.cv)} download data-umami-event="descargar-cv" data-umami-event-idioma={lang}><LuDownload /> {t.hero.cv}</a>
              </div>
            </div>

            <div className="contact-card">
              <h3>{c.clientesTitulo}</h3>
              <p>{c.clientesTexto}</p>
              <div className="contact-mini">
                <a href={whatsappMsg(c.whatsappMsg)} target="_blank" rel="noreferrer" className="wa" data-umami-event="whatsapp-contacto"><FaWhatsapp /> {c.whatsapp}</a>
                <a href={`mailto:${contacto.email}`} data-umami-event="email"><LuMail /> Email</a>
              </div>
            </div>

            {config.calendly && (
              <motion.a
                href={config.calendly}
                target="_blank"
                rel="noreferrer"
                className="calendly-btn"
                data-umami-event="agendar-llamada"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <LuCalendarClock />
                <span>
                  <strong>{c.agendar}</strong>
                  <small>{c.agendarSub}</small>
                </span>
              </motion.a>
            )}

            <span className="contact-mail mono">{contacto.email}</span>
          </div>

          <ContactForm f={c.form} />
        </div>
      </motion.div>
    </section>
  );
}
