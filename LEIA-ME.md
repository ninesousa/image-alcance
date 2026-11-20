# Imagem Alcance — site (versão clara)

Site estático em HTML, CSS e JavaScript puro, sem bibliotecas. Para ver, abra o `index.html` no navegador.

## Arquivos

| Arquivo | O que tem |
|---|---|
| `index.html` | Estrutura e textos, organizados por seção (procure os comentários `<!-- ========== -->`) |
| `css/estilo.css` | Visual: fontes, cores dos temas claro e escuro, componentes, seções, animações e ajustes de celular |
| `js/main.js` | Sol e lua (tema), menu do celular, raio-X ligado à rolagem, régua, varredura e entrada das seções |
| `fonts/` | Lexend e JetBrains Mono (arquivos locais, sem depender do Google) |
| `img/` | Logos em SVG, nas versões azul e branca |

## Cores

As cores ficam em variáveis no início do `css/estilo.css`: o bloco `:root[data-tema='claro']` e o bloco `:root[data-tema='escuro']`. Trocou ali, troca no site todo.

## Onde trocar

Procure por `TROCAR` e por textos entre colchetes `[ ]` no `index.html`:

- **Foto e radiografia do cachorro:** dentro de `<figure class="raiox ...">`. Depois de trocar, tire a classe `raiox--provisorio`.
- **Foto da Dra. Yullie:** dentro de `.sobre__foto`.
- **Posts do Instagram:** dentro de `.posts`.
- **LinkedIn:** procure `[SEU-PERFIL]`.
- **WhatsApp:** procure `5511999991234` e `(11) 99999-1234`.
- **Sobrenome, CRMV e formação:** procure `[SOBRENOME]` e `CRMV-[UF] [00000]`.

## Comportamento

- **Tema:** na primeira visita o site segue o aparelho da pessoa e depois lembra a escolha dela. A troca tem efeito de scanner.
- **Raio-X:** a linha desce conforme a rolagem. Se o JavaScript não carregar, ela anima sozinha só com CSS.
- **Reduzir movimento:** quem ativou essa opção no sistema vê o site sem animações.
