'use client';
import { useState, useEffect, useCallback } from "react";
import { io } from 'socket.io-client';
import { useParams } from "next/navigation";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { parse } from "path";


const socket = io('http://localhost:3000');

export default function BoardDetail() {
  const { id } = useParams();
  const [board, setBoard] = useState<any>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState("");

  // 1. Criamos o fetchData com useCallback para poder usar no useEffect e no Socket
  const fetchData = useCallback(async () => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await fetch(`http://localhost:3000/boards/userBoard/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setBoard(data);
    } catch (error) {
      console.error("Erro ao buscar board:", error);
    }
  }, [id]);

  // 2. useEffect para carregar e ouvir o socket
  useEffect(() => {
    fetchData();

    socket.on(`board-${id}-updated`, () => {
      fetchData();
    });

    return () => {
      socket.off(`board-${id}-updated`);
    };
  }, [id, fetchData]);

  useEffect(() => {
    if (board) setTempTitle(board.title);
  }, [board]);

  const handleUpdateTitleBoard = async () => {
    const token = localStorage.getItem('access_token');
    setIsEditingTitle(false);

    if (tempTitle === board.title || tempTitle === null) return;


    await fetch(`http://localhost:3000/boards/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ title: tempTitle }),

    });

  };

  const handleCreateList = async () => {

    const token = localStorage.getItem('access_token');
    

    const newListPlaceholder = {
      id: Date.now(), // ID temporário
      title: "Nova lista...",
      cards: [],
      position: board.lists.length
    };

    setBoard({
      ...board,
      lists: [...board.lists, newListPlaceholder]
    })

    await fetch('http://localhost:3000/lists', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "title": "Nova lista (clique para renomear)",
        "boardId": Number(id),
      }),
    });
  };

  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const newBoard = { ...board };
    const sourceList = newBoard.lists.find((l: any) => String(l.id) === source.droppableId);
    const destList = newBoard.lists.find((l: any) => String(l.id) === destination.droppableId);

    const [movedCard] = sourceList.cards.splice(source.index, 1);
    destList.cards.splice(destination.index, 0, movedCard);

    setBoard(newBoard);
    const token = localStorage.getItem('access_token');

    fetch(`http://localhost:3000/cards/${draggableId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        position: destination.index,
        listId: parseInt(destination.droppableId),
      }),
    });
  }

  if (!board) return <div className="p-10"> Carregando quadro...</div>;
  return (
    <div className="h-screen bg-indigo-600 p-8 overflow-x-auto">
      <a href="/dashboard"><span className="text-white text-1xl font-medium mb-4">Voltar para o dashboard!</span></a>
      {isEditingTitle ? (
        <input
          autoFocus
          className="text-white text-3xl font-bold mb-8"
          onChange={(e) => setTempTitle(e.target.value)}
          onBlur={handleUpdateTitleBoard}
          onKeyDown={(e) => e.key === 'Enter' && handleUpdateTitleBoard()}
        />
      ) : (<h1 className="text-white text-3xl font-bold mb-8" onClick={() => setIsEditingTitle(true)}>{board.title}</h1>)}

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 items-start">
          {board.lists?.map((list: any) => (
            <Droppable droppableId={String(list.id)} key={list.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-gray-100 w-80 rounded-lg p-3 shadow-lg"
                >
                  <h3 className="font-bold text-gray-700 mb-4 px-2">{list.title}</h3>

                  <div className="space-y-3">
                    {list.cards?.map((card: any, index: number) => (
                      <Draggable draggableId={String(card.id)} index={index} key={card.id}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-4 rounded shadow text-sm border-l-4 border-indigo-500 hover:bg-gray-50 transition"
                          >
                            {card.title}
                            <br />
                            <small>{card.description}</small>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
          {/* Botão de "Criar Novo" estilizado */}
          <button onClick={handleCreateList}>
            <div className="bg-gray-100 p-6 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-200 transition cursor-pointer">
              <span className="text-gray-500 font-medium">+ Nova Lista</span>
            </div>
          </button>
        </div>
      </DragDropContext>

    </div>
  );

}