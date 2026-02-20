'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const [boards, setBoards] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('access_token');

        if (!token) {
            router.push('/login');
            return;
        }

        fetch('http://localhost:3000/boards', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => setBoards(data))
            .catch(err => console.error("Erro ao carregar boards:", err));
    }, []);

    const handleCreateBoard = async () =>{
        const token = localStorage.getItem('access_token');

        if(!token){
            alert('Sessão expirada, faça login novamente');
            router.push('/login')
            return;
        }
        const response = await fetch('http://localhost:3000/boards',{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ title: 'Novo Quadro (clique para renomear)'})
        });

        if(response.ok){
            const newBoard = await response.json();
            router.push(`/board/${newBoard.id}`);
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Meus Quadros</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {boards.map((board: any) => (
                        <div
                            key={board.id}
                            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition cursor-pointer"
                            onClick={() => router.push(`/board/${board.id}`)}
                        >
                            <h2 className="text-xl font-semibold text-gray-700">{board.title}</h2>
                            <p className="text-sm text-gray-400 mt-2">Criado em: {new Date(board.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))}

                    {/* Botão de "Criar Novo" estilizado */}
                    <button onClick={handleCreateBoard}>
                    <div className="bg-gray-100 p-6 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-200 transition cursor-pointer">
                        <span className="text-gray-500 font-medium">+ Novo Quadro</span>
                    </div>
                    </button>
                </div>
            </div>
        </div>
    );
}