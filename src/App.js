import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {


  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    async function loadRepositories(){
      const response = await api.get('repositories')
      setRepositories(response.data)
    }
    loadRepositories();
  }, [])


  async function handleAddRepository() {
    
    const response = await api.post('repositories')
    const { id, url, title, techs } = response.data;
    const newRepository = { id, url, title, techs }
    setRepositories([...repositories, newRepository])

  }

  async function  handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository =>
            <li key={repository.id}>
              {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
          </button>
            </li>
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
