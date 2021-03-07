import * as React from 'react';
import {Text,TouchableOpacity,TextInput,View,StyleSheet}from 'react-native';
import { Header } from 'react-native-elements';

export default class HomeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            text:'',
            isSearchPressed:'false',
            word:'Loading....',
            lexicalCategory:'',
            example:[],
            definition:""
           
        };
    }
    getWord=(word)=>{
        var searchkeyWord=word.toLowerCase();
        var url="https://rupinwhitehatjr.github.io/dictionary/"+searchkeyWord+".json";
        return fetch(url)
        .then((data)=>{
            if(data.status===200){
                return data.json();
            }
            else{
                return null
            }
        })
        .then((response)=>{
            var responseObj=response;
           
            if(responseObj){
                console.log(responseObj.definitions[0])
                var wordData=responseObj.definitions[0];
                
                var definition=wordData.description;
                var lexicalCategory=wordData.wordtype;
                this.setState({
                    "word":this.state.text,
                    "definition":definition,
                    "lexicalCategory":lexicalCategory,
                })
            }
            else{
                this.setState({
                    "word":this.state.text,
                    "definition":"Not found",
                })
            }
        })
    }
    render(){
       
        return(
            <View>
                <Header backgroundColor={'#9c8210'} centerComponent={{
                    text:'Dictionary App',
                    style: { color: '#fff', fontSize: 20 },
                }}>
                    
                </Header>
                <View style={StyleSheet.inputBox}>
                <TextInput style={styles.inputBox} onChangeText={text=>{
                    this.setState({
                        text:text,
                        isSearchPressed:false,
                        word:'Loading....',
                        lexicalCategory:'',
                        example:[],
                        definition:""

                    })
                    }
                } 
                    value={this.state.text} 
                />
                </View>
                <TouchableOpacity style={styles.goButton} onPress={()=>{
                this.setState({isSearchPressed:true});
                    this.getWord(this.state.text)
                 } }>
                    <Text style={styles.buttonText}>SEARCH</Text>
                </TouchableOpacity>
                <View style={styles.outputContainer}>
                    {console.log(this.state.isSearchPressed )}
                    <Text style={{fontSize:18}}> 
                         { this.state.isSearchPressed==="false" && this.state.word==="Loading...."
                        ?this.state.word:""}
                    </Text>
                 {this.state.word!=="Loading...."?(
                <View>
                 <View style={styles.detailsContainer}>               
                    <Text style={styles.detailsTitle}>
                        Word:{""}
                    </Text>
                    <Text style={{fontSize:18}}>
                       {this.state.word}
                    </Text>
                    
                 </View>
                 <View style={styles.detailsContainer}>               
                    <Text style={styles.detailsTitle}>
                        Type:{""};
                    </Text>
                    <Text style={{fontSize:18}}>
                        {this.state.lexicalCategory}
                    </Text>
                    
                 </View>
                 <View style={styles.detailsContainer}>               
                    <Text style={styles.detailsTitle}>
                        Meaning:{""}
                    </Text>
                    <Text style={{fontSize:18,fontWeight:'normal'}}>
                        {this.state.definition}
                    </Text>
                    
                 </View>
                 </View>
                )
                 :null
                }
                </View>
                
            </View>
                
        )
      
        
        
        
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#b8b8b8',
    },
    inputBoxContainer:{
     flex:0.3,
     alignItems:'center',
     justifyContent:'center'
    },
    inputBox: {
      marginTop: 10,
      width: '80%',
      alignSelf: 'center',
      height: 40,
      textAlign: 'center',
      borderWidth: 4,
      outline: 'none',
    },
    goButton: {
      width: '10%',
      height: 40,
      alignSelf: 'center',
      padding: 10,
      margin: 40,
      backgroundColor:'blue',
      borderRadius:20,
      
    },
    buttonText: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
    },
    displayText: {
      textAlign: 'center',
      fontSize: 30,
    },
    imageIcon:{
      width:150,
      height:150,
      marginLeft:110,
    },
    outputContainer:{
        flex:1,
        alignItems:'center',
        justifyContainer:'center'
    },
    detailsContainer:{
        flex:1,
        textAlign:'center',
        fontSize:15,
        fontWeight:15,
        justifyContent:'center',
        alignItems:'center',
    },
    detailsTitle:{
        alignItems:'center',
        justifyContent:'center',
        fontWeight:'bold',
        fontSize:20,
        padding:10,
    }
  });
  