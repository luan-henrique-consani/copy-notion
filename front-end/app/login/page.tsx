'use/client';
import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage(){
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3000/auth/login',{
            method: 'POST',
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify({ email,password }),
        });

        if(response.ok){
            const data = await response.json();

            localStorage.setItem('access_token', data.access_token);
            router.push('/dashboard');
        } else {
            alert('Erro ao logar! Verifique o email ou senha.')
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-centre bg-gray-50">
            <form onSubmit={ handleLogin} className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Entrar no project Kanbam!</h1>
                <input type="email"
                placeholder="Email:"
                className="w-full p-2 mb-4 border rounded"
                onChange={ (e)=>setEmail(e.target.value) } 
                />
                <input type="password"
                placeholder="Senha:"
                className="w-full p-2 mb-6 border rounded"
                onChange={ (e)=>setPassword(e.target.value) } 
                />
                <button type="submit" className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition">
                    Acessar
                </button>
            </form>
        </div>
    );

}