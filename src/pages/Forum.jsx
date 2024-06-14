import { useState } from "react";
import Comentario from "../components/Comentario";
import { useEffect } from "react";

export default function Forum(props) {
  const [comentarios, setComentarios] = useState([]);
  const [filterTerm, setFilterTerm] = useState("");
  const [showSearchButton, setShowSearchButton] = useState(false); 
  const [orderProp, setOrderProp] = useState("dataPublicacao");
  const [orderDirection, setOrderDirection] = useState("desc");

  const baseUrl = "https://forum-18cf7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json";

  function convertData(data) {
    const ids = Object.keys(data);
    let comments = Object.values(data);
    return comments.map((comment, index) => ({
      id: ids[index],
     ...comment,
    }));
  }

  useEffect(() => {
    fetch(baseUrl)
     .then(async (resp) => {
        const respComments = await resp.json();
        let convertedComments = convertData(respComments);
        setComentarios(convertedComments);
      })
     .catch((err) => console.error(err))
     .finally(() => {});
  }, []);

  function selecionarComentario(comentario) {
    props.action(comentario.id);
  }

  function filterAndSortComentarios() {
    let filteredComentarios = comentarios;
    if (filterTerm) {
      let term = filterTerm.toLowerCase();
      filteredComentarios = filteredComentarios.filter((comentario) =>
        comentario.tema.toLowerCase().includes(term)
      );
    }
    return filteredComentarios;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {comentarios.length === 0 && <p>Carregando...</p>}
      {comentarios.length === 0 && <p>Nenhum comentário encontrado.</p>}
      {comentarios.length > 0 && (
        <>
          <label htmlFor="inputSearch">Filtro:</label>
          <input
            value={filterTerm}
            onChange={(event) => setFilterTerm(event.target.value)}
            id="inputSearch"
            placeholder="Buscar um comentário."
            onFocus={() => setShowSearchButton(true)} 
          />
          {showSearchButton && (
            <button onClick={() => setFilterTerm(filterTerm)}>Buscar</button> 
          )}
          <label htmlFor="inputOrder">Ordenar por:</label>
          <select onChange={(event) => setOrderProp(event.target.value)}>
            <option value={"tema"}>Tema</option>
            <option value={"date"}>Data de Publicação</option>
          </select>
        </>
      )}
      {filterAndSortComentarios().map((comentario) => (
        <Comentario
          key={comentario.id}
          comentario={comentario}
          action={selecionarComentario}
        />
      ))}
    </div>
  );
}
