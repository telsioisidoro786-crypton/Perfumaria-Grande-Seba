# 🔥 Guia de Setup Firebase — Grande Seba Lda

## ✅ O que já está feito
- `index.html` — loja conectada ao Firebase real
- `admin.html` — painel conectado, com upload de imagens via **Cloudinary** (não usa Firebase Storage)

---

## PASSO 1 — Activar o Firestore Database

1. Vai a **console.firebase.google.com**
2. Abre o projecto **Perfumaria Grande Seba**
3. Menu lateral → **Build → Firestore Database**
4. Clica **Criar base de dados**
5. Escolhe **Começar no modo de produção** → Avança
6. Região: **europe-west** (mais próxima de Angola) → Concluído

---

## PASSO 2 — Configurar as Regras do Firestore

1. No Firestore → separador **Regras**
2. Apaga o conteúdo existente e cola isto:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /produtos/{produtoId} {
      allow read: if true;
      allow write: if true; // Muda para false depois de testar
    }
  }
}
```

3. Clica **Publicar**

> ⚠️ Deixa `write: true` inicialmente para conseguires criar produtos pelo painel.
> Depois de testado, podes restringir mais.

---

## PASSO 3 — Imagens via Cloudinary (não usa Firebase Storage)

> ⚠️ Desde Fevereiro de 2026, o Firebase exige o plano pago **Blaze** (com cartão associado) para usar o Storage. Para evitar isso, as imagens dos produtos são guardadas no **Cloudinary**, que é gratuito e não exige cartão.

1. Cria conta grátis em **cloudinary.com**
2. No Dashboard, copia o **Cloud Name**
3. **Settings → Upload → Add upload preset** → Signing Mode: **Unsigned** → guarda o nome do preset
4. No `admin.html`, confirma que estes valores estão preenchidos (já configurado):
```js
const CLOUDINARY_CLOUD_NAME = "dw958rv3b";
const CLOUDINARY_UPLOAD_PRESET = "seba-uploads";
```
5. **Nunca** coloques o "API Secret" do Cloudinary no código — uploads "Unsigned" não precisam dele, e expô-lo permite que qualquer pessoa abuse da tua conta.

---

## PASSO 4 — Criar a colecção de Produtos

Podes criar produtos directamente pelo painel `admin.html`, ou manualmente:

1. No Firestore → **+ Iniciar colecção**
2. ID da colecção: `produtos`
3. Cria o primeiro documento com estes campos:

| Campo        | Tipo    | Exemplo                     |
|--------------|---------|-----------------------------|
| nome         | string  | Chanel N°5 EDP              |
| categoria    | string  | feminino                    |
| tipo         | string  | perfume                     |
| preco        | number  | 18500                       |
| quantidade   | number  | 10 (stock disponível)       |
| descricao    | string  | Floral aldéico clássico...  |
| imagem_url   | string  | (URL da imagem — Cloudinary)|
| disponivel   | boolean | true                        |
| destaque     | boolean | true                        |

> A loja mostra automaticamente "Esgotado" quando `quantidade` chega a 0, e "Últimas X unidades" quando está em 1-3. Isto é independente do campo `disponivel`, que continua a ser um interruptor manual (ex: para esconder um produto descontinuado mesmo com stock).

**Forma de pagamento:** a loja não processa pagamentos. O cliente escolhe "Pagamento presencial" ou "Multicaixa Express" no checkout, e essa escolha vai dentro da mensagem do WhatsApp — os detalhes de pagamento são combinados directamente na conversa.

---

## PASSO 5 — Actualizar o número de WhatsApp

No ficheiro `index.html`, procura esta linha e substitui:

```js
window.WA_NUMBER = "244900000000";
```

Pelo número real da loja (sem espaços, sem +):
```js
window.WA_NUMBER = "244XXXXXXXXX";
```

---

## PASSO 6 — Deploy (escolhe uma opção)

### Opção A — Netlify (recomendado, grátis)
1. Vai a **netlify.com** → New site → Deploy manually
2. Arrasta a pasta com `index.html` e `admin.html`
3. Pronto — URL automático tipo `grande-seba.netlify.app`

### Opção B — Vercel
1. `vercel.com` → New Project → Upload files
2. Faz upload dos dois ficheiros

### Opção C — Firebase Hosting (integrado)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

---

## Password do painel Admin

A password actual é: **seba2025**

Para mudar, abre `admin.html` e procura:
```js
const ADMIN_PASS = "seba2025";
```

---

## Estrutura dos ficheiros

```
grande-seba/
├── index.html     → Loja pública
├── admin.html     → Painel de gestão (privado)
└── SETUP.md       → Este guia
```

---

*Desenvolvido por Nexora Systems · nexorasystems.com*
