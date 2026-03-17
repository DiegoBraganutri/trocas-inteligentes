import { useState, useMemo } from "react";

// Base de alimentos — TACO 4ª edição (UNICAMP/NEPA, 2011)
// Valores por 100g de parte comestível
const ALIMENTOS = [
  // ─── PROTEÍNA ANIMAL ──────────────────────────────────────────────────────
  { nome: "Frango, peito, sem pele, grelhado",  kcal: 159, ptn: 32.0, cho: 0,   lip: 2.5,  categoria: "Proteína animal" },
  { nome: "Frango, peito, sem pele, cozido",    kcal: 163, ptn: 31.5, cho: 0,   lip: 3.2,  categoria: "Proteína animal" },
  { nome: "Frango, peito, desfiado, cozido",    kcal: 159, ptn: 31.5, cho: 0,   lip: 3.0,  categoria: "Proteína animal" },
  { nome: "Carne bovina, patinho, grelhado",    kcal: 219, ptn: 35.9, cho: 0,   lip: 7.3,  categoria: "Proteína animal" },
  { nome: "Carne bovina, filé mignon, grelhado",kcal: 220, ptn: 32.8, cho: 0,   lip: 8.8,  categoria: "Proteína animal" },
  { nome: "Carne bovina, coxão mole, cozido",   kcal: 219, ptn: 32.4, cho: 0,   lip: 8.9,  categoria: "Proteína animal" },
  { nome: "Carne bovina, picanha, grelhada",    kcal: 238, ptn: 31.9, cho: 0,   lip: 11.3, categoria: "Proteína animal" },
  { nome: "Carne bovina, moída, cozida",        kcal: 212, ptn: 26.7, cho: 0,   lip: 10.9, categoria: "Proteína animal" },
  { nome: "Tilápia, filé, grelhado",            kcal: 128, ptn: 26.3, cho: 0,   lip: 2.5,  categoria: "Proteína animal" },
  { nome: "Salmão, filé, grelhado",             kcal: 229, ptn: 23.9, cho: 0,   lip: 14.0, categoria: "Proteína animal" },
  { nome: "Sardinha, conserva em óleo",         kcal: 285, ptn: 15.9, cho: 0,   lip: 24.0, categoria: "Proteína animal" },
  { nome: "Atum em conserva (água)",            kcal: 127, ptn: 28.0, cho: 0,   lip: 1.5,  categoria: "Proteína animal" },
  { nome: "Ovo de galinha, inteiro, cozido",    kcal: 146, ptn: 13.3, cho: 0.6, lip: 9.5,  categoria: "Proteína animal" },
  { nome: "Ovo de galinha, inteiro, frito",     kcal: 215, ptn: 13.4, cho: 0.9, lip: 17.5, categoria: "Proteína animal" },
  { nome: "Ovo de galinha, clara, cozida",      kcal: 59,  ptn: 13.4, cho: 0,   lip: 0.1,  categoria: "Proteína animal" },
  { nome: "Ovo de galinha, gema, cozida",       kcal: 353, ptn: 15.9, cho: 1.6, lip: 30.8, categoria: "Proteína animal" },
  { nome: "Whey protein (pó, 1 scoop ≈ 30g)",  kcal: 120, ptn: 24.0, cho: 3.0, lip: 1.5,  categoria: "Proteína animal" },

  // ─── LATICÍNIOS ───────────────────────────────────────────────────────────
  { nome: "Iogurte natural integral",  kcal: 51,  ptn: 4.1,  cho: 1.9, lip: 3.0,  categoria: "Laticínio" },
  { nome: "Iogurte natural desnatado", kcal: 41,  ptn: 3.8,  cho: 5.8, lip: 0.3,  categoria: "Laticínio" },
  { nome: "Leite de vaca, integral",   kcal: 61,  ptn: 3.0,  cho: 4.9, lip: 3.3,  categoria: "Laticínio" },
  { nome: "Leite de vaca, desnatado",  kcal: 35,  ptn: 3.5,  cho: 5.0, lip: 0.2,  categoria: "Laticínio" },
  { nome: "Queijo prato",              kcal: 360, ptn: 22.7, cho: 1.9, lip: 29.1, categoria: "Laticínio" },
  { nome: "Queijo muçarela",           kcal: 320, ptn: 22.0, cho: 3.0, lip: 25.0, categoria: "Laticínio" },
  { nome: "Queijo ricota",             kcal: 140, ptn: 12.6, cho: 3.8, lip: 8.1,  categoria: "Laticínio" },
  { nome: "Queijo cottage",            kcal: 110, ptn: 12.5, cho: 3.4, lip: 4.5,  categoria: "Laticínio" },
  { nome: "Requeijão cremoso",         kcal: 257, ptn: 9.6,  cho: 2.4, lip: 23.4, categoria: "Laticínio" },

  // ─── CARBOIDRATOS ─────────────────────────────────────────────────────────
  { nome: "Arroz branco cozido",    kcal: 128, ptn: 2.5,  cho: 28.1, lip: 0.2, categoria: "Carboidrato" },
  { nome: "Arroz integral cozido",  kcal: 124, ptn: 2.6,  cho: 25.8, lip: 1.0, categoria: "Carboidrato" },
  { nome: "Macarrão cozido",        kcal: 131, ptn: 4.4,  cho: 26.7, lip: 0.8, categoria: "Carboidrato" },
  { nome: "Pão francês",            kcal: 300, ptn: 8.0,  cho: 58.0, lip: 3.0, categoria: "Carboidrato" },
  { nome: "Cuscuz de milho cozido", kcal: 78,  ptn: 1.8,  cho: 16.7, lip: 0.5, categoria: "Carboidrato" },
  { nome: "Mandioca cozida",        kcal: 125, ptn: 0.6,  cho: 30.0, lip: 0.3, categoria: "Carboidrato" },
  { nome: "Batata doce cozida",     kcal: 77,  ptn: 1.4,  cho: 18.0, lip: 0.1, categoria: "Carboidrato" },
  { nome: "Batata inglesa cozida",  kcal: 56,  ptn: 1.5,  cho: 12.6, lip: 0.1, categoria: "Carboidrato" },
  { nome: "Aveia em flocos",        kcal: 394, ptn: 13.9, cho: 66.6, lip: 8.5, categoria: "Carboidrato" },
  { nome: "Tapioca (goma)",         kcal: 338, ptn: 0.2,  cho: 83.9, lip: 0.2, categoria: "Carboidrato" },

  // ─── LEGUMINOSAS ──────────────────────────────────────────────────────────
  { nome: "Feijão preto cozido",   kcal: 77, ptn: 4.5, cho: 14.0, lip: 0.5, categoria: "Leguminosa" },
  { nome: "Feijão carioca cozido", kcal: 76, ptn: 4.8, cho: 13.6, lip: 0.5, categoria: "Leguminosa" },

  // ─── GORDURAS SAUDÁVEIS ───────────────────────────────────────────────────
  { nome: "Abacate",                   kcal: 96,  ptn: 1.2,  cho: 6.0,  lip: 8.4,   categoria: "Gordura saudável" },
  { nome: "Azeite de oliva",           kcal: 884, ptn: 0,    cho: 0,    lip: 100.0,  categoria: "Gordura saudável" },
  { nome: "Amendoim torrado",          kcal: 567, ptn: 25.8, cho: 16.1, lip: 49.2,  categoria: "Gordura saudável" },
  { nome: "Castanha de caju torrada",  kcal: 570, ptn: 15.3, cho: 29.3, lip: 46.4,  categoria: "Gordura saudável" },
  { nome: "Pasta de amendoim integral",kcal: 589, ptn: 25.0, cho: 20.0, lip: 50.0,  categoria: "Gordura saudável" },

  // ─── FRUTAS ───────────────────────────────────────────────────────────────
  { nome: "Abacaxi",         kcal: 48,  ptn: 0.9, cho: 12.3, lip: 0.1, categoria: "Fruta" },
  { nome: "Banana nanica",   kcal: 92,  ptn: 1.4, cho: 23.8, lip: 0.1, categoria: "Fruta" },
  { nome: "Banana prata",    kcal: 98,  ptn: 1.3, cho: 26.0, lip: 0.1, categoria: "Fruta" },
  { nome: "Banana ouro",     kcal: 112, ptn: 1.5, cho: 29.3, lip: 0.2, categoria: "Fruta" },
  { nome: "Banana maçã",     kcal: 87,  ptn: 1.8, cho: 22.3, lip: 0.1, categoria: "Fruta" },
  { nome: "Banana da terra", kcal: 128, ptn: 1.4, cho: 33.7, lip: 0.2, categoria: "Fruta" },
  { nome: "Goiaba branca",   kcal: 52,  ptn: 0.9, cho: 12.4, lip: 0.5, categoria: "Fruta" },
  { nome: "Goiaba vermelha", kcal: 54,  ptn: 1.1, cho: 13.0, lip: 0.4, categoria: "Fruta" },
  { nome: "Laranja baía",    kcal: 45,  ptn: 1.0, cho: 11.5, lip: 0.1, categoria: "Fruta" },
  { nome: "Laranja pera",    kcal: 37,  ptn: 0.9, cho: 8.9,  lip: 0.1, categoria: "Fruta" },
  { nome: "Maçã fuji",       kcal: 56,  ptn: 0.3, cho: 15.2, lip: 0.0, categoria: "Fruta" },
  { nome: "Mamão Formosa",   kcal: 45,  ptn: 0.8, cho: 11.6, lip: 0.1, categoria: "Fruta" },
  { nome: "Mamão Papaia",    kcal: 40,  ptn: 0.5, cho: 10.4, lip: 0.1, categoria: "Fruta" },
  { nome: "Manga",           kcal: 57,  ptn: 0.7, cho: 14.7, lip: 0.3, categoria: "Fruta" },
  { nome: "Melancia",        kcal: 33,  ptn: 0.9, cho: 8.1,  lip: 0.0, categoria: "Fruta" },
  { nome: "Melão",           kcal: 29,  ptn: 0.7, cho: 7.5,  lip: 0.0, categoria: "Fruta" },
  { nome: "Morango",         kcal: 30,  ptn: 0.9, cho: 6.8,  lip: 0.3, categoria: "Fruta" },
  { nome: "Tangerina",       kcal: 37,  ptn: 0.7, cho: 9.3,  lip: 0.1, categoria: "Fruta" },
  { nome: "Uva Itália",      kcal: 53,  ptn: 0.7, cho: 13.6, lip: 0.2, categoria: "Fruta" },
  { nome: "Uva Rubi",        kcal: 49,  ptn: 0.6, cho: 12.7, lip: 0.2, categoria: "Fruta" },
];

// Porções típicas sugeridas automaticamente ao selecionar o alimento (em gramas)
const PORCOES_TIPICAS = {
  // Proteínas — porção de refeição padrão
  "Frango, peito, sem pele, grelhado":   100,
  "Frango, peito, sem pele, cozido":     100,
  "Frango, peito, desfiado, cozido":     100,
  "Carne bovina, patinho, grelhado":     100,
  "Carne bovina, filé mignon, grelhado": 100,
  "Carne bovina, coxão mole, cozido":    100,
  "Carne bovina, picanha, grelhada":     100,
  "Carne bovina, moída, cozida":         100,
  "Tilápia, filé, grelhado":             100,
  "Salmão, filé, grelhado":              100,
  "Sardinha, conserva em óleo":           80,
  "Atum em conserva (água)":              80,
  "Ovo de galinha, inteiro, cozido":     100, // ≈2 ovos
  "Ovo de galinha, inteiro, frito":      100, // ≈2 ovos
  "Ovo de galinha, clara, cozida":        60, // ≈2 claras
  "Ovo de galinha, gema, cozida":         40, // ≈2 gemas
  "Whey protein (pó, 1 scoop ≈ 30g)":    30,
  // Laticínios
  "Iogurte natural integral":            170,
  "Iogurte natural desnatado":           170,
  "Leite de vaca, integral":             200,
  "Leite de vaca, desnatado":            200,
  "Queijo prato":                         40, // ≈2 fatias
  "Queijo muçarela":                      40, // ≈2 fatias
  "Queijo ricota":                        50,
  "Queijo cottage":                       80,
  "Requeijão cremoso":                    30,
  // Carboidratos — porção de refeição
  "Arroz branco cozido":                 150,
  "Arroz integral cozido":               150,
  "Macarrão cozido":                     150,
  "Pão francês":                          50, // 1 pão
  "Cuscuz de milho cozido":              150,
  "Mandioca cozida":                     100,
  "Batata doce cozida":                  100,
  "Batata inglesa cozida":               100,
  "Aveia em flocos":                      40,
  "Tapioca (goma)":                       50,
  // Leguminosas
  "Feijão preto cozido":                 150,
  "Feijão carioca cozido":               150,
  // Gorduras
  "Abacate":                             100,
  "Azeite de oliva":                      10,
  "Amendoim torrado":                     30,
  "Castanha de caju torrada":             30,
  "Pasta de amendoim integral":           30,
  // Frutas — porção padrão
  "Abacaxi":        80,
  "Banana nanica":  90,
  "Banana prata":  100,
  "Banana ouro":    60,
  "Banana maçã":    80,
  "Banana da terra":200,
  "Goiaba branca":  150,
  "Goiaba vermelha":150,
  "Laranja baía":   180,
  "Laranja pera":   180,
  "Maçã fuji":      150,
  "Mamão Formosa":  200,
  "Mamão Papaia":   200,
  "Manga":          150,
  "Melancia":       200,
  "Melão":          150,
  "Morango":        100,
  "Tangerina":      120,
  "Uva Itália":     100,
  "Uva Rubi":       100,
};

const CATEGORIAS = ["Todas", ...Array.from(new Set(ALIMENTOS.map(a => a.categoria)))];
const CAT_ICONS = {
  "Proteína animal": "🍗", "Laticínio": "🧀", "Carboidrato": "🍚",
  "Leguminosa": "🫘", "Gordura saudável": "🥑", "Fruta": "🍎", "Todas": "✨"
};
const TOLERANCIAS = { calorico: { kcal: 0.10, ptn: 0.30 }, proteico: { kcal: 0.30, ptn: 0.10 } };

// Medidas caseiras — ordem importa: mais específico primeiro
// ref: gramas por unidade usada como referência
const UNIDADES = [
  // ── Ovos (TACO: ovo médio = 50g) ─────────────────────────────────────────
  { match: /ovo.*inteiro.*cozido/i,  ref: 50,  unidade: "ovo",   plural: "ovos",   ref_label: "50g/ovo"   },
  { match: /ovo.*inteiro.*frito/i,   ref: 50,  unidade: "ovo",   plural: "ovos",   ref_label: "50g/ovo"   },
  { match: /ovo.*inteiro/i,          ref: 50,  unidade: "ovo",   plural: "ovos",   ref_label: "50g/ovo"   },
  { match: /ovo.*clara/i,            ref: 30,  unidade: "clara", plural: "claras", ref_label: "30g/clara" },
  { match: /ovo.*gema/i,             ref: 20,  unidade: "gema",  plural: "gemas",  ref_label: "20g/gema"  },

  // ── Pão (50g = 1 pão francês médio) ──────────────────────────────────────
  { match: /pão francês/i,        ref: 50,  unidade: "pão",          plural: "pães",          ref_label: "50g/unid."  },

  // ── Queijos fatiados (20g/fatia) — mais específico antes do genérico ─────
  { match: /queijo.*prato/i,      ref: 20,  unidade: "fatia",        plural: "fatias",        ref_label: "20g/fatia"  },
  { match: /queijo.*muçarela/i,   ref: 20,  unidade: "fatia",        plural: "fatias",        ref_label: "20g/fatia"  },
  { match: /queijo.*meia cura/i,  ref: 20,  unidade: "fatia",        plural: "fatias",        ref_label: "20g/fatia"  },
  // queijo ricota, cottage e requeijão ficam em gramas (não se fatiam)

  // ── Bananas — cada variedade tem peso diferente ───────────────────────────
  { match: /banana.*da terra/i,   ref: 200, unidade: "banana",       plural: "bananas",       ref_label: "200g/unid." },
  { match: /banana.*nanica/i,     ref: 90,  unidade: "banana",       plural: "bananas",       ref_label: "90g/unid."  },
  { match: /banana.*prata/i,      ref: 100, unidade: "banana",       plural: "bananas",       ref_label: "100g/unid." },
  { match: /banana.*maçã/i,       ref: 80,  unidade: "banana",       plural: "bananas",       ref_label: "80g/unid."  },
  { match: /banana.*ouro/i,       ref: 60,  unidade: "banana",       plural: "bananas",       ref_label: "60g/unid."  },

  // ── Frutas inteiras (150g padrão médio) ───────────────────────────────────
  { match: /maçã/i,               ref: 150, unidade: "maçã",         plural: "maçãs",         ref_label: "150g/unid." },
  { match: /pêra/i,               ref: 150, unidade: "pêra",         plural: "pêras",         ref_label: "150g/unid." },
  { match: /pêssego/i,            ref: 150, unidade: "pêssego",      plural: "pêssegos",      ref_label: "150g/unid." },
  { match: /kiwi/i,               ref: 100, unidade: "kiwi",         plural: "kiwis",         ref_label: "100g/unid." },
  { match: /laranja/i,            ref: 180, unidade: "laranja",      plural: "laranjas",      ref_label: "180g/unid." },
  { match: /mexerica|tangerina/i, ref: 120, unidade: "mexerica",     plural: "mexericas",     ref_label: "120g/unid." },
  { match: /manga/i,              ref: 300, unidade: "manga",        plural: "mangas",        ref_label: "300g/unid." },
  { match: /mamão.*papaia/i,      ref: 200, unidade: "mamão",        plural: "mamões",        ref_label: "200g/unid." },
  { match: /mamão.*formosa/i,     ref: 400, unidade: "fatia",        plural: "fatias",        ref_label: "400g/fatia" },
  { match: /goiaba/i,             ref: 150, unidade: "goiaba",       plural: "goiabas",       ref_label: "150g/unid." },
  { match: /graviola/i,           ref: 300, unidade: "fatia",        plural: "fatias",        ref_label: "300g/fatia" },
  { match: /jaca/i,               ref: 100, unidade: "bago",         plural: "bagos",         ref_label: "100g/bago"  },
  { match: /morango/i,            ref: 15,  unidade: "morango",      plural: "morangos",      ref_label: "15g/unid."  },
  { match: /uva/i,                ref: 8,   unidade: "uva",          plural: "uvas",          ref_label: "8g/unid."   },
  { match: /jabuticaba/i,         ref: 5,   unidade: "jabuticaba",   plural: "jabuticabas",   ref_label: "5g/unid."   },
  { match: /abacaxi/i,            ref: 80,  unidade: "fatia",        plural: "fatias",        ref_label: "80g/fatia"  },
  { match: /melancia/i,           ref: 200, unidade: "fatia",        plural: "fatias",        ref_label: "200g/fatia" },
  { match: /melão/i,              ref: 150, unidade: "fatia",        plural: "fatias",        ref_label: "150g/fatia" },
  { match: /maracujá/i,           ref: 80,  unidade: "maracujá",     plural: "maracujás",     ref_label: "80g/unid."  },
  { match: /acerola/i,            ref: 5,   unidade: "acerola",      plural: "acerolas",      ref_label: "5g/unid."   },
  { match: /atemóia/i,            ref: 200, unidade: "atemóia",      plural: "atemóias",      ref_label: "200g/unid." },
  { match: /cupuaçu/i,            ref: 150, unidade: "porção",       plural: "porções",       ref_label: "150g/porc." },
];

function getUnidade(alimento) {
  return UNIDADES.find(u => u.match.test(alimento.nome)) || null;
}

// Converte gramas → medida caseira quando aplicável.
// Retorna { display, label, detalhe, gReais, ref_label } ou null.
function formatarPorcao(alimento, gramas) {
  const u = getUnidade(alimento);
  if (!u) return null;
  const qtd    = gramas / u.ref;
  const inteiro = Math.round(qtd);
  if (inteiro <= 0) return null;
  const label  = inteiro === 1 ? u.unidade : u.plural;
  const gReais = Math.round(inteiro * u.ref);
  return {
    display:   String(inteiro),
    label,
    detalhe:   `(≈${gReais}g)`,
    ref_label: u.ref_label,
    gReais,
  };
}

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

// ─── COMPONENTES COMPARTILHADOS ───────────────────────────────────────────────

function Dica({ texto }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 7, marginTop: 8,
      background: "#f0f9ff", borderRadius: 8, padding: "8px 10px", border: "1px solid #bae6fd" }}>
      <span style={{ fontSize: 13, flexShrink: 0, marginTop: 1 }}>💡</span>
      <span style={{ fontSize: 12, color: "#0369a1", lineHeight: 1.5 }}>{texto}</span>
    </div>
  );
}

function StepHeader({ num, titulo, concluido, ativo }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
      <div style={{
        width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: concluido ? "#10b981" : ativo ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "#e5e7eb",
        color: concluido || ativo ? "white" : "#9ca3af",
        fontWeight: 900, fontSize: 13,
      }}>
        {concluido ? "✓" : num}
      </div>
      <span style={{ fontWeight: 700, fontSize: 14,
        color: concluido ? "#10b981" : ativo ? "#111827" : "#9ca3af" }}>
        {titulo}
      </span>
    </div>
  );
}

function BuscaAlimento({ value, selecionado, onChange, onSelect, onClear, placeholder = "Ex: frango, ovo, banana..." }) {
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const sugestoes = useMemo(() => {
    if (!value || value.length < 2 || selecionado) return [];
    return ALIMENTOS.filter(a => a.nome.toLowerCase().includes(value.toLowerCase())).slice(0, 7);
  }, [value, selecionado]);

  return (
    <div style={{ position: "relative" }}>
      <input value={selecionado ? selecionado.nome : value}
        onChange={e => { onChange(e.target.value); setMostrarDropdown(true); }}
        onFocus={() => setMostrarDropdown(true)}
        placeholder={placeholder}
        style={{
          width: "100%", padding: "14px 44px 14px 16px", borderRadius: 12, fontSize: 16,
          border: "2px solid " + (selecionado ? "#10b981" : "#e5e7eb"),
          background: selecionado ? "#f0fdf4" : "white",
          color: "#111827", WebkitAppearance: "none",
        }} />
      {(value || selecionado) && (
        <button onClick={onClear}
          style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
            background: "none", border: "none", fontSize: 18, color: "#94a3b8", cursor: "pointer", padding: 4 }}>✕</button>
      )}
      {mostrarDropdown && sugestoes.length > 0 && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "white",
          borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.15)", zIndex: 200,
          marginTop: 4, overflow: "hidden", maxHeight: 280, overflowY: "auto" }}>
          {sugestoes.map(a => (
            <div key={a.nome}
              onPointerDown={() => { onSelect(a); setMostrarDropdown(false); }}
              style={{ padding: "13px 16px", cursor: "pointer", fontSize: 14,
                borderBottom: "1px solid #f3f4f6", display: "flex",
                justifyContent: "space-between", alignItems: "center" }}
              onMouseEnter={e => e.currentTarget.style.background = "#f5f3ff"}
              onMouseLeave={e => e.currentTarget.style.background = "white"}>
              <div>
                <div style={{ fontWeight: 600, color: "#111827" }}>{a.nome}</div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 1 }}>
                  {a.kcal} kcal · {a.ptn}g ptn · {a.cho}g carb · {a.lip}g gord
                </div>
              </div>
              <span style={{ fontSize: 16, marginLeft: 8, flexShrink: 0 }}>{CAT_ICONS[a.categoria]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ModalAjuda({ titulo, conteudo, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 500,
      background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}
      onClick={onClose}>
      <div style={{ background: "white", borderRadius: "20px 20px 0 0",
        padding: "24px 20px 36px", width: "100%", maxWidth: 520 }}
        onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontWeight: 800, fontSize: 16, color: "#111827" }}>{titulo}</span>
          <button onClick={onClose}
            style={{ background: "#f1f5f9", border: "none", borderRadius: 20,
              padding: "6px 12px", fontWeight: 700, color: "#6b7280", cursor: "pointer", fontSize: 13 }}>
            Fechar
          </button>
        </div>
        <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.7 }}>{conteudo}</div>
      </div>
    </div>
  );
}

// ─── ABA TROCAS ───────────────────────────────────────────────────────────────
function AbaTrocas({ historico, onUsar }) {
  const [busca, setBusca] = useState("");
  const [selecionado, setSelecionado] = useState(null);
  const [gramas, setGramas] = useState(100);
  const [objetivo, setObjetivo] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState("Todas");
  const [calculado, setCalculado] = useState(false);
  const [ajuda, setAjuda] = useState(false);

  const passo1ok = objetivo !== null;
  const passo2ok = selecionado !== null;
  const passo3ok = gramas > 0;

  function selecionarAlimento(a) {
    setSelecionado(a);
    setBusca("");
    setCalculado(false);
    setGramas(PORCOES_TIPICAS[a.nome] ?? 100);
    onUsar(a);
  }

  const trocas = useMemo(() => {
    if (!selecionado || !calculado || !objetivo) return [];
    return ALIMENTOS
      .filter(a => a.nome !== selecionado.nome && (filtroCategoria === "Todas" || a.categoria === filtroCategoria))
      .map(a => { const r = getSimilaridade(selecionado, a, objetivo, gramas); return r ? { alimento: a, ...r } : null; })
      .filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 8);
  }, [selecionado, gramas, objetivo, calculado, filtroCategoria]);

  const mO = selecionado ? macros(selecionado, gramas) : null;

  function resetar() {
    setBusca(""); setSelecionado(null); setGramas(100);
    setObjetivo(null); setCalculado(false); setFiltroCategoria("Todas");
  }

  return (
    <div style={{ paddingBottom: 8 }}>

      {/* Cabeçalho da aba */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <p style={{ margin: 0, fontSize: 13, color: "#6b7280", lineHeight: 1.5 }}>
          Substitua um alimento mantendo<br/>as mesmas <b>calorias</b> ou <b>proteínas</b>.
        </p>
        <button onClick={() => setAjuda(true)}
          style={{ background: "#eef2ff", border: "1.5px solid #c7d2fe", borderRadius: 20,
            padding: "6px 12px", fontWeight: 700, color: "#4f46e5",
            fontSize: 13, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>
          ? Ajuda
        </button>
      </div>

      {/* PASSO 1 — Objetivo */}
      <div className="card" style={{ padding: 16, marginBottom: 10 }}>
        <StepHeader num="1" titulo="Qual o objetivo da troca?" concluido={passo1ok} ativo={!passo1ok} />
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { key: "calorico", emoji: "⚡", label: "Calórico", sub: "Trocar pela mesma quantidade de calorias" },
            { key: "proteico", emoji: "💪", label: "Proteico",  sub: "Trocar pela mesma quantidade de proteína" },
          ].map(op => (
            <button key={op.key}
              onClick={() => { setObjetivo(op.key); setCalculado(false); }}
              style={{
                flex: 1, padding: "12px 10px", borderRadius: 12, textAlign: "left", cursor: "pointer",
                border: objetivo === op.key ? "2px solid #6366f1" : "2px solid #e5e7eb",
                background: objetivo === op.key ? "#eef2ff" : "white",
                color: objetivo === op.key ? "#4f46e5" : "#6b7280",
                fontWeight: 700, fontSize: 14,
              }}>
              <div>{op.emoji} {op.label}</div>
              <div style={{ fontWeight: 400, fontSize: 11, marginTop: 3, opacity: 0.7, lineHeight: 1.4 }}>{op.sub}</div>
            </button>
          ))}
        </div>
        {!passo1ok && <Dica texto="Escolha 'Calórico' se quer manter as calorias da refeição, ou 'Proteico' se o foco é manter a proteína." />}
      </div>

      {/* PASSO 2 — Alimento + Gramas (só aparece após passo 1) */}
      {passo1ok && (
        <div className="card" style={{ padding: 16, marginBottom: 10 }}>
          <StepHeader num="2" titulo="Qual alimento você quer substituir?" concluido={passo2ok} ativo={!passo2ok} />
          <BuscaAlimento
            value={busca} selecionado={selecionado}
            onChange={v => { setBusca(v); setSelecionado(null); setCalculado(false); }}
            onSelect={selecionarAlimento}
            onClear={() => { setSelecionado(null); setBusca(""); setCalculado(false); }}
          />
          {/* Histórico de buscas */}
          {!selecionado && busca.length === 0 && historico.length > 0 && (
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, marginBottom: 6 }}>🕓 Buscados recentemente</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {historico.map(h => (
                  <button key={h.nome} onPointerDown={() => selecionarAlimento(h)}
                    style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                      background: "#f5f3ff", border: "1.5px solid #e0e7ff", color: "#4f46e5", cursor: "pointer" }}>
                    {h.nome.split(",")[0]}
                  </button>
                ))}
              </div>
            </div>
          )}
          {!passo2ok && <Dica texto="Digite parte do nome — ex: 'frango', 'arroz', 'banana prata'." />}

          {/* Gramas — só aparece após selecionar */}
          {passo2ok && (
            <div style={{ marginTop: 14 }}>
              <StepHeader num="3" titulo="Quantas gramas estão no seu plano?" concluido={passo3ok} ativo={true} />
              {PORCOES_TIPICAS[selecionado?.nome] && (
                <div style={{ marginBottom: 8, fontSize: 12, color: "#6366f1", fontWeight: 600 }}>
                  💡 Porção sugerida: {PORCOES_TIPICAS[selecionado.nome]}g
                  {(() => { const u = getUnidade(selecionado); if (!u) return null;
                    const q = Math.round(PORCOES_TIPICAS[selecionado.nome] / u.ref);
                    return q > 0 ? ` (≈${q} ${q === 1 ? u.unidade : u.plural})` : null; })()}
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <input type="number" inputMode="numeric" value={gramas}
                  onChange={e => { setGramas(Number(e.target.value)); setCalculado(false); }}
                  style={{ width: 90, padding: "12px 10px", borderRadius: 12,
                    border: "2px solid #e5e7eb", fontSize: 20, fontWeight: 800,
                    textAlign: "center", WebkitAppearance: "none" }} />
                <div>
                  <span style={{ fontWeight: 700, color: "#374151", fontSize: 15 }}>gramas</span>
                  {(() => {
                    const u = getUnidade(selecionado);
                    if (!u) return null;
                    const qtd = Math.round(gramas / u.ref);
                    if (qtd <= 0) return null;
                    return <div style={{ fontSize: 12, color: "#6366f1", fontWeight: 600, marginTop: 3 }}>
                      ≈ {qtd} {qtd === 1 ? u.unidade : u.plural}
                    </div>;
                  })()}
                </div>
                {mO && (
                  <div style={{ flex: 1, background: "#f8fafc", borderRadius: 10, padding: "8px 10px" }}>
                    <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600, marginBottom: 4 }}>Macros desta porção</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                      <Badge label="kcal" value={mO.kcal} unit="" color="#f59e0b" />
                      <Badge label="P" value={mO.ptn} color="#6366f1" />
                      <Badge label="C" value={mO.cho} color="#10b981" />
                      <Badge label="G" value={mO.lip} color="#f43f5e" />
                    </div>
                  </div>
                )}
              </div>
              <Dica texto="Use a quantidade exata do seu plano alimentar. Ex: se o plano diz 150g de frango, escreva 150." />
            </div>
          )}
        </div>
      )}

      {/* PASSO 4 — Filtro categoria (só após alimento+gramas) */}
      {passo2ok && passo3ok && (
        <div className="card" style={{ padding: 16, marginBottom: 10 }}>
          <StepHeader num="4" titulo="Filtrar sugestões por categoria" concluido={filtroCategoria !== "Todas"} ativo={true} />
          <div style={{ display: "flex", overflowX: "auto", gap: 8, paddingBottom: 4, WebkitOverflowScrolling: "touch" }}>
            {CATEGORIAS.map(cat => (
              <button key={cat}
                onClick={() => { setFiltroCategoria(cat); setCalculado(false); }}
                style={{
                  flexShrink: 0, padding: "8px 12px", borderRadius: 20, fontSize: 12,
                  border: filtroCategoria === cat ? "2px solid #6366f1" : "1.5px solid #e5e7eb",
                  background: filtroCategoria === cat ? "#eef2ff" : "white",
                  color: filtroCategoria === cat ? "#4f46e5" : "#6b7280",
                  fontWeight: filtroCategoria === cat ? 700 : 500, cursor: "pointer", whiteSpace: "nowrap",
                }}>{CAT_ICONS[cat]} {cat}
              </button>
            ))}
          </div>
          <Dica texto="Opcional: filtre para ver só proteínas, só frutas, etc. Por padrão mostra todas as categorias." />
        </div>
      )}

      {/* Botão calcular */}
      {passo1ok && passo2ok && passo3ok && (
        <button onClick={() => setCalculado(true)}
          style={{
            width: "100%", padding: "16px", borderRadius: 14, marginBottom: 16,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "white", border: "none", fontWeight: 800, fontSize: 16,
            boxShadow: "0 4px 16px rgba(99,102,241,0.35)", cursor: "pointer",
          }}>⚡ Ver trocas sugeridas</button>
      )}

      {/* Resultados */}
      {calculado && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <p style={{ margin: 0, fontWeight: 800, color: "#374151", fontSize: 15 }}>
              🔄 Trocas sugeridas
              <span style={{ fontWeight: 500, fontSize: 12, color: "#94a3b8", marginLeft: 8 }}>
                {filtroCategoria !== "Todas" ? filtroCategoria : "todas as categorias"}
              </span>
            </p>
            <button onClick={resetar}
              style={{ background: "none", border: "1.5px solid #e5e7eb", borderRadius: 20,
                padding: "5px 12px", fontSize: 12, color: "#6b7280",
                fontWeight: 600, cursor: "pointer" }}>
              Recomeçar
            </button>
          </div>
          {trocas.length === 0
            ? <div className="card" style={{ padding: 24, textAlign: "center", color: "#94a3b8", fontSize: 15 }}>
                Nenhuma troca encontrada.<br/>
                <span style={{ fontSize: 13 }}>Tente mudar a categoria ou o objetivo.</span>
              </div>
            : <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {trocas.map(({ alimento, gramasDestino, score, macrosDestino }) => {
                const unidade = formatarPorcao(alimento, gramasDestino);
                return (
                  <div key={alimento.nome} className="card" style={{ padding: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                      <div style={{ flex: 1, paddingRight: 10 }}>
                        <div style={{ fontWeight: 700, color: "#111827", fontSize: 14, lineHeight: 1.3 }}>{alimento.nome}</div>
                        <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 3 }}>{CAT_ICONS[alimento.categoria]} {alimento.categoria}</div>
                      </div>
                      {unidade ? (
                        <div style={{ textAlign: "center", background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                          color: "white", borderRadius: 10, padding: "6px 14px", flexShrink: 0 }}>
                          <div style={{ fontWeight: 900, fontSize: 18, lineHeight: 1 }}>{unidade.display} {unidade.label}</div>
                          <div style={{ fontSize: 10, opacity: 0.8, marginTop: 2 }}>{unidade.detalhe}</div>
                        </div>
                      ) : (
                        <div style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white",
                          borderRadius: 10, padding: "6px 14px", fontWeight: 900, fontSize: 18,
                          whiteSpace: "nowrap", flexShrink: 0 }}>{gramasDestino}g</div>
                      )}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 8 }}>
                      <Badge label="kcal" value={macrosDestino.kcal} unit="" color="#f59e0b" />
                      <Badge label="P" value={macrosDestino.ptn} color="#6366f1" />
                      <Badge label="C" value={macrosDestino.cho} color="#10b981" />
                      <Badge label="G" value={macrosDestino.lip} color="#f43f5e" />
                    </div>
                    <div style={{ height: 5, borderRadius: 5, background: "#f1f5f9" }}>
                      <div style={{ height: "100%", width: `${Math.min(score * 100, 100)}%`,
                        background: "linear-gradient(90deg,#6366f1,#8b5cf6)", borderRadius: 5 }} />
                    </div>
                    <span style={{ fontSize: 11, color: "#94a3b8", marginTop: 4, display: "block" }}>
                      Similaridade: {Math.round(score * 100)}%
                    </span>
                  </div>
                );
              })}
            </div>
          }
        </div>
      )}

      {ajuda && (
        <ModalAjuda
          titulo="🔄 Como usar Trocas"
          conteudo={
            <div>
              <p style={{ margin: "0 0 10px" }}><b>1. Objetivo:</b> escolha se quer manter as <b>calorias</b> (Ex: trocar arroz por batata doce com a mesma energia) ou a <b>proteína</b> (Ex: trocar frango por atum com a mesma quantidade de proteína).</p>
              <p style={{ margin: "0 0 10px" }}><b>2. Alimento:</b> digite o alimento que quer substituir e selecione na lista.</p>
              <p style={{ margin: "0 0 10px" }}><b>3. Gramas:</b> informe a quantidade que está no seu plano alimentar.</p>
              <p style={{ margin: "0 0 10px" }}><b>4. Filtro:</b> opcional — filtre por categoria para ver só proteínas, só frutas, etc.</p>
              <p style={{ margin: 0 }}>Os resultados mostram a <b>quantidade exata</b> do alimento substituto e todos os macros da porção.</p>
            </div>
          }
          onClose={() => setAjuda(false)}
        />
      )}
    </div>
  );
}

// ─── ABA PORÇÃO INVERSA ───────────────────────────────────────────────────────
function AbaPorcaoInversa({ historico, onUsar }) {
  const [busca, setBusca] = useState("");
  const [selecionado, setSelecionado] = useState(null);
  const [nutriente, setNutriente] = useState(null);
  const [quantidade, setQuantidade] = useState("");
  const [resultado, setResultado] = useState(null);
  const [ajuda, setAjuda] = useState(false);

  const passo1ok = selecionado !== null;
  const passo2ok = nutriente !== null;
  const passo3ok = quantidade > 0;

  function selecionarAlimento(a) {
    setSelecionado(a);
    setBusca("");
    setResultado(null);
    onUsar(a);
  }

  const NUTRIENTES = [
    { key: "ptn",  label: "Proteína",    unit: "g",    color: "#6366f1", emoji: "💪", ex: "Ex: 30g de proteína" },
    { key: "kcal", label: "Calorias",    unit: "kcal", color: "#f59e0b", emoji: "⚡", ex: "Ex: 200 kcal" },
    { key: "cho",  label: "Carboidrato", unit: "g",    color: "#10b981", emoji: "🍚", ex: "Ex: 50g de carbo" },
    { key: "lip",  label: "Gordura",     unit: "g",    color: "#f43f5e", emoji: "🫒", ex: "Ex: 15g de gordura" },
  ];
  const nutAtual = NUTRIENTES.find(n => n.key === nutriente);

  function calcular() {
    if (!selecionado || !nutriente || !quantidade) return;
    const valorPor100g = selecionado[nutriente];
    if (!valorPor100g || valorPor100g === 0) {
      setResultado({ erro: `"${selecionado.nome}" não possui este nutriente em quantidade significativa.` });
      return;
    }
    const gramas = (quantidade / valorPor100g) * 100;
    const unidade = formatarPorcao(selecionado, gramas);
    setResultado({ gramas: Math.round(gramas), macros: macros(selecionado, gramas), unidade });
  }

  function resetar() {
    setBusca(""); setSelecionado(null); setNutriente(null);
    setQuantidade(""); setResultado(null);
  }

  return (
    <div style={{ paddingBottom: 8 }}>

      {/* Cabeçalho */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <p style={{ margin: 0, fontSize: 13, color: "#6b7280", lineHeight: 1.5 }}>
          Descubra <b>quantas gramas</b> você precisa<br/>para bater uma meta de nutriente.
        </p>
        <button onClick={() => setAjuda(true)}
          style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: 20,
            padding: "6px 12px", fontWeight: 700, color: "#059669",
            fontSize: 13, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>
          ? Ajuda
        </button>
      </div>

      {/* PASSO 1 — Alimento */}
      <div className="card" style={{ padding: 16, marginBottom: 10 }}>
        <StepHeader num="1" titulo="Qual alimento você vai comer?" concluido={passo1ok} ativo={!passo1ok} />
        <BuscaAlimento
          value={busca} selecionado={selecionado}
          onChange={v => { setBusca(v); setSelecionado(null); setResultado(null); }}
          onSelect={selecionarAlimento}
          onClear={() => { setSelecionado(null); setBusca(""); setResultado(null); }}
        />
        {/* Histórico */}
        {!selecionado && busca.length === 0 && historico.length > 0 && (
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, marginBottom: 6 }}>🕓 Buscados recentemente</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {historico.map(h => (
                <button key={h.nome} onPointerDown={() => selecionarAlimento(h)}
                  style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                    background: "#f0fdf4", border: "1.5px solid #bbf7d0", color: "#059669", cursor: "pointer" }}>
                  {h.nome.split(",")[0]}
                </button>
              ))}
            </div>
          </div>
        )}
        {!passo1ok && <Dica texto="Ex: 'ovo cozido', 'frango grelhado', 'banana prata'. Escolha o alimento que vai consumir." />}
      </div>

      {/* PASSO 2 — Nutriente (só após passo 1) */}
      {passo1ok && (
        <div className="card" style={{ padding: 16, marginBottom: 10 }}>
          <StepHeader num="2" titulo="Qual nutriente quer controlar?" concluido={passo2ok} ativo={!passo2ok} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {NUTRIENTES.map(n => (
              <button key={n.key}
                onClick={() => { setNutriente(n.key); setResultado(null); }}
                style={{
                  padding: "12px 10px", borderRadius: 12, textAlign: "left", cursor: "pointer",
                  border: nutriente === n.key ? `2px solid ${n.color}` : "2px solid #e5e7eb",
                  background: nutriente === n.key ? n.color + "12" : "white",
                  color: nutriente === n.key ? n.color : "#6b7280",
                  fontWeight: 700, fontSize: 13,
                }}>
                <div>{n.emoji} {n.label}</div>
                <div style={{ fontWeight: 400, fontSize: 10, marginTop: 2, opacity: 0.7 }}>{n.ex}</div>
              </button>
            ))}
          </div>
          {!passo2ok && <Dica texto="Escolha o nutriente que você quer atingir. O mais comum é Proteína." />}
        </div>
      )}

      {/* PASSO 3 — Quantidade (só após passo 2) */}
      {passo1ok && passo2ok && (
        <div className="card" style={{ padding: 16, marginBottom: 10 }}>
          <StepHeader num="3" titulo={`Quantos ${nutAtual?.unit} de ${nutAtual?.label.toLowerCase()} você quer?`} concluido={passo3ok} ativo={!passo3ok} />
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <input type="number" inputMode="numeric" value={quantidade}
              onChange={e => { setQuantidade(Number(e.target.value)); setResultado(null); }}
              placeholder="0"
              style={{ width: 110, padding: "14px", borderRadius: 12, border: "2px solid #e5e7eb",
                fontSize: 24, fontWeight: 800, textAlign: "center", WebkitAppearance: "none", color: "#111827" }} />
            <span style={{ fontWeight: 700, color: "#374151", fontSize: 15 }}>
              {nutAtual?.unit} de {nutAtual?.label.toLowerCase()}
            </span>
          </div>
          {!passo3ok && <Dica texto={`Digite a meta. ${nutAtual?.ex || ""}`} />}
        </div>
      )}

      {/* Botão calcular */}
      {passo1ok && passo2ok && passo3ok && (
        <button onClick={calcular}
          style={{
            width: "100%", padding: "16px", borderRadius: 14, marginBottom: 16,
            background: "linear-gradient(135deg, #059669, #10b981)",
            color: "white", border: "none", fontWeight: 800, fontSize: 16,
            boxShadow: "0 4px 16px rgba(16,185,129,0.35)", cursor: "pointer",
          }}>🔁 Calcular porção</button>
      )}

      {/* Resultado */}
      {resultado && (
        resultado.erro
          ? <div className="card" style={{ padding: 16, background: "#fef2f2",
              border: "1px solid #fecaca", color: "#dc2626", fontSize: 14 }}>{resultado.erro}</div>
          : <div className="card" style={{ padding: 24 }}>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <p style={{ margin: "0 0 4px", fontSize: 14, color: "#6b7280" }}>
                  Para <strong style={{ color: nutAtual?.color }}>{quantidade}{nutAtual?.unit}</strong> de {nutAtual?.label.toLowerCase()}
                </p>
                <p style={{ margin: "0 0 16px", fontWeight: 800, color: "#111827", fontSize: 15 }}>{selecionado?.nome}</p>
                {resultado.unidade ? (
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ display: "inline-flex", alignItems: "baseline", gap: 8,
                      background: "linear-gradient(135deg,#ecfdf5,#f0fdf4)",
                      borderRadius: 20, padding: "16px 32px", marginBottom: 6,
                      border: "1.5px solid #bbf7d0" }}>
                      <span style={{ fontSize: 52, fontWeight: 900, color: "#059669", lineHeight: 1 }}>
                        {resultado.unidade.display}
                      </span>
                      <span style={{ fontSize: 20, fontWeight: 700, color: "#059669" }}>{resultado.unidade.label}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#94a3b8" }}>
                      {resultado.unidade.detalhe} · {resultado.unidade.ref_label}
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "inline-flex", alignItems: "baseline", gap: 6,
                    background: "linear-gradient(135deg,#ecfdf5,#f0fdf4)",
                    borderRadius: 20, padding: "16px 32px", marginBottom: 16,
                    border: "1.5px solid #bbf7d0" }}>
                    <span style={{ fontSize: 52, fontWeight: 900, color: "#059669", lineHeight: 1 }}>{resultado.gramas}</span>
                    <span style={{ fontSize: 20, fontWeight: 700, color: "#059669" }}>g</span>
                  </div>
                )}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 16 }}>
                <Badge label="kcal" value={resultado.macros.kcal} unit="" color="#f59e0b" />
                <Badge label="Proteína" value={resultado.macros.ptn} color="#6366f1" />
                <Badge label="Carb" value={resultado.macros.cho} color="#10b981" />
                <Badge label="Gordura" value={resultado.macros.lip} color="#f43f5e" />
              </div>
              <button onClick={resetar}
                style={{ width: "100%", padding: "12px", borderRadius: 12,
                  background: "#f1f5f9", border: "none", fontWeight: 700,
                  color: "#6b7280", fontSize: 14, cursor: "pointer" }}>
                Calcular outro alimento
              </button>
            </div>
      )}

      {ajuda && (
        <ModalAjuda
          titulo="🔁 Como usar Porção"
          conteudo={
            <div>
              <p style={{ margin: "0 0 10px" }}><b>Quando usar:</b> quando você quer saber <b>quanto comer</b> de um alimento para bater uma meta específica.</p>
              <p style={{ margin: "0 0 10px" }}><b>1. Alimento:</b> qual você vai comer. Ex: ovo cozido, frango grelhado.</p>
              <p style={{ margin: "0 0 10px" }}><b>2. Nutriente:</b> o que quer controlar. Ex: proteína, calorias.</p>
              <p style={{ margin: "0 0 10px" }}><b>3. Meta:</b> quanto quer ingerir. Ex: 30g de proteína.</p>
              <p style={{ margin: 0 }}>O resultado mostra <b>exatamente quanto</b> você precisa comer — em gramas ou em unidades (ovos, pães, etc.).</p>
            </div>
          }
          onClose={() => setAjuda(false)}
        />
      )}
    </div>
  );
}

// ─── APP PRINCIPAL ─────────────────────────────────────────────────────────────
export default function App() {
  const [aba, setAba] = useState("trocas");
  const [historico, setHistorico] = useState([]); // últimas buscas compartilhadas

  function adicionarHistorico(alimento) {
    setHistorico(prev => {
      const sem = prev.filter(h => h.nome !== alimento.nome);
      return [alimento, ...sem].slice(0, 5);
    });
  }

  return (
    <div style={{ minHeight: "100dvh", background: "linear-gradient(160deg,#f8fafc 0%,#f0f4ff 60%,#faf5ff 100%)", fontFamily: "'Nunito','Segoe UI',sans-serif" }}>
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

      {/* Header */}
      <div style={{ position: "sticky", top: 0, zIndex: 100,
        background: "rgba(248,250,252,0.95)", backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(0,0,0,0.06)", padding: "12px 16px 10px" }}>
        <div style={{ maxWidth: 520, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 10, color: "#6366f1", fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase" }}>🥗 Ferramenta Nutricional</div>
            <h1 style={{ fontSize: 20, fontWeight: 900, margin: 0, letterSpacing: -0.5,
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Trocas Inteligentes
            </h1>
          </div>
          <div style={{ fontSize: 10, color: "#94a3b8", textAlign: "right", lineHeight: 1.6 }}>
            <div style={{ fontWeight: 700, color: "#6366f1" }}>TACO 4ª ed.</div>
            <div>{ALIMENTOS.length} alimentos</div>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div style={{ maxWidth: 520, margin: "0 auto", padding: "16px 14px 100px" }}>
        {aba === "trocas"  && <AbaTrocas  historico={historico} onUsar={adicionarHistorico} />}
        {aba === "inversa" && <AbaPorcaoInversa historico={historico} onUsar={adicionarHistorico} />}
      </div>

      {/* Nav inferior */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(255,255,255,0.97)", backdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(0,0,0,0.08)", padding: "8px 24px 20px",
        display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", gap: 6, width: "100%", maxWidth: 520 }}>
          {[
            { key: "trocas",  icon: "🔄", label: "Trocas",  desc: "Substituir" },
            { key: "inversa", icon: "🔁", label: "Porção",  desc: "Calcular" },
          ].map(a => (
            <button key={a.key} onClick={() => setAba(a.key)} style={{
              flex: 1, padding: "10px 8px 8px", borderRadius: 14, border: "none",
              background: aba === a.key ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "#f1f5f9",
              color: aba === a.key ? "white" : "#94a3b8",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
              cursor: "pointer", boxShadow: aba === a.key ? "0 4px 12px rgba(99,102,241,0.3)" : "none",
            }}>
              <span style={{ fontSize: 22 }}>{a.icon}</span>
              <span style={{ fontSize: 12, fontWeight: aba === a.key ? 800 : 600 }}>{a.label}</span>
              <span style={{ fontSize: 10, opacity: 0.7 }}>{a.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
