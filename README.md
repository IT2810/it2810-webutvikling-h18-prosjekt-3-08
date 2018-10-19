# PIMM med React Native - Gruppe 8
Vi er 3 studenter på NTNU som har gjennomført et prosjekt i emnet IT2810 Webutvikling. Prosjektet gikk ut på å designe og implementere en "Personal Information and Motivation Manager"-app for mobil, med React Native. Les mer om React Native [her](https://facebook.github.io/react-native/).

<br>

  - [Innhold og funksjonalitet](#innhold-og-funksjonalitet)
    - [Generelt](#generelt)
    - [AsyncStorage](#asyncstorage)
    - [UtoverReactNativeUI](#utoverreactnativeui)
  - [Teknologi](#teknologi)
    - [Swipeout](#swipeout)
    - [Elements](#elements)
    - [Vector-icons](#expo-vector-icons)
    - [Moment](#moment)
    - [Datetime-picker](#datetime-picker)
    - [Navigation](#navigation)
    
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

Vi har brukt AsynchStorage for å lagre data som blir lagt til i appen vår. Dataene blir lagret asynkront og ukryptert som nøkkel-datapar. Ettersom dataen ikke er kryptert anbefales man å ha et abstraksjonsnivå over istendefor å bruke AsyncStorage direkte, med mindre det er simple operasjoner som skal utføres. Vi har valgt et en-til-en forhold mellom state og AsyncStorage. På denne måten leser vi kun fra AsyncStorage når vi initialiserer  appen.

Under er et eksempel på hvordan vi lagrer data. Her er ```'perfectDays'``` nøkkelen og ```this.state.perfectDays```  dataen vi vil lagre. For å hente ut todos og appointments har vi brukt datoen de tilhører som nøkkel. 

```
  storePerfectDays = async() => {
    try {
      await AsyncStorage.setItem('perfectDays', JSON.stringify(this.state.perfectDays))

    } catch(error) {
      alert("Error")
    }
  };
```

For å hente ut data må vi sende inn en nøkkelen til dataen vi vil hente. Vi bruker da AsyncStorage sin ```getItem(key)``` for å hente ut dataen som ligger på den aktuelle nøkkelen. 
```
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


```
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
```        
        return (
            <Swipeout {...swipeSettings}>
                    <View/>
            </Swipeout>
        );
    }

<br>

#### Elements
React Native Elements tilbyr standeriserte og ferdigelagde UI-komponenter. I vårt prosjekt har vi blant annet benyttet oss av Searchbar, Lists og Button. Ettersom React Native ikke tilbyr et altfor bredt spekter av UI-komponenter kom dette veldig godt med. Komponentene vi har brukt har vært hendig for å navigere, legge til og søke opp dataen som er lagret.


```
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

```import { Ionicons } from '@expo/vector-icons';```

``` <Ionicons name='md-pin'/>```


<br>

#### Moment

Vi har brukt moments for å formatere dato og tid. Vi bruker moments i "todos" og "appointments" for å blant annet lage nøkler til dataene vi lagrer i AsyncStorage. 

```import moment from 'moment';```

``` let formatedDate = moment(date).format('YYYY-MM-DD');```



<br>

#### Datetime-picker

Datetime-picker er et bibliotek som brukes for å få opp views der man kan velge tid eller dato og fungerer på forskjellige operativsystemer. Vi har brukt dette til både å velge dato til avtaler og gjøremål og også velge tidspunkt for avtaler. Under er en kodesnutt for hvordan man veldger dato. 

```
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

```
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

## Testing


