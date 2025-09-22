#  Documentação do Banco de Dados

## 1. **users**
Armazena os usuários do sistema.  
- `username`: único, em lowercase.  
- `sector_id`: setor principal do usuário.  
- `hierarchy_id`: cargo/posição dentro do setor.  
- Inclui campos de auditoria (`created_at`, `updated_at`, `deleted_at`).  

---

## 2. **sectors**
Representa os setores da organização (ex.: RH, TI, Marketing).  
- Nome único.  
- Pode ser associado a anúncios, links e usuários.  

---

## 3. **hierarchy**
Define cargos/níveis dentro de cada setor.  
- Relacionado a um setor (`sector_id`).  
- Ex.: Estagiário, Analista, Gerente.  
- Evita duplicatas no mesmo setor via índice `(sector_id, name)`.  

---

## 4. **styles**
Tabela central de **estilos visuais**.  
- Permite personalizar cores, layout e CSS.  
- Pode ser aplicada a anúncios e links.  
- Exemplo: “Aviso Vermelho” (fundo vermelho, texto branco).  

---

## 5. **announcements**
Tabela principal de **anúncios**.  
- `status`: controla ciclo de vida (draft, published, archived).  
- `is_global`: anúncio visível para todos os setores.  
- `is_pinned`: fixado no topo.  
- `style_id`: estilo visual aplicado.  
- Campos de agendamento: `publish_at`, `published_at`, `archived_at`.  
- Cache de visualizações totais (`views_total`).  

---

## 6. **announcement_images**
Imagens vinculadas a um anúncio.  
- Suporta múltiplas imagens.  
- `sort_order`: ordenação para exibição em carrosséis/galerias.  

---

## 7. **announcement_attachments**
Anexos genéricos de um anúncio.  
- Suporta PDFs, docs, planilhas, etc.  
- `mime_type` e `size_bytes` para validação/segurança.  

---

## 8. **announcements_sectors**
Tabela de junção **N:N**.  
- Permite associar anúncios a múltiplos setores.  
- Exemplo: um comunicado pode ir apenas para TI e RH.  

---

## 9. **tags**
Sistema de **tags/categorias reutilizáveis**.  
- Usadas em anúncios e links.  
- Podem ter cor própria.  

---

## 10. **announcement_tags**
Tabela de junção entre **anúncios e tags**.  
- Exemplo: anúncio marcado como “Urgente” e “Financeiro”.  

---

## 11. **links**
Links compartilhados no sistema.  
- Possuem título, descrição e URL.  
- Podem ser globais ou vinculados a setores.  
- Também podem ter um estilo visual (`style_id`).  

---

## 12. **links_sectors**
Junção **N:N** para relacionar links e setores.  
- Exemplo: link de política de TI visível apenas para o setor de TI.  

---

## 13. **link_tags**
Tabela de junção entre **links e tags**.  
- Exemplo: link marcado como “Treinamento” e “Segurança”.  

---

## 14. **announcement_reactions**
Permite reações rápidas em anúncios.  
- Tipos: `like`, `love`, `insight`, `question` (expansível).  
- Cada usuário pode reagir apenas uma vez por tipo em cada anúncio.  

---

## 15. **announcement_comments**
Comentários nos anúncios.  
- Corpo do comentário (`body`).  
- Suporta atualização (edição).  
- Relacionado ao autor (`user_id`).  

---

## 16. **link_clicks**
Métricas de engajamento em links.  
- Registra data/hora, origem (`source`), `user_agent` e hash de IP.  
- `user_id` pode ser nulo para cliques públicos.  

---

## 17. **announcement_views**
Contabiliza visualizações de anúncios por usuário.  
- `view_count`: número de vezes que o usuário abriu o anúncio.  
- `first_seen_at` e `last_seen_at`: para métricas de engajamento.  

---

#   Resumo das Relações
- **users → sectors/hierarchy**: cada usuário pertence a um setor e tem um cargo.  
- **announcements → users**: cada anúncio tem um autor.  
- **announcements → sectors (N:N)**: anúncios podem ser filtrados por setor.  
- **announcements → styles**: cada anúncio pode ter estilo próprio.  
- **announcements → images/attachments/tags**: extensões visuais e metadados.  
- **announcements → views/reactions/comments**: engajamento e métricas.  
- **links → sectors (N:N)** e **links → tags**: filtragem e categorização.  
- **links → styles**: personalização visual de links.  
- **link_clicks**: analítica de acessos a links.  
