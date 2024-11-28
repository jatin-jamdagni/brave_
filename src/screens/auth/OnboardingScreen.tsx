import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {IMAGE} from '../../constants/images';
import {CustomButton} from '../../components/ui/CustomButton';
import {Color} from '../../constants/color';
import {useAndroidId} from '../../hooks/useAndroidId';
import MadeWithLove from '../../components/MadeWithLove';

export default function OnboardingScreen({navigation}: {navigation: any}) {
  const {isLoading, androidId, error, fetchAndroidId} = useAndroidId();
  const [modalVisible, setModalVisible] = useState(false);

  const handleShowAndroidId = async () => {
    if (!androidId) {
      await fetchAndroidId();
    }
    setModalVisible(true);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.idButton} onPress={handleShowAndroidId}>
        <Icon name="info" size={28} color={Color.darkGray} />
      </TouchableOpacity>
      <Image source={IMAGE.RealLanding} style={styles.image} />
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>
            MODULAR TAC UNIT
          </Text>
          <Text style={styles.subtitle} numberOfLines={2}>
            RFID app for the Modular TAC Unit
          </Text>
        </View>

        <CustomButton
          buttonStyle={{backgroundColor: Color.secondary}}
          textStyle={styles.buttonText}
          rightIcon={<RightIcon />}
          title="Next"
          onPress={() => navigation.navigate('AUTHENTICATION')}
        />
      </View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {isLoading ? (
              <ActivityIndicator size="large" color={Color.primary} />
            ) : error ? (
              <Text style={styles.modalText}>Error fetching Android ID</Text>
            ) : (
              <>
                {/* <Text style={styles.modalText}>Made with ❤️ at AWL INDIA</Text> */}
                <MadeWithLove />

                <Text style={styles.modalText1}>Device: {androidId}</Text>
              </>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const RightIcon = () => {
  return <Icon name="arrow-forward" size={20} color={Color.white} />;
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Color.background,
  },
  idButton: {
    position: 'absolute',
    borderRadius: 5,
    left: '90%',
    top: '1%',
    zIndex: 1,
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: 470,
    borderBottomRightRadius: 32,
    borderBottomLeftRadius: 32,
  },
  contentContainer: {
    padding: 16,
    gap: 25,
  },
  textContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Color.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    color: Color.lightGray,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.white,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: Color.background,
    borderRadius: 10,
    alignItems: 'center',
  },

  modalText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalText1: {
    fontSize: 16,
    color: Color.primary,
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: Color.darkGray,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: Color.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
