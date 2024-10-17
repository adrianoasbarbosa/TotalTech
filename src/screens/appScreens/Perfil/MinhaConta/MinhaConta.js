import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function MinhaConta({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#FE8330" barStyle="light-content" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Alterar Conta</Text>
            </View>

            <View style={styles.profileImageContainer}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.profileImage} />
                ) : (
                    <View style={styles.placeholderImage}>
                        <AntDesign name="camerao" size={50} color="gray" />
                    </View>
                )}
                <TouchableOpacity style={styles.changePhotoButton} onPress={pickImage}>
                    <Text style={styles.changePhotoButtonText}>Alterar Foto</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Nome</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Alterar Nome"
                    value={name}
                    onChangeText={setName}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="exemplo@gmail.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />

                <Text style={styles.label}>Senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="********"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.confirmButton}>
                    <Text style={styles.confirmButtonText}>Confirmar Alterações</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FE8330',
        padding: 15,
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        marginLeft: 10,
    },
    profileImageContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: 'gray',
        borderWidth: 1,
    },
    placeholderImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
    },
    changePhotoButton: {
        marginTop: 10,
        backgroundColor: '#eee',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
    },
    changePhotoButtonText: {
        color: 'gray',
    },
    form: {
        marginTop: 10,
        padding: 20
    },
    label: {
        marginVertical: 5,
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    confirmButton: {
        backgroundColor: '#FE8330',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
    },
});
