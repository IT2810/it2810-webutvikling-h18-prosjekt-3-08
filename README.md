# PIMM med React Native - Gruppe 8
Vi er 3 studenter på NTNU som har gjennomført et prosjekt i emnet IT2810 Webutvikling. Prosjektet gikk ut på å designe og implementere en "Personal Information and Motivation Manager"-app for mobil, med React Native. Les mer om React Native [her](https://facebook.github.io/react-native/).

<br>

  - [Innhold og funksjonalitet](#innhold-og-funksjonalitet)
    - [Generelt](#generelt)
    - [AsyncStorage](#asyncstorage)
    - [UtoverReactNativeUI](#utoverreactnativeui)
  - [Teknologi](#teknologi)
    - [](#)
    - [](#)
    - [](#)
  - [Testing](#testing)



## Innhold og funksjonalitet 
### Generelt
Vår personal information manager er en app som lar deg holde orden på kontakter, avtaler og todos. I praksis en avansert kalender. I tillegg er ordet "motivation" lagt til. Måten vi har inkludert et motivasjons-aspekt i applikasjonen er som følger:

- Man kan markere todos som gjort/ugjort
- Om alle todos på en dag er markert som "gjort" oppnår man en "Perfect Day" og  
  - Man får en gratulasjonsbeskjed
  - Stjerne-symbolet på siden bytter farge fra grå til oransje.
  - Man kan klikke på stjernen for å se en liste over alle "perfekte dager"
<br>

### AsyncStorage

Vi har brukt AsynchStorage for å lagre data som blir lagt til i appen vår. Dataene blir lagret asynkront og ukryptert som nøkkel-datapar. Ettersom dataen ikke er kryptert anbefales man å ha et abstraksjonsnivå over istendefor å bruke AsyncStorage direkte, med mindre det er simple operasjoner som skal utføres. 

<br>

### UtoverReactNativeUI


#### Swipeout
#### Elements
#### Expo vector-items
#### Moment?
#### modal-datetime-picker
Navigation


