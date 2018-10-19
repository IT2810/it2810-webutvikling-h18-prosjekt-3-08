
# PIMM med React Native - Gruppe 8
Vi er 3 studenter på NTNU som har gjennomført et prosjekt i emnet IT2810 Webutvikling. Prosjektet gikk ut på å designe og implementere en "Personal Information and Motivation Manager"-app for mobil, med React Native. Les mer om React Native [her](https://facebook.github.io/react-native/).

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


<br>

#### AsyncStorage

Vi har brukt AsyncStorage for å lagre data som blir lagt til i appen vår. Dataene blir lagret asynkront og ukryptert som nøkkel-datapar. Ettersom dataen ikke er kryptert anbefales man å ha et abstraksjonsnivå over i stendet for å bruke AsyncStorage direkte, med mindre det er simple operasjoner som skal utføres. Vi har valgt et en-til-en forhold mellom state og AsyncStorage. På denne måten leser vi kun fra AsyncStorage når vi initialiserer  appen eller endrer dato (da ny data må hentes for den datoen). 

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
Swipeout er en funksjon som gjør det mulig å swipe liste-elementer. På denne måten får man en dynamisk måte å slette list-elementer på. 

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
React Native Elements tilbyr standeriserte og ferdigelagde UI-komponenter. I vårt prosjekt har vi blant annet benyttet oss av Searchbar, Lists og Button. Ettersom React Native ikke tilbyr et altfor bredt spekter av UI-komponenter kom dette veldig godt med. Komponentene vi har brukt har vært hendig for å navigere, legge til og søke opp dataen som er lagret.


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

Ved å ha ikoner som lokasjons-pin, stjerne og kalender kan vi gi mer mening til UI-komponenter og gjøre appen lettere å bruke. Derfor har vi brukt ikoner fra Expo. Under er et eksempel fra koden som gir lokasjons-pinen på en avtale.

```jsx 
import { Ionicons } from '@expo/vector-icons';
```

```jsx 
<Ionicons name='md-pin'/>
```


<br>

#### Moment

Vi har brukt moments for å formatere dato og tid. Vi bruker moments i "todos" og "appointments" for å blant annet lage nøkler til dataene vi lagrer i AsyncStorage. 

```jsx 
import moment from 'moment';
```

```jsx 
let formatedDate = moment(date).format('YYYY-MM-DD');
```



<br>

#### Datetime-picker

Datetime-picker er et bibliotek som brukes for å få opp views der man kan velge tid eller dato og fungerer på forskjellige operativsystemer. Vi har brukt dette til både å velge dato til avtaler og gjøremål og også velge tidspunkt for avtaler. Under er en kodesnutt for hvordan man veldger dato. 

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

Ved å bruke Navigation-biblioteket har vi greid å lage en app der det er lett å navigere frem og tilbake fra forskjellige komponenter. Vi har brukt forskjellige typer navigasjonsmetoder som f.eks Drawer, Stack og TopTab. I bunn har vi en drawer der man kan velge mellom å se kontaktliste og "MyDay"-siden. På "MyDay" har vi tabs der man kan velge mellom å se liste over avtaler eller liste over gjøremål. Igjen er avtale -og kontaktsiden en stackNavigator. 

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
.....

## Testing
For dette prosjektet ble det stilt krav om systematisk bruk av tester for å sikre tilstrekkelig kodekvalitet. Da vi startet prosjektet ble det oppfordret til å bruke Jest og Enzyme. Det viste seg at det oppsto en del problemer når det kom til Enzyme og React Native, og derfor ble Jest foretrukket. Dette førte til at det for det meste ble utført snapshot-testing. Vi har også noe testing av funksjoner.

Vi opplevde en del problemer når det kom til testingen. Ved oppstart av prosjekt valgte vi en *blank template*. Dette førte senere til noen problemer med Jest, der vi prøvde å kjøre testene, men det kom ingen resultater (og heller ikke feilmeldinger). Etter mye feilsøking fant vi ut at det hadde vært hensiktsmessig å starte prosjektet med *tabs-template* da vi kjørte *expo init* første gang.
Dette førte til at vi ikke fikk testet like mye underveis i utviklingen som vi ønsket. Vi fant heldigvis en løsning på problemet etter mye feilsøking og endring av *package.json*. Se mer om det [her](#jest).

I fremtiden ønsker vi å fokusere på å få opp testmiljøet så tidlig som mulig, slik at hver person kan skrive tester for ny funksjonalitet som legges til fortløpende. Dette vil føre til at mer kode testes, i stedet for å løse problem med testing mot slutten og deretter skrive tester for funksjonalitet som har blitt implementert på for eksempel et tidlig stadie i utviklingen.

### Plattformuavhengighet
Et annet krav for dette prosjektet var plattformuavhengighet - altså at appen skal fungere både på iOS og Android. 
En utfordring her var at ingen på gruppa hadde Android, slik at vi måtte teste ved hjelp av Android Emulatorer. Bildet under viser hvordan appen ser ut på Android. For å se funksjonalitet på iOS, se video under [generelt](#generelt) punktet.
Vi har ikke støtt på noen spesielle problemer på de ulike operativsystemene, funksjonaliteten og utseende skal være lik på begge platformer. 

:-------------:|:----------------:
![](https://i.imgur.com/j6UZU9R.png) | ![]((https://i.imgur.com/B2K9yqr.png)

### Jest
.....

