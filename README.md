
# PIMM med React Native - Gruppe 8
Vi er 3 studenter på NTNU som har gjennomført et prosjekt i emnet IT2810 Webutvikling. Prosjektet gikk ut på å designe og implementere en "Personal Information and Motivation Manager"-app for mobil, med React Native. 
Les mer om React Native [her](https://facebook.github.io/react-native/).

<br>

  - [Innhold og funksjonalitet](#innhold-og-funksjonalitet)
    - [Generelt](#generelt)
    - [Expo](#expo)
    - [AsyncStorage](#asyncstorage)
  - [Utover React Native UI](#utover-react-native-ui)
    - [Swipeout](#swipeout)
    - [Elements](#elements)
    - [Vector-icons](#expo-vector-icons)
    - [Moment](#moment)
    - [Datetime-picker](#datetime-picker)
    - [Navigation](#navigation)
  - [Git](#git)
  - [Testing](#testing)
    - [Plattformuavhengighet](#plattformuavhengighet)
    - [Jest](#jest)



## Innhold og funksjonalitet 
#### Generelt
Vår personal information manager er en app som lar deg holde orden på kontakter, avtaler og todos. I praksis en avansert kalender. I tillegg er ordet "motivation" lagt til. Måten vi har inkludert et motivasjons-aspekt i applikasjonen er som følger:

- Man kan markere todos som gjort/ugjort
- Om alle todos på en dag er markert som "gjort" oppnår man en "Perfect Day" og  
  - Man får en gratulasjonsbeskjed
  - Stjerne-symbolet på siden bytter farge fra grå til oransje.
  - Man kan klikke på stjernen for å se en liste over alle "perfekte dager"
<br>
Under ser man et utklipp av applikasjon i bruk:
<br>

Appointments-tab |  Todos-Tab  | Contacts
:-------------:|:----------------:|:--------------:
![](https://media.giphy.com/media/6o3wcwYMXSeaYYxDFo/giphy.gif)  |  ![](https://media.giphy.com/media/XJMl5OMLBXVKMXhRgp/giphy.gif) | ![](https://media.giphy.com/media/X6IpxDtlSyWcuqFsmc/giphy.gif)

<br>

#### Expo

Expo er et verktøy bygget rundt React Native, slik at man kan bygge native iOS og Android prosjekter ved å bruke React og JavaScript.
Expo Brukes for å lage React-Native applikasjonen med alle de nødvendige node_modulene. Lastes ned med kommandoen:
 ```npm install expo-cli --global```
For å opprette et nytt prosjekt utfører man kommandoen:
```
expo init my-new-project
cd my-new-project
expo start
````
Man vil nå få opp en QR-kode. Denne koden kan for eksempel scannes ved å bruke kamera-appen i iOS. I tillegg vil man trenge Expo sin egen app. Når koden skannes får man valget om å gå til Expo appen, og her har man mulighet til å teste appen i sin helhet - direkte til på din telefon. Dette har vært en veldig effektiv måte å teste at funksjonalitet for appen er ønskelig.

[Her](https://expo.io/learn) kan man lese mer om hvordan man kan bruke Expo i sin utvikling.

<br>

#### AsyncStorage

Vi har brukt [AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage) for å lagre data som blir lagt til i appen vår. Dataene blir lagret asynkront og ukryptert som nøkkel-datapar. Ettersom dataen ikke er kryptert anbefales man å ha et abstraksjonsnivå over i stendet for å bruke AsyncStorage direkte, med mindre det er simple operasjoner som skal utføres. Vi har valgt et en-til-en forhold mellom state og AsyncStorage. På denne måten leser vi kun fra AsyncStorage når vi initialiserer  appen eller endrer dato (da ny data må hentes for den datoen). 

Under er et eksempel på hvordan vi lagrer data. Her er ```'perfectDays'``` nøkkelen og ```this.state.perfectDays```  dataen vi vil lagre. For å hente ut todos og appointments har vi brukt datoen de tilhører som nøkkel. 

```jsx
  storePerfectDays = async() => {
    try {
      await AsyncStorage.setItem('perfectDays', JSON.stringify(this.state.perfectDays))

    } catch(error) {
      alert("Error")
    }
  };
```

For å hente ut data må vi sende inn en nøkkelen til dataen vi vil hente. Vi bruker da AsyncStorage sin ```getItem(key)``` for å hente ut dataen som ligger på den aktuelle nøkkelen. 
```jsx
retrievePerfectDays = async() => {
    try {
      let perfectDaysData = await AsyncStorage.getItem('perfectDays')          
      if (perfectDaysData != null) {
        let perfectDays = JSON.parse(perfectDaysData)
        console.log("Hentet ut: " + perfectDays);
        this.setState({
          perfectDays: perfectDays
        })
      }
      else {
        this.setState({
          perfectDays: []
        })
      }
    } catch (error) {
      alert("Error")
    }   
  }
```

<br>

### UtoverReactNativeUI

#### Swipeout
[Swipeout](https://www.npmjs.com/package/react-native-swipeout) er en funksjon som gjør det mulig å swipe liste-elementer. På denne måten får man en dynamisk måte å slette list-elementer på. 

I koden under ser man koden som gjør det mulig å swipe en appointment. ```right: [...]``` bestemmer hva som skal skje og hva som skal vises når du swiper til høyre. 

```jsx
render() {
        const swipeSettings = {
            autoClose: true,
            right: [
                {
                    onPress: () => {this.props.handleAppointmentDelete(this.props.index)},
                    text: 'Delete',
                    type: 'delete'
                }
            ],
        };
        
        return (
            <Swipeout {...swipeSettings}>
                    <View/>
            </Swipeout>
        );
    }
```
<br>

#### Elements
[React Native Elements](https://react-native-training.github.io/react-native-elements/) tilbyr standeriserte og ferdigelagde UI-komponenter. I vårt prosjekt har vi blant annet benyttet oss av Searchbar, Lists og Button. Ettersom React Native ikke tilbyr et altfor bredt spekter av UI-komponenter kom dette veldig godt med. Komponentene vi har brukt har vært hendig for å navigere, legge til og søke opp dataen som er lagret.

```jsx
<SearchBar 
    placeholder="Search.." 
    lightTheme round 
    onChangeText={this.handleSearch}
    value={this.state.query}
    clearIcon={{ color: 'black' }}
    onClearText={ () => this.setState({query: ''})}
    containerStyle={{backgroundColor: '#fff', borderBottomWidth: 0}}
/>
```

<br>

#### Expo-vector-icons

Ved å ha ikoner som lokasjons-pin, stjerne og kalender kan vi gi mer mening til UI-komponenter og gjøre appen lettere å bruke. Derfor har vi brukt ikoner fra Expo. Under er et eksempel fra koden som gir lokasjons-pinen på en avtale. Les mer dokumentasjon [her](https://github.com/expo/vector-icons)

```jsx 
import { Ionicons } from '@expo/vector-icons';
```

```jsx 
<Ionicons name='md-pin'/>
```

<br>

#### Moment

Vi har brukt [Moments](https://www.npmjs.com/package/react-moment) for å formatere dato og tid. Vi bruker moments i "todos" og "appointments" for å blant annet lage nøkler til dataene vi lagrer i AsyncStorage. 

```jsx 
import moment from 'moment';
```

```jsx 
let formatedDate = moment(date).format('YYYY-MM-DD');
```

<br>

#### Datetime-picker

[Datetime-picker](https://www.npmjs.com/package/react-native-modal-datetime-picker) er et bibliotek som brukes for å få opp views der man kan velge tid eller dato og fungerer på forskjellige operativsystemer. Vi har brukt dette til både å velge dato til avtaler og gjøremål og også velge tidspunkt for avtaler. Under er en kodesnutt for hvordan man veldger dato. 

```jsx
render() {
      return (
         <View style={styles.container}>
            <TouchableOpacity onPress={this.showPicker} >
               <View style={{paddingHorizontal: 10}}>
                  <Ionicons name="md-calendar" size={24} />
               </View>
            </TouchableOpacity>
            <DateTimePicker
               date={this.state.chosenDate}
               isVisible={this.state.isVisible}
               onConfirm={this.handlePicker}
               onCancel={this.hidePicker}
            />
         </View>);
   }
```

#### Navigation

Ved å bruke [Navigation-biblioteket](https://facebook.github.io/react-native/docs/navigation) har vi greid å lage en app der det er lett å navigere frem og tilbake fra forskjellige komponenter. Vi har brukt forskjellige typer navigasjonsmetoder som f.eks Drawer, Stack og TopTab. I bunn har vi en drawer der man kan velge mellom å se kontaktliste og "MyDay"-siden. På "MyDay" har vi tabs der man kan velge mellom å se liste over avtaler eller liste over gjøremål. Igjen er avtale -og kontaktsiden en stackNavigator. 

```jsx
export const Stack = createStackNavigator({
   TabNavigator: {
      screen: Tabs,
      navigationOptions: ({navigation}) => ({
         title: 'MyDay',
         headerLeft: (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
               <View style={{paddingHorizontal: 10}}>
                  <Ionicons name="md-menu" size={24} />
               </View>
            </TouchableOpacity>
         ), 
      })
   }
});

```

<br>

## Git
Git er brukt under hele utviklingsprosessen, der vi har fordelt inn oppgavene i ulike issues. Issuene har et nr, feks *#9*, som brukes aktivt når vi commiter endringer. Hver commitmelding starter med issue-nr, fulgt av commit-melding. Etter tilbakemeldinger fra prosjekt 2 har vi skjerpet bruken av git særlig på dette området, da vi fikk tilbakemeldinger om at noen commits ikke var koblet til issuer, og at commit-meldingene var lite informative. Vi har også brukt Github Project for å ha en god oversikt over hvilke issues som er i _backlog_, som er _doing_, under _testing_ eller _done_.

I tillegg har vi brukt ulike branches i utviklingen. Vi bruker en develop-branch til utviklingen, og hver gang man jobber på en ny feature oppretter man en egen branch ut fra denne. Når en feature er ferdig merger man denne branchen inn i develop. 

Vi har også fokusert på å kommentere på issues i større grad enn i prosjekt 2. Dette var særlig hensiktsmessig i en periode der en av gruppemedlemmene var på ferie i utlandet. Dermed ble git en god måte å følge med på prosessen på, og diskutere ulike løsninger.

## Testing
For dette prosjektet ble det stilt krav om systematisk bruk av tester for å sikre tilstrekkelig kodekvalitet. Da vi startet prosjektet ble det oppfordret til å bruke Jest og Enzyme. Det viste seg at det oppsto en del problemer når det kom til Enzyme og React Native, og derfor ble Jest foretrukket. Dette førte til at det for det meste ble utført snapshot-testing. Vi har også noe testing av funksjoner. Det har vist seg vanskelig å få teste state, som er ganske uheldig da mange av funksjonene baserer seg på å oppdatering av state.

Vi opplevde en del problemer når det kom til testingen. Ved oppstart av prosjekt valgte vi en *blank template*. Dette førte senere til noen problemer med Jest, der vi prøvde å kjøre testene, men det kom ingen resultater (og heller ikke feilmeldinger). Etter mye feilsøking fant vi ut at det hadde vært hensiktsmessig å starte prosjektet med *tabs-template* da vi kjørte *expo init* første gang.
Dette førte til at vi ikke fikk testet like mye underveis i utviklingen som vi ønsket. Vi fant heldigvis en løsning på problemet etter mye feilsøking og endring av *package.json*. Se mer om det [her](#jest).

I fremtiden ønsker vi å fokusere på å få opp testmiljøet så tidlig som mulig, slik at hver person kan skrive tester for ny funksjonalitet som legges til fortløpende. Dette vil føre til at mer kode testes, i stedet for å løse problem med testing mot slutten og deretter skrive tester for funksjonalitet som har blitt implementert på for eksempel et tidlig stadie i utviklingen.

### Plattformuavhengighet
Et annet krav for dette prosjektet var plattformuavhengighet - altså at appen skal fungere både på iOS og Android. 
En utfordring her var at ingen på gruppa hadde Android, slik at vi måtte teste ved hjelp av Android Emulatorer. Bildet under viser hvordan appen ser ut på Android. For å se funksjonalitet på iOS, se video under [generelt](#generelt) punktet.
Vi har ikke støtt på noen spesielle problemer på de ulike operativsystemene, funksjonaliteten og utseende skal være lik på begge platformer. 

![](https://i.imgur.com/j6UZU9R.png)

### Jest
Jest er et rammeverk for å teste JavaScript på en enkel måte. [Her](https://jestjs.io/docs/en/tutorial-react-native) kan du lese mer om hvordan det brukes for å teste React Native apps.
For å installere brukte vi kommandoen ``` npm i jest-expo --save-dev ``` i terminal. Testene kjøres enkelt ved hjelp av kommandoen ``` npm test ```. Testene måtte lagres i en mappe med navn ```__test__```, og filene måtte hete *ComponentSomTestes-test.js*.

Som nevnt fokuserte vi for det meste på snapshot-testing. Det beste alternativet var å bruke ```react-test-renderer``` til å håndtere snapshottesting av enkle komponenter, fordi vi da får snapshot-filer som er lesbare. Eksempel på dette ligger under:

```jsx
import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import AddAppointment from '../AddAppointment';

test("Renders correctly", () => {
    const tree = renderer.create(<AddAppointment/>).toJSON();
    expect(tree).toMatchSnapshot();
});

```
I tillegg testet vi funksjoner på følgende måte:
```jsx
test("Function setStartTime", () => {
    const data = renderer.create(<AddAppointment/>).getInstance();
    data.setStartTime("12:00")
    expect(data.state.startTime).toEqual("12:00");
});
```

Etter mye feilsøking, fant vi ut at vi måtte endre package.json til følgende etter tips på piazza:
```
{
  "name": "empty-project-template",
  "main": "node_modules/expo/AppEntry.js",
  "private": true,
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "eject": "expo eject",
    "test": "node_modules/.bin/jest"
  },
  "dependencies": {
    "expo": "^30.0.1",
    "jest-cli": "^23.6.0",
    "moment": "^2.22.2",
    "native-base": "^2.8.1",
    "react": "16.3.1",
    "react-native": "https://github.com/expo/react-native/archive/sdk-30.0.0.tar.gz",
    "react-native-elements": "^0.19.1",
    "react-native-modal-datetime-picker": "^6.0.0",
    "react-native-navigation": "^1.1.490",
    "react-native-paper": "^2.1.0",
    "react-native-swipeout": "^2.3.6",
    "react-navigation": "^2.17.0",
    "react-navigation-material-bottom-tabs": "^0.4.0"
  },
  "devDependencies": {
    "jest": "^23.6.0",
    "jest-expo": "^30.0.0",
    "jest-react-native": "^18.0.0",
    "react-test-renderer": "^16.5.2",
    "jest-babel": "^1.0.1"
  },
  "jest": {
    "preset": "jest-expo"
  }
}
``` 

