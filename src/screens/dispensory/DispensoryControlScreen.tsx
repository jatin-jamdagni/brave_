import React, {useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import AppWrapper from '../../components/AppWrapper';
import BackHeader from '../../components/ui/BackHeader';
import CustomCard from '../../components/ui/CustomCard';
import ConfirmationModal from '../../components/ui/ConfirmationModal';
import {IMAGE} from '../../constants/images';

export default function DispensoryControlScreen({
  navigation,
}: {
  navigation: any;
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalAction, setModalAction] = useState<'add' | 'dispense'>('add');

  const handleBack = () => {
    navigation.goBack();
  };

  const showModal = (action: 'add' | 'dispense') => {
    setModalAction(action);
    setIsModalVisible(true);
  };

  const handleConfirm = () => {
    setIsModalVisible(false);
    navigation.navigate('DISPENSORYDATA', {action: modalAction});
  };

  return (
    <AppWrapper>
      <BackHeader
        onPress={handleBack}
        title="What do you want to do?"
        subTitle="Something also need here..."
        buttonLabel="Back"
      />
      <ScrollView contentContainerStyle={styles.container}>
        <CustomCard
          imageSource={IMAGE.PlaceholderImage}
          onPress={() => showModal('add')}
          title="Add Dispensary"
          buttonTitle="Add Dispensary"
          subtitle="This will add a new Dispensary"
          imageStyle={styles.imageStyle}
        />
        <CustomCard
          imageSource={IMAGE.PlaceholderImage}
          onPress={() => showModal('dispense')}
          title="Dispense Dispensary"
          buttonTitle="Dispense Dispensary"
          subtitle="This will dispense a new Dispensary"
          imageStyle={styles.imageStyle}
        />
      </ScrollView>
      <ConfirmationModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={handleConfirm}
        title={`Want to ${modalAction}?`}
        message={`Are you sure you want to ${modalAction} the medicine?`}
      />
    </AppWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 15,
  },
  imageStyle: {height: 120},
});
