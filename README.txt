OBS Netzwerk Timer – Grün/Gold

WICHTIG:
Diese Version funktioniert über verschiedene PCs/Geräte, braucht aber Firebase Realtime Database.
Grund: Lokale HTML-Dateien können sich nicht über verschiedene PCs synchronisieren.

Dateien:
- overlay.html = in OBS als Browser-Quelle einfügen
- control.html = Regie-Steuerung im Browser öffnen
- firebase-config.js = hier deine Firebase Config eintragen
- style.css / shared.js = nicht umbenennen

Setup kurz:
1. Firebase Projekt erstellen
2. Realtime Database aktivieren
3. Web-App registrieren
4. Config in firebase-config.js einfügen
5. Ordner bei Netlify hochladen
6. Links nutzen:

OBS:
https://DEIN-LINK.netlify.app/overlay.html?room=redbook

Regie:
https://DEIN-LINK.netlify.app/control.html?room=redbook

Für andere Sitzung einfach room ändern:
?room=sitzung1
?room=ijtema2026

Firebase Test-Regeln für schnellen Start:
{
  "rules": {
    "obsTimers": {
      "$room": {
        ".read": true,
        ".write": true
      }
    }
  }
}

Hinweis:
Diese Test-Regeln sind praktisch, aber nicht streng geschützt.
Für öffentliche Veranstaltungen besser später absichern.
