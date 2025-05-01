import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import dataHora from "../Utils/DataHora";

function Tarefas() {
  const [tarefa, setTarefa] = useState("");
  const [tarefas, setTarefas] = useState([]);
  const [tarefaEdit, setTarefaEdit] = useState([{ editando: false, id: "" }]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tarefasStorage = localStorage.getItem("tarefas");
    if (tarefasStorage) {
      setTarefas(JSON.parse(tarefasStorage));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }
  }, [tarefas, isLoading]);

  const addTarefa = () => {
    setTarefas([
      ...tarefas,
      {
        id: uuidv4(),
        tarefa: tarefa,
        status: false,
        dataCriacao: dataHora(),
        dataFinalizacao: "Não finalizada",
      },
    ]);
    setTarefa("");
  };

  const removeTarefas = (id) => {
    const remover = tarefas.filter((tarefaRem) => tarefaRem.id !== id);
    setTarefas(remover);
  };

  const checkTarefa = (id) => {
    const tarefaCheck = tarefas.map((tarefaChec) => {
      if (tarefaChec.id === id) {
        return {
          ...tarefaChec,
          status: !tarefaChec.status,
          dataFinalizacao: tarefaChec.status ? "Não finalizada" : dataHora(),
        };
      }
      return tarefaChec;
    });
    setTarefas(tarefaCheck);
  };

  const editarTarefa = () => {
    const tarefaEditando = tarefaEdit.id;
    const editarTarefa = tarefas.map((tarefaEdit) => {
      if (tarefaEdit.id === tarefaEditando) {
        return {
          ...tarefaEdit,
          tarefa: tarefa,
        };
      }

      return tarefaEdit;
    });
    setTarefaEdit({ editando: false, id: "" });
    setTarefas(editarTarefa);
    setTarefa("");
  };

  const habilitaEdicao = (id, tarefa) => {
    setTarefaEdit({ editando: true, id: id });
    setTarefa(tarefa);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <form
        className="flex items-center gap-4 mb-6"
        onSubmit={(e) => {
          e.preventDefault();
          tarefaEdit.editando ? editarTarefa() : addTarefa();
        }}
      >
        <input
          type="text"
          value={tarefa}
          onChange={(e) => setTarefa(e.target.value)}
          placeholder="Digite uma tarefa"
          className="flex-1 p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          disabled={tarefa.length < 2}
          className="px-4 py-2 text-white rounded-md transition-colors duration-300
          bg-green-600 hover:bg-green-800"
        >
          {tarefaEdit.editando ? "Editar" : "Adicionar"}
        </button>
      </form>

      <div className="grid grid-cols-5 font-semibold text-center border-b pb-2 mb-2">
        <h3>Tarefa</h3>
        <h3>Data início</h3>
        <h3>Data término</h3>
        <h3>Concluída</h3>
        <h3>Ações</h3>
      </div>

      {tarefas.map((tarefa) => (
        <div
          key={tarefa.id}
          className="grid grid-cols-5 items-center text-center py-2 border-b"
        >
          <p>{tarefa.tarefa}</p>
          <p>{tarefa.dataCriacao}</p>
          <p>{tarefa.dataFinalizacao}</p>
          <input
            type="checkbox"
            onClick={() => checkTarefa(tarefa.id)}
            checked={tarefa.status}
            readOnly
            className="mx-auto"
          />
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => habilitaEdicao(tarefa.id, tarefa.tarefa)}
              className="px-2 py-1 text-white bg-gray-500 hover:bg-gray-700 rounded"
            >
              Editar
            </button>
            <button
              onClick={() => removeTarefas(tarefa.id)}
              className="px-2 py-1 text-white bg-red-500 hover:bg-red-700 rounded"
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tarefas;
