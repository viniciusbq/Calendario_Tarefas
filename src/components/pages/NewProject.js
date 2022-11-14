import { useHistory } from 'react-router-dom';

import ProjectForm from '../project/ProjectForm';

import styles from './NewProject.module.css';

function NewProject() {
  const history = useHistory();

  function createPost(project) {
    project.cost = 0;
    project.services = [];
    fetch('http://localhost:5000/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        history.push('/', { message: 'Concluído!' });
      });
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Criar Tarefa</h1>

      <ProjectForm handleSubmit={createPost} btnText="Criar Tarefa" />
    </div>
  );
}

export default NewProject;
