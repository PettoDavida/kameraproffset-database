# ![KAMERPROFFSET](src/assets/img/smallogo.png)

## Projektbeskrivning 📃

Vi har skapat en webbshop där en kund kan lägga till och ta bort olika produkter i en varukorg. I varukorgen kan kunden sedan skriva in sina personuppgifter, välja leverans- och betalningsalternativ och sedan bekräfta sin order. Alla input-fält innehåller också validering. Efter färdig beställning så töms varukorgen och kunden möts av en orderbekräftelse.

Utöver kundflödet så har vi även skapat en admin-sida där vi kan ändra produkter enligt CRUD-principen. Här kan vi redigera, lägga till och ta bort produkter. Fälten för redigering/tillägg av produkt valideras också enligt våra valideringsregler. Produkter som uppdaterats eller lagts till sparas även i en databas.

Vi har skapat en backend till hemsidan där produkter, ordrar och användare sparas och hämtas ifrån en databas.
Man kan registrera sig på hemsidan och göra ett konto. Man kan logga in som användare och skapa en order på produkten man vill köpa. Det går även att ansöka om att bli admin på hemsidan, som admin kan man lägga till, ta bort och ändra produkter. Hålla koll på produkternas saldo samt hantera ordrar.

[Link to repo](https://github.com/PettoDavida/kameraproffset-database)

## Initiate project 👨‍💻

To run the project, simply write the following command in the terminal:

```

cd backend
npm i

echo "MONGO_CONNECT=mongDBAtlas

ACCESS_TOKEN_SECRET=secret" > .env

npm run dev

```

Open another terminal and run the following commands in it:

```

npm i

npm start

```

Admin inlogg:

Email:
Admin@gmail.com

Password:
admin

MongoDB atlas länk. Skickas med på itslearning

---

## Created by:

---

## Maximilian Widman [**Github**](https://github.com/PettoDavida)

## Erik Matsegård [**Github**](https://github.com/matsegard)

## Adrian Rydin [**Github**](https://github.com/AdrianRydin)

## Kawan Majeed [**Github**](https://github.com/kawium)

---

## Kravspecifikation:

---

Alla sidor skall vara responsiva. (G)

•Arbetet ska implementeras med en React frontend och en Express backend. (G)

•Skapa ett ER diagram och koddiagram, detta ska lämnas in vid idégodkännandet(G)

•Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid idégodkännandet (G)

•All data som programmet utnyttjar ska vara sparat i en Mongo-databas (produkter, beställningar, konton mm) (G)

•Man ska kunna logga in som administratör i systemet (G)

•Man ska kunna registrera sig som administratör på sidan, nya användare ska sparas i databasen (VG)

•En administratör behöver godkännas av en tidigare administratör innan man kan logga in fösta gången (VG)

•Inga Lösenord får sparas i klartext i databasen (G)

•En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen (G)

•Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan (G)

•Administratörer ska kunna se en lista på alla gjorda beställningar (G)

•Administratörer ska kunna markera beställningar som skickade (VG)

•Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera (G)

•Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori (G)

•Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på klienten (G)

•En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in och måste vara inloggad som kund innan beställningen skapas (G)

•När man är inloggad som kund ska man kunna se sina gjorda beställning och om det är skickade eller inte (VG)

•Besökare ska kunna välja ett av flera fraktalternativ (G)

•Tillgängliga fraktalternativ ska vara hämtade från databasen (G)

•Administratörer ska kunna redigera vilka kategorier en produkt tillhör (VG)

•Administratörer ska kunna lägga till och ta bort produkter (VG)

•Backendapplikationen måste ha en fungerande global felhantering (VG)

•Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält (G)
