import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import styles from './Project.module.css';

import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import Message from '../layout/Message';
import Loading from '../layout/Loading';

function Project() {
  let { id } = useParams();
  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('success');
  const [services, setServices] = useState([]);

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
            setServices(data.services);
          }),
      0
    );
  }, [id]);
  function editPost(project) {
    // budget validation

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(!showProjectForm);
        setMessage('Tarefa Atualizada!');
        setType('success');
      });
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
              </button>
              {!showProjectForm ? (
                <div className={styles.form}>
                  <p>
                    <span>Descrição: </span> {project.description}
                  </p>
                  <p>
                    <span>Data: </span> {project.date}
                  </p>
                  <p>
                    <span>Hora: </span> {project.hour}
                  </p>
                  <p>
                    <span>Duração da tarefa:</span> {project.budget} hora(s)
                  </p>
                </div>
              ) : (
                <div className={styles.form}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir Edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
