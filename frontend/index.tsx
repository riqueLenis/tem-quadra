import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Search,
  Menu,
  X,
  Trophy,
  User,
  LogIn,
  PlusCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Trash2,
  Filter,
} from "lucide-react";

import PartnerLogin from "./login";

//tipos e interface

type SportType =
  | "futebol"
  | "futsal"
  | "society"
  | "volei"
  | "beachtennis"
  | "tenis";

interface Court {
  id: string;
  name: string;
  sport: SportType;
  pricePerHour: number;
  location: string;
  imageUrl: string;
  rating: number;
  available: boolean;
  ownerId: string; //para vincular ao dono
}

interface Booking {
  id: string;
  courtId: string;
  date: string;
  time: string;
  userParams: {
    name: string;
    phone: string;
  };
}

//dados mock simulacao
const INITIAL_COURTS: Court[] = [
  {
    id: "1",
    name: "Arena Gol de Placa",
    sport: "society",
    pricePerHour: 150,
    location: "Arena, Dourados",
    imageUrl:
      "https://quadrasimperial.com.br/wp-content/uploads/2024/02/campo-grama-sintetica-4.jpg",
    rating: 4.8,
    available: true,
    ownerId: "owner1",
  },
  {
    id: "2",
    name: "Beach Point Tatuapé",
    sport: "beachtennis",
    pricePerHour: 100,
    location: "Arena, Dourados",
    imageUrl:
      "https://m.ahstatic.com/is/image/accorhotels/beach-tennis-2024-1:16by9?fmt=webp&op_usm=1.75,0.3,2,0&resMode=sharp2&iccEmbed=true&icc=sRGB&dpr=on,1.3&wid=1459&hei=820&qlt=80",
    rating: 4.9,
    available: true,
    ownerId: "owner2",
  },
  {
    id: "3",
    name: "Ginásio do Bairro",
    sport: "futsal",
    pricePerHour: 120,
    location: "Arena, Dourados",
    imageUrl:
      "https://images.pexels.com/photos/13521967/pexels-photo-13521967.jpeg?_gl=1*hpvl5h*_ga*NjQyODc0NzgxLjE3Njc5MzE5NzI.*_ga_8JE65Q40S6*czE3Njc5MzE5NzIkbzEkZzEkdDE3Njc5MzE5ODAkajUyJGwwJGgw",
    rating: 4.5,
    available: true,
    ownerId: "owner1",
  },
  {
    id: "4",
    name: "Vôlei Sand Club",
    sport: "volei",
    pricePerHour: 90,
    location: "Arena, Dourados",
    imageUrl:
      "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&q=80&w=600",
    rating: 4.7,
    available: true,
    ownerId: "owner2",
  },
];

//navbar
const Navbar = ({
  onViewChange,
  onPartnerClick,
  currentView,
}: {
  onViewChange: (view: string) => void;
  onPartnerClick: () => void;
  currentView: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-emerald-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => onViewChange("home")}
          >
            <Trophy className="h-8 w-8 text-yellow-400 mr-2" />
            <span className="font-bold text-xl tracking-tight">
              Tem Quadra?
            </span>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => onViewChange("home")}
                className="hover:bg-emerald-800 px-3 py-2 rounded-md font-medium"
              >
                Início
              </button>
              <button
                onClick={() => onViewChange("search")}
                className="hover:bg-emerald-800 px-3 py-2 rounded-md font-medium"
              >
                Buscar Quadras
              </button>
              <button
                onClick={onPartnerClick}
                className="bg-yellow-500 hover:bg-yellow-600 text-emerald-900 px-4 py-2 rounded-md font-bold transition"
              >
                Sou Parceiro
              </button>
            </div>
          </div>

          {/*mbbile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-emerald-200 hover:text-white focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/*mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-emerald-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => {
                onViewChange("home");
                setIsOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md hover:bg-emerald-700"
            >
              Início
            </button>
            <button
              onClick={() => {
                onViewChange("search");
                setIsOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md hover:bg-emerald-700"
            >
              Buscar Quadras
            </button>
            <button
              onClick={() => {
                onPartnerClick();
                setIsOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md bg-yellow-500 text-emerald-900 font-bold mt-4"
            >
              Área do Parceiro
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

//hero section
const Hero = ({ onCtaClick }: { onCtaClick: () => void }) => (
  <div className="relative w-full h-[50vh] min-h-[400px] md:h-[60vh] md:min-h-[500px] flex items-center justify-center bg-gray-900 overflow-hidden">
    <div className="absolute inset-0">
      <img
        className="w-full h-full object-cover"
        src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=1600"
        alt="Quadra de esportes"
      />
      <div className="absolute inset-0 bg-black/60"></div>
    </div>
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl drop-shadow-lg">
        <span className="block">O jogo não pode parar.</span>
        <span className="block text-yellow-400 mt-2">Encontre sua quadra.</span>
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-200 drop-shadow-md">
        Futebol, Vôlei, Beach Tennis e muito mais. Agende horários nas melhores
        quadras da sua cidade em segundos.
      </p>
      <div className="mt-8 flex justify-center">
        <button
          onClick={onCtaClick}
          className="px-8 py-4 border border-transparent text-lg font-bold rounded-lg text-emerald-900 bg-yellow-400 hover:bg-yellow-500 transition transform hover:scale-105 shadow-xl"
        >
          Agendar Agora
        </button>
      </div>
    </div>
  </div>
);

//search e list view
const SearchView = ({
  courts,
  onBook,
}: {
  courts: Court[];
  onBook: (c: Court) => void;
}) => {
  const [filter, setFilter] = useState<SportType | "todos">("todos");
  const [search, setSearch] = useState("");

  const filteredCourts = courts.filter((court) => {
    const matchesSport = filter === "todos" || court.sport === filter;
    const matchesSearch =
      court.name.toLowerCase().includes(search.toLowerCase()) ||
      court.location.toLowerCase().includes(search.toLowerCase());
    return matchesSport && matchesSearch;
  });

  const sportLabels: Record<string, string> = {
    todos: "Todos",
    futebol: "Campo",
    society: "Society",
    futsal: "Futsal",
    volei: "Vôlei",
    beachtennis: "Beach Tennis",
    tenis: "Tênis",
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm shadow-sm"
              placeholder="Buscar por nome da arena ou bairro..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar">
            {Object.keys(sportLabels).map((key) => (
              <button
                key={key}
                onClick={() => setFilter(key as any)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === key
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-emerald-50"
                }`}
              >
                {sportLabels[key]}
              </button>
            ))}
          </div>
        </div>

        {/* grid de quadras */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourts.map((court) => (
            <div
              key={court.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 flex flex-col"
            >
              <div className="h-48 relative">
                <img
                  src={court.imageUrl}
                  alt={court.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-lg text-xs font-bold text-emerald-800 shadow uppercase">
                  {sportLabels[court.sport]}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {court.name}
                  </h3>
                  <div className="flex items-center bg-yellow-100 px-2 py-1 rounded">
                    <span className="text-yellow-700 font-bold text-sm">
                      ★ {court.rating}
                    </span>
                  </div>
                </div>
                <div className="flex items-center text-gray-500 mb-4 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  {court.location}
                </div>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-gray-400 text-xs">A partir de</span>
                    <p className="text-emerald-700 font-bold text-lg">
                      R$ {court.pricePerHour}
                      <span className="text-sm text-gray-500">/h</span>
                    </p>
                  </div>
                  <button
                    onClick={() => onBook(court)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition shadow-sm"
                  >
                    Agendar
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredCourts.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                Nenhuma quadra encontrada com esses filtros.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

//booking modal
const BookingModal = ({
  court,
  onClose,
  onConfirm,
}: {
  court: Court | null;
  onClose: () => void;
  onConfirm: (data: any) => void;
}) => {
  if (!court) return null;

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({ courtId: court.id, date, time, userParams: { name, phone } });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            className="absolute inset-0 bg-gray-900 opacity-75"
            onClick={onClose}
          ></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
          <div className="bg-emerald-900 px-4 py-3 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-white">
              Agendar: {court.name}
            </h3>
            <button
              onClick={onClose}
              className="text-emerald-200 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {step === 1 ? (
              <div className="space-y-4">
                <p className="text-gray-600 text-sm mb-4">
                  Escolha o horário para jogar {court.sport}.
                </p>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Data
                  </label>
                  <input
                    type="date"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-emerald-500 focus:border-emerald-500"
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {["18:00", "19:00", "20:00", "21:00", "22:00", "23:00"].map(
                    (t) => (
                      <button
                        key={t}
                        onClick={() => setTime(t)}
                        className={`py-2 text-sm rounded border ${
                          time === t
                            ? "bg-emerald-600 text-white border-emerald-600"
                            : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {t}
                      </button>
                    )
                  )}
                </div>
                {time && (
                  <p className="text-emerald-600 text-sm font-medium text-center">
                    Horário selecionado: {time}
                  </p>
                )}
              </div>
            ) : (
              <form
                id="booking-form"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
                  <p className="text-sm text-gray-600">Resumo:</p>
                  <p className="font-bold text-gray-800">
                    {date ? new Date(date).toLocaleDateString() : ""} às {time}
                  </p>
                  <p className="text-emerald-700 font-bold">
                    R$ {court.pricePerHour},00
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Seu Nome
                  </label>
                  <input
                    required
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    WhatsApp
                  </label>
                  <input
                    required
                    type="tel"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </form>
            )}
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            {step === 1 ? (
              <button
                type="button"
                disabled={!date || !time}
                onClick={() => setStep(2)}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed sm:ml-3 sm:w-auto sm:text-sm"
              >
                Próximo
              </button>
            ) : (
              <button
                form="booking-form"
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Confirmar Agendamento
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

//admin dashboard
const AdminDashboard = ({
  courts,
  onAddCourt,
  onDeleteCourt,
}: {
  courts: Court[];
  onAddCourt: (c: Court) => void;
  onDeleteCourt: (id: string) => void;
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCourt, setNewCourt] = useState<Partial<Court>>({
    name: "",
    sport: "futebol",
    pricePerHour: 0,
    location: "",
    imageUrl:
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=600",
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCourt.name && newCourt.pricePerHour && newCourt.location) {
      onAddCourt({
        ...newCourt,
        id: Math.random().toString(36).substr(2, 9),
        rating: 5.0,
        available: true,
        ownerId: "currentOwner",
        imageUrl: newCourt.imageUrl || "https://via.placeholder.com/400",
      } as Court);
      setShowAddForm(false);
      setNewCourt({
        name: "",
        sport: "futebol",
        pricePerHour: 0,
        location: "",
        imageUrl: "",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Painel do Parceiro</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
        >
          {showAddForm ? (
            <X className="mr-2 h-4 w-4" />
          ) : (
            <PlusCircle className="mr-2 h-4 w-4" />
          )}
          {showAddForm ? "Cancelar" : "Nova Quadra"}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-emerald-100">
          <h3 className="text-lg font-medium mb-4">Cadastrar Nova Quadra</h3>
          <form
            onSubmit={handleAddSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              placeholder="Nome da Arena"
              className="border p-2 rounded"
              value={newCourt.name}
              onChange={(e) =>
                setNewCourt({ ...newCourt, name: e.target.value })
              }
              required
            />
            <select
              className="border p-2 rounded"
              value={newCourt.sport}
              onChange={(e) =>
                setNewCourt({ ...newCourt, sport: e.target.value as SportType })
              }
            >
              <option value="futebol">Futebol Campo</option>
              <option value="futsal">Futsal</option>
              <option value="society">Society</option>
              <option value="volei">Vôlei</option>
              <option value="beachtennis">Beach Tennis</option>
            </select>
            <input
              placeholder="Localização (Bairro/Rua)"
              className="border p-2 rounded"
              value={newCourt.location}
              onChange={(e) =>
                setNewCourt({ ...newCourt, location: e.target.value })
              }
              required
            />
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">R$</span>
              <input
                type="number"
                placeholder="Preço/Hora"
                className="border p-2 pl-8 rounded w-full"
                value={newCourt.pricePerHour || ""}
                onChange={(e) =>
                  setNewCourt({
                    ...newCourt,
                    pricePerHour: parseFloat(e.target.value),
                  })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="col-span-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700"
            >
              Salvar Quadra
            </button>
          </form>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {courts.map((court) => (
            <li key={court.id}>
              <div className="px-4 py-4 flex items-center sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div className="flex items-center">
                    <div className="h-12 w-12 flex-shrink-0">
                      <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={court.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-emerald-600 truncate">
                        {court.name}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {court.sport} - {court.location}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                    <p className="text-gray-900 font-bold">
                      R$ {court.pricePerHour}/h
                    </p>
                  </div>
                </div>
                <div className="ml-5 flex-shrink-0">
                  <button
                    onClick={() => onDeleteCourt(court.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
          {courts.length === 0 && (
            <p className="p-4 text-center text-gray-500">
              Você ainda não cadastrou quadras.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

//app container

export default function App() {
  const [view, setView] = useState("home");
  const [partnerLoggedIn, setPartnerLoggedIn] = useState(false);
  const [courts, setCourts] = useState<Court[]>(INITIAL_COURTS);
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      setPartnerLoggedIn(localStorage.getItem("partnerLoggedIn") === "1");
    } catch {
      // ignore
    }
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleBooking = (court: Court) => {
    setSelectedCourt(court);
  };

  const confirmBooking = (bookingData: any) => {
    const newBooking = { ...bookingData, id: Math.random().toString() };
    setBookings([...bookings, newBooking]);
    setSelectedCourt(null);
    showToast(`Reserva confirmada em ${selectedCourt?.name}!`);
    setView("home");
  };

  const handleAddCourt = (newCourt: Court) => {
    setCourts([...courts, newCourt]);
    showToast("Quadra cadastrada com sucesso!");
  };

  const handleDeleteCourt = (id: string) => {
    setCourts(courts.filter((c) => c.id !== id));
    showToast("Quadra removida.");
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      <Navbar
        onViewChange={setView}
        onPartnerClick={() => setView(partnerLoggedIn ? "admin" : "login")}
        currentView={view}
      />

      {view === "home" && (
        <>
          <Hero onCtaClick={() => setView("search")} />
          <div className="max-w-7xl mx-auto px-4 py-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Modalidades Populares
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Society", "Futsal", "Beach Tennis", "Vôlei"].map((sport) => (
                <div
                  key={sport}
                  onClick={() => setView("search")}
                  className="bg-white p-6 rounded-xl shadow cursor-pointer hover:bg-emerald-50 transition"
                >
                  <h3 className="text-xl font-bold text-emerald-800">
                    {sport}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {view === "search" && (
        <SearchView courts={courts} onBook={handleBooking} />
      )}

      {view === "login" && (
        <PartnerLogin
          onBack={() => setView("home")}
          onSuccess={() => {
            try {
              localStorage.setItem("partnerLoggedIn", "1");
            } catch {
              // ignore
            }
            setPartnerLoggedIn(true);
            showToast("Login realizado!");
            setView("admin");
          }}
        />
      )}

      {view === "admin" && (
        partnerLoggedIn ? (
          <AdminDashboard
            courts={courts}
            onAddCourt={handleAddCourt}
            onDeleteCourt={handleDeleteCourt}
          />
        ) : (
          <PartnerLogin
            onBack={() => setView("home")}
            onSuccess={() => {
              try {
                localStorage.setItem("partnerLoggedIn", "1");
              } catch {
                // ignore
              }
              setPartnerLoggedIn(true);
              showToast("Login realizado!");
              setView("admin");
            }}
          />
        )
      )}

      {selectedCourt && (
        <BookingModal
          court={selectedCourt}
          onClose={() => setSelectedCourt(null)}
          onConfirm={confirmBooking}
        />
      )}

      {/* toast notification */}
      {toast && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-xl animate-bounce flex items-center z-50">
          <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
          {toast}
        </div>
      )}
    </div>
  );
}
