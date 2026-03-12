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
      borderRadius: 8, padding: "4px 10px", fontSize: 13, color, fontWeight: 700,
    }}>
      <span style={{ fontWeight: 500, opacity: 0.65, fontSize: 11 }}>{label}</span>
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
    <div style={{ paddingBottom: 8 }}>

      {/* Objetivo */}
      <div className="card" style={{ padding: 16, marginBottom: 12 }}>
        <p style={{ margin: "0 0 10px", fontWeight: 700, color: "#374151", fontSize: 14 }}>🎯 Objetivo da troca</p>
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { key: "calorico", label: "⚡ Calórico", sub: "Mesmas kcal" },
            { key: "proteico", label: "💪 Proteico", sub: "Mesma proteína" }
          ].map(op => (
            <button key={op.key} onClick={() => { setObjetivo(op.key); setCalculado(false); }} style={{
              flex: 1, padding: "12px 10px", borderRadius: 12,
              border: objetivo === op.key ? "2px solid #6366f1" : "2px solid #e5e7eb",
              background: objetivo === op.key ? "#eef2ff" : "white",
              color: objetivo === op.key ? "#4f46e5" : "#6b7280",
              fontWeight: 700, fontSize: 14, textAlign: "left", cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
            }}>
              <div>{op.label}</div>
              <div style={{ fontWeight: 400, fontSize: 12, marginTop: 2, opacity: 0.65 }}>{op.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Alimento + Gramas */}
      <div className="card" style={{ padding: 16, marginBottom: 12 }}>
        <p style={{ margin: "0 0 10px", fontWeight: 700, color: "#374151", fontSize: 14 }}>🔍 Alimento de origem</p>

        {/* Busca */}
        <div style={{ position: "relative", marginBottom: 10 }}>
          <input
            value={selecionado ? selecionado.nome : busca}
            onChange={e => { setBusca(e.target.value); setSelecionado(null); setCalculado(false); setMostrarDropdown(true); }}
            onFocus={() => setMostrarDropdown(true)}
            placeholder="Digite o nome do alimento..."
            style={{
              width: "100%", padding: "14px 16px", borderRadius: 12,
              border: "2px solid " + (selecionado ? "#10b981" : "#e5e7eb"),
              fontSize: 16, background: selecionado ? "#f0fdf4" : "white",
              color: "#111827", WebkitAppearance: "none",
            }}
          />
          {selecionado && (
            <button onClick={() => { setSelecionado(null); setBusca(""); setCalculado(false); }}
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", fontSize: 18, color: "#94a3b8", cursor: "pointer", padding: 4 }}>✕</button>
          )}
          {mostrarDropdown && sugestoes.length > 0 && (
            <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "white", borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.15)", zIndex: 200, marginTop: 4, overflow: "hidden" }}>
              {sugestoes.map(a => (
                <div key={a.nome}
                  onPointerDown={() => { setSelecionado(a); setBusca(a.nome); setMostrarDropdown(false); setCalculado(false); }}
                  style={{ padding: "14px 16px", cursor: "pointer", fontSize: 15, borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#f5f3ff"}
                  onMouseLeave={e => e.currentTarget.style.background = "white"}>
                  <span style={{ fontWeight: 600 }}>{a.nome}</span>
                  <span style={{ fontSize: 12, color: "#94a3b8", marginLeft: 8, whiteSpace: "nowrap" }}>{CAT_ICONS[a.categoria]}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Gramas */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ flex: 1 }}>
            <p style={{ margin: "0 0 6px", fontWeight: 600, color: "#6b7280", fontSize: 13 }}>Quantidade</p>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="number" inputMode="numeric" value={gramas}
                onChange={e => { setGramas(Number(e.target.value)); setCalculado(false); }}
                style={{ width: 90, padding: "12px 14px", borderRadius: 12, border: "2px solid #e5e7eb", fontSize: 18, fontWeight: 700, textAlign: "center", WebkitAppearance: "none" }} />
              <span style={{ fontWeight: 700, color: "#374151", fontSize: 16 }}>gramas</span>
            </div>
          </div>

          {selecionado && mO && (
            <div style={{ flex: 1, background: "#f8fafc", borderRadius: 12, padding: "10px 12px" }}>
              <p style={{ margin: "0 0 6px", fontWeight: 600, color: "#6b7280", fontSize: 11 }}>Macros da porção</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                <Badge label="kcal" value={mO.kcal} unit="" color="#f59e0b" />
                <Badge label="P" value={mO.ptn} color="#6366f1" />
                <Badge label="C" value={mO.cho} color="#10b981" />
                <Badge label="G" value={mO.lip} color="#f43f5e" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filtro categoria */}
      <div className="card" style={{ padding: 16, marginBottom: 12 }}>
        <p style={{ margin: "0 0 10px", fontWeight: 700, color: "#374151", fontSize: 14 }}>📂 Filtrar trocas por categoria</p>
        <div style={{ display: "flex", overflowX: "auto", gap: 8, paddingBottom: 4, WebkitOverflowScrolling: "touch" }}>
          {CATEGORIAS.map(cat => (
            <button key={cat} onClick={() => { setFiltroCategoria(cat); setCalculado(false); }}
              style={{
                flexShrink: 0, padding: "8px 14px", borderRadius: 20, fontSize: 13,
                border: filtroCategoria === cat ? "2px solid #6366f1" : "1.5px solid #e5e7eb",
                background: filtroCategoria === cat ? "#eef2ff" : "white",
                color: filtroCategoria === cat ? "#4f46e5" : "#6b7280",
                fontWeight: filtroCategoria === cat ? 700 : 500,
                cursor: "pointer", whiteSpace: "nowrap",
                WebkitTapHighlightColor: "transparent",
              }}>{CAT_ICONS[cat]} {cat}</button>
          ))}
        </div>
      </div>

      {/* Botão calcular */}
      <button onClick={() => selecionado && setCalculado(true)} disabled={!selecionado}
        style={{
          width: "100%", padding: "16px", borderRadius: 14, marginBottom: 16,
          background: selecionado ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#e5e7eb",
          color: selecionado ? "white" : "#9ca3af", border: "none",
          fontWeight: 800, fontSize: 16, letterSpacing: 0.3,
          WebkitTapHighlightColor: "transparent",
          boxShadow: selecionado ? "0 4px 16px rgba(99,102,241,0.35)" : "none",
        }}>
        ⚡ Calcular Trocas
      </button>

      {/* Resultados */}
      {calculado && (
        <div>
          <p style={{ fontWeight: 800, color: "#374151", fontSize: 16, marginBottom: 10 }}>
            🔄 Trocas sugeridas
            <span style={{ fontWeight: 500, fontSize: 13, color: "#94a3b8", marginLeft: 8 }}>
              {filtroCategoria !== "Todas" ? filtroCategoria : "todas as categorias"}
            </span>
          </p>
          {trocas.length === 0
            ? <div className="card" style={{ padding: 24, textAlign: "center", color: "#94a3b8", fontSize: 15 }}>Nenhuma troca encontrada. Tente mudar a categoria ou o objetivo.</div>
            : <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {trocas.map(({ alimento, gramasDestino, score, macrosDestino }) => (
                <div key={alimento.nome} className="card" style={{ padding: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div style={{ flex: 1, paddingRight: 10 }}>
                      <div style={{ fontWeight: 700, color: "#111827", fontSize: 15, lineHeight: 1.3 }}>{alimento.nome}</div>
                      <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 3 }}>{CAT_ICONS[alimento.categoria]} {alimento.categoria}</div>
                    </div>
                    <div style={{
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      color: "white", borderRadius: 10, padding: "6px 14px",
                      fontWeight: 900, fontSize: 18, whiteSpace: "nowrap", flexShrink: 0,
                    }}>{gramasDestino}g</div>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                    <Badge label="kcal" value={macrosDestino.kcal} unit="" color="#f59e0b" />
                    <Badge label="P" value={macrosDestino.ptn} color="#6366f1" />
                    <Badge label="C" value={macrosDestino.cho} color="#10b981" />
                    <Badge label="G" value={macrosDestino.lip} color="#f43f5e" />
                  </div>
                  <div style={{ height: 5, borderRadius: 5, background: "#f1f5f9" }}>
                    <div style={{ height: "100%", width: `${Math.min(score * 100, 100)}%`, background: "linear-gradient(90deg, #6366f1, #8b5cf6)", borderRadius: 5, transition: "width 0.4s ease" }} />
                  </div>
                  <span style={{ fontSize: 11, color: "#94a3b8", marginTop: 4, display: "block" }}>Similaridade: {Math.round(score * 100)}%</span>
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
      setResultado({ erro: `${selecionado.nome} não possui este nutriente em quantidade significativa.` });
      return;
    }
    const gramas = (quantidade / valorPor100g) * 100;
    setResultado({ gramas: Math.round(gramas), macros: macros(selecionado, gramas) });
  }

  const NUTRIENTES = [
    { key: "ptn", label: "Proteína", unit: "g", color: "#6366f1", emoji: "💪" },
    { key: "kcal", label: "Calorias", unit: "kcal", color: "#f59e0b", emoji: "⚡" },
    { key: "cho", label: "Carboidrato", unit: "g", color: "#10b981", emoji: "🍚" },
    { key: "lip", label: "Gordura", unit: "g", color: "#f43f5e", emoji: "🫒" },
  ];
  const nutAtual = NUTRIENTES.find(n => n.key === nutriente);

  return (
    <div style={{ paddingBottom: 8 }}>

      {/* Alimento */}
      <div className="card" style={{ padding: 16, marginBottom: 12 }}>
        <p style={{ margin: "0 0 10px", fontWeight: 700, color: "#374151", fontSize: 14 }}>1️⃣ Escolha o alimento</p>
        <div style={{ position: "relative" }}>
          <input value={selecionado ? selecionado.nome : busca}
            onChange={e => { setBusca(e.target.value); setSelecionado(null); setResultado(null); setMostrarDropdown(true); }}
            onFocus={() => setMostrarDropdown(true)}
            placeholder="Digite o nome do alimento..."
            style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "2px solid " + (selecionado ? "#10b981" : "#e5e7eb"), fontSize: 16, background: selecionado ? "#f0fdf4" : "white", color: "#111827", WebkitAppearance: "none" }} />
          {selecionado && (
            <button onClick={() => { setSelecionado(null); setBusca(""); setResultado(null); }}
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", fontSize: 18, color: "#94a3b8", cursor: "pointer", padding: 4 }}>✕</button>
          )}
          {mostrarDropdown && sugestoes.length > 0 && (
            <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "white", borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.15)", zIndex: 200, marginTop: 4, overflow: "hidden" }}>
              {sugestoes.map(a => (
                <div key={a.nome}
                  onPointerDown={() => { setSelecionado(a); setBusca(a.nome); setMostrarDropdown(false); setResultado(null); }}
                  style={{ padding: "14px 16px", cursor: "pointer", fontSize: 15, borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#f5f3ff"}
                  onMouseLeave={e => e.currentTarget.style.background = "white"}>
                  <span style={{ fontWeight: 600 }}>{a.nome}</span>
                  <span style={{ fontSize: 12, color: "#94a3b8" }}>{CAT_ICONS[a.categoria]}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Nutriente */}
      <div className="card" style={{ padding: 16, marginBottom: 12 }}>
        <p style={{ margin: "0 0 10px", fontWeight: 700, color: "#374151", fontSize: 14 }}>2️⃣ Qual nutriente quer atingir?</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {NUTRIENTES.map(n => (
            <button key={n.key} onClick={() => { setNutriente(n.key); setResultado(null); }} style={{
              padding: "14px 12px", borderRadius: 12, textAlign: "left",
              border: nutriente === n.key ? `2px solid ${n.color}` : "2px solid #e5e7eb",
              background: nutriente === n.key ? n.color + "12" : "white",
              color: nutriente === n.key ? n.color : "#6b7280",
              fontWeight: 700, fontSize: 15, cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
            }}>{n.emoji} {n.label}</button>
          ))}
        </div>
      </div>

      {/* Quantidade */}
      <div className="card" style={{ padding: 16, marginBottom: 12 }}>
        <p style={{ margin: "0 0 10px", fontWeight: 700, color: "#374151", fontSize: 14 }}>3️⃣ Quantidade desejada</p>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <input type="number" inputMode="numeric" value={quantidade}
            onChange={e => { setQuantidade(Number(e.target.value)); setResultado(null); }}
            style={{ width: 110, padding: "14px", borderRadius: 12, border: "2px solid #e5e7eb", fontSize: 22, fontWeight: 800, textAlign: "center", WebkitAppearance: "none" }} />
          <span style={{ fontWeight: 700, color: "#374151", fontSize: 16 }}>{nutAtual?.unit} de {nutAtual?.label.toLowerCase()}</span>
        </div>
      </div>

      {/* Botão */}
      <button onClick={calcular} disabled={!selecionado}
        style={{
          width: "100%", padding: "16px", borderRadius: 14, marginBottom: 16,
          background: selecionado ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#e5e7eb",
          color: selecionado ? "white" : "#9ca3af", border: "none",
          fontWeight: 800, fontSize: 16,
          WebkitTapHighlightColor: "transparent",
          boxShadow: selecionado ? "0 4px 16px rgba(99,102,241,0.35)" : "none",
        }}>🔁 Calcular Porção</button>

      {/* Resultado */}
      {resultado && (
        resultado.erro
          ? <div className="card" style={{ padding: 16, background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: 14 }}>{resultado.erro}</div>
          : <div className="card" style={{ padding: 24, textAlign: "center" }}>
            <p style={{ margin: "0 0 4px", fontSize: 14, color: "#6b7280" }}>
              Para <strong style={{ color: nutAtual?.color }}>{quantidade}{nutAtual?.unit}</strong> de {nutAtual?.label.toLowerCase()}
            </p>
            <p style={{ margin: "0 0 20px", fontWeight: 800, color: "#111827", fontSize: 17 }}>{selecionado?.nome}</p>
            <div style={{
              display: "inline-flex", alignItems: "baseline", gap: 8,
              background: "linear-gradient(135deg, #eef2ff, #f5f3ff)",
              borderRadius: 20, padding: "18px 36px", marginBottom: 20,
            }}>
              <span style={{ fontSize: 56, fontWeight: 900, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>{resultado.gramas}</span>
              <span style={{ fontSize: 22, fontWeight: 700, color: "#6366f1" }}>g</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
              <Badge label="kcal" value={resultado.macros.kcal} unit="" color="#f59e0b" />
              <Badge label="Proteína" value={resultado.macros.ptn} color="#6366f1" />
              <Badge label="Carb" value={resultado.macros.cho} color="#10b981" />
              <Badge label="Gordura" value={resultado.macros.lip} color="#f43f5e" />
            </div>
          </div>
      )}
    </div>
  );
}

// ─── APP PRINCIPAL ─────────────────────────────────────────────────────────────
export default function App() {
  const [aba, setAba] = useState("trocas");

  return (
    <div style={{ minHeight: "100vh", minHeight: "100dvh", background: "linear-gradient(160deg, #f8fafc 0%, #f0f4ff 60%, #faf5ff 100%)", fontFamily: "'Nunito', 'Segoe UI', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        input, button { font-family: inherit; }
        input:focus { outline: none; }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        .card { background: white; border-radius: 16px; box-shadow: 0 1px 12px rgba(0,0,0,0.07); }
        body { margin: 0; padding: 0; }
      `}</style>

      {/* Header fixo */}
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(248,250,252,0.95)", backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        padding: "12px 16px 10px",
      }}>
        <div style={{ maxWidth: 520, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 10, color: "#6366f1", fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase" }}>🥗 Ferramenta Nutricional</div>
            <h1 style={{ fontSize: 20, fontWeight: 900, margin: 0, letterSpacing: -0.5, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Trocas Inteligentes</h1>
          </div>
          <div style={{ fontSize: 11, color: "#94a3b8", textAlign: "right", lineHeight: 1.5 }}>
            <div>Base TACO</div>
            <div>+ TBCA</div>
          </div>
        </div>
      </div>

      {/* Conteúdo com scroll */}
      <div style={{ maxWidth: 520, margin: "0 auto", padding: "16px 14px 100px" }}>
        {aba === "trocas" && <AbaTrocas />}
        {aba === "inversa" && <AbaPorcaoInversa />}
      </div>

      {/* Nav inferior fixo — estilo app mobile */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(255,255,255,0.97)", backdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(0,0,0,0.08)",
        padding: "8px 24px 20px",
        display: "flex", justifyContent: "center", gap: 8,
      }}>
        <div style={{ display: "flex", gap: 6, width: "100%", maxWidth: 520 }}>
          {[
            { key: "trocas", icon: "🔄", label: "Trocas" },
            { key: "inversa", icon: "🔁", label: "Porção" },
          ].map(a => (
            <button key={a.key} onClick={() => setAba(a.key)} style={{
              flex: 1, padding: "10px 8px 8px", borderRadius: 14, border: "none",
              background: aba === a.key ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#f1f5f9",
              color: aba === a.key ? "white" : "#94a3b8",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              cursor: "pointer", transition: "all 0.15s ease",
              boxShadow: aba === a.key ? "0 4px 12px rgba(99,102,241,0.3)" : "none",
            }}>
              <span style={{ fontSize: 22 }}>{a.icon}</span>
              <span style={{ fontSize: 12, fontWeight: aba === a.key ? 800 : 600 }}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
