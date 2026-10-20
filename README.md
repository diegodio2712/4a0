# Pokémon Daily Challenge

Jogo web inspirado na 1ª geração de Pokémon: captura diária limitada, coleção,
montagem de equipe e batalhas por turnos contra a Elite dos 4.

Feito em **HTML5 + CSS + JavaScript puro** (ES Modules), sem backend e sem
etapa de build. Veja [docs/ARQUITETURA.md](docs/ARQUITETURA.md) para a
arquitetura, as limitações de segurança de um jogo 100% no cliente e o plano
das etapas.

## Como executar

ES Modules não funcionam via `file://`, então sirva a pasta por HTTP:

```bash
cd pokemon-daily
python3 -m http.server 8080      # ou: npm start / npx serve .
```

Abra <http://localhost:8080>. Funciona em desktop e celular.

## Testes

Requer Node.js 18+ (sem dependências):

```bash
cd pokemon-daily
npm test
```

## Estado atual: Etapa 1 concluída

- Estrutura modular, tema visual inspirado nos RPGs clássicos, ícones SVG próprios.
- Roteador por hash com guarda de autenticação (telas do jogo exigem login).
- As 11 telas: início, login/cadastro, painel, sorteio, captura, inventário,
  coleção (busca + filtro por tipo + detalhes), equipe (adicionar, remover,
  reordenar, inspecionar), preparação da Elite dos 4, batalha e histórico.
- Relógio de jogo em `America/Sao_Paulo`, independente do fuso do aparelho.
- **Dados de exemplo** (`js/data/mock.js`) e login de demonstração: nada é
  salvo ainda. Cada tela indica em qual etapa a regra real será implementada.

Próxima: **Etapa 2** — persistência (`localStorage` versionado, Web Locks para
múltiplas abas), contas com senha PBKDF2 e log de auditoria.

Sprites: [PokeAPI/sprites](https://github.com/PokeAPI/sprites). Pokémon é marca
registrada da Nintendo/Game Freak/The Pokémon Company; projeto de fã, sem fins
comerciais.
