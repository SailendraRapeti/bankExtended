import {
  Text,
  View,
  TouchableHighlight,
  Modal,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {Component} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
type Istate = {
  balance: any;
  creditText: any;
  modalVisible: boolean;
  modalVisible1: boolean;
  amount: any;
  modelAmount: any;
  modelAmountDebit: any;
  amountDebit: any;
  debitText: any;
  errMsg: any;
};

class Transctions extends Component {
  state: Istate = {
    balance: 0,
    creditText: '',
    debitText: '',
    modalVisible: false,
    modalVisible1: false,
    amount: [],
    modelAmount: '',
    modelAmountDebit: '',
    amountDebit: [],
    errMsg: '',
  };
  onChangeNumber = (newText: any) => {
    this.setState({balance: this.state.balance + parseInt(newText)});
    this.setState({modelAmount: newText});
  };
  onChangetext = (newText: any) => {
    this.setState({creditText: newText});
  };
  onChangetextDebit = (newText: any) => {
    this.setState({debitText: newText});
  };
  onChangeNumberDebit = (newText: any) => {
    this.setState({balance: this.state.balance - parseInt(newText)});
    this.setState({modelAmountDebit: newText});
  };

  onAddAmount = () => {
    // const {balance,text}=this.state
    this.setState({balance: this.state.balance});
    // this.setState({
    //   balance: this.state.balance + parseInt(this.state.modelAmount),
    // });
    const {modelAmount, amount, creditText, balance} = this.state;
    if (balance > 0 && modelAmount != '') {
      const obj = {
        id: amount.length,
        modelAmount: modelAmount,
        creditText: creditText,
      };
      this.setState({amount: [...amount, obj]});
      this.setState({modalVisible: false});

      // this.setState({
      //   modelAmount: '',
      // });
    }
  };
  onAddAmountDebit = () => {
    // const {balance,text}=this.state
    this.setState({balance: this.state.balance});
    const {modelAmountDebit, amountDebit, debitText, balance, modelAmount} =
      this.state;
    if (balance >= parseInt(modelAmountDebit)) {
      const obj = {
        id: amountDebit.length,
        modelAmountDebit: modelAmountDebit,
        debitText,
      };

      this.setState({amountDebit: [...amountDebit, obj]});
    } else {
      this.setState({balance: modelAmount});
    }
    this.setState({modalVisible1: !this.state.modalVisible1});
  };
  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({modalVisible: !this.state.modalVisible});
          }}>
          <View style={styles.container}>
            <TextInput
              onChangeText={this.onChangeNumber}
              // value={this.balance}
              placeholder="ENTER AMOUNT"
              keyboardType="numeric"
              style={styles.input}
            />

            <TextInput
              onChangeText={this.onChangetext}
              // value={this.balance}
              placeholder="ENTER REASON"
              //   keyboardType="numeric"
              style={styles.input}
            />

            <TouchableHighlight onPress={this.onAddAmount}>
              <Text style={styles.creditButton}>Add Amount</Text>
            </TouchableHighlight>

            {/* <TouchableHighlight
              onPress={() =>
                this.setState({modalVisible: !this.state.modalVisible})
              }>
              <Text>CLOSE MODEL</Text>
            </TouchableHighlight> */}
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible1}
          onRequestClose={() => {
            this.setState({modalVisible1: !this.state.modalVisible1});
          }}>
          <View style={styles.container}>
            <TextInput
              onChangeText={this.onChangeNumberDebit}
              // value={this.balance}
              placeholder="ENTER AMOUNT"
              keyboardType="numeric"
              style={styles.input}
            />

            <TextInput
              onChangeText={this.onChangetextDebit}
              // value={this.balance}
              placeholder="ENTER REASON"
              //   keyboardType="numeric"
              style={styles.input}
            />
            <Text>{this.state.errMsg}</Text>
            <TouchableHighlight onPress={this.onAddAmountDebit}>
              <Text>debit Amount</Text>
            </TouchableHighlight>

            {/* <TouchableHighlight
              onPress={() =>
                this.setState({modalVisible1: !this.state.modalVisible1})
              }>
              <Text>CLOSE MODEL</Text>
            </TouchableHighlight> */}
          </View>
        </Modal>
        <View style={styles.mainContainer}>
          <Text style={styles.trans}>Money App</Text>
          <View style={styles.container123}>
            <TouchableHighlight
              onPress={() => this.setState({modalVisible: true})}>
              <Text style={styles.creditButton}>Credit Amount</Text>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={() => this.setState({modalVisible1: true})}
              disabled={this.state.balance === 0 ? true : false}>
              <Text style={styles.debitButton}>Debit Amount</Text>
            </TouchableHighlight>
          </View>

          <View>
            <Text style={styles.balance}>BALANCE:{this.state.balance}</Text>
            {/* <Text>{this.state.balance}</Text> */}
          </View>
        </View>
        <View style={styles.Transctions}>
          <Text style={styles.trans2}>Transctions History</Text>
          <ScrollView>
            {this.state.amount.length > 0 ? (
              this.state.amount.map((each: any) => {
                return (
                  <View key={each.id} style={styles.creditAmount}>
                    <Text style={styles.creditAmountText}>
                      credit Amount : {each.modelAmount}
                    </Text>
                    <Text style={styles.creditAmountText}>
                      {each.creditText}
                    </Text>
                  </View>
                );
              })
            ) : (
              <Text>no credit</Text>
            )}

            {this.state.amountDebit.length > 0 ? (
              this.state.amountDebit.map((each: any) => {
                return (
                  <View key={each.id} style={styles.debitAmount}>
                    <Text style={styles.creditAmountText}>
                      Debit Amount : {each.modelAmountDebit}
                    </Text>
                    <Text style={styles.creditAmountText}>
                      {each.debitText}
                    </Text>
                  </View>
                );
              })
            ) : (
              <Text>no debit</Text>
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'white',
    borderRadius: 20,
    width: 200,
  },
  container: {
    backgroundColor: '#3cb371',
    height: 300,
    // width: 500,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Transctions: {
    backgroundColor: '#525742',
    height: 250,
  },
  creditAmount: {
    backgroundColor: '#3f3ad6',
    color: '#4628b5',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    padding: 5,
    textAlign: 'center',
    margin: 5,
  },
  debitAmount: {
    backgroundColor: '#b81241',
    color: '#4628b5',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    padding: 5,
    textAlign: 'center',
    margin: 5,
  },
  container123: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
  },
  creditButton: {
    backgroundColor: '#3312b8',
    height: 30,
    color: 'white',
    textAlign: 'center',
    width: 100,
    padding: 4,
    marginTop: 30,
    // flexDirection: 'row',
  },
  debitButton: {
    backgroundColor: '#d12c13',
    height: 30,
    color: 'white',
    textAlign: 'center',
    width: 100,
    padding: 4,
    marginTop: 30,
  },
  balance: {
    textAlign: 'center',
    marginTop: 30,
    color: '#118bd6',
    fontSize: 30,
  },
  mainContainer: {
    textAlign: 'center',
    height: 250,
  },
  trans: {
    textAlign: 'center',
    fontSize: 40,
    color: '#118bd6',
  },
  creditAmountText: {
    color: 'white',
    fontSize: 25,
  },
  trans2: {
    textAlign: 'center',
    color: '#a8f59f',
    fontSize: 20,
  },
  textInput: {
    width: 200,
    borderColor: 'white',
  },
});

export default Transctions;
