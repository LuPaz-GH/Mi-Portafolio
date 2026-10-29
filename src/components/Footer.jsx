import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6';
import { LuMail } from 'react-icons/lu';
import { asset, contacto } from '../data';
import { useLang } from '../lang';
import { stagger, viewport } from '../motion';

const redes = [
  { href: contacto.github, Icon: FaGithub, label: 'GitHub' },
  { href: contacto.linkedin, Icon: FaLinkedinIn, label: 'LinkedIn' },
  { href: `mailto:${contacto.email}`, Icon: LuMail, label: 'Email' },
];

export default function Footer() {
  const { t } = useLang();

  return (
    <>
      <footer className="footer glass">
        <motion.img
          className="footer-logo"
          src={asset('logo.svg')}
          alt=""
          animate={{ rotate: [0, 6, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <p>
          {t.footer.texto[0]}
          <br />
          {t.footer.texto[1]}
        </p>
        <motion.div className="socials" variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport}>
          {redes.map(({ href, Icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={label}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              whileHover={{ y: -6, rotate: 8, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon />
            </motion.a>
          ))}
        </motion.div>
        <small className="mono">{t.footer.derechos}</small>
      </footer>

      <aside aria-label="WhatsApp">
        <motion.a
          href={contacto.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="whatsapp"
          aria-label={t.whatsappAria}
          data-umami-event="whatsapp-flotante"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2.2, type: 'spring' }}
          whileHover={{ scale: 1.12, rotate: -10 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="whatsapp-ping" />
          <FaWhatsapp aria-hidden="true" />
        </motion.a>
      </aside>
    </>
  );
}
