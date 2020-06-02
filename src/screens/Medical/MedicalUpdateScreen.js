import React, { useState, useEffect } from "react";
import { Container, Content, Form, Item, Input, Button, Spinner, Card } from 'native-base';
import { Image, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import styles from '../../assets/styles/globalStyles';
import RestService from '../../services/RestService';
import MedicalService from '../../services/MedicalService';
import SimpleHeader from '../../components/Headers/SimpleHeader ';
import NavService from "../../services/NavService";
import { Session } from "../../session/Session";
import Toast from 'react-native-simple-toast';



function MedicalUpdateScreen() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [CRM, setCRM] = useState(null);
  const [labelCPF, setLabelCPF] = useState(null);
  const [CPF, setCPF] = useState(null);
  const [labelCEP, setLabelCEP] = useState(null);
  const [CEP, setCEP] = useState(null);
  const [address, setAddress] = useState(null);
  const [specialism, setSpecialism] = useState(null);
  const [PWD, setPWD] = useState('1111111');


  async function save() {
    try {
      let resp = await MedicalService.update(name, email, CPF, CEP, address, CRM, specialism, PWD);
      if (resp.success) {
        Toast.show('Cadastro modificado com sucesso!', Toast.LONG);
        NavService.navigate('Home');
      } else {
        alert(resp.error)
      }
    } catch (e) {
      alert(e.error)
    }
  }


  useEffect(async () => {
    try {
      let resp = await MedicalService.get(Session.CurrentUser.medical_id)
      if (resp.status == 200 && resp.medical) {
        let medical = resp.medical;
        setName(medical.name)
        setEmail(medical.email)
        handleCep(medical.cep)
        handleCpf(medical.cpf)
        setSpecialism(medical.specialism)
        setCRM(medical.crm)
        setAddress(medical.address)
      }
    } catch (e) {
      alert(e.error)
    }

  }, []);

  const renderSaveButton = () => {
    return (
      <Container>
        <Button block style={styles.btnLargeBlue} onPress={() => save()}>
          <Text style={styles.blueBtnLabel}> Salvar </Text>
        </Button>
        <Button block style={[styles.btnLargeBlue, { marginTop: 10 }]} onPress={() => NavService.goBack()}>
          <Text style={styles.blueBtnLabel}> Voltar </Text>
        </Button>
      </Container>
    )
    // }
  }

  const handleCep = async (cep) => {
    let cepF1 = '';
    if (cep) {
      cep = cep.split('-').map((val) => val).join('');
      cepF1 = cep.match(/.{1,5}/g).map((val) => val.replace(/[^0-9]/g, '')).join('-');
    }
    if (cep.length === 8) {
      let resp = await RestService.getAddress(cep);
      setAddress(resp);
    }
    setLabelCEP(cepF1)
    setCEP(cep)
  }

  const handleCpf = cpf => {
    let cpfF1 = ''
    if (cpf) {
      if (cpf.match(/((\d{3}[\.]){2}(\d{3})){1}/g)) {
        if (cpf.match(/((\d{3}[\.]){2}(\d{3}[\-])){1}/g)) {
          let split = cpf.split(/((\d{3}[\.]){2}(\d{3})){1}/g);
          cpfF1 = split[1] + split[split.length - 1];
        } else {
          let split = cpf.split(/((\d{3}[\.]){2}(\d{3})){1}/g);
          if (split[split.length - 1] != '')
            cpfF1 = split[1] + '-' + split[split.length - 1];
          else
            cpfF1 = split[1]
        }
      } else {
        cpf = cpf.split('.').map((val) => val).join('');
        cpf = cpf.split('-').map((val) => val).join('');
        cpfF1 = cpf.match(/.{1,3}/g).map((val) => val).join('.');
      }
    }
    setLabelCPF(cpfF1)
    cpf11 = cpf.split('.').map((val) => val).join('');
    cpf22 = cpf11.split('-').map((val) => val).join('');
    setCPF(cpf22)
  }

  return (

    <Content>
      <SimpleHeader title={'Editar cadastro'} />
      <Card style={styles.formCard}>
        <Form style={styles.form}>
          <Text style={styles.inputTextLabel} > Nome </Text>
          <Item rounded style={styles.itemWithInput}>
            <Input style={styles.formTextInput}
              placeholderTextColor="#CECECE"
              onChangeText={(name) => setName(name)}
              value={name} />
          </Item>

          <Text style={styles.inputTextLabel} > E-mail </Text>
          <Item rounded style={styles.itemWithInput}>
            <Input style={styles.formTextInput}
              placeholderTextColor="#CECECE"
              onChangeText={(email) => setEmail(email)}
              value={email} />
          </Item>

          <Text style={styles.inputTextLabel} > CPF </Text>
          <Item rounded style={styles.itemWithInput}>
            <Input style={styles.formTextInput}
              onChangeText={(cpf) => handleCpf(cpf)}
              maxLength={14}
              placeholder={'CPF'}
              placeholderTextColor="#CECECE"
              value={labelCPF} />
          </Item>

          <Text style={styles.inputTextLabel} > CEP </Text>
          <Item rounded style={styles.itemWithInput}>
            <Input style={styles.formTextInput}
              maxLength={9}
              keyboardType='numeric'
              placeholder="00000-000"
              placeholderTextColor="#CECECE"
              onChangeText={(cep) => handleCep(cep)}
              value={labelCEP} />
          </Item>

          <Text style={styles.inputTextLabel} > Endereço </Text>
          <Item rounded style={[styles.itemWithTextArea, {}]}>
            <Input style={styles.formTextInput}
              multiline
              editable={false}
              value={address} />
          </Item>

          <Text style={styles.inputTextLabel} > CRM </Text>
          <Item rounded style={styles.itemWithInput}>
            <Input style={styles.formTextInput}
              maxLength={20}
              placeholder="00000000AA"
              placeholderTextColor="#CECECE"
              onChangeText={(crm) => setCRM(crm)}
              value={CRM} />
          </Item>

          <Text style={styles.inputTextLabel} > Especialidade </Text>
          <Item rounded style={styles.itemWithInput}>
            <Input style={styles.formTextInput}
              maxLength={50}
              placeholderTextColor="#CECECE"
              onChangeText={(sp) => setSpecialism(sp)}
              value={specialism} />
          </Item>
          {renderSaveButton()}
        </Form>
      </Card>
    </Content>
  )
}
export default MedicalUpdateScreen;
