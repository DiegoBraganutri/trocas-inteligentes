import { useState, useMemo, useRef } from "react";

const ALIMENTOS = [
  { nome: "Frango (peito grelhado)", kcal: 165, ptn: 31, cho: 0, lip: 3.6, categoria: "Proteína animal" },
  { nome: "Carne bovina (patinho)", kcal: 219, ptn: 28, cho: 0, lip: 11.6, categoria: "Proteína animal" },
  { nome: "Atum em conserva", kcal: 127, ptn: 28, cho: 0, lip: 1.5, categoria: "Proteína animal" },
  { nome: "Ovo inteiro", kcal: 143, ptn: 13, cho: 0.7, lip: 9.5, categoria: "Proteína animal" },
  { nome: "Clara de ovo", kcal: 52, ptn: 11, cho: 0.7, lip: 0.2, categoria: "Proteína animal" },
  { nome: "Salmão", kcal: 208, ptn: 20, cho: 0, lip: 13.4, categoria: "Proteína animal" },
  { nome: "Tilápia", kcal: 96, ptn: 20, cho: 0, lip: 2.0, categoria: "Proteína animal" },
  { nome: "Sardinha em conserva", kcal: 208, ptn: 24, cho: 0, lip: 11.5, categoria: "Proteína animal" },
  { nome: "Peru (peito)", kcal: 157, ptn: 24, cho: 0, lip: 6.3, categoria: "Proteína animal" },
  { nome: "Queijo muçarela", kcal: 320, ptn: 22, cho: 3, lip: 25, categoria: "Laticínio" },
  { nome: "Queijo cottage", kcal: 110, ptn: 12.5, cho: 3.4, lip: 4.5, categoria: "Laticínio" },
  { nome: "Iogurte grego integral", kcal: 97, ptn: 9, cho: 4, lip: 5, categoria: "Laticínio" },
  { nome: "Iogurte grego desnatado", kcal: 59, ptn: 10, cho: 4, lip: 0.7, categoria: "Laticínio" },
  { nome: "Leite integral", kcal: 61, ptn: 3.2, cho: 4.7, lip: 3.3, categoria: "Laticínio" },
  { nome: "Leite desnatado", kcal: 35, ptn: 3.5, cho: 5, lip: 0.2, categoria: "Laticínio" },
  { nome: "Queijo ricota", kcal: 174, ptn: 11, cho: 3, lip: 13, categoria: "Laticínio" },
  { nome: "Requeijão light", kcal: 152, ptn: 7, cho: 4, lip: 12, categoria: "Laticínio" },
  { nome: "Arroz branco cozido", kcal: 128, ptn: 2.5, cho: 28, lip: 0.2, categoria: "Carboidrato" },
  { nome: "Arroz integral cozido", kcal: 124, ptn: 2.6, cho: 25.8, lip: 1, categoria: "Carboidrato" },
  { nome: "Batata doce cozida", kcal: 77, ptn: 1.4, cho: 18, lip: 0.1, categoria: "Carboidrato" },
  { nome: "Batata inglesa cozida", kcal: 56, ptn: 1.5, cho: 12.6, lip: 0.1, categoria: "Carboidrato" },
  { nome: "Mandioca cozida", kcal: 125, ptn: 0.6, cho: 30, lip: 0.3, categoria: "Carboidrato" },
  { nome: "Macarrão cozido", kcal: 131, ptn: 4.4, cho: 26.7, lip: 0.8, categoria: "Carboidrato" },
  { nome: "Pão francês", kcal: 300, ptn: 8, cho: 58, lip: 3, categoria: "Carboidrato" },
  { nome: "Aveia em flocos", kcal: 394, ptn: 13.9, cho: 66.6, lip: 8.5, categoria: "Carboidrato" },
  { nome: "Quinoa cozida", kcal: 120, ptn: 4.4, cho: 21.3, lip: 1.9, categoria: "Carboidrato" },
  { nome: "Cuscuz de milho cozido", kcal: 78, ptn: 1.8, cho: 16.7, lip: 0.5, categoria: "Carboidrato" },
  { nome: "Tapioca (goma)", kcal: 338, ptn: 0.2, cho: 83.9, lip: 0.2, categoria: "Carboidrato" },
  { nome: "Brócolis cozido", kcal: 35, ptn: 3.7, cho: 4.3, lip: 0.4, categoria: "Vegetal" },
  { nome: "Espinafre cozido", kcal: 23, ptn: 3, cho: 1.5, lip: 0.5, categoria: "Vegetal" },
  { nome: "Cenoura crua", kcal: 34, ptn: 0.9, cho: 7.7, lip: 0.2, categoria: "Vegetal" },
  { nome: "Abobrinha cozida", kcal: 17, ptn: 1.2, cho: 2.6, lip: 0.3, categoria: "Vegetal" },
  { nome: "Couve-flor cozida", kcal: 22, ptn: 1.8, cho: 3.4, lip: 0.3, categoria: "Vegetal" },
  { nome: "Feijão preto cozido", kcal: 77, ptn: 4.5, cho: 14, lip: 0.5, categoria: "Leguminosa" },
  { nome: "Feijão carioca cozido", kcal: 76, ptn: 4.8, cho: 13.6, lip: 0.5, categoria: "Leguminosa" },
  { nome: "Lentilha cozida", kcal: 93, ptn: 6.3, cho: 16, lip: 0.4, categoria: "Leguminosa" },
  { nome: "Grão-de-bico cozido", kcal: 164, ptn: 8.9, cho: 27.4, lip: 2.6, categoria: "Leguminosa" },
  { nome: "Abacate", kcal: 96, ptn: 1.2, cho: 6, lip: 8.4, categoria: "Gordura saudável" },
  { nome: "Azeite de oliva", kcal: 884, ptn: 0, cho: 0, lip: 100, categoria: "Gordura saudável" },
  { nome: "Amendoim torrado", kcal: 567, ptn: 25.8, cho: 16.1, lip: 49.2, categoria: "Gordura saudável" },
  { nome: "Castanha-do-pará", kcal: 656, ptn: 14.3, cho: 12.3, lip: 66.4, categoria: "Gordura saudável" },
  { nome: "Pasta de amendoim integral", kcal: 589, ptn: 25, cho: 20, lip: 50, categoria: "Gordura saudável" },
  { nome: "Banana prata", kcal: 98, ptn: 1.3, cho: 26, lip: 0.1, categoria: "Fruta" },
  { nome: "Maçã", kcal: 56, ptn: 0.3, cho: 15.2, lip: 0.4, categoria: "Fruta" },
  { nome: "Mamão papaia", kcal: 45, ptn: 0.5, cho: 11.8, lip: 0.1, categoria: "Fruta" },
  { nome: "Laranja pera", kcal: 37, ptn: 0.9, cho: 8.9, lip: 0.1, categoria: "Fruta" },
  { nome: "Morango", kcal: 30, ptn: 0.7, cho: 7, lip: 0.4, categoria: "Fruta" },
];

const CATEGORIAS = ["Todas", ...Array.from(new Set(ALIMENTOS.map(a => a.categoria)))];
const CAT_ICONS = {
  "Proteína animal": "🍗", "Laticínio": "🧀", "Carboidrato": "🍚",
  "Vegetal": "🥦", "Leguminosa": "🫘", "Gordura saudável": "🥑", "Fruta": "🍎", "Todas": "✨"
};
const COMPRA_CAT_ICONS = {
  "Hortifruti": "🥦", "Proteínas": "🍗", "Laticínios": "🧀", "Grãos e cereais": "🌾",
  "Óleos e gorduras": "🫒", "Frutas": "🍎", "Outros": "🛒"
};
const TOLERANCIAS = { calorico: { kcal: 0.10, ptn: 0.30 }, proteico: { kcal: 0.30, ptn: 0.10 } };

function macros(a, g) {
  const f = g / 100;
  return { kcal: a.kcal * f, ptn: a.ptn * f, cho: a.cho * f, lip: a.lip * f };
}
function calcGramas(origem, destino, objetivo, g) {
  const m = macros(origem, g);
  if (objetivo === "calorico") return destino.kcal === 0 ? null : (m.kcal / destino.kcal) * 100;
  return destino.ptn === 0 ? null : (m.ptn / destino.ptn) * 100;
}
function getSimilaridade(origem, destino, objetivo, g) {
  const gD = calcGramas(origem, destino, objetivo, g);
  if (!gD || gD <= 0) return null;
  const mO = macros(origem, g), mD = macros(destino, gD);
  const tol = TOLERANCIAS[objetivo];
  const dK = Math.abs(mD.kcal - mO.kcal) / (mO.kcal || 1);
  const dP = Math.abs(mD.ptn - mO.ptn) / (mO.ptn || 1);
  const score = 1 - (dK * 0.5 + dP * 0.5);
  return (dK <= tol.kcal + 0.1 || dP <= tol.ptn + 0.1) ? { gramasDestino: Math.round(gD), score, macrosDestino: mD } : null;
}

function Badge({ label, value, unit = "g", color }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 3,
      background: color + "15", border: `1px solid ${color}30`,
      borderRadius: 6, padding: "2px 8px", fontSize: 12, color, fontWeight: 600
    }}>
      <span style={{ fontWeight: 400, opacity: 0.7, fontSize: 11 }}>{label}</span>
      {Math.round(value * 10) / 10}{unit}
    </span>
  );
}

// ─── ABA TROCAS ───────────────────────────────────────────────────────────────
function AbaTrocas() {
  const [busca, setBusca] = useState("");
  const [selecionado, setSelecionado] = useState(null);
  const [gramas, setGramas] = useState(100);
  const [objetivo, setObjetivo] = useState("calorico");
  const [filtroCategoria, setFiltroCategoria] = useState("Todas");
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [calculado, setCalculado] = useState(false);

  const sugestoes = useMemo(() => {
    if (!busca || busca.length < 2 || selecionado) return [];
    return ALIMENTOS.filter(a => a.nome.toLowerCase().includes(busca.toLowerCase())).slice(0, 6);
  }, [busca, selecionado]);

  const trocas = useMemo(() => {
    if (!selecionado || !calculado) return [];
    return ALIMENTOS
      .filter(a => a.nome !== selecionado.nome && (filtroCategoria === "Todas" || a.categoria === filtroCategoria))
      .map(a => { const r = getSimilaridade(selecionado, a, objetivo, gramas); return r ? { alimento: a, ...r } : null; })
      .filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 8);
  }, [selecionado, gramas, objetivo, calculado, filtroCategoria]);

  const mO = selecionado ? macros(selecionado, gramas) : null;

  return (
    <div>
      <div className="card" style={{ padding: 18, marginBottom: 14 }}>
        <p style={{ margin: "0 0 10px", fontWeight: 700, color: "#374151", fontSize: 13 }}>🎯 Objetivo da troca</p>
        <div style={{ display: "flex", gap: 8 }}>
          {[{ key: "calorico", label: "⚡ Equivalente calórico", sub: "Mesmas kcal" }, { key: "proteico", label: "💪 Equivalente proteico", sub: "Mesma proteína" }].map(op => (
            <button key={op.key} onClick={() => { setObjetivo(op.key); setCalculado(false); }} style={{
              flex: 1, padding: "10px 12px", borderRadius: 10,
              border: objetivo === op.key ? "2px solid #6366f1" : "2px solid #e5e7eb",
              background: objetivo === op.key ? "#eef2ff" : "white",
              color: objetivo === op.key ? "#4f46e5" : "#6b7280",
              fontWeight: 700, fontSize: 12, textAlign: "left", cursor: "pointer",
            }}>
              <div>{op.label}</div>
              <div style={{ fontWeight: 400, fontSize: 11, marginTop: 2, opacity: 0.7 }}>{op.sub}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: 18, marginBottom: 14 }}>
        <p style={{ margin: "0 0 10px", fontWeight: 700, color: "#374151", fontSize: 13 }}>🔍 Selecionar alimento</p>
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <div style={{ flex: 1, position: "relative" }}>
            <input value={selecionado ? selecionado.nome : busca}
              onChange={e => { setBusca(e.target.value); setSelecionado(null); setCalculado(false); setMostrarDropdown(true); }}
              onFocus={() => setMostrarDropdown(true)}
              placeholder="Buscar alimento... ex: frango, arroz"
              style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "2px solid " + (selecionado ? "#10b981" : "#e5e7eb"), fontSize: 13, background: selecionado ? "#f0fdf4" : "white", color: "#111827" }} />
            {mostrarDropdown && sugestoes.length > 0 && (
              <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "white", borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 100, marginTop: 4, overflow: "hidden" }}>
                {sugestoes.map(a => (
                  <div key={a.nome} onClick={() => { setSelecionado(a); setBusca(a.nome); setMostrarDropdown(false); setCalculado(false); }}
                    style={{ padding: "9px 14px", cursor: "pointer", fontSize: 13, borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#f5f3ff"}
                    onMouseLeave={e => e.currentTarget.style.background = "white"}>
                    <span>{a.nome}</span>
                    <span style={{ fontSize: 11, color: "#94a3b8" }}>{CAT_ICONS[a.categoria]} {a.categoria}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <input type="number" value={gramas} onChange={e => { setGramas(Number(e.target.value)); setCalculado(false); }}
            style={{ width: 70, padding: "11px 8px", borderRadius: 10, border: "2px solid #e5e7eb", fontSize: 13, textAlign: "center" }} />
          <span style={{ alignSelf: "center", color: "#6b7280", fontSize: 13, fontWeight: 600 }}>g</span>
        </div>

        {selecionado && mO && (
          <div style={{ background: "#f8fafc", borderRadius: 10, padding: "10px 12px", marginBottom: 10, display: "flex", flexWrap: "wrap", gap: 5, alignItems: "center" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginRight: 4 }}>{selecionado.nome} — {gramas}g</span>
            <Badge label="Kcal" value={mO.kcal} unit="" color="#f59e0b" />
            <Badge label="P" value={mO.ptn} color="#6366f1" />
            <Badge label="C" value={mO.cho} color="#10b981" />
            <Badge label="G" value={mO.lip} color="#f43f5e" />
          </div>
        )}

        <div style={{ marginBottom: 12 }}>
          <p style={{ margin: "0 0 7px", fontWeight: 600, color: "#6b7280", fontSize: 12 }}>📂 Filtrar por categoria:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {CATEGORIAS.map(cat => (
              <button key={cat} onClick={() => { setFiltroCategoria(cat); setCalculado(false); }} style={{
                padding: "5px 10px", borderRadius: 20, fontSize: 11,
                border: filtroCategoria === cat ? "2px solid #6366f1" : "1px solid #e5e7eb",
                background: filtroCategoria === cat ? "#eef2ff" : "white",
                color: filtroCategoria === cat ? "#4f46e5" : "#6b7280",
                fontWeight: filtroCategoria === cat ? 700 : 400, cursor: "pointer",
              }}>{CAT_ICONS[cat]} {cat}</button>
            ))}
          </div>
        </div>

        <button onClick={() => selecionado && setCalculado(true)} disabled={!selecionado} style={{
          width: "100%", padding: "12px", borderRadius: 10,
          background: selecionado ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#e5e7eb",
          color: selecionado ? "white" : "#9ca3af", border: "none", fontWeight: 800, fontSize: 13,
        }}>⚡ CALCULAR TROCAS</button>
      </div>

      {calculado && (
        <div>
          <p style={{ fontWeight: 800, color: "#374151", fontSize: 15, marginBottom: 10 }}>
            🔄 Trocas sugeridas
            <span style={{ fontWeight: 400, fontSize: 12, color: "#94a3b8", marginLeft: 8 }}>{filtroCategoria !== "Todas" ? filtroCategoria : "Todas as categorias"}</span>
          </p>
          {trocas.length === 0
            ? <div className="card" style={{ padding: 20, textAlign: "center", color: "#94a3b8", fontSize: 14 }}>Nenhuma troca encontrada. Tente mudar a categoria ou o objetivo.</div>
            : <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {trocas.map(({ alimento, gramasDestino, score, macrosDestino }) => (
                <div key={alimento.nome} className="card troca-card" style={{ padding: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 7 }}>
                    <div>
                      <span style={{ fontWeight: 700, color: "#111827", fontSize: 14 }}>{alimento.nome}</span>
                      <span style={{ marginLeft: 6, fontSize: 11, background: "#f0fdf4", color: "#16a34a", borderRadius: 6, padding: "2px 7px", fontWeight: 700 }}>{CAT_ICONS[alimento.categoria]} {alimento.categoria}</span>
                    </div>
                    <div style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white", borderRadius: 8, padding: "3px 10px", fontWeight: 800, fontSize: 14, whiteSpace: "nowrap" }}>{gramasDestino}g</div>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 7 }}>
                    <Badge label="Kcal" value={macrosDestino.kcal} unit="" color="#f59e0b" />
                    <Badge label="P" value={macrosDestino.ptn} color="#6366f1" />
                    <Badge label="C" value={macrosDestino.cho} color="#10b981" />
                    <Badge label="G" value={macrosDestino.lip} color="#f43f5e" />
                  </div>
                  <div style={{ height: 4, borderRadius: 4, background: "#f1f5f9" }}>
                    <div style={{ height: "100%", width: `${Math.min(score * 100, 100)}%`, background: "linear-gradient(90deg, #6366f1, #8b5cf6)", borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: 10, color: "#94a3b8", marginTop: 2, display: "block" }}>Similaridade: {Math.round(score * 100)}%</span>
                </div>
              ))}
            </div>
          }
        </div>
      )}
    </div>
  );
}

// ─── ABA PORÇÃO INVERSA ───────────────────────────────────────────────────────
function AbaPorcaoInversa() {
  const [busca, setBusca] = useState("");
  const [selecionado, setSelecionado] = useState(null);
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [nutriente, setNutriente] = useState("ptn");
  const [quantidade, setQuantidade] = useState(30);
  const [resultado, setResultado] = useState(null);

  const sugestoes = useMemo(() => {
    if (!busca || busca.length < 2 || selecionado) return [];
    return ALIMENTOS.filter(a => a.nome.toLowerCase().includes(busca.toLowerCase())).slice(0, 6);
  }, [busca, selecionado]);

  function calcular() {
    if (!selecionado || !quantidade) return;
    const valorPor100g = selecionado[nutriente];
    if (!valorPor100g || valorPor100g === 0) {
      setResultado({ erro: `${selecionado.nome} não possui ${nutriente === "ptn" ? "proteína" : nutriente === "kcal" ? "calorias" : nutriente === "cho" ? "carboidrato" : "gordura"} significativa.` });
      return;
    }
    const gramas = (quantidade / valorPor100g) * 100;
    const m = macros(selecionado, gramas);
    setResultado({ gramas: Math.round(gramas), macros: m });
  }

  const NUTRIENTES = [
    { key: "ptn", label: "Proteína", unit: "g", color: "#6366f1", emoji: "💪" },
    { key: "kcal", label: "Calorias", unit: "kcal", color: "#f59e0b", emoji: "⚡" },
    { key: "cho", label: "Carboidrato", unit: "g", color: "#10b981", emoji: "🍚" },
    { key: "lip", label: "Gordura", unit: "g", color: "#f43f5e", emoji: "🫒" },
  ];
  const nutSelecionado = NUTRIENTES.find(n => n.key === nutriente);

  return (
    <div>
      <div className="card" style={{ padding: 18, marginBottom: 14 }}>
        <p style={{ margin: "0 0 4px", fontWeight: 700, color: "#374151", fontSize: 15 }}>🔁 Calculadora de Porção Inversa</p>
        <p style={{ margin: "0 0 14px", fontSize: 12, color: "#94a3b8" }}>
          Defina a quantidade de um nutriente e descubra quantas gramas do alimento você precisa.
        </p>

        {/* Alimento */}
        <p style={{ margin: "0 0 7px", fontWeight: 700, color: "#374151", fontSize: 13 }}>1. Escolha o alimento</p>
        <div style={{ position: "relative", marginBottom: 14 }}>
          <input value={selecionado ? selecionado.nome : busca}
            onChange={e => { setBusca(e.target.value); setSelecionado(null); setResultado(null); setMostrarDropdown(true); }}
            onFocus={() => setMostrarDropdown(true)}
            placeholder="Buscar alimento..."
            style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "2px solid " + (selecionado ? "#10b981" : "#e5e7eb"), fontSize: 13, background: selecionado ? "#f0fdf4" : "white", color: "#111827" }} />
          {mostrarDropdown && sugestoes.length > 0 && (
            <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "white", borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 100, marginTop: 4, overflow: "hidden" }}>
              {sugestoes.map(a => (
                <div key={a.nome} onClick={() => { setSelecionado(a); setBusca(a.nome); setMostrarDropdown(false); setResultado(null); }}
                  style={{ padding: "9px 14px", cursor: "pointer", fontSize: 13, borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#f5f3ff"}
                  onMouseLeave={e => e.currentTarget.style.background = "white"}>
                  <span>{a.nome}</span>
                  <span style={{ fontSize: 11, color: "#94a3b8" }}>{CAT_ICONS[a.categoria]} {a.categoria}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Nutriente */}
        <p style={{ margin: "0 0 7px", fontWeight: 700, color: "#374151", fontSize: 13 }}>2. Qual nutriente você quer atingir?</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
          {NUTRIENTES.map(n => (
            <button key={n.key} onClick={() => { setNutriente(n.key); setResultado(null); }} style={{
              padding: "10px 12px", borderRadius: 10, textAlign: "left",
              border: nutriente === n.key ? `2px solid ${n.color}` : "2px solid #e5e7eb",
              background: nutriente === n.key ? n.color + "12" : "white",
              color: nutriente === n.key ? n.color : "#6b7280",
              fontWeight: 700, fontSize: 13, cursor: "pointer",
            }}>{n.emoji} {n.label}</button>
          ))}
        </div>

        {/* Quantidade */}
        <p style={{ margin: "0 0 7px", fontWeight: 700, color: "#374151", fontSize: 13 }}>3. Quantidade desejada</p>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
          <input type="number" value={quantidade} onChange={e => { setQuantidade(Number(e.target.value)); setResultado(null); }}
            style={{ width: 100, padding: "11px 14px", borderRadius: 10, border: "2px solid #e5e7eb", fontSize: 16, fontWeight: 700, textAlign: "center" }} />
          <span style={{ fontWeight: 700, color: "#374151", fontSize: 14 }}>{nutSelecionado?.unit} de {nutSelecionado?.label.toLowerCase()}</span>
        </div>

        <button onClick={calcular} disabled={!selecionado} style={{
          width: "100%", padding: "12px", borderRadius: 10,
          background: selecionado ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#e5e7eb",
          color: selecionado ? "white" : "#9ca3af", border: "none", fontWeight: 800, fontSize: 13,
        }}>🔁 CALCULAR PORÇÃO</button>
      </div>

      {resultado && (
        resultado.erro
          ? <div className="card" style={{ padding: 16, background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: 13 }}>{resultado.erro}</div>
          : <div className="card" style={{ padding: 20, textAlign: "center" }}>
            <p style={{ margin: "0 0 6px", fontSize: 13, color: "#6b7280" }}>Para obter <strong style={{ color: nutSelecionado?.color }}>{quantidade}{nutSelecionado?.unit}</strong> de {nutSelecionado?.label.toLowerCase()} de</p>
            <p style={{ margin: "0 0 16px", fontWeight: 800, color: "#111827", fontSize: 16 }}>{selecionado?.nome}</p>
            <div style={{
              display: "inline-flex", alignItems: "baseline", gap: 6,
              background: "linear-gradient(135deg, #eef2ff, #f5f3ff)", borderRadius: 16,
              padding: "16px 32px", marginBottom: 16,
            }}>
              <span style={{ fontSize: 48, fontWeight: 900, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{resultado.gramas}</span>
              <span style={{ fontSize: 20, fontWeight: 700, color: "#6366f1" }}>gramas</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
              <Badge label="Kcal" value={resultado.macros.kcal} unit="" color="#f59e0b" />
              <Badge label="Proteína" value={resultado.macros.ptn} color="#6366f1" />
              <Badge label="Carboidrato" value={resultado.macros.cho} color="#10b981" />
              <Badge label="Gordura" value={resultado.macros.lip} color="#f43f5e" />
            </div>
          </div>
      )}
    </div>
  );
}

// ─── ABA LISTA DE COMPRAS ─────────────────────────────────────────────────────
function AbaListaCompras() {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfNome, setPdfNome] = useState("");
  const [processando, setProcessando] = useState(false);
  const [lista, setLista] = useState(null);
  const [erro, setErro] = useState("");
  const fileRef = useRef();

  function handlePdf(e) {
    const file = e.target.files[0]; if (!file) return;
    setPdfFile(file); setPdfNome(file.name); setLista(null); setErro("");
  }

  async function gerarLista() {
    if (!pdfFile) return;
    setProcessando(true); setErro(""); setLista(null);
    try {
      const base64 = await new Promise((res, rej) => {
        const r = new FileReader(); r.onload = () => res(r.result.split(",")[1]); r.onerror = rej; r.readAsDataURL(pdfFile);
      });
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1000,
          messages: [{
            role: "user", content: [
              { type: "document", source: { type: "base64", media_type: "application/pdf", data: base64 } },
              {
                type: "text",
                text: `Analise este plano alimentar e extraia todos os alimentos mencionados. Some as quantidades de alimentos repetidos. Agrupe por categoria de supermercado.

Responda APENAS com JSON válido, sem markdown, sem backticks, sem texto adicional:
{
  "categorias": [
    {
      "nome": "Proteínas",
      "itens": [{"alimento": "Frango", "quantidade": "700g"}]
    },
    {
      "nome": "Hortifruti",
      "itens": [{"alimento": "Brócolis", "quantidade": "300g"}]
    },
    {
      "nome": "Grãos e cereais",
      "itens": []
    },
    {
      "nome": "Laticínios",
      "itens": []
    },
    {
      "nome": "Óleos e gorduras",
      "itens": []
    },
    {
      "nome": "Frutas",
      "itens": []
    },
    {
      "nome": "Outros",
      "itens": []
    }
  ]
}
Inclua apenas categorias com itens. Some quantidades do mesmo alimento (ex: frango aparece em 3 refeições = total em gramas). Se a quantidade não estiver clara, use "a definir".`
              }
            ]
          }]
        })
      });
      const data = await response.json();
      const texto = data.content?.find(b => b.type === "text")?.text || "";
      const parsed = JSON.parse(texto.trim());
      setLista(parsed);
    } catch (e) {
      setErro("Não foi possível processar o PDF. Verifique se o arquivo contém texto legível.");
    }
    setProcessando(false);
  }

  function copiarLista() {
    if (!lista) return;
    const texto = lista.categorias.map(cat =>
      `${COMPRA_CAT_ICONS[cat.nome] || "🛒"} ${cat.nome.toUpperCase()}\n` +
      cat.itens.map(i => `  • ${i.alimento} — ${i.quantidade}`).join("\n")
    ).join("\n\n");
    navigator.clipboard.writeText(texto);
  }

  const totalItens = lista ? lista.categorias.reduce((acc, c) => acc + c.itens.length, 0) : 0;

  return (
    <div>
      <div className="card" style={{ padding: 18, marginBottom: 14 }}>
        <p style={{ margin: "0 0 4px", fontWeight: 700, color: "#374151", fontSize: 15 }}>🛒 Lista de Compras por Plano Alimentar</p>
        <p style={{ margin: "0 0 14px", fontSize: 12, color: "#94a3b8" }}>
          Envie o PDF do plano alimentar. A IA extrai todos os alimentos e gera a lista agrupada por categoria.
        </p>

        <div onClick={() => fileRef.current.click()} style={{
          border: "2px dashed " + (pdfFile ? "#6366f1" : "#d1d5db"),
          borderRadius: 12, padding: "20px", textAlign: "center", cursor: "pointer",
          background: pdfFile ? "#f5f3ff" : "white", marginBottom: 12, transition: "all 0.2s",
        }}>
          {pdfFile ? (
            <div>
              <div style={{ fontSize: 28, marginBottom: 6 }}>📄</div>
              <div style={{ fontWeight: 700, color: "#4f46e5", fontSize: 13 }}>{pdfNome}</div>
              <div style={{ color: "#94a3b8", fontSize: 11, marginTop: 3 }}>Clique para trocar o arquivo</div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: 28, marginBottom: 6 }}>📂</div>
              <div style={{ fontWeight: 600, color: "#6366f1", fontSize: 13 }}>Clique para enviar o PDF</div>
              <div style={{ color: "#94a3b8", fontSize: 11, marginTop: 3 }}>Plano alimentar em PDF</div>
            </div>
          )}
        </div>
        <input ref={fileRef} type="file" accept="application/pdf" onChange={handlePdf} style={{ display: "none" }} />

        <button onClick={gerarLista} disabled={!pdfFile || processando} style={{
          width: "100%", padding: "12px", borderRadius: 10,
          background: pdfFile && !processando ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#e5e7eb",
          color: pdfFile && !processando ? "white" : "#9ca3af",
          border: "none", fontWeight: 800, fontSize: 13,
        }}>{processando ? "🔍 Analisando plano alimentar..." : "🛒 GERAR LISTA DE COMPRAS"}</button>
      </div>

      {erro && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: "12px 16px", color: "#dc2626", fontSize: 13, marginBottom: 12 }}>{erro}</div>}

      {lista && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <p style={{ fontWeight: 800, color: "#374151", fontSize: 15, margin: 0 }}>
              🛒 Lista gerada
              <span style={{ fontWeight: 400, fontSize: 12, color: "#94a3b8", marginLeft: 8 }}>{totalItens} itens</span>
            </p>
            <button onClick={copiarLista} style={{
              padding: "6px 14px", borderRadius: 8, border: "1px solid #e5e7eb",
              background: "white", color: "#6366f1", fontWeight: 700, fontSize: 12, cursor: "pointer",
            }}>📋 Copiar</button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {lista.categorias.filter(c => c.itens.length > 0).map(cat => (
              <div key={cat.nome} className="card" style={{ padding: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
                  <span style={{ fontSize: 18 }}>{COMPRA_CAT_ICONS[cat.nome] || "🛒"}</span>
                  <span style={{ fontWeight: 800, color: "#374151", fontSize: 14 }}>{cat.nome}</span>
                  <span style={{ marginLeft: "auto", fontSize: 11, background: "#f0f4ff", color: "#6366f1", borderRadius: 20, padding: "2px 8px", fontWeight: 700 }}>{cat.itens.length} {cat.itens.length === 1 ? "item" : "itens"}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {cat.itens.map((item, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: i < cat.itens.length - 1 ? "1px dashed #f3f4f6" : "none" }}>
                      <span style={{ fontSize: 13, color: "#374151" }}>• {item.alimento}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#6366f1", background: "#eef2ff", borderRadius: 6, padding: "2px 8px" }}>{item.quantidade}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ABA ESCANEAR ─────────────────────────────────────────────────────────────
function AbaEscanear() {
  const [subAba, setSubAba] = useState("barcode");
  const [codigo, setCodigo] = useState("");
  const [buscando, setBuscando] = useState(false);
  const [produto, setProduto] = useState(null);
  const [erro, setErro] = useState("");
  const [imagemFile, setImagemFile] = useState(null);
  const [imagemPreview, setImagemPreview] = useState(null);
  const [analisando, setAnalisando] = useState(false);
  const [resultadoIA, setResultadoIA] = useState(null);
  const [erroIA, setErroIA] = useState("");
  const fileRef = useRef();

  async function buscarCodigo() {
    if (!codigo.trim()) return;
    setBuscando(true); setErro(""); setProduto(null);
    try {
      const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${codigo.trim()}.json`);
      const data = await res.json();
      if (data.status === 1 && data.product) {
        const p = data.product, n = p.nutriments || {};
        const kcalRaw = n["energy-kcal_100g"] ?? (n["energy_100g"] ? Math.round(n["energy_100g"] / 4.184) : 0);
        setProduto({ nome: p.product_name || "Produto sem nome", marca: p.brands || "—", porcao: p.serving_size || "100g", kcal: kcalRaw, ptn: n.proteins_100g || 0, cho: n.carbohydrates_100g || 0, lip: n.fat_100g || 0, fibra: n.fiber_100g || 0, imagem: p.image_front_small_url || null });
      } else setErro("Produto não encontrado. Verifique o código de barras.");
    } catch { setErro("Erro ao buscar. Verifique sua conexão."); }
    setBuscando(false);
  }

  function handleImagem(e) {
    const file = e.target.files[0]; if (!file) return;
    setImagemFile(file); setResultadoIA(null); setErroIA("");
    const reader = new FileReader(); reader.onload = ev => setImagemPreview(ev.target.result); reader.readAsDataURL(file);
  }

  async function analisarRotulo() {
    if (!imagemFile) return;
    setAnalisando(true); setErroIA(""); setResultadoIA(null);
    try {
      const base64 = await new Promise((res, rej) => {
        const r = new FileReader(); r.onload = () => res(r.result.split(",")[1]); r.onerror = rej; r.readAsDataURL(imagemFile);
      });
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1000,
          messages: [{ role: "user", content: [
            { type: "image", source: { type: "base64", media_type: imagemFile.type || "image/jpeg", data: base64 } },
            { type: "text", text: `Analise este rótulo nutricional. Responda APENAS com JSON válido, sem markdown:\n{"nome":"","porcao":"","kcal_porcao":0,"ptn_porcao":0,"cho_porcao":0,"lip_porcao":0,"fibra_porcao":0,"kcal_100g":0,"ptn_100g":0,"cho_100g":0,"lip_100g":0}` }
          ]}]
        })
      });
      const data = await response.json();
      const texto = data.content?.find(b => b.type === "text")?.text || "";
      setResultadoIA(JSON.parse(texto.trim()));
    } catch { setErroIA("Não foi possível extrair os dados. Tente uma foto mais nítida."); }
    setAnalisando(false);
  }

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {[{ key: "barcode", label: "📦 Código de Barras" }, { key: "foto", label: "📸 Foto do Rótulo (IA)" }].map(s => (
          <button key={s.key} onClick={() => { setSubAba(s.key); setErro(""); setErroIA(""); }} style={{
            flex: 1, padding: "10px", borderRadius: 10, border: subAba === s.key ? "2px solid #6366f1" : "2px solid #e5e7eb",
            background: subAba === s.key ? "#eef2ff" : "white",
            color: subAba === s.key ? "#4f46e5" : "#6b7280",
            fontWeight: 700, fontSize: 12, cursor: "pointer",
          }}>{s.label}</button>
        ))}
      </div>

      {subAba === "barcode" && (
        <div className="card" style={{ padding: 18 }}>
          <p style={{ margin: "0 0 4px", fontWeight: 700, color: "#374151", fontSize: 13 }}>Digite o código de barras</p>
          <p style={{ margin: "0 0 12px", fontSize: 12, color: "#94a3b8" }}>Busca na base Open Food Facts — inclui produtos brasileiros</p>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <input value={codigo} onChange={e => { setCodigo(e.target.value); setProduto(null); setErro(""); }}
              onKeyDown={e => e.key === "Enter" && buscarCodigo()} placeholder="Ex: 7891000100103"
              style={{ flex: 1, padding: "11px 14px", borderRadius: 10, border: "2px solid #e5e7eb", fontSize: 14 }} />
            <button onClick={buscarCodigo} disabled={buscando || !codigo.trim()} style={{
              padding: "11px 16px", borderRadius: 10,
              background: codigo.trim() ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#e5e7eb",
              color: codigo.trim() ? "white" : "#9ca3af", border: "none", fontWeight: 700, fontSize: 12, whiteSpace: "nowrap",
            }}>{buscando ? "Buscando..." : "🔍 Buscar"}</button>
          </div>
          {erro && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 14px", color: "#dc2626", fontSize: 13 }}>{erro}</div>}
          {produto && (
            <div style={{ background: "#f8fafc", borderRadius: 12, padding: 14 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                {produto.imagem && <img src={produto.imagem} alt="" style={{ width: 56, height: 56, objectFit: "contain", borderRadius: 8, background: "white", border: "1px solid #e5e7eb", flexShrink: 0 }} />}
                <div>
                  <div style={{ fontWeight: 800, color: "#111827", fontSize: 14 }}>{produto.nome}</div>
                  <div style={{ color: "#6b7280", fontSize: 12, marginTop: 2 }}>{produto.marca} • Porção: {produto.porcao}</div>
                </div>
              </div>
              <p style={{ margin: "0 0 7px", fontWeight: 700, color: "#374151", fontSize: 12 }}>Por 100g:</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                <Badge label="Kcal" value={produto.kcal} unit="" color="#f59e0b" />
                <Badge label="Proteína" value={produto.ptn} color="#6366f1" />
                <Badge label="Carb" value={produto.cho} color="#10b981" />
                <Badge label="Gordura" value={produto.lip} color="#f43f5e" />
                {produto.fibra > 0 && <Badge label="Fibra" value={produto.fibra} color="#8b5cf6" />}
              </div>
            </div>
          )}
        </div>
      )}

      {subAba === "foto" && (
        <div className="card" style={{ padding: 18 }}>
          <p style={{ margin: "0 0 4px", fontWeight: 700, color: "#374151", fontSize: 13 }}>Foto da tabela nutricional</p>
          <p style={{ margin: "0 0 12px", fontSize: 12, color: "#94a3b8" }}>A IA lê o rótulo e extrai os macros automaticamente</p>
          <div onClick={() => fileRef.current.click()} style={{ border: "2px dashed #c4b5fd", borderRadius: 12, padding: "20px", textAlign: "center", cursor: "pointer", marginBottom: 12, background: imagemPreview ? "#f5f3ff" : "white" }}>
            {imagemPreview
              ? <img src={imagemPreview} alt="" style={{ maxHeight: 180, maxWidth: "100%", borderRadius: 8, objectFit: "contain" }} />
              : <div><div style={{ fontSize: 28, marginBottom: 6 }}>📸</div><div style={{ fontWeight: 600, color: "#6366f1", fontSize: 13 }}>Clique para enviar a foto</div><div style={{ color: "#94a3b8", fontSize: 11, marginTop: 3 }}>JPG, PNG ou WEBP</div></div>}
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleImagem} style={{ display: "none" }} />
          {imagemPreview && (
            <button onClick={analisarRotulo} disabled={analisando} style={{
              width: "100%", padding: "12px", borderRadius: 10, marginBottom: 12,
              background: analisando ? "#e5e7eb" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: analisando ? "#9ca3af" : "white", border: "none", fontWeight: 800, fontSize: 13,
            }}>{analisando ? "🔍 Analisando com IA..." : "✨ Analisar com IA"}</button>
          )}
          {erroIA && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 14px", color: "#dc2626", fontSize: 13, marginBottom: 10 }}>{erroIA}</div>}
          {resultadoIA && (
            <div style={{ background: "#f8fafc", borderRadius: 12, padding: 14 }}>
              <div style={{ fontWeight: 800, color: "#111827", fontSize: 14, marginBottom: 3 }}>{resultadoIA.nome || "Produto analisado"}</div>
              <div style={{ color: "#6b7280", fontSize: 12, marginBottom: 10 }}>Porção: {resultadoIA.porcao || "—"}</div>
              {resultadoIA.kcal_porcao > 0 && (
                <div style={{ marginBottom: 10 }}>
                  <p style={{ margin: "0 0 6px", fontWeight: 700, color: "#374151", fontSize: 12 }}>Por porção:</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    <Badge label="Kcal" value={resultadoIA.kcal_porcao} unit="" color="#f59e0b" />
                    <Badge label="P" value={resultadoIA.ptn_porcao} color="#6366f1" />
                    <Badge label="C" value={resultadoIA.cho_porcao} color="#10b981" />
                    <Badge label="G" value={resultadoIA.lip_porcao} color="#f43f5e" />
                  </div>
                </div>
              )}
              {resultadoIA.kcal_100g > 0 && (
                <div>
                  <p style={{ margin: "0 0 6px", fontWeight: 700, color: "#374151", fontSize: 12 }}>Por 100g:</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    <Badge label="Kcal" value={resultadoIA.kcal_100g} unit="" color="#f59e0b" />
                    <Badge label="P" value={resultadoIA.ptn_100g} color="#6366f1" />
                    <Badge label="C" value={resultadoIA.cho_100g} color="#10b981" />
                    <Badge label="G" value={resultadoIA.lip_100g} color="#f43f5e" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── APP PRINCIPAL ─────────────────────────────────────────────────────────────
export default function App() {
  const [aba, setAba] = useState("trocas");
  const ABAS = [
    { key: "trocas", label: "🔄 Trocas" },
    { key: "inversa", label: "🔁 Porção Inversa" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f8fafc 0%, #f0f4ff 50%, #faf5ff 100%)", fontFamily: "'Nunito', 'Segoe UI', sans-serif", padding: "20px 14px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        input:focus { outline: none; }
        button { transition: all 0.15s ease; cursor: pointer; }
        .card { background: white; border-radius: 16px; box-shadow: 0 2px 16px rgba(0,0,0,0.06); }
        .troca-card:hover { box-shadow: 0 4px 24px rgba(99,102,241,0.12); transform: translateY(-2px); }
        .troca-card { transition: all 0.2s ease; }
      `}</style>
      <div style={{ maxWidth: 660, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ display: "inline-flex", alignItems: "center", background: "white", borderRadius: 10, padding: "5px 14px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: 10, fontSize: 11, color: "#6366f1", fontWeight: 700, letterSpacing: 1 }}>🥗 FERRAMENTA NUTRICIONAL</div>
          <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0, letterSpacing: -1, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Trocas Inteligentes</h1>
          <p style={{ color: "#94a3b8", marginTop: 5, fontSize: 12 }}>Base TACO + TBCA • Open Food Facts</p>
        </div>

        {/* Nav */}
        <div style={{ display: "flex", gap: 5, marginBottom: 16, background: "white", padding: 5, borderRadius: 14, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
          {ABAS.map(a => (
            <button key={a.key} onClick={() => setAba(a.key)} style={{
              flex: 1, padding: "9px 4px", borderRadius: 10, border: "none",
              background: aba === a.key ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "transparent",
              color: aba === a.key ? "white" : "#6b7280",
              fontWeight: aba === a.key ? 800 : 600, fontSize: 12, cursor: "pointer",
            }}>{a.label}</button>
          ))}
        </div>

        {aba === "trocas" && <AbaTrocas />}
        {aba === "inversa" && <AbaPorcaoInversa />}

        <p style={{ textAlign: "center", color: "#cbd5e1", fontSize: 11, marginTop: 18 }}>Base TACO + TBCA • Open Food Facts • Uso profissional</p>
      </div>
    </div>
  );
}
