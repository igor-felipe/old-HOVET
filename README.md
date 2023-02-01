# HOVET
Essa é uma iniciativa voluntária que visa desenvolver soluções para o Hospital Veterinário Escola do Departamento de Medicina Veterinária da UFRPE. O primeiro passo é desenvolver uma ferramenta online para a anotações casuísticas pois, atualmente, são realizadas em várias atas (cadernos).

Para rodar a versão de desenvolvimento do projeto na primeira vez:
* Acrescente um .env com a seguinte linha:

```console
DATABASE_URL = "file:./dev.db"
```
* Rode os comandos
```console
npm i
npx prisma db push
npx tsoa routes
npm run dev 
````
* Utilitário web para visualizar e realizar operações basicas no banco de dados.
```console
npx prisma studio
```



