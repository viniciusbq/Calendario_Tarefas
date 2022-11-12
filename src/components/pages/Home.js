import styles from './Home.module.css';
import capa from '../../img/capa.png';
import Projects from './Projects';

export default function Home() {
  return (
    <section className={styles.home_container}>
      <p className={styles.tit}>Calendário de Tarefas</p>
      <img src={capa} alt="capa" />

      <Projects />
    </section>
  );
}
