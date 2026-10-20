# Pokémon Daily Challenge — Arquitetura

## 1. Decisão principal: sem backend

O projeto roda **100% no navegador** (HTML5, CSS, JavaScript com ES Modules, sem
etapa de build). O que a especificação original atribuía ao servidor
(FastAPI + PostgreSQL) é substituído por uma **camada de serviços local** que
simula um servidor:

```
 Telas (screens/)  ──chamam──▶  Serviços (services/)  ──usam──▶  Domínio puro (domain/)
        │                              │                              │
        ▼                              ▼                              ▼
 Componentes UI (ui/)          Persistência (core/store.js)    Dados estáticos (data/)
```

Regras:

1. **As telas nunca alteram estado diretamente.** Elas só chamam funções dos
   serviços (`captureService.attempt(...)`, `battleService.act(...)`), que
   validam tudo e devolvem um resultado ou um erro. É o equivalente a uma API.
2. **O domínio é puro e testável** (sem DOM, sem `localStorage`): fórmula de
   captura, cálculo de dano, tabela de tipos, sorteio com semente. Testado com
   `node --test`.
3. **O "relógio do servidor"** (`core/clock.js`) calcula o dia de jogo em
   `America/Sao_Paulo` via `Intl`, independentemente do fuso do aparelho.

### Limitação honesta

Sem servidor, **não existe garantia real contra manipulação**: quem abrir o
DevTools pode editar o `localStorage`. As mitigações planejadas são:

| Risco                         | Mitigação no cliente                                              |
|-------------------------------|-------------------------------------------------------------------|
| Recarregar para novo sorteio  | Sorteio determinístico: semente = `hash(usuário + dia)` e persistido |
| Múltiplas abas / cliques duplos | Operações dentro de `navigator.locks` (Web Locks API) + versão do estado (compare-and-swap) + `BroadcastChannel` para sincronizar abas |
| Edição manual do save         | Checksum do estado; save adulterado é marcado e registrado na auditoria |
| Batalha alterada no navegador | Estado da batalha só muda via `battleService`; RNG com semente registrada, permitindo *replay* e verificação |
| Senhas                        | PBKDF2 (Web Crypto) com salt por conta; nunca em texto puro       |

Se no futuro houver backend, basta reimplementar `services/` como chamadas
HTTP — telas e domínio não mudam.

## 2. Estrutura de diretórios

```
pokemon-daily/
├── index.html              # shell da aplicação (header, <main>, nav inferior)
├── css/
│   ├── base.css            # tokens (cores, tipografia), reset, layout
│   ├── components.css      # botões, cartões, badges de tipo, barras de HP
│   └── screens.css         # estilos específicos de telas
├── js/
│   ├── main.js             # bootstrap: registra rotas, inicia router
│   ├── core/
│   │   ├── router.js       # roteador por hash com guardas de autenticação
│   │   ├── clock.js        # dia de jogo em America/Sao_Paulo, próximo reset
│   │   ├── session.js      # sessão atual (Etapa 1: stub em memória)
│   │   └── store.js        # (Etapa 2) persistência versionada + locks
│   ├── ui/
│   │   ├── dom.js          # h(): criação segura de elementos (sem innerHTML)
│   │   ├── icons.js        # ícones SVG próprios (bolas, coração, troféu...)
│   │   └── components.js   # cartão de Pokémon, badge de tipo, barra de HP...
│   ├── screens/            # uma tela por arquivo, cada uma exporta render()
│   ├── data/
│   │   ├── types.js        # tipos e cores
│   │   └── mock.js         # (Etapa 1) dados de exemplo; substituídos depois
│   ├── services/           # (Etapa 2+) auth, daily, capture, team, battle, elite
│   └── domain/             # (Etapa 3+) captura, batalha, tabela de tipos, RNG
├── tests/                  # testes com node --test
└── docs/                   # arquitetura e regras documentadas
```

## 3. Dados

- **Espécies, golpes e tipos** da 1ª geração serão gravados em `js/data/` como
  JSON estático (gerado a partir da PokéAPI uma vez, por script em `tools/`),
  para o jogo funcionar offline e sem depender de rate limit.
- **Sprites**: repositório oficial de sprites da PokéAPI
  (`raw.githubusercontent.com/PokeAPI/sprites`). Em falha de carregamento é
  exibido um ícone SVG de "imagem indisponível" — nunca um sprite falso.

## 4. Plano de implementação

| Etapa | Conteúdo | Critério para avançar |
|-------|----------|-----------------------|
| 1 | Estrutura, tema visual, roteador, 11 telas com dados de exemplo, relógio SP | Navegação completa em desktop e celular; testes de router/relógio passando |
| 2 | `store.js` (localStorage versionado, Web Locks, checksum), contas com PBKDF2, auditoria | Criar conta, sair, entrar e manter dados; duas abas não corrompem o save |
| 3 | Dados Gen 1, sorteio diário com semente, inventário, fórmula de captura | Sorteio estável no dia; 1 captura/ciclo; reposição de Poké Balls = 5 |
| 4 | Coleção (busca/filtro), equipe de até 6 (adicionar/remover/reordenar) | Persistência e validação da equipe |
| 5 | Motor de batalha Gen 1 (dano, STAB, tipos, crítico, status, PP) + testes | Testes unitários cobrindo fórmulas e status |
| 6 | Elite dos 4 em sequência, IA dos treinadores, equipe bloqueada, histórico | Desafio completo resistindo a recarregamento |
| 7 | Polimento visual, testes de segurança/concorrência, deploy estático (GitHub Pages) | Todos os critérios da seção 12 da especificação |
