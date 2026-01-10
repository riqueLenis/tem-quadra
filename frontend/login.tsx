import React, { useState } from "react";
import { LogIn, User } from "lucide-react";

type PartnerLoginProps = {
  onSuccess: () => void;
  onBack: () => void;
};

export default function PartnerLogin({ onSuccess, onBack }: PartnerLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Preencha e-mail e senha.");
      return;
    }

    onSuccess();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-emerald-900 px-6 py-5">
          <h2 className="text-white text-2xl font-extrabold flex items-center gap-2">
            <LogIn className="h-6 w-6 text-yellow-400" />
            Área do Parceiro
          </h2>
          <p className="text-emerald-100 text-sm mt-1">
            Faça login para acessar seu painel.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <User className="h-4 w-4" />
              </span>
              <input
                type="email"
                autoComplete="email"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="parceiro@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              autoComplete="current-password"
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-emerald-900 font-bold py-3 rounded-lg shadow transition"
          >
            Entrar
          </button>

          <button
            type="button"
            onClick={onBack}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-lg border border-gray-200 transition"
          >
            Voltar
          </button>
        </form>
      </div>
    </div>
  );
}
