import { useState } from 'react';
import Input from '../form/Input';
import SubmitButton from '../form/SubmitButton';

import styles from './ProjectForm.module.css';

function ProjectForm({ handleSubmit, btnText, projectData }) {
  const [project, setProject] = useState(projectData || {});

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(project);
  };

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Título da Tarefa"
        name="name"
        placeholder="Insira o título da tarefa"
        handleOnChange={handleChange}
        value={project.name}
      />
      <Input
        type="text"
        text="Descrição da Tarefa"
        name="description"
        placeholder="Insira uma descrição da tarefa"
        handleOnChange={handleChange}
        value={project.descripton}
      />
      <span className={styles.clock}>
        <Input
          maxLength="6"
          type="date"
          text="Data da Tarefa"
          name="date"
          placeholder=""
          handleOnChange={handleChange}
          value={project.date}
          required
        />
        <Input
          type="time"
          text="Hora da Tarefa"
          name="hour"
          placeholder=""
          handleOnChange={handleChange}
          value={project.hour}
        />
      </span>
      <Input
        type="number"
        min="0"
        max="11"
        name="budget"
        placeholder="Tempo de duração (em horas)"
        handleOnChange={handleChange}
        value={project.budget}
      />
      <SubmitButton text={btnText} />
    </form>
  );
}

export default ProjectForm;
