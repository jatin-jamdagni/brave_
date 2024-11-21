// import React from 'react';
// import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';

// interface Instruction {
//   step: string;
// }

// export type InstructionCarouselCardProps = {
//   title: string;
//   imageSource: string;
//   instructions: Instruction[];
// };

// export default function InstructionCarouselCard({
//   title,
//   imageSource,
//   instructions,
// }: InstructionCarouselCardProps) {
//   return (
//     <View style={styles.card}>
//       <Text style={styles.title}>{title}</Text>
//       <View style={styles.imageContainer}>
//         <Image source={{uri: imageSource}} style={styles.image} />
//       </View>
//       <View style={styles.instructionsContainer}>
//         <Text style={styles.instructionsTitle}>Instructions</Text>
//         <ScrollView style={styles.instructionsList}>
//           {instructions.map((instruction, index) => (
//             <Text key={index} style={styles.instructionItem}>
//               {index + 1}. {instruction.step}
//             </Text>
//           ))}
//         </ScrollView>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 16,
//     margin: 16,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 16,
//   },
//   imageContainer: {
//     backgroundColor: '#E6F3FF',
//     borderRadius: 10,
//     overflow: 'hidden',
//     aspectRatio: 16 / 9,
//     marginBottom: 16,
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },
//   instructionsContainer: {
//     borderTopWidth: 1,
//     borderTopColor: '#E0E0E0',
//     paddingTop: 16,
//   },
//   instructionsTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   instructionsList: {
//     maxHeight: 120,
//   },
//   instructionItem: {
//     fontSize: 14,
//     marginBottom: 4,
//   },
// });
