import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Checkbox from 'expo-checkbox';
import AddressBar from '../components/AddressBar';
import { useDispatch, useSelector } from 'react-redux';
import { addAddressDetails } from '../store/action/addressAction';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { updateAdd, updateAddId } from '../store/reducer/userSlice';


const Address = () => {
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.addresses.addresses);
  const addid = useSelector((state) => state.user.addid);

  const [modalVisible, setModalVisible] = useState(false);
  const [cityInput, setCityInput] = useState('');
  const [postcodeInput, setPostcodeInput] = useState('');
  const [stateInput, setStateInput] = useState('');
  const [addressInput, setAddressInput] = useState('');

  const handleCheckboxChange = (item) => {

    let full_add = `${item.address}, ${item.city}, ${item.postcode}, ${item.state}`
    dispatch(updateAdd(full_add));
    dispatch(updateAddId(item.id));
  };

  const checkboxvalue = (item) => {
    if (item.id == addid) {
      return true;
    } else {
      return false;
    }
  }


  const renderAddressItem = ({ item }) => (
    <View>
      <View style={styles.addressContainer}>
        <Text style={styles.addressText}>
          {item.address}, {item.city}, {item.postcode}, {item.state}
        </Text>
        <Checkbox
          value={checkboxvalue(item)}
          onValueChange={() => handleCheckboxChange(item)}
        />
      </View>
      <View style={styles.itemSeparator} />
    </View>
  );

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const saveAddressDetails = () => {
    const commonId = uuidv4();

    const newAddress = {
      id: commonId,
      address: addressInput,
      city: cityInput,
      postcode: postcodeInput,
      state: stateInput,
    };

    dispatch(addAddressDetails(newAddress));

    setAddressInput('');
    setCityInput('');
    setStateInput('');
    setPostcodeInput('');

    closeModal();
  };

  return (
    <View style={styles.container}>
      <AddressBar />
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={renderAddressItem}
        style={{ marginTop: 70 }}
      />
      <TouchableOpacity style={styles.modalButton} onPress={openModal}>
        <Text style={styles.modalButtonText}>Add Address</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Address Details</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Address"
              value={addressInput}
              onChangeText={(text) => setAddressInput(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="City"
              value={cityInput}
              onChangeText={(text) => setCityInput(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Postcode"
              value={postcodeInput}
              onChangeText={(text) => setPostcodeInput(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="State"
              value={stateInput}
              onChangeText={(text) => setStateInput(text)}
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveAddressDetails}>
              <Text style={styles.saveButtonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  addressLabel: {
    marginLeft: 8,
  },
  modalButton: {
    marginTop: 16,
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  closeButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  addressText: {
    fontWeight: '300'
  },
  checkboxStyle: {
    paddingRight: 10,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: 'gray', // Adjust the color as needed
  },
});

export default Address;
