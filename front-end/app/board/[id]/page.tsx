'use client';
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function BoardDetail() {
    const { id } = useParams();
    const [board, setBoard] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem('access_token');

        fetch(`http://localhost:3000/boards/userBoard/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => setBoard(data));
    }, [id]);

    if(!board) return <div className="p-10"> Carregando quadro...</div>;
    
    return (
    <div className="h-screen bg-blue-500 p-8">
      <h1 className="text-white text-3xl font-bold mb-8">{board.title}</h1>
      
      {/* Container das Listas (Flexbox para ficarem lado a lado) */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {board.lists?.map((list: any) => (
          <div key={list.id} className="bg-gray-200 w-80 rounded-lg p-4 flex-shrink-0 shadow-md">
            <h3 className="font-bold text-gray-700 mb-4">{list.title}</h3>
            
            {/* Cards dentro da Lista */}
            <div className="space-y-3">
              {list.cards?.map((card: any) => (
                <div key={card.id} className="bg-white p-3 rounded shadow-sm text-sm text-gray-800">
                  {card.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}