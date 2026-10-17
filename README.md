# Halloween Unlocked 🎃

Een statische Nederlandstalige Halloween-website voor het vriendenweekend van 30 oktober t/m 1 november 2026. Gratis te hosten via GitHub Pages.

## Bestanden
- `index.html` — pagina-inhoud en structuur
- `style.css` — gothic/Halloween-vormgeving
- `script.js` — aftelklok en geplande onthullingen

## Dossiers aanpassen
Open `script.js` en wijzig `CONFIG.dossiers`. Per dossier:
- `id`: nummer
- `title`: titel die na de onthulling verschijnt
- `teaser`: tekst die vooraf zichtbaar is
- `content`: informatie na de onthulling
- `revealAt`: datum en tijd in Amsterdamse lokale tijd, bijvoorbeeld `2026-10-31T15:30:00`

Pas `firstReveal` niet aan om de klok te wijzigen; de klok gebruikt automatisch de eerstvolgende nog niet vrijgegeven onthulling. `firstReveal` is alleen een oude configuratiewaarde en mag genegeerd worden.

### Tijdzone
De code gebruikt `Europe/Amsterdam` en rekent de ingestelde lokale tijd om met de tijdzone-instellingen van de browser, inclusief zomer- en wintertijd. Stel tijden daarom in als Amsterdamse lokale tijd, zonder `Z` of UTC-offset.

## Publiceren met GitHub Pages (gratis)
1. Maak of log in op een account via https://github.com/.
2. Klik rechtsboven op **+** → **New repository**.
3. Geef de repository de naam `halloween-unlocked`. Kies **Public** en klik **Create repository**.
4. Klik op **Add file** → **Upload files**.
5. Upload `index.html`, `style.css` en `script.js` uit deze map (niet de zip zelf).
6. Klik op **Commit changes**.
7. Open in de repository **Settings** → **Pages**.
8. Onder **Build and deployment** kies je **Deploy from a branch**.
9. Selecteer branch **main**, map **/(root)** en klik **Save**.
10. Wacht een paar minuten. De site verschijnt normaal op:
   `https://JOUW-GITHUB-NAAM.github.io/halloween-unlocked/`

## Testen vóór publicatie
- Open `script.js`.
- Zet tijdelijk een dossier op een tijdstip enkele minuten in de toekomst, bijvoorbeeld `2026-10-16T21:30:00` (gebruik de actuele Amsterdamse tijd).
- Commit de wijziging en open de website.
- Na de onthulling wordt de pagina elke seconde bijgewerkt. Als bezoekers de pagina opnieuw openen, zien ze ook alle onthullingen waarvan de tijd al verstreken is.
- Zet daarna de echte tijden terug.

## Belangrijke beperking van een statische site
Deze oplossing verbergt informatie in de normale paginaweergave tot het geplande tijdstip, maar het is **geen echte beveiliging**. De inhoud staat in `script.js` en een technisch handige bezoeker kan toekomstige teksten vooraf bekijken. Voor een vriendenweekend is dat meestal prima. Zet geen gevoelige of vertrouwelijke informatie in de code.
