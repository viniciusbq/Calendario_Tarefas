import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Container from '../layout/Container';
import Loading from '../layout/Loading';

import LinkButton from '../layout/LinkButton';
import ProjectCard from '../project/ProjectCard';
import Message from '../layout/Message';

import styles from './Projects.module.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [projectMessage, setProjectMessage] = useState('');
  const [initialRepos, setInitialRepos] = useState([]);
  const [repos, setRepos] = useState([]);

  const location = useLocation();
  let message = '';
  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const json = fetch('http://localhost:5000/projects/').then((resposta) =>
          resposta.json()
        );
        json.then((dados) => {
          setInitialRepos(dados);
          setRepos(dados);
        });
      } catch (err) {
        console.log('ERROR!');
      }
    };
    fetchRepos();
  }, []);

  const handleChange = ({ target }) => {
    if (!target.value) {
      setRepos(initialRepos);
      return;
    }

    const filterRepos = repos.filter(({ name }) =>
      name?.toLowerCase().includes(target.value)
    );
    setRepos(filterRepos);
  };
  useEffect(() => {
    // Para ver o loading
    setTimeout(
      () =>
        fetch('http://localhost:5000/projects', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setProjects(data);
            setRemoveLoading(true);
          }),
      100
    );
  }, []);

  function removeProject(id) {
    window.location.reload();
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProjects(projects.filter((project) => project.id !== id));
      });
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Minhas Tarefas</h1>
      </div>

      <div className={styles.SearchBar}>
        <div className="container-input">
          <span>Barra de Pesquisa de Tarefas: </span>
          <input
            type="text"
            className={styles.bar}
            placeholder="Digite o título da Tarefa"
            onChange={handleChange}
          />
        </div>
        <LinkButton to="/newproject" text="Criar Tarefa" />
        <div className="container-lis">
          <ul>
            {repos.map((repo, index) => (
              <span key={repo.id}>
                <Container customClass="start">
                  {!removeLoading && <Loading />}
                  {removeLoading && projects.length === 0 && (
                    <p> projetos cadastrados!</p>
                  )}
                  <ProjectCard
                    id={repo.id}
                    name={repo.name}
                    budget={repo.budget}
                    key={repo.id}
                    handleRemove={removeProject}
                  />
                </Container>
              </span>
            ))}
          </ul>
        </div>
      </div>

      {message && <Message type="success" msg={message} />}
      {projectMessage && <Message type="success" msg={projectMessage} />}
    </div>
  );
}

export default Projects;
