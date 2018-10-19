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
    - [Vector-icons](#expo vector-icons)
    - [Moment] (#moment)
    - [Datetime-picker] (#datetime-picker)
    - [Navigation] (#navigation)
    
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
Swipeout er en funksjon som gjør det mulig å swipe liste-elementer. På denne måten får man en dynamisk måte å slette list-elementer på. 

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
React Native Elements tilbyr standeriserte og ferdigelagde UI-komponenter. I vårt prosjekt har vi blant annet benyttet oss av Searchbar, Lists og Button. Ettersom React Native ikke tilbyr et altfor bredt spekter av UI-komponenter kom dette veldig godt med.

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

#### Expo vector-icons

Ved å ha ikoner som lokasjons-pin, stjerne og kalender kan vi gi mer mening til UI-komponenter og gjøre appen lettere å bruke. Derfor har vi brukt ikoner fra Expo.

``` <Ionicons name='md-pin'/>```


<br>

#### Moment

Vi har brukt moments for å formatere dato og tid. Vi bruker moments i "todos" og "appointments" for å blant annet lage nøkler til dataene vi lagrer i AsyncStorage. 

``` let formatedDate = moment(date).format('YYYY-MM-DD');```



<br>
#### Datetime-picker

Datetime-picker er en funksjon for å få opp views der man kan velge tid eller dato og fungerer på forskjellige operativsystemer. 

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

Ved å bruke Navigation-biblioteket har vi greid å lage en app der det er lett å navigere frem og tilbake fra forskjellige komponenter. Vi har brukt forskjellige typer navigasjonsmetoder som f.eks Drawer, Stack og TopTab. 

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


