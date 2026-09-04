import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Download,
  LockKeyhole,
  LogOut,
  Search,
  Trash2,
  UserRound,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialContacts = [
  { id: 1, name: "Marina Costa", phone: "(11) 98888-1234", date: "04/09/2026", consent: true },
  { id: 2, name: "Lucas Almeida", phone: "(11) 97777-4321", date: "03/09/2026", consent: true },
];

function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function Brand({ compact = false }) {
  return (
    <div className="select-none" aria-label="Logo Mesa 404">
      <img
        src="/image.png"
        alt="404"
        className={`${compact ? "h-16 w-16 sm:h-20 sm:w-20" : "mx-auto h-36 w-36 sm:h-44 sm:w-44"} object-cover`}
      />
    </div>
  );
}

function PublicPage({ name, setName, phone, setPhone, consent, setConsent, submitted, onSubmit, onReset }) {
  const valid = name.trim().length >= 3 && phone.replace(/\D/g, "").length === 11 && consent;

  return (
    <motion.div
      key="public-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid w-full items-start gap-10 py-4 sm:py-8 md:gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.82fr)] lg:items-center lg:gap-16 xl:gap-24"
    >
      <section className="mx-auto w-full max-w-xl lg:mx-0">
        <p className="mb-5 text-[9px] uppercase tracking-[0.3em] text-[#e1c7af] sm:mb-7 sm:text-[10px] sm:tracking-[0.42em]">
          São Paulo · lugares não revelados
        </p>
        <h1 className="font-serif text-[clamp(2.75rem,11vw,4.5rem)] font-normal leading-[0.98] tracking-[-0.04em]">
          Alguns jantares<br /><span className="italic">não aparecem</span><br />no cardápio.
        </h1>
        <p className="mt-6 max-w-md font-serif text-base leading-7 text-[#ead8c3]/85 sm:mt-7 sm:text-lg">
          Uma mesa, poucos lugares e um endereço revelado apenas a quem estiver na lista.
        </p>
        <div className="mt-8 flex items-center gap-3 text-[8px] uppercase tracking-[0.22em] text-[#dfc4aa]/65 sm:mt-10 sm:text-[9px] sm:tracking-[0.3em]">
          <span className="h-px w-8 shrink-0 bg-[#dfc4aa]/50 sm:w-10" />
          <span>Sem agenda pública. Sem excessos.</span>
        </div>
      </section>

      <section className="w-full pt-4 lg:border-l lg:border-[#f6eddb]/20 lg:py-4 lg:pl-16">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="registration-form"
              onSubmit={onSubmit}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mx-auto w-full max-w-sm"
            >
              <div className="mb-8 text-center sm:mb-9">
                <Brand />
                <p className="mt-5 font-serif text-lg italic sm:mt-7">Peça um lugar à mesa.</p>
              </div>

              <div className="space-y-7">
                <div>
                  <Label htmlFor="name" className="text-[9px] uppercase tracking-[0.27em] text-[#ead8c3]/80">Nome</Label>
                  <div className="relative mt-2 border-b border-[#f6eddb]/45 transition-colors focus-within:border-[#f6eddb]">
                    <UserRound aria-hidden="true" className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#ead8c3]/60" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      minLength={3}
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Seu nome completo"
                      className="h-12 rounded-none border-0 bg-transparent pl-7 pr-0 font-serif text-base text-[#f6eddb] placeholder:text-[#ead8c3]/40 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-[9px] uppercase tracking-[0.27em] text-[#ead8c3]/80">Celular com DDD</Label>
                  <div className="mt-2 border-b border-[#f6eddb]/45 transition-colors focus-within:border-[#f6eddb]">
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      required
                      value={phone}
                      onChange={(event) => setPhone(formatPhone(event.target.value))}
                      placeholder="(11) 99999-9999"
                      className="h-12 rounded-none border-0 bg-transparent px-0 font-serif text-base text-[#f6eddb] placeholder:text-[#ead8c3]/40 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consent"
                    checked={consent}
                    onCheckedChange={(value) => setConsent(Boolean(value))}
                    className="mt-0.5 shrink-0 rounded-none border-[#f6eddb]/55 data-[state=checked]:border-[#f6eddb] data-[state=checked]:bg-[#f6eddb] data-[state=checked]:text-[#a90008]"
                  />
                  <Label htmlFor="consent" className="cursor-pointer font-serif text-xs font-normal leading-5 text-[#ead8c3]/70">
                    Quero receber convites e informações do Mesa 404 pelo celular. Posso sair da lista quando desejar.
                  </Label>
                </div>

                <Button
                  type="submit"
                  disabled={!valid}
                  className="h-12 w-full rounded-none border border-[#f6eddb] bg-[#f6eddb] text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8e0006] transition-colors hover:bg-transparent hover:text-[#f6eddb] disabled:border-[#ead8c3]/25 disabled:bg-transparent disabled:text-[#ead8c3]/35"
                >
                  Entrar para a lista
                </Button>
              </div>

              <p className="mt-6 flex items-center justify-center gap-2 text-center text-[8px] uppercase tracking-[0.16em] text-[#ead8c3]/50 sm:text-[9px]">
                <LockKeyhole className="h-3 w-3 shrink-0" /> Seus dados permanecem em sigilo
              </p>
            </motion.form>
          ) : (
            <motion.div
              key="registration-success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mx-auto w-full max-w-sm py-10 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#f6eddb]/60">
                <Check className="h-6 w-6" />
              </div>
              <p className="mt-8 text-[9px] uppercase tracking-[0.35em] text-[#e1c7af]">Nome incluído</p>
              <h2 className="mt-4 font-serif text-4xl italic">Você está na lista.</h2>
              <p className="mt-5 font-serif leading-7 text-[#ead8c3]/80">
                Se uma cadeira estiver disponível, {name.trim().split(" ")[0]}, o endereço encontrará você.
              </p>
              <Button type="button" onClick={onReset} variant="ghost" className="mt-8 rounded-none border-b border-[#f6eddb]/50 px-1 text-[9px] uppercase tracking-[0.2em] text-[#f6eddb] hover:bg-transparent hover:text-white">
                Incluir outro nome
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </motion.div>
  );
}

function AdminLogin({ email, setEmail, password, setPassword, authError, authLoading, onSubmit, onGoPublic }) {
  return (
    <motion.form
      key="admin-login"
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="mx-auto my-6 w-full max-w-sm border border-[#f6eddb]/20 bg-[#720006]/40 p-5 backdrop-blur-sm sm:my-10 sm:p-8"
    >
      <div className="text-center">
        <LockKeyhole className="mx-auto h-7 w-7" />
        <p className="mt-5 text-[9px] uppercase tracking-[0.32em] text-[#e1c7af]">Área administrativa</p>
        <h1 className="mt-3 font-serif text-3xl italic">Acesso reservado</h1>
      </div>

      <div className="mt-8 space-y-6">
        <div>
          <Label htmlFor="admin-email" className="text-[9px] uppercase tracking-[0.24em] text-[#ead8c3]/80">E-mail</Label>
          <Input id="admin-email" name="email" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 h-11 rounded-none border-[#f6eddb]/30 bg-transparent text-[#f6eddb] focus-visible:border-[#f6eddb] focus-visible:ring-[#f6eddb]/20" />
        </div>
        <div>
          <Label htmlFor="admin-password" className="text-[9px] uppercase tracking-[0.24em] text-[#ead8c3]/80">Senha</Label>
          <Input id="admin-password" name="password" type="password" autoComplete="current-password" required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 h-11 rounded-none border-[#f6eddb]/30 bg-transparent text-[#f6eddb] focus-visible:border-[#f6eddb] focus-visible:ring-[#f6eddb]/20" />
        </div>
        {authError && <p role="alert" className="border border-[#ffd3cc]/20 bg-[#ffd3cc]/10 p-3 text-sm text-[#ffd3cc]">{authError}</p>}
        <Button type="submit" disabled={authLoading} className="h-11 w-full rounded-none bg-[#f6eddb] text-[10px] uppercase tracking-[0.2em] text-[#8e0006] hover:bg-white">
          {authLoading ? "Entrando..." : "Entrar"}
        </Button>
      </div>

      <button type="button" onClick={onGoPublic} className="mt-6 w-full py-2 text-[9px] uppercase tracking-[0.2em] text-[#ead8c3]/60 transition-colors hover:text-[#f6eddb]">
        Voltar à página pública
      </button>
    </motion.form>
  );
}

function AdminPanel({ contacts, filteredContacts, search, setSearch, onDelete, onExport }) {
  return (
    <motion.div key="admin-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full py-6 sm:py-10">
      <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[9px] uppercase tracking-[0.35em] text-[#e1c7af]">Área administrativa</p>
          <h1 className="mt-2 font-serif text-3xl italic sm:text-4xl">Lista de convidados</h1>
        </div>
        <Button type="button" onClick={onExport} className="h-11 w-full gap-2 rounded-none border border-[#f6eddb]/50 bg-transparent text-[10px] uppercase tracking-[0.15em] text-[#f6eddb] hover:bg-[#f6eddb] hover:text-[#8e0006] sm:w-auto">
          <Download className="h-4 w-4" /> Exportar lista
        </Button>
      </div>

      <div className="mb-5 flex w-full items-center gap-3 border-b border-[#f6eddb]/35 pb-2 sm:max-w-sm">
        <Search className="h-4 w-4 shrink-0 text-[#ead8c3]/60" />
        <Input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar nome ou celular" className="rounded-none border-0 bg-transparent px-0 font-serif text-[#f6eddb] placeholder:text-[#ead8c3]/40 focus-visible:ring-0 focus-visible:ring-offset-0" />
      </div>

      <Card className="overflow-hidden rounded-none border-[#f6eddb]/20 bg-[#720006]/40 text-[#f6eddb] backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="flex items-center gap-3 border-b border-[#f6eddb]/15 p-4 sm:p-5">
            <Users className="h-4 w-4 shrink-0" />
            <span className="font-serif text-base sm:text-lg">{contacts.length} nomes na lista</span>
          </div>

          {filteredContacts.length === 0 ? (
            <div className="p-8 text-center font-serif text-[#ead8c3]/70">Nenhum convidado encontrado.</div>
          ) : (
            <>
              <div className="divide-y divide-[#f6eddb]/10 md:hidden">
                {filteredContacts.map((contact) => (
                  <article key={contact.id} className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="truncate font-serif text-base">{contact.name}</p>
                        <p className="mt-1 text-sm text-[#ead8c3]/75">{contact.phone}</p>
                        <p className="mt-2 text-[8px] uppercase tracking-[0.2em] text-[#ead8c3]/50">Cadastro em {contact.date}</p>
                      </div>
                      <Button type="button" size="icon" variant="ghost" aria-label={`Remover ${contact.name}`} onClick={() => onDelete(contact.id)} className="shrink-0 text-[#ead8c3]/50 hover:bg-[#f6eddb]/10 hover:text-[#f6eddb]">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[680px] text-left">
                  <thead className="text-[8px] uppercase tracking-[0.24em] text-[#ead8c3]/60">
                    <tr>
                      <th className="p-5 font-normal">Nome</th>
                      <th className="p-5 font-normal">Celular</th>
                      <th className="p-5 font-normal">Entrada</th>
                      <th className="p-5 font-normal">Consentimento</th>
                      <th className="p-5 font-normal"><span className="sr-only">Ações</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((contact) => (
                      <tr key={contact.id} className="border-t border-[#f6eddb]/10 font-serif text-sm">
                        <td className="p-5">{contact.name}</td>
                        <td className="p-5 text-[#ead8c3]/80">{contact.phone}</td>
                        <td className="p-5 text-[#ead8c3]/65">{contact.date}</td>
                        <td className="p-5"><span className="text-[8px] uppercase tracking-[0.18em] text-[#f6eddb]/80">Autorizado</span></td>
                        <td className="p-5 text-right">
                          <Button type="button" size="icon" variant="ghost" aria-label={`Remover ${contact.name}`} onClick={() => onDelete(contact.id)} className="text-[#ead8c3]/50 hover:bg-[#f6eddb]/10 hover:text-[#f6eddb]">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Mesa404() {
  const [view, setView] = useState(() => {
    if (typeof window === "undefined") return "public";
    return window.location.hash === "#admin" ? "admin" : "public";
  });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [contacts, setContacts] = useState(initialContacts);
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(view === "admin");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    function handleHashChange() {
      setView(window.location.hash === "#admin" ? "admin" : "public");
    }
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (view !== "admin") {
      setSessionLoading(false);
      return;
    }

    let active = true;
    setSessionLoading(true);
    setAuthError("");

    fetch("/api/admin/session", {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Sessão não encontrada.");
        return response.json();
      })
      .then((data) => active && setIsAuthenticated(Boolean(data.authenticated)))
      .catch(() => active && setIsAuthenticated(false))
      .finally(() => active && setSessionLoading(false));

    return () => { active = false; };
  }, [view]);

  const filteredContacts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    if (!normalizedSearch) return contacts;
    return contacts.filter((contact) => `${contact.name} ${contact.phone}`.toLowerCase().includes(normalizedSearch));
  }, [contacts, search]);

  function handleRegistration(event) {
    event.preventDefault();
    const validName = name.trim().length >= 3;
    const validPhone = phone.replace(/\D/g, "").length === 11;
    if (!validName || !validPhone || !consent) return;

    setContacts((currentContacts) => [{
      id: Date.now(),
      name: name.trim(),
      phone,
      date: new Date().toLocaleDateString("pt-BR"),
      consent: true,
    }, ...currentContacts]);
    setSubmitted(true);
  }

  function resetRegistration() {
    setName("");
    setPhone("");
    setConsent(false);
    setSubmitted(false);
  }

  async function handleLogin(event) {
    event.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      if (!response.ok) throw new Error("E-mail ou senha inválidos.");
      const data = await response.json().catch(() => ({}));
      if (Object.prototype.hasOwnProperty.call(data, "authenticated") && !data.authenticated) {
        throw new Error("E-mail ou senha inválidos.");
      }
      setIsAuthenticated(true);
      setPassword("");
    } catch (error) {
      setIsAuthenticated(false);
      setAuthError(error instanceof Error ? error.message : "Não foi possível realizar o login.");
    } finally {
      setAuthLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
        headers: { Accept: "application/json" },
      });
    } finally {
      setIsAuthenticated(false);
      setEmail("");
      setPassword("");
      goToPublicPage();
    }
  }

  function handleDeleteContact(contactId) {
    setContacts((currentContacts) => currentContacts.filter((contact) => contact.id !== contactId));
  }

  function exportCsv() {
    const rows = [
      ["Nome", "Celular", "Data do cadastro", "Consentimento"],
      ...contacts.map((contact) => [contact.name, contact.phone, contact.date, contact.consent ? "Sim" : "Não"]),
    ];
    const csv = rows.map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")).join(String.fromCharCode(10));
    const blob = new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" });
    const objectUrl = window.URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = objectUrl;
    downloadLink.download = "lista-mesa-404.csv";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    window.setTimeout(() => window.URL.revokeObjectURL(objectUrl), 1000);
  }

  function goToPublicPage() {
    setView("public");
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#a90008] text-[#f6eddb]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.13] mix-blend-overlay"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.8'/%3E%3C/svg%3E\")" }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,80,55,.18),transparent_38%),linear-gradient(to_bottom,transparent_60%,rgba(60,0,0,.22))]" />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-6 lg:px-10">
        <button type="button" onClick={goToPublicPage} className="shrink-0 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f6eddb]/60" aria-label="Voltar para a página pública">
          <Brand compact />
        </button>
        {view === "admin" && isAuthenticated && (
          <Button type="button" onClick={handleLogout} variant="ghost" className="gap-2 text-[9px] uppercase tracking-[0.2em] text-[#ead8c3]/70 hover:bg-transparent hover:text-white">
            <LogOut className="h-4 w-4" /> Sair
          </Button>
        )}
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 sm:pb-14 lg:flex lg:min-h-[calc(100vh-132px)] lg:items-center lg:px-10">
        <AnimatePresence mode="wait">
          {view === "public" ? (
            <PublicPage name={name} setName={setName} phone={phone} setPhone={setPhone} consent={consent} setConsent={setConsent} submitted={submitted} onSubmit={handleRegistration} onReset={resetRegistration} />
          ) : sessionLoading ? (
            <motion.div key="session-loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto py-20 text-center font-serif text-lg text-[#ead8c3]">
              Verificando sessão...
            </motion.div>
          ) : !isAuthenticated ? (
            <AdminLogin email={email} setEmail={setEmail} password={password} setPassword={setPassword} authError={authError} authLoading={authLoading} onSubmit={handleLogin} onGoPublic={goToPublicPage} />
          ) : (
            <AdminPanel contacts={contacts} filteredContacts={filteredContacts} search={search} setSearch={setSearch} onDelete={handleDeleteContact} onExport={exportCsv} />
          )}
        </AnimatePresence>
      </main>

      <footer className="relative z-10 flex flex-col items-center justify-between gap-3 border-t border-[#f6eddb]/10 px-4 py-5 text-center text-[8px] uppercase tracking-[0.18em] text-[#ead8c3]/40 sm:flex-row sm:px-6 sm:text-left sm:tracking-[0.22em] lg:px-10">
        <span>Mesa 404 · Secret dining club</span>
        <span>O endereço só existe para quem recebe o convite.</span>
      </footer>
    </div>
  );
}
