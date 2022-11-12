import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProjectCard.module.css';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';

function ProjectCard({ id, handleRemove }) {
  const [project, setProject] = useState([]);

  const remove = (e) => {
    e.preventDefault();
    handleRemove(id);
  };
  useEffect(() => {
    // Para ver o loading
    setTimeout(
      () =>
        fetch(`http://localhost:5000/projects/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setProject(data);
          }),
      0
    );
  }, [id]);

  return (
    <div className={styles.project_card}>
      <h4>{project.name}</h4>
      <p>
        <span>Descrição:</span> {project.description}
      </p>
      <p>
        <span>Data:</span> {project.date}
      </p>
      <p>
        <span>Hora:</span> {project.hour}
      </p>
      <p>
        <span>Duração:</span> {project.budget} hora(s)
      </p>

      <div className={styles.project_card_actions}>
        <Link to={'/project/' + id}>
          <BsPencil /> Editar
        </Link>
        <button id="refresh" onClick={remove}>
          <BsFillTrashFill />
          Excluir
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
